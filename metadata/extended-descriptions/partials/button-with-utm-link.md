### What this partial solves

- Automates UTM parameter generation ensuring consistent campaign tracking across all email communications without manual URL building.
- Eliminates tracking gaps caused by forgotten or incorrectly formatted UTM parameters that lead to incomplete attribution data.
- Enables granular performance analysis by automatically capturing source, medium, campaign, and content variations for every CTA.
- Reduces errors and saves time by centralizing UTM logic rather than requiring marketers to manually append parameters.

---

### When to use this partial

Use this partial when:

- You need to track email campaign performance in Google Analytics or similar platforms.
- Different teams send emails and you need consistent attribution across all senders.
- A/B testing requires tracking which button variant drives more conversions.
- You're running multi-channel campaigns and need to attribute email's contribution accurately.
- Executive reporting requires detailed breakdown of traffic sources and campaign ROI.

---

### How it works

#### Inputs

- **button_text**: CTA copy displayed on the button (string).
- **button_url**: Destination URL without UTM parameters (string).
- **utm_source**: Traffic source, typically "email" or ESP name (string).
- **utm_medium**: Marketing medium, usually "email" (string).
- **utm_campaign**: Specific campaign name or ID (string).
- **utm_term**: Optional keyword parameter for paid search integration (string).
- **utm_content**: Optional A/B test variant or button location identifier (string).

#### Behavior

1. Validates base URL format and structure.
2. Constructs UTM parameters using provided values or smart defaults.
3. Properly encodes special characters in parameter values.
4. Appends parameters to base URL with correct separators (? or &).
5. Wraps final URL in email-safe HTML button markup.
6. Applies responsive styling that works across email clients.
7. Includes fallback text link for clients that block HTML buttons.

---

### Best practices

- **Use consistent naming conventions.** Establish standards like "email-product-launch-2024-q1" for campaigns. Document conventions so all teams follow them.
- **Keep campaign names descriptive but concise.** "welcome-series-email-2" beats "ws2" but "automated-welcome-series-onboarding-email-number-2-version-a" is too long.
- **Leverage utmContent for button testing.** Use values like "header-cta" vs "footer-cta" or "blue-button" vs "green-button" to track position and design impact.
- **Set logical defaults.** If utmSource isn't provided, default to "email". If utmMedium is empty, also use "email". Prevent broken tracking from missing values.

---

### Common mistakes to avoid

- **Hardcoding UTM parameters in base URLs.** If baseUrl already contains UTMs, you'll get duplicates. Always pass clean URLs and let the partial handle parameters.
- **Using spaces in parameter values.** "Welcome Series" breaks tracking. Use "welcome-series" or "welcome_series" instead. The partial should handle encoding, but avoid issues upfront.
- **Forgetting to update campaign names.** Reusing "summer-campaign" in winter makes analysis confusing. Use date-based names when relevant: "flash-sale-2024-03."
- **Not testing final URLs.** Always click through test emails to verify UTMs are properly formatted and tracking fires correctly in your analytics platform.

---

### FAQ

**Which analytics platforms support UTM parameters?**  
Google Analytics is the standard, but Adobe Analytics, Mixpanel, Amplitude, and most platforms accept UTMs. Some may require configuration to capture custom parameters.

**Should every link in an email have UTMs?**  
Focus on CTAs and important links. Navigation links, social icons, and unsubscribe links typically don't need tracking. Over-tracking clutters your data.

**How do I track different buttons in the same email?**  
Use utmContent to differentiate: "hero-cta", "feature-1-cta", "footer-cta". This shows which placement drives more clicks while keeping other parameters consistent.

**Can I use dynamic values in UTM parameters?**  
Yes. Pass variables like `{{workflow.name}}` or `{{user.segment}}` to create contextual tracking. Just ensure values are URL-safe or properly encoded.
