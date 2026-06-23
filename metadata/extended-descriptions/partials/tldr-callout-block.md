### What this partial solves

- Highlights the main takeaway in long-form email content.
- Gives readers a short summary before they read the full message.
- Keeps summary callouts consistent across announcements, newsletters, and product updates.

---

### When to use this partial

Use this partial when:

- You want to summarize the key point of an email near the top of the message.
- Your email includes long content and needs a scannable takeaway.
- You need a reusable callout block with a color treatment that matches the message context.

---

### How it works

#### Inputs

- **header_text.** The heading displayed at the top of the callout.
- **paragraph_text.** The summary copy displayed below the heading.
- **color.** The visual treatment for the callout container. Supported values are `orange`, `blue`, `green`, `purple`, and `gray`.

#### Behavior

- Renders an email-safe callout block with table-based markup and inline styles.
- Falls back to `TLDR` for the heading and a short summary prompt for the body when inputs are empty.
- Applies matching background, border, heading, and paragraph colors based on the selected color.

---

### Best practices

- **Keep the summary focused.** Use the callout for the one takeaway readers should remember.
- **Match color to intent.** Use color to support the message, such as blue for informational updates or green for positive outcomes.
- **Place it near the related content.** Put the callout before the section it summarizes or at the top of the email.

---

### Common mistakes to avoid

- **Repeating the full email.** The callout should summarize the message instead of duplicating body copy.
- **Using long headings.** Long headings can wrap and make the callout harder to scan.
- **Choosing color without contrast.** Test the rendered email so the selected color treatment remains readable.

---

### FAQ

**Can I change the default heading?**
Yes. Set `header_text` to any short label, such as "Summary" or "Key takeaway."

**What happens if I leave the color empty?**
The partial uses the orange treatment by default.

**Can I add links inside the paragraph text?**
Use plain summary text for the best preview experience. If you need linked text, edit the partial HTML in your template.
