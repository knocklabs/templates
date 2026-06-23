### What this template solves

- Prevents notification overload when popular content receives dozens or hundreds of comments.
- Improves engagement by sending thoughtful summaries instead of noise.
- Reduces email/notification fatigue that leads to users disabling all notifications.
- Ensures users stay informed about discussions without constant interruptions.

---

### When to use this template

Use this template when:

- Your platform supports commenting on posts, documents, or other shared content.
- Users can receive many comments in short time periods (viral posts, popular discussions).
- You want to balance real-time engagement with notification sanity.
- Your product has both casual users and power contributors with different notification needs.
- You need to support asynchronous collaboration where immediate response isn't required.

---

### How it works (step-by-step)

1. **Trigger.** New comment is posted on user's content.
2. **Check batching window.** Determine if other comments are already queued for this content.
3. **Send to low-attention channel.** Send an in-app message to maximize visibility if the users is still active.
4. **Apply delay.** Wait for configured time period (e.g., 60 minutes) before escalating.
5. **Escalate channels.** If in-app notification hasn't been read, escalate to out-of-app channel like email.

---

### Best practices

- **Smart batching thresholds.** Send first comment immediately, then batch subsequent ones. This maintains engagement momentum while preventing overload.
- **Context-aware summaries.** Show comment count, unique commenters, and preview of most relevant comments rather than just "You have 17 new comments."
- **Respect discussion velocity.** Use shorter batch windows (5-15 min) for fast-moving discussions and longer ones (1-4 hours) for slower content.
- **Mobile-optimized summaries.** Since many users triage notifications on mobile, ensure comment previews are scannable and actionable.

---

### Common mistakes to avoid

- **Batching the first comment.** The first comment on content should notify immediately to maintain engagement momentum. Only batch subsequent comments using a leading debounce option.
- **Losing comment context.** Always include which post/content received comments. "17 new comments" is useless without knowing where.
- **Ignoring comment importance.** Comments from teammates, mentions, or VIP users might warrant immediate notification even during batching.
- **Setting batch windows too long.** Waiting 24 hours to notify about comments kills discussion momentum. Find the sweet spot between too many and too late.

---

### FAQ

**When should comments bypass batching?**  
 First comment on new content, comments from specified VIP users, comments that @mention the user, and comments on time-sensitive content should send immediately.

**How do I handle comments across multiple posts?**  
 Batch per post, not globally. Users need to know which discussions are active. Consider a daily digest for users with many active discussions.

**What's the ideal batch window for comments?**  
 Depends on your product. Social platforms: 15-30 minutes. Collaboration tools: 1-2 hours. Professional platforms: 2-4 hours. Test and measure engagement.

**Should I show all comments or just a preview in batched notifications?**  
 Show count and 2-3 comment previews in the notification. Include a clear CTA to "View all comments" that takes users directly to the discussion.
