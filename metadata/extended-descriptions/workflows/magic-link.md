### What this template solves

- Eliminates password-related friction that causes 40% of users to abandon login attempts.
- Reduces support tickets from forgotten passwords and account lockouts.
- Improves security by removing weak or reused passwords from your authentication flow.
- Provides a seamless authentication experience across devices without requiring password managers.

---

### When to use this template

Use this template when:

- You want to simplify authentication for users who access your app infrequently and forget passwords.
- You're building a product where speed to value matters more than traditional security theater.
- Your users primarily access your app via email clients on trusted devices.
- You need to support users across multiple devices without complex password synchronization.
- You want to reduce authentication friction for mobile users who struggle with password entry.

---

### How it works (step-by-step)

1. **Trigger.** User enters their email address on the login page and clicks "Send magic link."
2. **Generate secure token.** Your system creates a unique, time-limited authentication token sent in workflow trigger payload.
3. **Send email immediately.** Your system triggers a workflow that immediately sends an email containing the secure login link.
4. **User clicks link.** When clicked, the link validates the token and authenticates the user.
5. **Session creation.** Upon successful validation, a user session is created and the token is invalidated.

---

### Best practices

- **Token expiration matters.** Set tokens to expire within 5-15 minutes to balance security with user convenience. Include the expiration time clearly in the email.
- **One-time use only.** Ensure each magic link can only be used once to prevent replay attacks. Invalidate tokens immediately after successful authentication.
- **Clear email subject lines.** Use subjects like "Your login link for \[App Name\]" or "Sign in to \[App Name\]" to ensure users recognize and trust the email.
- **Mobile optimization.** Since users often check email on mobile, ensure the magic link works seamlessly across devices and doesn't require desktop access.

---

### Common mistakes to avoid

- **Not handling expired links gracefully.** When users click expired links, provide a clear error message and easy way to request a new link rather than showing a generic error page.
- **Sending from no-reply addresses.** Use a monitored email address so users can report issues. Authentication emails need higher trust than typical transactional emails.
- **Forgetting about email delivery time.** Unlike passwords that work instantly, magic links depend on email delivery. Add a "Didn't receive it?" option that appears after 30-60 seconds.
- **Not preventing rapid-fire requests.** Implement rate limiting to prevent users from repeatedly requesting magic links, which can trigger spam filters and annoy users.

---

### FAQ

**How long should magic links remain valid?**  
5-15 minutes strikes the right balance. Shorter times improve security but may expire before users check email. Longer times increase security risk but improve user experience.

**What if the user's email is compromised?**  
Magic links shift security to email accounts. For high-security applications, combine magic links with additional factors like device fingerprinting or SMS verification for new devices.

**Should I offer both passwords and magic links?**  
Many apps benefit from offering both options. Power users often prefer passwords for quick access, while occasional users appreciate the simplicity of magic links.

**How do I handle users who forward magic link emails?**  
Include user-specific context in the email ("Login requested for john@example.com") and consider IP address or device verification to prevent unauthorized access from forwarded links.
