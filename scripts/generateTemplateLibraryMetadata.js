const { generatePartialsMetadata } = require("./generate-partials-metadata");
const { generateWorkflowsMetadata } = require("./generate-workflows-metadata");
const { generateGuidesMetadata } = require("./generate-guides-metadata");
const fs = require("fs");
const { join } = require("path");

function generateTemplateLibraryMetadata() {
  console.log("Generating template library metadata...");

  // Ensure output directory exists
  const outputDir = join(__dirname, "..", "metadata/generated");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate partials metadata
  const partials = generatePartialsMetadata();
  const partialsOutputPath = join(outputDir, "partials-metadata.json");
  fs.writeFileSync(partialsOutputPath, JSON.stringify(partials, null, 2));
  console.log(`✓ Generated metadata for ${partials.length} partials`);

  // Generate workflows metadata
  const workflows = generateWorkflowsMetadata();
  const workflowsOutputPath = join(outputDir, "workflows-metadata.json");
  fs.writeFileSync(workflowsOutputPath, JSON.stringify(workflows, null, 2));
  console.log(`✓ Generated metadata for ${workflows.length} workflows`);

  // Generate guides metadata
  const guides = generateGuidesMetadata();
  const guidesOutputPath = join(outputDir, "guides-metadata.json");
  fs.writeFileSync(guidesOutputPath, JSON.stringify(guides, null, 2));
  console.log(`✓ Generated metadata for ${guides.length} guides`);
}

if (require.main === module) {
  generateTemplateLibraryMetadata();
}

module.exports = { generateTemplateLibraryMetadata };
