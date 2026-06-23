### What this partial solves

- Gives recipients clear approve and reject actions in the same email.
- Reduces custom HTML work for decision-based notification templates.
- Keeps paired action buttons consistent across review, access, and moderation flows.

---

### When to use this partial

Use this partial when:

- A recipient needs to approve or reject a request from an email.
- Your workflow sends access requests, content reviews, or moderation tasks.
- You want paired decision buttons that work across email clients.

---

### How it works

#### Inputs

- **approve_text.** The label displayed on the approve button.
- **approve_url.** The destination URL for the approve button.
- **reject_text.** The label displayed on the reject button.
- **reject_url.** The destination URL for the reject button.

#### Behavior

- Renders two inline email buttons with table-based markup.
- Styles the approve button green and the reject button red to help users distinguish each action.
- Uses the provided button labels and URLs without adding decision logic in the partial.

---

### Best practices

- **Use direct labels.** Keep button text short so each action remains clear on small screens.
- **Link to action-specific URLs.** Send each button to a route that records the intended decision.
- **Confirm the outcome after click.** Show a confirmation page so users know the approval or rejection was received.

---

### Common mistakes to avoid

- **Using the same URL for both buttons.** Separate URLs help your app capture the chosen action without ambiguity.
- **Writing long button labels.** Long labels can wrap in narrow email clients and make the buttons harder to scan.
- **Skipping authentication checks.** Validate the recipient and token on the destination route before applying a decision.

---

### FAQ

**Can I change the button colors?**
The partial ships with green and red button styles. Edit the HTML in your template if your brand or decision states require different colors.

**Should these buttons make the decision without a confirmation page?**
Use a confirmation page for sensitive actions. For low-risk actions, your destination route can process the decision and then show the result.

**Can I use this partial for choices other than approve and reject?**
Yes. Change the labels and URLs when you need another two-option decision pattern, such as accept and decline.
