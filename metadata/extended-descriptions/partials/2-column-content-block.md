### What this partial solves

- Presents two related content items in one balanced email section.
- Gives each item its own image, heading, body copy, and CTA link.
- Keeps side-by-side content responsive in table-based email layouts.

---

### When to use this partial

Use this partial when:

- You want to compare two product updates, resources, or recommendations.
- Your email needs to promote two paths without building a custom layout.
- You want each content item to have its own image and CTA.

---

### How it works

#### Inputs

- **block_1_image.** The image shown above the first content block.
- **block_1_header_text.** The heading for the first content block.
- **block_1_paragraph_text.** The body copy for the first content block.
- **block_1_cta_text.** The linked CTA text for the first content block.
- **block_1_cta_url.** The destination URL for the first content block CTA.
- **block_2_image.** The image shown above the second content block.
- **block_2_header_text.** The heading for the second content block.
- **block_2_paragraph_text.** The body copy for the second content block.
- **block_2_cta_text.** The linked CTA text for the second content block.
- **block_2_cta_url.** The destination URL for the second content block CTA.

#### Behavior

- Renders two equal-width columns on desktop email clients.
- Stacks the columns on smaller screens so each content block remains readable.
- Hides a CTA link when its URL input is empty.

---

### Best practices

- **Pair related ideas.** Use the two columns for items that have a clear relationship, such as two next steps or two feature highlights.
- **Keep copy balanced.** Write headings and descriptions with similar length so the columns feel aligned.
- **Use descriptive image alt text.** Explain the image content for recipients who use screen readers or block images.

---

### Common mistakes to avoid

- **Adding unrelated CTAs.** Two unrelated paths can distract readers from the message goal.
- **Using long body copy.** Long paragraphs make two-column email sections harder to scan.
- **Skipping mobile review.** Check the stacked layout before shipping so images, headings, and CTAs appear in the right order.

---

### FAQ

**Can I use this partial with one column?**
Use a single-column partial when you only need one content item. This partial works best when both columns have content.

**Do both CTAs need links?**
No. Leave a CTA URL empty when that content block should not show a link.

**Can I change the image shape?**
Yes. Edit the image styles in the HTML if your brand needs a different radius, aspect ratio, or border treatment.
