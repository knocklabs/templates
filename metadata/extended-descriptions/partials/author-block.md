### What this partial solves

- Creates consistent, professional sender identity across all email communications without manually formatting author details in every template.
- Humanizes automated messages by adding a personal touch with real team member information, improving trust and engagement rates.
- Eliminates maintenance overhead when team members change roles, titles, or profile photos by centralizing author data.
- Enables dynamic sender assignment based on context (support rep, account manager, CEO) while maintaining visual consistency.

---

### When to use this partial

Use this partial when:

- Your transactional emails benefit from a human touch rather than generic "from the team" messaging.
- Different team members need to be shown as senders and you want to maintain consistent author formatting across welcome emails, notifications, and updates.
- Company communications require professional signatures with full contact details and titles.
- You're transitioning from no-reply addresses to personalized, relationship-based email sending.

---

### How it works

#### Inputs

- **author_image_url**: URL to profile image.
- **signoff**: Customizable closing text, such as "Best regards," or "Cheers,".
- **author_name**: Full name of the sender.
- **author_title**: Professional title or role.
- **author_email**: Email address of the sender.

#### Behavior

- Accepts author data from parent template or workflow context.
- Renders avatar image with fallback to initials if image fails to load.
- Formats name and title with appropriate styling and spacing.
- Applies consistent typography and layout rules across email clients.
- Handles missing data gracefully (e.g., no title shows just name).
- Maintains responsive design for mobile email clients.
- Outputs clean, email-safe HTML compatible with major clients.

---

### Best practices

- **Use real team member photos.** Authentic headshots outperform generic avatars or illustrations. Ensure images are professional and consistently styled.
- **Keep titles concise and meaningful.** "Customer Success Manager" is better than "Senior Customer Success Manager II." Focus on role clarity over hierarchy.
- **Match signoff tone to message context.** Use context-appropriate closings, such as "Best regards" for formal communications and "Cheers" for casual updates.
- **Implement fallback handling.** Always include initials or default avatar for cases where images don't load, especially in strict email clients.

---

### Common mistakes to avoid

- **Using different author formats across templates.** Inconsistent author blocks confuse recipients. Standardize on one format and use it everywhere.
- **Including too much information.** Email signatures aren't business cards. Stick to name, title, and maybe one contact method.
- **Forgetting email client limitations.** Not all clients display images by default. Ensure author information is clear even without avatar images loading.
- **Static author assignments.** Don't hard-code "From Sarah" if Sarah might leave. Use dynamic assignment based on account ownership or team routing.

---

### FAQ

**Should avatars be circles or squares?**  
Circles are more modern and friendly, squares more professional and traditional. Choose based on brand personality but be consistent across all communications.

**What's the ideal avatar size for emails?**  
Use 60-80px square images at 2x resolution for retina displays. Keep file sizes under 50KB to ensure fast loading across email clients.

**How do we handle team changes or departures?**  
Centralize author data in your system of record. When someone leaves, update once and all templates automatically reflect new ownership assignments.

**Can we include social media links in the author block?**  
Yes, social media links can drive engagement with personal accounts if that is a growth metric your team tracks. Keep company social links in email footers where they don't compete with other CTAs.
