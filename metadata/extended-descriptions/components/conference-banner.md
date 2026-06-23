### What this component solves

- Provides a lightweight, reusable UI mechanism to drive awareness of time-sensitive announcements (e.g. upcoming events, maintenance windows, promotions) directly inside your application, maximizing engagement among active users.
- Enables non-intrusive, but persistent, visibility. Users see the banner once per session (or until dismiss), reducing reliance on noisy email/Slack blasts.

---

### When to use this component

Use this component when:

- You need to notify users about an event, announcement, or limited-time offer as soon as they open your app.
- The message is important but not urgent enough to warrant a direct message, modal, or other interruptive UI element.
- The message has a short lifespan (e.g. a few days or weeks).

---

### How it works

#### Inputs

- **title**: The banner headline (string).
- **body**: The announcement copy or description (string or HTML).
- **dismissible**: Boolean indicating if the user can dismiss the banner.
- **primary_button.text**: Text for the primary action button (e.g. "Learn more", "Register now").
- **primary_button.action**: URL or action that the primary button triggers.
- **secondary_button.text**: Text for the optional secondary action button.
- **secondary_button.action**: URL or action that the secondary button triggers.

#### Behavior

- On app load or page render, check if the guide/banner should be displayed based on targeting conditions.
- Render a banner at the top of the page with title and body content.
- Display primary and/or secondary action buttons if configured.
- Show dismiss "×" button if dismissible is true.
- On primary button click → navigate to the specified action URL and mark as interacted.
- On secondary button click → navigate to the specified action URL and mark as interacted.
- On dismiss → hide banner and mark as archived to prevent re-display.

---

### Best practices

- **Keep messaging concise and actionable.** Banners are attention-grabbers, so long copy can dilute their impact. Use 1–2 short sentences with a clear CTA.
- **Use CTAs with urgency or value.** For example, “Register now for early-bird pricing by Sep 30” gives reason and time sensitivity.
- **Align with accessibility standards.** Ensure banner has proper ARIA roles, dismiss button accessible via keyboard, contrast and readability for visibility.
- **Responsive cross-platform support.** Banner should render appropriately on mobile, tablet, desktop, handling varying viewport widths gracefully.

---

### Common mistakes to avoid

- **Leaving the banner active too long.** Old announcements that aren’t relevant anymore create confusion and signal that the interface isn’t being maintained.
- **Overusing banners.** When multiple banners stack or appear too frequently, users begin to ignore them and trust erodes. Limit usage to avoid banner fatigue.
- **Making banners non-dismissible.** Forced persistence frustrates users and makes the banner feel like an obstruction rather than a notice. Ensure dismiss logic works reliably, and once dismissed, don’t re-show until content changes to avoid user irritation or perceived spamminess.

---

### FAQ

**Should we show the banner to all users or only a subset (admins, new users, etc.)?**  
Depends on the message. For global announcements (events, maintenance), you likely want everyone. For targeted notices (beta program, feature opt-in), filter by user role or segment and use conditional rendering logic.

**How long should the banner stay visible?**  
Only show the banner for as long as the announcement is relevant. For events, this is typically until the event date with a short buffer. Avoid leaving old banners active indefinitely.

**What if a user clears cookies / storage or switches device — will the banner reappear?**  
Yes, unless you persist dismissal state server-side (e.g. per user preference). Decide whether persistence should be per device/session or global per user based on your engagement goals.

**Is there a risk of banner fatigue if we use this often?**  
Yes. Banners are high-signal UI, so overusing them dilutes impact, annoys users, and can reduce overall engagement. Use sparingly and strategically.
