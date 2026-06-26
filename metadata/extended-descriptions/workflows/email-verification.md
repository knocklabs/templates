### What this template solves

- Confirms user identity before granting full account access.
- Reduces fake signups and spam accounts in your product.
- Provides a follow-up reminder for users who forget to verify.
- Establishes trust by confirming the email address belongs to the user.

---

### When to use this template

Use this template when:

- New users must verify their email before accessing your product.
- You need to comply with email deliverability best practices.
- Signup conversion drops because users don't complete verification.
- You want a standard verification flow separate from passwordless login.

---

### How it works (step-by-step)

1. **Trigger.** User completes signup and your system generates a verification token and URL.
2. **Send verification email.** User receives an email with a one-click verify button.
3. **Wait 24 hours.** If the user hasn't verified, a reminder email is sent automatically.
4. **Cancel on verify.** When the user verifies, cancel the workflow run to prevent the reminder.

---

### Best practices

- **Send immediately.** Verification emails should arrive within seconds of signup.
- **Clear subject line.** Use "Verify your email for [App Name]" — users expect this email.
- **State expiration.** Tell users how long the link is valid (typically 24–48 hours).
- **Single CTA.** One prominent "Verify email" button; don't distract with marketing content.

---

### Common mistakes to avoid

- **Blocking all access.** Consider limited access before verification rather than a hard wall.
- **No reminder.** Many users intend to verify but forget — a single reminder significantly improves conversion.
- **Sending reminder after verification.** Always cancel the workflow when verification succeeds.

---

### FAQ

**Verification vs. magic link — what's the difference?**  
 Verification confirms identity at signup. Magic link is for passwordless login on return visits.

**Should I resend the same link or generate a new one?**  
 Generate a fresh token for the reminder if the original has expired.

**What if the email goes to spam?**  
 Use a transactional email provider, authenticate your domain (SPF/DKIM), and keep copy minimal.
