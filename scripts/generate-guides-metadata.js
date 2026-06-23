const fs = require("fs");
const { join } = require("path");

const templatesRoot = join(__dirname, "..");
const guidesDirectory = join(templatesRoot, "guides");
const metadataDirectory = join(templatesRoot, "metadata");

// Convert any title to sentence case while preserving acronyms
function toSentenceCase(str) {
  if (!str || typeof str !== "string") return str;

  const trimmed = str.trim();
  if (trimmed.length === 0) return trimmed;

  // Split into words
  const words = trimmed.split(/\s+/);

  return words
    .map((word, index) => {
      // Preserve acronyms (2+ chars, all uppercase)
      if (word.length >= 2 && word === word.toUpperCase()) {
        return word;
      }

      // First word: capitalize first letter, lowercase rest
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      // All other words: lowercase
      return word.toLowerCase();
    })
    .join(" ");
}

const messageTypesDirectory = join(
  templatesRoot,
  "message-types",
);

const customMetadataPath = join(
  metadataDirectory,
  "custom/guides.json",
);

// Load custom metadata with defaults
function loadCustomMetadata() {
  try {
    if (fs.existsSync(customMetadataPath)) {
      const contents = fs.readFileSync(customMetadataPath, "utf8");
      const customData = JSON.parse(contents);
      // Convert array to object keyed by guide key for easy lookup
      return customData.reduce((acc, item) => {
        acc[item.key] = item;
        return acc;
      }, {});
    }
  } catch (e) {
    console.warn("Could not load custom guides metadata:", e.message);
  }
  return {};
}

// Recursively extract field keys from a field definition
function extractFieldKeys(field, prefix = "") {
  const keys = [];
  const fieldKey = prefix ? `${prefix}.${field.key}` : field.key;

  // Add the main field key
  keys.push(fieldKey);

  // Handle nested fields (e.g., button fields with text, action sub-fields)
  if (field.text) {
    keys.push(`${fieldKey}.text`);
  }
  if (field.action) {
    keys.push(`${fieldKey}.action`);
  }
  if (field.url) {
    keys.push(`${fieldKey}.url`);
  }
  if (field.alt) {
    keys.push(`${fieldKey}.alt`);
  }

  return keys;
}

// Extract all field keys from a variant's fields array
function extractVariantFields(variant) {
  const fields = [];
  if (variant.fields && Array.isArray(variant.fields)) {
    variant.fields.forEach((field) => {
      fields.push(...extractFieldKeys(field));
    });
  }
  return fields;
}

