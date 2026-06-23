### What this template solves

- Provides secure, self-service account recovery reducing support tickets.
- Eliminates password-related friction that causes user abandonment.
- Maintains security while offering convenient access restoration.
- Creates verified audit trail for account access changes.

---

### When to use this template

Use this template when:

- Users forget their passwords and need self-service recovery.
- You want to reduce support burden from manual password resets.
- Security policies require verified email confirmation for password changes.
- Account recovery needs to work across devices and sessions.
- You need to support users who haven't logged in for extended periods.

---

### How it works (step-by-step)

1. **Trigger.** User requests password reset via forgot password flow.
2. **Generate secure token.** Create unique, time-limited reset token in your system.
3. **Send reset email.** Immediately deliver email with secure reset link.
4. **User clicks link.** Validate token and allow password reset.
5. **Confirm change.** Send follow-up confirmation once password is changed using a different workflow.

---

### Best practices

- **Immediate delivery is critical.** Users expect reset emails within seconds. Any delay creates anxiety and support tickets.
- **Clear expiration messaging.** State prominently that link expires in X minutes/hours. Include this in subject line if possible.
- **Security context matters.** Include request IP, location, and timestamp to help users identify suspicious requests.
- **Mobile-first design.** Most users check email on mobile. Ensure reset button is large and link works across devices.

---

### Common mistakes to avoid

- **Vague error messages.** If email doesn't exist, don't reveal this. Show same "check your email" message to prevent account enumeration.
- **Reusing reset tokens.** Each token must be single-use. Invalidate immediately after successful reset or expiration.
- **Poor expired link experience.** When users click expired links, make requesting new link trivial, not an error maze.
- **Not rate limiting requests.** Prevent abuse by limiting reset requests per email/IP. Consider progressive delays for repeated attempts.

---

### FAQ

**How long should reset links remain valid?**  
 1-2 hours balances security with user convenience. Shorter for high-security applications, longer for consumer apps.

**Should I reveal if an email exists in the system?**  
 No. Always show "If that email exists, we've sent a reset link" to prevent attackers from discovering valid accounts.

**What about SMS-based reset options?**  
 Good as backup but shouldn't be primary due to SIM swapping risks. Always verify multiple factors for SMS resets.

**How do I handle reset requests for SSO accounts?**  
 Redirect to SSO provider or clearly explain why password reset isn't applicable. Don't leave users confused about authentication method.
