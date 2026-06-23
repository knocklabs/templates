const fs = require("fs");
const { join } = require("path");

const templatesRoot = join(__dirname, "..");
const partialsDirectory = join(templatesRoot, "partials");
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

const customMetadataPath = join(
  metadataDirectory,
  "custom/partials.json",
);

// Load custom metadata with defaults
function loadCustomMetadata() {
  try {
    if (fs.existsSync(customMetadataPath)) {
      const contents = fs.readFileSync(customMetadataPath, "utf8");
      const customData = JSON.parse(contents);
      // Convert array to object keyed by partial key for easy lookup
      return customData.reduce((acc, item) => {
        acc[item.key] = item;
        return acc;
      }, {});
    }
  } catch (e) {
    console.warn("Could not load custom partials metadata:", e.message);
  }
  return {};
}

// Extract Liquid variables from HTML content
// Preserves the order variables appear in the HTML
function extractLiquidVariables(content) {
  const variables = [];
  // eslint-disable-next-line no-undef
  const seen = new Set();
  // eslint-disable-next-line no-undef
  const assignedVars = new Set();

  // First pass: collect all variables that are assigned (left side of {% assign %})
  const assignPattern = /\{%\s*assign\s+([^\s=]+)\s*=/g;
  let match;
  while ((match = assignPattern.exec(content)) !== null) {
    assignedVars.add(match[1].trim());
  }

  // Helper function to add variable while preserving order
  const addVariable = (varName) => {
    const trimmed = varName.trim();
    // Skip if already seen, assigned internally, or is an internal/calculated variable
    if (
      seen.has(trimmed) ||
      assignedVars.has(trimmed) ||
      !trimmed ||
      trimmed.includes("{{") ||
      trimmed.includes(".") ||
      trimmed.startsWith("'") ||
      trimmed.startsWith('"')
    ) {
      return;
    }
    variables.push(trimmed);
    seen.add(trimmed);
  };

  // Extract {{ variable }} patterns
  const outputPattern = /\{\{\s*([^|}\s]+)/g;
  while ((match = outputPattern.exec(content)) !== null) {
    addVariable(match[1]);
  }

  // Extract variables from {% if variable %} patterns
  const ifPattern = /\{%\s*if\s+([^%}\s<>=!]+)/g;
  while ((match = ifPattern.exec(content)) !== null) {
    addVariable(match[1]);
  }

  // Extract variables from right side of {% assign %} statements (before filters/pipes)
  // Matches: {% assign var = some_input | filter %}
  const assignRightSidePattern = /\{%\s*assign\s+[^\s=]+\s*=\s*([^%}\s|]+)/g;
  while ((match = assignRightSidePattern.exec(content)) !== null) {
    addVariable(match[1]);
  }

  return variables;
}

// Parse input_schema from partial.json to extract structured field definitions
// This handles the new image type with nested subfields (url, alt, action)
function parseInputSchema(inputSchema) {
  if (!inputSchema || !Array.isArray(inputSchema)) {
    return { fields: [], fieldTypes: {} };
  }

  const fields = [];
  const fieldTypes = {};

  for (const field of inputSchema) {
    const key = field.key;
    const type = field.type;

    if (!key) continue;

    if (type === "image") {
      // Image type has nested subfields: url, alt, action
      fieldTypes[key] = {
        type: "image",
        label: field.label || key,
        description: field.settings?.description || "",
        required: field.settings?.required || false,
        subfields: {
          url: {
            label: field.url?.label || "Image URL",
            default: field.url?.settings?.default || "",
            required: field.url?.settings?.required || false,
          },
          alt: {
            label: field.alt?.label || "Alt text",
            default: field.alt?.settings?.default || "",
            required: field.alt?.settings?.required || false,
          },
          action: {
            label: field.action?.label || "Image action",
            default: field.action?.settings?.default || "",
            required: field.action?.settings?.required || false,
          },
        },
      };
      fields.push(key);
    } else {
      // Standard field types (text, textarea, url, etc.)
      fieldTypes[key] = {
        type: type || "text",
        label: field.label || key,
        description: field.settings?.description || "",
        required: field.settings?.required || false,
        default: field.settings?.default || "",
        placeholder: field.settings?.placeholder || "",
        options: Array.isArray(field.settings?.options)
          ? field.settings.options
          : [],
      };
      fields.push(key);
    }
  }

  return { fields, fieldTypes };
}

// Check if cover image exists for a partial (used for template card preview)
function getCoverImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const partialFolderPath = join(
    metadataDirectory,
    "images",
    "partials",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(partialFolderPath, `cover${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/partials/${slug}/cover${ext}`;
    }
  }

  // Fallback: Check for single file in metadata/images/partials.
  const templateLibraryPath = join(metadataDirectory, "images", "partials");
  for (const ext of possibleExtensions) {
    const imagePath = join(templateLibraryPath, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/partials/${slug}${ext}`;
    }
  }

  return null;
}

// Check if OG image exists for a partial (used for social sharing)
function getOgImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const partialFolderPath = join(
    metadataDirectory,
    "images",
    "partials",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(partialFolderPath, `og${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/partials/${slug}/og${ext}`;
    }
  }

  return null;
}

function generatePartialsMetadata() {
  if (!fs.existsSync(partialsDirectory)) {
    return [];
  }

  // Load custom metadata
  const customMetadata = loadCustomMetadata();

  const partials = [];
  const folders = fs
    .readdirSync(partialsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    const partialPath = join(partialsDirectory, folder);
    const jsonPath = join(partialPath, "partial.json");
    const htmlPath = join(partialPath, "content.html");

    if (!fs.existsSync(jsonPath) || !fs.existsSync(htmlPath)) {
      continue;
    }

    const partialJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    const slug = partialJson.__readonly?.key || folder;

    // Get custom metadata for this partial
    const custom = customMetadata[slug] || {};

    // Skip if excluded via custom metadata
    if (custom.exclude === true) {
      continue;
    }

    // Parse input_schema from partial.json if available
    const { fields: schemaFields, fieldTypes } = parseInputSchema(
      partialJson.input_schema,
    );

    // Use schema fields if available, otherwise fall back to extracting from HTML
    let variables =
      schemaFields.length > 0
        ? schemaFields
        : extractLiquidVariables(htmlContent);

    // Apply custom ordering if specified
    if (custom.order && Array.isArray(custom.order)) {
      const orderedVars = [];
      const remainingVars = [...variables];

      // First, add variables in the specified order
      custom.order.forEach((varName) => {
        const index = remainingVars.indexOf(varName);
        if (index !== -1) {
          orderedVars.push(varName);
          remainingVars.splice(index, 1);
        }
      });

      // Then append any remaining variables not specified in order
      variables = [...orderedVars, ...remainingVars];
    }

    // Generate default values for each variable
    // For image types, use nested structure; for others, use flat values
    const defaultValues = {};
    variables.forEach((varName) => {
      const fieldType = fieldTypes[varName];
      if (fieldType?.type === "image") {
        // Image fields have nested defaults
        const customDefaults = custom.defaults?.[varName] || {};
        defaultValues[varName] = {
          url:
            customDefaults.url ||
            customDefaults.url === ""
              ? customDefaults.url
              : fieldType.subfields.url.default || "",
          alt:
            customDefaults.alt ||
            customDefaults.alt === ""
              ? customDefaults.alt
              : fieldType.subfields.alt.default || "",
          action:
            customDefaults.action ||
            customDefaults.action === ""
              ? customDefaults.action
              : fieldType.subfields.action.default || "",
        };
      } else {
        // Standard fields use flat defaults
        defaultValues[varName] =
          custom.defaults?.[varName] || fieldType?.default || "";
      }
    });

    // Check for cover and OG images
    const coverImage = getCoverImagePath(slug);
    const ogImage = getOgImagePath(slug);

    partials.push({
      slug,
      title: custom.friendlyName || toSentenceCase(partialJson.name || folder),
      metaTitle: custom.metaTitle || null,
      description:
        custom.description ||
        `A reusable ${partialJson.name || folder} partial template.`,
      extendedDescription: custom.extendedDescription || "",
      category: "DevTools", // Default category, can be customized in partial.json
      htmlContent,
      variables,
      defaultValues,
      fieldTypes, // Include field type information for the UI
      iconName: partialJson.icon_name || "FileCode",
      messageType: "Changelog card", // Default, can be customized
      tags: custom.tags || [],
      previewImage: coverImage || null,
      ogImage: ogImage || null,
      cliCommand: `npx @knocklabs/cli partial new --template=${slug}`,
    });
  }

  return partials;
}

// CLI usage
if (require.main === module) {
  const metadata = generatePartialsMetadata();
  const outputPath = join(
    metadataDirectory,
    "generated/partials-metadata.json",
  );
  // Ensure directory exists
  const outputDir = join(metadataDirectory, "generated");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`Generated metadata for ${metadata.length} partials`);
}

module.exports = { generatePartialsMetadata };