// Check if cover image exists for a guide (used for template card preview)
function getCoverImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const guideFolderPath = join(
    metadataDirectory,
    "images",
    "components",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(guideFolderPath, `cover${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/components/${slug}/cover${ext}`;
    }
  }

  // Fallback: Check for single file in metadata/images/components.
  const templateLibraryPath = join(
    metadataDirectory,
    "images",
    "components",
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(templateLibraryPath, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/components/${slug}${ext}`;
    }
  }

  return null;
}

// Check if OG image exists for a guide (used for social sharing)
function getOgImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const guideFolderPath = join(
    metadataDirectory,
    "images",
    "components",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(guideFolderPath, `og${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/components/${slug}/og${ext}`;
    }
  }

  return null;
}

function generateGuidesMetadata() {
  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }

  // Load custom metadata
  const customMetadata = loadCustomMetadata();

  const guides = [];
  const folders = fs
    .readdirSync(guidesDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    const guidePath = join(guidesDirectory, folder);
    const guideJsonPath = join(guidePath, "guide.json");

    if (!fs.existsSync(guideJsonPath)) {
      continue;
    }

    const guideJson = JSON.parse(fs.readFileSync(guideJsonPath, "utf8"));
    const slug = guideJson.__readonly?.key || folder;

    // Get custom metadata for this guide
    const custom = customMetadata[slug] || {};

    // Skip if excluded via custom metadata
    if (custom.exclude === true) {
      continue;
    }

    // Extract message type info from the first step
    const firstStep = guideJson.steps && guideJson.steps[0];
    if (!firstStep || !firstStep.schema_key) {
      console.warn(`Guide ${slug} has no schema_key in first step, skipping`);
      continue;
    }

    const schemaKey = firstStep.schema_key;
    const schemaVariantKey = firstStep.schema_variant_key || "default";
    const exampleValues = firstStep.values || {};

    // Load the corresponding message type
    const messageTypePath = join(messageTypesDirectory, schemaKey);
    const messageTypeJsonPath = join(messageTypePath, "message_type.json");
    const previewHtmlPath = join(messageTypePath, "preview.html");

    if (!fs.existsSync(messageTypeJsonPath)) {
      console.warn(
        `Message type ${schemaKey} not found for guide ${slug}, skipping`,
      );
      continue;
    }

    const messageTypeJson = JSON.parse(
      fs.readFileSync(messageTypeJsonPath, "utf8"),
    );
    const previewHtml = fs.existsSync(previewHtmlPath)
      ? fs.readFileSync(previewHtmlPath, "utf8")
      : null;

    // Extract variants from message type
    const variants =
      messageTypeJson.variants?.map((variant) => ({
        key: variant.key,
        name: variant.name,
        fields: extractVariantFields(variant),
      })) || [];

    // Build default values object from example values and schema
    // Priority: custom defaults > example values > schema defaults > empty
    const defaultValues = { ...exampleValues };

    // Merge in custom defaults if they exist
    if (custom.defaults) {
      Object.keys(custom.defaults).forEach((key) => {
        defaultValues[key] = custom.defaults[key];
      });
    }

    // For the selected variant, ensure all fields have defaults
    const selectedVariant = messageTypeJson.variants?.find(
      (v) => v.key === schemaVariantKey,
    );
    if (selectedVariant && selectedVariant.fields) {
      selectedVariant.fields.forEach((field) => {
        const fieldKey = field.key;
        // If not in default values (from custom or example), use schema default or empty value
        if (!(fieldKey in defaultValues)) {
          if (field.type === "boolean") {
            defaultValues[fieldKey] = field.settings?.default ?? false;
          } else if (field.type === "textarea" || field.type === "text") {
            defaultValues[fieldKey] = field.settings?.default ?? "";
          } else if (field.type === "button") {
            // Handle button fields with nested properties
            if (!defaultValues[fieldKey]) {
              defaultValues[fieldKey] = {};
            }
            if (field.text) {
              defaultValues[fieldKey].text = field.text.settings?.default ?? "";
            }
            if (field.action) {
              defaultValues[fieldKey].action =
                field.action.settings?.default ?? "";
            }
          } else if (field.type === "image") {
            // Handle image fields with nested properties
            if (!defaultValues[fieldKey]) {
              defaultValues[fieldKey] = {};
            }
            if (field.url) {
              defaultValues[fieldKey].url = field.url.settings?.default ?? "";
            }
            if (field.alt) {
              defaultValues[fieldKey].alt = field.alt.settings?.default ?? "";
            }
            if (field.action) {
              defaultValues[fieldKey].action =
                field.action.settings?.default ?? "";
            }
          }
        }
      });
    }

    // Build schema information for editor interface
    const schema = {
      variants: messageTypeJson.variants?.map((variant) => ({
        key: variant.key,
        name: variant.name,
        fields: variant.fields?.map((field) => ({
          key: field.key,
          label: field.label,
          type: field.type,
          settings: field.settings || {},
          // Include nested field definitions for complex types
          text: field.text,
          action: field.action,
          url: field.url,
          alt: field.alt,
        })),
      })),
    };

    // Check for cover and OG images
    const coverImage = getCoverImagePath(slug);
    const ogImage = getOgImagePath(slug);

    guides.push({
      slug,
      title: custom.friendlyName || toSentenceCase(guideJson.name || folder),
      metaTitle: custom.metaTitle || null,
      description:
        custom.description ||
        messageTypeJson.description ||
        `A ${guideJson.name || folder} guide template.`,
      extendedDescription: custom.extendedDescription || "",
      messageType: messageTypeJson.name || schemaKey,
      messageTypeKey: schemaKey,
      iconName: messageTypeJson.icon_name || "Sparkles",
      tags: custom.tags || [],
      variants,
      defaultValues,
      schema,
      previewHtml,
      selectedVariant: schemaVariantKey,
      previewImage: coverImage || null,
      ogImage: ogImage || null,
      cliCommand: `npx @knocklabs/cli guide new --template=${slug}`,
    });
  }

  return guides;
}

// CLI usage
if (require.main === module) {
  const metadata = generateGuidesMetadata();
  const outputPath = join(
    metadataDirectory,
    "generated/guides-metadata.json",
  );
  // Ensure directory exists
  const outputDir = join(metadataDirectory, "generated");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`Generated metadata for ${metadata.length} guides`);
}

module.exports = { generateGuidesMetadata };
