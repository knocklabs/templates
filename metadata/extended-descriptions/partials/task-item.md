### What this partial solves

- Provides consistent, scannable formatting for task-related notifications across all communication channels.
- Eliminates design inconsistency when different templates show tasks with varying layouts and information hierarchy.
- Improves task notification engagement by presenting key information in a predictable, easy-to-parse format.
- Reduces template complexity by extracting repetitive task rendering logic into a reusable component.

---

### When to use this partial

Use this partial when:

- Sending task assignment notifications that need to show task details clearly.
- Building digest emails that list multiple tasks in a consistent format.
- Notifying users about task status changes, due date updates, or completions.
- Creating collaborative workflows where task context needs to be immediately clear.
- Showing task previews in comment notifications or mention alerts.

---

### How it works

#### Inputs

- **link**: Link to full task details in app (string).
- **name**: The task name or description (string).
- **date**: Task deadline (date/string).

#### Behavior

1. Receives task data from parent template or workflow.
2. Renders task name with truncation at 35 characters for consistent layout.
3. Formats due dates as abbreviated month and day ("Dec 11").
4. Highlights overdue tasks with red text color for visual priority.
5. Displays checkmark icon to indicate task status.
6. Renders consistently across email clients with table-based layout.
7. Includes arrow icon and makes entire task row clickable.

---

### Best practices

- **Prioritize information hierarchy.** Task title should be most prominent, followed by due date and assignee. Metadata like project names should be visually secondary.
- **Use color meaningfully but accessibly.** Red for overdue, green for completed, but always include text/icon indicators for colorblind users.
- **Keep titles concise and actionable.** "Review Q3 budget proposal" beats "Budget". Front-load the action verb when possible.
- **Smart date formatting improves urgency.** "Due in 2 hours" creates more urgency than "Due: Dec 11, 2:00 PM". Use relative dates for near-term deadlines.

---

### Common mistakes to avoid

- **Information overload in task items.** Resist showing every field. Focus on what helps users decide whether to click through. Save detailed descriptions for the app.
- **Inconsistent status terminology.** Pick one set of statuses and stick to them. Don't mix "Done", "Completed", and "Finished" across different notifications.
- **Poor mobile optimization.** Task items often appear in digest emails on mobile. Ensure titles don't wrap excessively and metadata remains readable at small sizes.
- **Missing visual status indicators.** Don't rely on text alone. Use checkmarks for completed, warning icons for overdue. Visual scanning is faster than reading.

---

### FAQ

**Should completed tasks show differently in digests?**  
Yes. Use strikethrough text, muted colors, or checkmark icons. Completed tasks provide context but shouldn't compete for attention with active tasks.

**How many metadata fields should we show?**  
Maximum 3-4 beyond title. Typically: assignee, due date, and status. Additional fields like tags or priority only if space permits and genuinely helpful.

**What if task titles are very long?**  
Truncate at \~60 characters with ellipsis. Full title should be visible on hover (web) or in the linked app. Ensure truncation doesn't cut mid-word.

**Should we show subtasks in the partial?**  
Generally no. Keep task items atomic. If subtasks are critical, show completion count like "3 of 5 subtasks complete" rather than listing them all.
