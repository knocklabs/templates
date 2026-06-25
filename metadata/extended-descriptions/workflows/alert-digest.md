### What this template solves

- Reduces alert fatigue by consolidating non-urgent notifications into a single summary.
- Keeps users informed without interrupting their workflow throughout the day.
- Complements real-time alerting templates for a complete monitoring notification strategy.
- Provides a scannable record of everything that happened in a time period.

---

### When to use this template

Use this template when:

- Users receive too many individual alerts to act on in real time.
- Most alerts are informational and don't require immediate action.
- You want to offer a "digest mode" alongside immediate alerting.
- Your product generates high volumes of monitoring or activity events.

---

### How it works (step-by-step)

1. **Trigger.** Individual alert events are sent to the workflow throughout the day.
2. **Batch accumulation.** Alerts are collected over a 24-hour fixed window keyed by user.
3. **Send digest.** When the window closes, a consolidated email and in-app summary is delivered.
4. **Include all events.** The digest lists each alert with its timestamp for easy scanning.

---

### Best practices

- **Never digest critical alerts.** Route P0/P1 incidents through immediate alerting, not digests.
- **Make it scannable.** Group alerts by type or severity with clear counts in the subject line.
- **Respect timezone.** Send digests at the start of each user's business day.
- **Include deep links.** Every item in the digest should link to the relevant detail page.

---

### Common mistakes to avoid

- **Digesting time-sensitive alerts.** Security and outage alerts must bypass batching entirely.
- **Empty digests.** Don't send a digest if there were zero alerts in the window.
- **Too long a window.** Weekly digests work for low-priority items; daily is better for most SaaS alerts.

---

### FAQ

**Daily or weekly digests?**  
 Daily for active products with moderate alert volume. Weekly for low-priority informational alerts.

**Can users choose digest vs. immediate?**  
 Yes. Offer both workflows and let users configure their preference per alert type.

**How do I handle alert deduplication?**  
 Use a meaningful batch key and consider summarizing repeated alerts in the digest template.
