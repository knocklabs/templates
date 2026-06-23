### What this template solves

- Helps ensure invited users don’t slip through the cracks when they don’t accept the first time.
- Automates follow-up so teams don’t need to manually monitor outstanding invites at scale.
- Improves activation rate and conversion of invited users into active users.

---

### When to use this template

Use this template when:

- You want to ensure compliance with approval workflows (e.g. admin invites) and remind users automatically if they don’t accept in a given timeframe.
- You onboard new users via invitation and want to maximize acceptance rates.
- You expect a high volume of invites and need to avoid invite link expiration or lost invites.
- You run a user referral flow and want to maximize conversion from invite to signup.
- You want to gently nudge users after a delay rather than sending a barrage of emails, striking a balance between reminder and user annoyance.

---

### How it works (step-by-step)

1. **Trigger.** An “Invite user” event is created (e.g. admin or existing user triggers an invite).
2. **Send email invite.** The workflow sends the initial invite email with signup link to the invited email.
3. **Delay.** The workflow pauses for a predefined delay (e.g. X hours or days).
4. **Send email reminder**: If workflow has not been cancelled, the workflow sends a reminder email to the invitee.

---

### Best practices

- **Delay length matters.** Choose a delay length that balances urgency with user experience. Too soon can annoy, while too late can risk drop-off. In this case, 24-48 hours works well.
- **Personalization improves acceptances.** Include the inviter's name and any relevant context in your emails, such as, “Your teammate Sarah invited you to collaborate.” This increases average open and click-through rates.
- **Clear copy and CTAs improve acceptances.** Keep messaging concise and straightforward. Remind users that the link may expire or that the invite is only valid for a certain number of days.

---

### Common mistakes to avoid

- **Sending the reminder when the user has already accepted the invite.** This can confuse and/or frustrate users. Use a cancellation key with the invite id so your system can cancel the workflow run if a user accepts before the reminder email.
- **Sending too many follow-ups.** Consider sending only one reminder. Repeated nags can trigger spam flags or cause users to unsubscribe.
- **Not properly handling expired invite links or tokens.** Ensure you are sharing working links in your invite and reminder. You should also make users aware of when invite links expire and include instructions to re-issue if needed.

---

### FAQ

**When should I send an invite reminder?**

Depends on your audience and use case. For B2B or professional apps, 24-48h tends to work well. For more B2C or casual apps, anywhere from 3–7 days may be a better fit based on lower urgency. Test and measure what kind of delay yields better conversion.

**Should I send multiple reminders if a user still hasn’t accepted?**

This isn’t recommended out of the box. One follow-up is usually enough for someone who actually plans on accepting the invite. If you send more, you risk looking spammy (triggering deliverability issues) or annoying users.

**What if the invite link expires before the user accepts?**

Include an expiration warning in both the invite and reminder. Also consider re-issuing invites or letting admin/users request a new invite instead of blindly resending old links.

**Can I send a reminder via different channels (e.g. SMS, Slack) instead of email?**

Yes, if that’s supported by your messaging infrastructure provider. That being said, make sure cross-channel messages always provide proper context and respect the user’s channel-specific preferences.
