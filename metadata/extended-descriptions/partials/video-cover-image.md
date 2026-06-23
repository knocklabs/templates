### What this partial solves

- Makes a video preview stand out in email with a clear play affordance.
- Keeps linked video thumbnails consistent across campaigns and lifecycle messages.
- Reduces custom HTML work when teams need reusable video cover blocks.

---

### When to use this partial

Use this partial when:

- You want to promote a product walkthrough, webinar, or launch recap in email.
- You need a reusable video teaser component for multiple templates.
- You want a fallback link when no per-image action URL is set.

---

### How it works

#### Inputs

- **cover_image.** Image object that includes the URL, alt text, and optional action URL.
- **optional_link.** Fallback destination URL used when `cover_image.action` is empty.

#### Behavior

- Renders a responsive image container with a centered play icon overlay.
- Links the block to `cover_image.action` when present.
- Falls back to `optional_link` when no image action is provided.
- Keeps rendering predictable on mobile by resizing the play icon with media queries.

---

### Best practices

- **Use descriptive alt text.** Summarize the video topic so screen reader users get context before they click.
- **Match the destination to user intent.** Link directly to the video or the page where the video is the primary next action.
- **Use strong visual contrast.** Ensure the cover image and overlay remain clear in light and dark viewing conditions.

---

### Common mistakes to avoid

- **Using a generic thumbnail.** Generic imagery lowers click confidence; use a frame that reflects the video content.
- **Forgetting a fallback URL.** If you omit `optional_link`, the block may render without a click target when `cover_image.action` is blank.
- **Overloading alt text with keywords.** Keep alt text clear and factual instead of keyword stuffing.

---

### FAQ

**Should I set both `cover_image.action` and `optional_link`?**
Yes. Set both so the partial always has a destination even when one input is missing.

**Can I use this partial for GIF previews instead of videos?**
Yes, if the linked destination still represents a media viewing experience and the alt text reflects that context.

**What image size works best?**
Use a landscape image that is at least 1280px wide to preserve clarity across desktop and mobile email clients.
