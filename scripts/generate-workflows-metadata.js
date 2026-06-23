const fs = require("fs");
const { join } = require("path");

const templatesRoot = join(__dirname, "..");
const workflowsDirectory = join(templatesRoot, "workflows");
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
  "custom/workflows.json",
);

// Load custom metadata (tags, descriptions, etc.)
function loadCustomMetadata() {
  try {
    if (fs.existsSync(customMetadataPath)) {
      const customMetadata = JSON.parse(
        fs.readFileSync(customMetadataPath, "utf8"),
      );
      // Convert array to map for easier lookup
      return customMetadata.reduce((acc, item) => {
        acc[item.key] = item;
        return acc;
      }, {});
    }
  } catch (error) {
    console.warn("Could not load custom metadata:", error.message);
  }
  return {};
}

// Map specific channel providers to generic channel types
function mapChannelToType(channelKey) {
  const channelMap = {
    // Email providers
    sendgrid: "email",
    postmark: "email",
    resend: "email",
    mailgun: "email",
    ses: "email",
    sparkpost: "email",
    mandrill: "email",

    // SMS providers
    twilio: "sms",
    messagebird: "sms",
    vonage: "sms",

    // Push providers
    apns: "push",
    fcm: "push",
    expo: "push",

    // Chat providers
    slack: "chat",
    discord: "chat",
    "ms-teams": "chat",

    // In-app
    "in-app-feed": "in-app",
    "knock-in-app": "in-app",
  };

  return channelMap[channelKey] || channelKey;
}

// Recursively extract channel and function steps from workflow
function extractSteps(step, channels, functions) {
  if (!step || typeof step !== "object") {
    return;
  }

  // Extract channel steps
  if (step.type === "channel" && step.channel_key) {
    const channelType = mapChannelToType(step.channel_key);
    channels.add(channelType);
  }

  // Extract function steps (non-channel steps)
  if (step.type && step.type !== "channel") {
    functions.add(step.type);
  }

  // Recursively process nested steps
  if (step.steps && Array.isArray(step.steps)) {
    step.steps.forEach((nestedStep) => {
      extractSteps(nestedStep, channels, functions);
    });
  }

  // Process branches (branch steps have branches array)
  if (step.branches && Array.isArray(step.branches)) {
    step.branches.forEach((branch) => {
      if (branch.steps && Array.isArray(branch.steps)) {
        branch.steps.forEach((branchStep) => {
          extractSteps(branchStep, channels, functions);
        });
      }
    });
  }
}

// Check if cover image exists for a workflow (used for template card preview)
function getCoverImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const workflowFolderPath = join(
    metadataDirectory,
    "images",
    "workflows",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(workflowFolderPath, `cover${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/workflows/${slug}/cover${ext}`;
    }
  }

  // Fallback: Check for single file in metadata/images/workflows.
  const templateLibraryPath = join(metadataDirectory, "images", "workflows");
  for (const ext of possibleExtensions) {
    const imagePath = join(templateLibraryPath, `${slug}${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/workflows/${slug}${ext}`;
    }
  }

  return null;
}

// Check if diagram image exists for a workflow (used for detail page)
function getDiagramImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const workflowFolderPath = join(
    metadataDirectory,
    "images",
    "workflows",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(workflowFolderPath, `diagram${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/workflows/${slug}/diagram${ext}`;
    }
  }

  return null;
}

// Check if OG image exists for a workflow (used for social sharing)
function getOgImagePath(slug) {
  const possibleExtensions = [".png", ".jpg", ".jpeg", ".svg", ".webp"];

  const workflowFolderPath = join(
    metadataDirectory,
    "images",
    "workflows",
    slug,
  );
  for (const ext of possibleExtensions) {
    const imagePath = join(workflowFolderPath, `og${ext}`);
    if (fs.existsSync(imagePath)) {
      return `metadata/images/workflows/${slug}/og${ext}`;
    }
  }

  return null;
}

function generateWorkflowsMetadata() {
  if (!fs.existsSync(workflowsDirectory)) {
    return [];
  }

  const workflows = [];
  const customMetadataMap = loadCustomMetadata();
  const folders = fs
    .readdirSync(workflowsDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const folder of folders) {
    const workflowPath = join(workflowsDirectory, folder);
    const jsonPath = join(workflowPath, "workflow.json");

    if (!fs.existsSync(jsonPath)) {
      continue;
    }

    const workflowJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    const slug = workflowJson.__readonly?.key || folder;

    // Extract channels and functions from all steps
    // eslint-disable-next-line no-undef
    const channels = new Set();
    // eslint-disable-next-line no-undef
    const functions = new Set();

    if (workflowJson.steps && Array.isArray(workflowJson.steps)) {
      workflowJson.steps.forEach((step) => {
        extractSteps(step, channels, functions);
      });
    }

    // Convert sets to sorted arrays
    const channelsUsed = Array.from(channels).sort();
    const functionsUsed = Array.from(functions).sort();

    // Check for cover, diagram, and OG images
    const coverImage = getCoverImagePath(slug);
    const diagramImage = getDiagramImagePath(slug);
    const ogImage = getOgImagePath(slug);

    // Get custom metadata for this workflow
    const customMetadata = customMetadataMap[slug] || {};

    // Skip if excluded via custom metadata
    if (customMetadata.exclude === true) {
      continue;
    }

    workflows.push({
      slug,
      name:
        customMetadata.friendlyName ||
        toSentenceCase(workflowJson.name || folder),
      metaTitle: customMetadata.metaTitle || null,
      channelsUsed,
      functionsUsed,
      previewImage: coverImage || null,
      diagramImage: diagramImage || null,
      ogImage: ogImage || null,
      // Merge in custom metadata fields (channels are separate from tags)
      tags: customMetadata.tags || [],
      description: customMetadata.description || null,
      extendedDescription: customMetadata.extendedDescription || null,
    });
  }

  return workflows;
}

// CLI usage
if (require.main === module) {
  const metadata = generateWorkflowsMetadata();
  const outputPath = join(
    metadataDirectory,
    "generated/workflows-metadata.json",
  );
  // Ensure directory exists
  const outputDir = join(metadataDirectory, "generated");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  console.log(`Generated metadata for ${metadata.length} workflows`);
}

module.exports = { generateWorkflowsMetadata };
