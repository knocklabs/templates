### What this partial solves

- Presents ordered information in a format users can scan in email.
- Keeps numbered steps consistent across onboarding, setup, and education messages.
- Reduces custom HTML work for table-based email layouts that need ordered content.

---

### When to use this partial

Use this partial when:

- You want to show a setup checklist or sequence of onboarding tasks.
- You need to explain a process where the order of each item matters.
- You want to rank recommendations, requirements, or next steps in an email.

---

### How it works

#### Inputs

- **list_item_1.** The first numbered item.
- **list_item_2.** The second numbered item.
- **list_item_3.** The third numbered item.
- **list_item_4.** The optional fourth numbered item.
- **list_item_5.** The optional fifth numbered item.

#### Behavior

- Renders each populated input as a numbered row with a circular badge.
- Skips empty inputs so templates can show fewer than five items.
- Uses table-based markup and inline styles to support email clients.

---

### Best practices

- **Keep each item concise.** Short items help users understand the ordered flow without rereading the email.
- **Use the list for ordered content.** Choose this partial when sequence matters, such as setup steps or ranked options.
- **Start with the most important action.** Put the step users should take first in `list_item_1`.

---

### Common mistakes to avoid

- **Using unordered content.** If the items do not depend on sequence, a standard bullet list may set clearer expectations.
- **Writing long paragraphs.** Long item text can make the numbered badges feel disconnected from the content.
- **Leaving gaps between inputs.** Fill list items in order so the rendered list does not skip numbers.

---

### FAQ

**How many items can this partial show?**
It can show up to five numbered items.

**Can I use fewer than five items?**
Yes. Leave unused inputs empty, and the partial will skip those rows.

**Should I include links in list items?**
Use links when they help users complete a step, but keep each item focused on one action or idea.
