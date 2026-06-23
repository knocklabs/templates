### What this template solves

* Provides immediate security awareness if an account is compromised.
* Builds user trust by proactively communicating security-related changes.
* Enables quick action if password change was unauthorized.
* Creates an audit trail for security-conscious users and compliance requirements.

---

### When to use this template

Use this template when:

* Any password change occurs, whether user-initiated or admin-reset.
* You need to maintain security compliance standards that require change notifications.
* Your platform handles sensitive data where account security is paramount.
* You want to differentiate between routine and suspicious password changes.
* Multi-device users need awareness that credentials have changed.

---

### How it works (step-by-step)

1. **Trigger.** Password change completes successfully.
2. **Gather context.** Collect metadata: IP address, device, location, timestamp.
3. **Send immediate notification.** Email user with change details and security context.
4. **Include action options.** Provide clear steps if change was unauthorized.
5. **Log for audit.** Record notification sent for compliance and support purposes.

---

### Best practices

* **Send to all verified emails.** Don't just send to primary email. If account is compromised, attacker may have changed primary email too.  
* **Rich security context.** Include IP address, location, device type, and browser. Help users recognize if this was their action.  
* **Clear action steps.** Include prominent "This wasn't me" button that initiates account recovery. Make panic response easy.  
* **Never include new password.** Even if admin-initiated, never send passwords in email. Include reset link instead.

---

### Common mistakes to avoid

* **Delayed sending.** Security notifications must be immediate. Don't batch or delay these notifications for any reason.  
* **Generic messaging.** "Your password was changed" isn't helpful. Include when, where, and how to respond if unauthorized.  
* **Only notifying primary email.** If attacker changed email too, user never gets notified. Always send to all verified addresses.  
* **Poor mobile formatting.** Users often check these on mobile in panic. Ensure critical info and actions are immediately visible.

---

### FAQ

**Should I notify about failed password change attempts?**  
 Yes, but separately. Multiple failed attempts might indicate attack. Consider batching these over 5-10 minutes to avoid spam.

**What if user has no backup email?**  
 SMS can work as backup channel if available. Consider requiring backup contact method for security-critical applications.

**How much location detail should I include?**  
 City and country is usually sufficient. Exact coordinates feel invasive. Focus on helping user recognize if location is unusual.

**Should admin-initiated resets notify differently?**  
 Yes. Clearly indicate admin reset vs user-initiated change. Include admin contact info and reason if possible for transparency.