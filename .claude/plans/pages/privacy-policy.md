# Privacy Policy & Cookie Consent Plan

## Purpose

The Privacy Policy page and Cookie Consent system fulfill GDPR compliance requirements for the Beacon of Hope web application. Given that the organization handles extremely sensitive data (personal information of minors who are survivors of abuse and trafficking), the privacy policy must be thorough, transparent, and customized to the org's specific data practices. The cookie consent mechanism must be functional -- actually blocking non-essential cookies until consent is granted.

### IS413 Requirement
"Provides a privacy policy explaining data usage and includes a GDPR-compliant cookie consent notification."

### IS414 Requirement
GDPR-compliant privacy policy customized to the organization, cookie consent must be functional (not just cosmetic) -- non-essential cookies must not load until user consents.

---

## Personas

### 1. Maria Chen (Recurring Donor)
- **Age:** 42
- **Location:** San Francisco, CA
- **Device:** iPhone 14 Pro, Safari mobile
- **Role:** Donor
- **Background:** Filipino-American marketing executive who donates monthly. As a marketing professional, she understands data collection practices and appreciates transparency. She is also protective of her financial data.
- **Goals:** Understand what personal and financial data the org collects about her, confirm her credit card info is handled securely, know her rights regarding data deletion.
- **Frustrations:** Cookie banners that cover half the screen on mobile. Privacy policies written in impenetrable legalese. Orgs that say "we respect your privacy" but then share data with dozens of partners.
- **Key Question:** "Is my financial information safe, and can I trust this org not to misuse my personal data?"

### 2. Pastor James Okafor (Community Leader)
- **Age:** 55
- **Location:** Lagos, Nigeria (considering international partnership)
- **Device:** Desktop PC, Chrome, reads thoroughly
- **Role:** Unauthenticated visitor / Prospective Partner
- **Background:** Leads a large church community considering a partnership with Beacon of Hope. He is meticulous and will read the entire privacy policy before recommending the org to his congregation. He cares deeply about the protection of the children served.
- **Goals:** Verify the org takes data protection seriously, especially for the minors. Understand how partner data is handled. Confirm compliance with international data protection standards.
- **Frustrations:** Vague or boilerplate privacy policies that don't address child protection specifically. Policies that haven't been updated in years. Lack of contact information for data questions.
- **Key Question:** "Does this organization have robust protections for the vulnerable children they serve, and can I in good conscience recommend them to my community?"

### 3. Elena Reyes (Social Worker)
- **Age:** 34
- **Location:** Cebu City, Philippines
- **Device:** Office desktop and personal Android phone
- **Role:** Staff/Employee
- **Background:** Licensed social worker who enters sensitive case data daily -- resident histories, counseling notes, family information. She is bound by Philippine social work ethics codes regarding client confidentiality.
- **Goals:** Understand how the data she enters is protected, know what happens to case data if a resident "ages out" or is reintegrated, confirm the system meets Philippine Data Privacy Act (RA 10173) requirements.
- **Frustrations:** Systems that don't clearly explain data retention policies. Unclear boundaries about who can see what resident data. Cookie popups that interrupt her workflow when she's trying to log in quickly.
- **Key Question:** "How is the case data I enter protected, who can see it, and does this comply with Philippine data privacy law?"

### 4. David Kim (First-Time Visitor)
- **Age:** 28
- **Location:** Austin, TX
- **Device:** MacBook Air, Firefox (with privacy extensions)
- **Role:** Unauthenticated visitor
- **Background:** Tech-savvy software developer who found Beacon of Hope through social media. Uses ad blockers and privacy extensions. Skeptical of organizations that track users aggressively. May donate if he trusts the org.
- **Goals:** Quickly understand what cookies/tracking the site uses. Accept only necessary cookies. Read the privacy policy to assess the org's data maturity before donating.
- **Frustrations:** Sites that use dark patterns to trick users into accepting all cookies. Cookie banners that don't actually do anything functional. Privacy policies that list 50 third-party trackers.
- **Key Question:** "Does this site respect my privacy choices, and are they being honest about what they track?"

---

## User Stories

### Privacy Policy Content

**US-1: Comprehensive privacy policy page**
As any visitor, I want to read a detailed privacy policy at /privacy-policy, so that I understand how the organization handles my data.
- **Acceptance Criteria:**
  - Accessible from the footer of every page
  - Includes sections: Data We Collect, How We Use Data, Data Sharing, Data Security, Data Retention, Your Rights, Children's Data Protection, Contact Information
  - Written in plain language (8th grade reading level)
  - Last updated date displayed prominently at the top
  - Table of contents with anchor links for quick navigation

**US-2: Data collection disclosure**
As Maria (donor), I want to know exactly what personal data is collected, so that I can make an informed decision about using the platform.
- **Acceptance Criteria:**
  - Lists all data categories collected: account info (name, email), financial data (donation amounts, not card numbers -- processed by payment provider), usage data (pages visited, session duration)
  - Specifies which data is required vs optional
  - Explains that credit card data is processed by the payment provider and never stored on Beacon of Hope servers
  - Differentiates data collected from donors vs staff vs general visitors

**US-3: Child/minor data protection section**
As Pastor James (community leader), I want a dedicated section on how children's data is protected, so that I can verify the org meets high standards for vulnerable populations.
- **Acceptance Criteria:**
  - Dedicated "Protection of Minors' Data" section
  - States that resident data (names, histories, case records) is classified as highly sensitive
  - Explains that resident data is only accessible to authorized staff with a direct case relationship
  - No resident data is ever made public, shared with third parties, or used in marketing
  - Resident identifying information is never included in public impact reports
  - Complies with Philippine Data Privacy Act (RA 10173) and applicable international standards
  - Data about minors is anonymized or deleted when the resident turns 18 or exits the program, per retention policy

**US-4: Philippine Data Privacy Act compliance**
As Elena (social worker), I want the privacy policy to address Philippine data privacy law, so that I know my professional obligations are being met.
- **Acceptance Criteria:**
  - References Republic Act No. 10173 (Data Privacy Act of 2012)
  - Names the organization's Data Protection Officer or responsible party
  - Explains lawful basis for processing personal data of residents (legitimate interest in child welfare, legal obligation under DSWD regulations)
  - Describes rights under Philippine law: right to be informed, right to access, right to correction, right to erasure, right to data portability
  - Includes contact info for the National Privacy Commission for complaints

**US-5: Data retention policy**
As Elena (social worker), I want to know how long case data is retained, so that I understand the lifecycle of records I create.
- **Acceptance Criteria:**
  - Specifies retention periods by data type:
    - Donor financial records: 7 years (tax compliance)
    - Resident case records: duration of stay + 5 years (per DSWD guidelines)
    - Staff account data: duration of employment + 1 year
    - Website usage data: 2 years
    - Cookie consent records: 3 years
  - Explains what happens when retention period expires (anonymized or deleted)
  - Notes that legal holds can extend retention

**US-6: Third-party data sharing**
As David (privacy-conscious visitor), I want to know what third parties receive my data, so that I can assess the privacy implications.
- **Acceptance Criteria:**
  - Lists all third-party services that receive user data (e.g., Azure for database, payment processor for donations, analytics tool if any)
  - For each: name, purpose, data shared, their privacy policy link
  - States that data is never sold
  - States that resident data is never shared with third parties except as required by Philippine law (e.g., DSWD reporting)

**US-7: User rights and data requests**
As Maria (donor), I want to know my rights regarding my data, so that I can request deletion or a copy of my data if needed.
- **Acceptance Criteria:**
  - Lists GDPR rights: access, rectification, erasure, restriction, portability, objection
  - Provides a clear process: email address or form to submit data requests
  - States response time (within 30 days)
  - Notes that some data may be retained for legal compliance even after deletion request
  - Explains that donor deletion removes personal info but anonymized donation records may persist for financial reporting

### Cookie Consent Banner

**US-8: Cookie consent banner on first visit**
As David (first-time visitor), I want to see a cookie consent banner on my first visit, so that I can choose which cookies to accept.
- **Acceptance Criteria:**
  - Banner appears at the bottom of the viewport on first visit
  - Does not block page content (user can scroll and read the site)
  - Shows: brief description, "Accept All", "Reject Non-Essential", and "Manage Preferences" buttons
  - Banner does not appear on subsequent visits if consent was already given
  - Consent choice is stored in a first-party cookie (ironically)

**US-9: Granular cookie preferences**
As David (tech-savvy visitor), I want to control which cookie categories I accept, so that I can allow analytics but block marketing cookies.
- **Acceptance Criteria:**
  - "Manage Preferences" opens a modal with cookie categories:
    - Necessary (always on, cannot be disabled) -- session, CSRF, consent record
    - Analytics (optional) -- if using any analytics service
    - Functional (optional) -- preferences like language, theme
  - Each category has a toggle and a description of what cookies it includes
  - "Save Preferences" button stores the choice
  - No "Marketing" category since the org does not run ads

**US-10: Functional cookie blocking**
As the system, I want non-essential cookies to be actually blocked until consent is given, so that the consent mechanism is not just cosmetic.
- **Acceptance Criteria:**
  - No analytics scripts load before consent is granted
  - No non-essential cookies are set before consent
  - After consent, only approved categories of scripts/cookies load
  - Revoking consent removes non-essential cookies and stops those scripts
  - This can be verified by checking browser DevTools on first load (no third-party cookies present)

**US-11: Cookie consent persistence**
As Maria (returning donor), I want my cookie preferences remembered, so that I don't see the banner every time I visit.
- **Acceptance Criteria:**
  - Consent choice stored in a first-party cookie with 365-day expiration
  - Consent record includes: timestamp, version of policy consented to, categories accepted
  - If the privacy policy is updated (version change), the banner re-appears to get fresh consent
  - Consent cookie name: "boh_cookie_consent" (or similar, clearly identifiable)

**US-12: Update cookie preferences after initial choice**
As any user, I want to change my cookie preferences at any time, so that I can revoke or expand consent later.
- **Acceptance Criteria:**
  - Link in the footer: "Cookie Preferences" or "Manage Cookies"
  - Clicking opens the same preference modal as the initial banner
  - Current selections are pre-populated based on stored consent
  - Changes take effect immediately (scripts loaded/unloaded accordingly)

### Mobile & Accessibility

**US-13: Mobile-friendly cookie banner**
As Maria (phone user), I want the cookie banner to be usable on my phone without covering the entire screen, so that I can still read the page.
- **Acceptance Criteria:**
  - Banner takes no more than 30% of viewport height on mobile
  - Buttons are full-width and large enough for touch (min 44px height)
  - Text is readable (min 14px font)
  - Banner does not trigger horizontal scroll
  - Preference modal is scrollable if it exceeds viewport height

**US-14: Screen reader accessibility for cookie banner**
As any user with assistive technology, I want the cookie banner to be fully accessible, so that I can make an informed consent decision.
- **Acceptance Criteria:**
  - Banner has role="dialog" and aria-label="Cookie consent"
  - Focus is trapped within the banner/modal when open
  - Category toggles are labeled with descriptive text
  - "Accept All" and "Reject Non-Essential" buttons have clear accessible names
  - Banner can be dismissed via keyboard (Escape key for modal)

**US-15: Privacy policy page accessibility**
As any user, I want the privacy policy page to be navigable and readable, so that I can find relevant sections quickly.
- **Acceptance Criteria:**
  - Proper heading hierarchy (h1 for title, h2 for sections, h3 for subsections)
  - Table of contents with skip links
  - Reading order matches visual order
  - Text has sufficient contrast (WCAG 2.1 AA, 4.5:1 ratio)
  - Page is navigable via keyboard (Tab through links, sections)

### Legal & Compliance

**US-16: Privacy policy version history**
As Pastor James (thorough reader), I want to see when the privacy policy was last updated and what changed, so that I know the org keeps it current.
- **Acceptance Criteria:**
  - "Last updated" date at the top of the policy
  - "Version history" link or section at the bottom
  - Change log summarizes what was updated in each version (e.g., "v2.1 -- Added data retention details for resident records")
  - At least one version entry exists at launch

**US-17: Consent audit trail**
As Director Reyes (admin), I want the system to maintain a record of user consent actions, so that the organization can demonstrate GDPR compliance if audited.
- **Acceptance Criteria:**
  - Server-side log of consent events: user/session ID, timestamp, consent version, categories accepted/rejected
  - Logs are immutable (append-only)
  - Accessible to admin role for compliance review
  - Retained for the duration specified in the retention policy (3 years)

**US-18: Data processing agreement references**
As Director Reyes (admin), I want the privacy policy to reference our data processing agreements with third-party services, so that our legal obligations are documented.
- **Acceptance Criteria:**
  - Section listing data processors (Azure, payment processor, hosting provider)
  - States that DPAs are in place with each processor
  - Explains that processors are contractually bound to protect data
  - Provides contact email for requesting copies of DPAs

### Integration

**US-19: Cookie consent integration with analytics**
As the system, I want analytics scripts to respect cookie consent, so that we only track users who have opted in.
- **Acceptance Criteria:**
  - Analytics script tags are conditionally loaded based on consent state
  - If user rejects analytics, no analytics cookies are set and no tracking requests are made
  - If user later accepts analytics, scripts load without requiring a page refresh (or prompt a refresh)
  - Analytics data does not include any PII regardless of consent

**US-20: Link to privacy policy from registration/login**
As David (first-time visitor), I want a link to the privacy policy on the registration and login pages, so that I can review it before creating an account.
- **Acceptance Criteria:**
  - Registration page includes: "By creating an account, you agree to our [Privacy Policy]"
  - Login page has a footer link to the privacy policy
  - Donation forms include: "Your data is handled per our [Privacy Policy]"
  - Links open the privacy policy in a new tab

**US-21: Privacy policy print/download**
As Pastor James (thorough reader), I want to print or download the privacy policy as a PDF, so that I can review it offline and share it with my church leadership.
- **Acceptance Criteria:**
  - "Print this page" or "Download PDF" button on the privacy policy page
  - Print stylesheet removes navigation, footer, cookie banner
  - PDF/print version includes the full policy with version date
  - Formatted cleanly for letter/A4 paper

---

## Definition of Done

- [ ] Privacy policy page accessible at /privacy-policy with all required sections
- [ ] Policy is customized to Beacon of Hope (not boilerplate) with specific references to child protection, Philippine Data Privacy Act, and the org's actual data practices
- [ ] Cookie consent banner appears on first visit with Accept All, Reject Non-Essential, and Manage Preferences options
- [ ] Cookie preferences modal allows granular category control (Necessary, Analytics, Functional)
- [ ] Non-essential cookies/scripts are actually blocked until consent is granted (verified in browser DevTools)
- [ ] Consent choice persists across sessions (365-day cookie)
- [ ] Users can update cookie preferences at any time via footer link
- [ ] Consent re-prompted when privacy policy version changes
- [ ] Server-side consent audit trail logs all consent actions
- [ ] Privacy policy linked from login, registration, and donation forms
- [ ] Fully responsive on mobile (320px+) and accessible (WCAG 2.1 AA)
- [ ] Cookie banner has role="dialog", proper ARIA labels, and keyboard navigation
- [ ] Print/download option available for the policy
- [ ] All user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox

---

## Review Notes

### Overall Assessment

This is a strong, well-structured plan that goes well beyond the minimum requirements. The personas are diverse and well-motivated, and the user stories cover a wide range of scenarios. That said, several gaps and over-engineering risks exist. The critique below is organized by theme.

### 1. Rubric Alignment -- What Actually Gets Graded

The IS 414 rubric allocates exactly **2 points** to privacy:

| Objective | Points |
|---|---|
| Privacy policy created and added to site (customized as needed) | 1 |
| GDPR cookie consent notification **fully functional** | 1 |

Key takeaway: "fully functional" is the phrase that distinguishes full credit from partial. The plan correctly emphasizes functional cookie blocking (US-10), which is good. However, the rubric says the policy must be "customized as needed" -- not that it must be legally bulletproof. The plan currently scopes a consent audit trail (US-17), version history system (US-16), print/PDF export (US-21), and data processing agreement references (US-18). These are admirable but carry significant implementation cost for zero additional rubric points. **Recommendation: deprioritize US-16, US-17, US-18, and US-21 as stretch goals.** The core graded deliverables are (a) a customized policy page linked from the footer, and (b) a cookie banner that actually blocks non-essential cookies until consent.

### 2. GDPR Gaps

The plan covers the major GDPR rights in US-7 (access, rectification, erasure, restriction, portability, objection) -- good. However:

- **Right to erasure (Art. 17):** US-7 mentions erasure but the acceptance criteria only say "some data may be retained for legal compliance." The plan should specify the mechanism -- even if it is just "email us and we process it manually within 30 days." For a class project, a contact email is sufficient; no automated self-service deletion portal is needed.
- **Data Protection Officer (DPO):** US-4 names a "Data Protection Officer or responsible party" but the plan does not specify who this is or provide a placeholder. The policy page itself should name a real person or role (e.g., "The Data Protection Officer can be reached at dpo@beaconofhope.org"). This is a GDPR requirement under Art. 37-39 for organizations processing sensitive data about minors.
- **Lawful basis for processing:** US-4 lists "legitimate interest" and "legal obligation." For donor data, the lawful basis is more likely **contract** (processing a donation) and **consent** (marketing emails, if any). The policy should distinguish lawful bases per data category, not lump them together.
- **International data transfers:** The plan does not address cross-border data transfers. The organization operates in the Philippines but likely uses US-based cloud services (Azure, hosting). GDPR Art. 44-49 requires disclosure of transfers outside the EEA. A simple statement like "Data is stored on servers in [region] operated by [provider]" is sufficient for a class project.

### 3. Cookie Consent -- Functional Implementation Concerns

The requirements doc says: "Be specific in your video about whether this is cosmetic or fully functional." The plan correctly targets fully functional. Specific implementation notes:

- **The plan does not describe the technical approach.** How will scripts be conditionally loaded? Options: (a) a custom React context/provider that checks consent state before injecting script tags, (b) a lightweight library like `vanilla-cookieconsent` or `react-cookie-consent`. The plan should specify the approach so the developer does not waste time building from scratch.
- **US-10 acceptance criterion "Revoking consent removes non-essential cookies and stops those scripts"** is technically difficult -- you cannot unload a JavaScript module once executed. A more realistic criterion: revoking consent deletes non-essential cookies and prevents scripts from loading on the next page load (or triggers a page refresh).
- **If the site currently uses no analytics or non-essential cookies**, the functional cookie consent is trivially satisfied: there is nothing to block. The plan should confirm what non-essential cookies/scripts actually exist. If the answer is "none yet," the plan should either (a) intentionally add a lightweight analytics tool (e.g., Plausible, a simple Google Analytics tag) to demonstrate the blocking behavior, or (b) document that the banner correctly shows "no non-essential cookies in use" but still offers the mechanism for future use.

### 4. Philippine Data Privacy Act (RA 10173) -- Deeper Considerations

The plan references RA 10173 in US-4, which is good. Additional considerations for data involving minors in the Philippines:

- **Sensitive personal information:** Under RA 10173 Sec. 3(l), data about minors, health records, and social welfare case data are all classified as "sensitive personal information." Processing requires either consent of a parent/guardian or a legal basis under DSWD regulations. The policy should explicitly state the legal basis for processing minor data without parental consent (likely: DSWD regulatory mandate for child welfare organizations).
- **National Privacy Commission (NPC):** US-4 mentions including NPC contact info -- good. The NPC complaint process URL is https://www.privacy.gov.ph/. Make sure this is included.
- **Data breach notification:** RA 10173 requires notification to the NPC and affected data subjects within 72 hours of discovering a breach involving sensitive personal information. The privacy policy should mention the organization's breach notification commitment, even briefly. This also ties into the "Additional security features" rubric line (2 points) -- a documented breach response process could count.
- **Consent of minors:** Philippine law does not have a specific "age of digital consent" like GDPR's Art. 8 (age 16/13). However, since the minors are residents in care (not users of the website), the relevant consent is from the DSWD-accredited organization acting in loco parentis, not from the minors themselves. The policy should clarify this.

### 5. Missing Personas and Edge Cases

- **Missing persona: A minor resident (age 14-17) who might access the website.** While residents likely do not have accounts, a tech-savvy teenager in the program might visit the public-facing site out of curiosity and potentially find their own anonymized data in impact reports. The policy should address this edge case -- what happens if a resident contacts the org about data they believe is about them?
- **Missing persona: A government auditor (DSWD inspector).** Philippine social welfare organizations undergo regular DSWD audits. An auditor might review the privacy policy to verify compliance. This persona would care about RA 10173 compliance language, data retention alignment with DSWD guidelines, and whether the org has a registered Data Protection Officer with the NPC.
- **Edge case: EU visitor.** The plan assumes GDPR applies broadly, which is correct for a site accessible from the EU. But it should clarify that GDPR rights apply to EU data subjects specifically, while Philippine DPA rights apply to Philippine data subjects -- and that the org honors the more protective standard for all users.
- **Edge case: Donor requests deletion but has tax-deductible donations on record.** US-7 mentions this briefly but should be more explicit: "We will delete your personal information but retain anonymized financial records as required by tax law."

### 6. Security Rubric Synergies

The plan can contribute to points beyond the 2 privacy points:

- **"Additional security features" (2 points):** A documented data breach notification process, the consent audit trail (US-17), and the granular cookie controls could all be cited as additional security features in the video demo. Worth keeping US-17 as a stretch goal for this reason.
- **"Credentials stored securely" (1 point):** The privacy policy should NOT mention specific credential storage mechanisms (that would be a security disclosure), but the plan should ensure the privacy policy does not accidentally leak implementation details.

### 7. Scope Management Recommendation

**Must-have for grading (do first):**
- US-1 (policy page with all sections)
- US-2, US-3, US-6, US-7 (core policy content)
- US-4 (Philippine DPA reference)
- US-8 (cookie banner)
- US-10 (functional blocking -- the key differentiator for full points)
- US-11 (consent persistence)
- US-12 (footer link to manage cookies)
- US-20 (link from login/registration)

**Should-have (improves quality, low effort):**
- US-5 (retention policy -- a few paragraphs of text)
- US-9 (granular preferences -- moderate effort)
- US-13, US-14 (mobile/accessibility -- should be part of standard development)

**Nice-to-have (deprioritize):**
- US-15 (policy page accessibility -- heading hierarchy should be automatic)
- US-16 (version history system)
- US-17 (server-side consent audit trail)
- US-18 (DPA references)
- US-21 (print/PDF export)

---

## Updated / Additional User Stories

**US-4 (amended acceptance criteria):**

Add the following to the existing US-4 acceptance criteria:
- Specifies the legal basis for processing minor data without parental consent (DSWD regulatory mandate for accredited child welfare organizations acting in loco parentis)
- Includes a link to the National Privacy Commission complaint process (https://www.privacy.gov.ph/)
- Briefly states the organization's data breach notification commitment (72-hour notification to NPC and affected subjects per RA 10173)
- Clarifies that the organization honors the more protective standard (GDPR or Philippine DPA) for all users regardless of location

**US-7 (amended acceptance criteria):**

Add the following to the existing US-7 acceptance criteria:
- Clarifies that GDPR rights apply to EU data subjects and Philippine DPA rights apply to Philippine data subjects
- Explicitly states: "We will delete your personal information upon request but retain anonymized financial records as required for tax compliance"
- Names a specific contact (email address) for data requests -- do not just say "email us"
- Mentions the DPO role by name or title with contact information

**US-10 (amended acceptance criteria):**

Add the following to the existing US-10 acceptance criteria:
- Specifies the technical approach: use a React context/provider or a lightweight library (e.g., vanilla-cookieconsent) to gate script injection on consent state
- Clarifies that "revoking consent" means deleting non-essential cookies and preventing scripts from loading on the next page navigation (not mid-session script unloading, which is unreliable)
- If no analytics or non-essential cookies exist yet, add at least one demonstrable non-essential script (e.g., a lightweight analytics snippet) so the functional blocking can be verified in the demo video

**US-22: International data transfer disclosure** (NEW)
As a privacy-conscious visitor from the EU, I want to know where my data is stored and whether it is transferred outside my jurisdiction, so that I understand the cross-border implications.
- **Acceptance Criteria:**
  - States the geographic region of primary data storage (e.g., "Data is stored on Azure PostgreSQL servers in [region]")
  - Lists any cross-border transfers (e.g., Philippines to US-based cloud services)
  - References the legal mechanism for transfers (e.g., Standard Contractual Clauses, adequacy decision, or user consent)
  - Kept brief -- 1-2 paragraphs is sufficient for a class project

**US-23: Data breach notification commitment** (NEW)
As Elena (social worker), I want the privacy policy to describe what happens in the event of a data breach, so that I know the organization has a response plan for sensitive case data.
- **Acceptance Criteria:**
  - States the organization's commitment to notify the NPC within 72 hours of discovering a breach involving sensitive personal information (per RA 10173)
  - States that affected data subjects will be notified promptly
  - Provides a brief description of the incident response process (detect, contain, notify, remediate)
  - This section also supports the "Additional security features" rubric line in IS 414

**US-24: Resident/minor edge case** (NEW)
As a resident (minor) who visits the public website, I want assurance that my personal information is not identifiable in any public content, so that my privacy and safety are protected.
- **Acceptance Criteria:**
  - Policy explicitly states that no resident-identifying information appears on the public-facing site
  - Impact dashboards use only aggregated, anonymized data with no individual records
  - Provides a contact method for anyone who believes their data has been inadvertently disclosed
  - States that the organization will investigate and remediate any such report within 48 hours

---

## Requirements Coverage Matrix

### Rubric Line Items vs. Plan Coverage

| # | Rubric Item | Points | Plan Coverage | Status | Notes |
|---|-------------|--------|---------------|--------|-------|
| 1 | Privacy policy created and added to site (customized as needed) | 1 | US-1, US-2, US-3, US-4, US-5, US-6, US-7 | FULLY COVERED | Plan goes well beyond minimum. Core deliverable: `/privacy-policy` page with org-specific content (child protection, Philippine DPA, actual data practices). Linked from footer (US-1), login/registration (US-20). |
| 2 | GDPR cookie consent notification fully functional | 1 | US-8, US-9, US-10, US-11, US-12 | PARTIALLY COVERED -- plan is thorough but current implementation is cosmetic | The existing `CookieConsent.tsx` is cosmetic only: it stores a value in `localStorage` but blocks nothing. The plan (US-10) correctly identifies that functional blocking is required but does not specify the concrete React implementation pattern. See "Implementation Gap Analysis" below. |
| 3 | CSP header set properly | 2 | NOT IN THIS PLAN | NOT COVERED (out of scope for this plan) | CSP is a separate backend security concern. Mentioned here for completeness since the cookie consent mechanism must work within CSP constraints (e.g., no inline scripts if `script-src` excludes `unsafe-inline`). |
| 4 | Additional security features | 2 | US-17 (consent audit trail), US-23 (breach notification) | PARTIALLY COVERED | The consent audit trail (US-17) and breach notification commitment (US-23) can each contribute partial credit toward "additional security features." The plan correctly identifies this synergy in Review Notes section 6. |
| 5 | Credentials stored securely | 1 | US-18 (DPA references) tangentially | NOT COVERED (out of scope) | The plan correctly notes (Review Notes section 6) that the privacy policy should NOT disclose credential storage details. No action needed from this plan. |

### Implementation Gap Analysis: Cookie Consent

The current `CookieConsent.tsx` component has the following gaps that must be addressed for full credit:

**Current state (cosmetic only):**
- Uses `localStorage` instead of a first-party cookie (rubric says "cookie consent" -- ironic but should be an actual cookie)
- Only offers Accept/Decline -- no "Manage Preferences" option (US-9)
- Does not block ANY scripts or cookies -- the `accept()` and `decline()` functions only set a localStorage value
- No granular category control (Necessary / Analytics / Functional)
- Link points to `/privacy` instead of `/privacy-policy`
- No mechanism to re-open preferences after initial choice (US-12)

**What "fully functional" requires (technical implementation):**

1. **React Context/Provider pattern (`CookieConsentProvider`):**
   - Wrap the app in a `<CookieConsentProvider>` that reads consent state on mount
   - Expose `consentState` (object with category booleans: `{ necessary: true, analytics: false, functional: false }`) via React context
   - Expose `updateConsent(categories)` function via context
   - Store consent in a first-party cookie (`boh_cookie_consent`) with 365-day expiry, containing: timestamp, policy version, categories accepted
   - On mount: if no consent cookie exists, set all non-essential categories to `false` (blocked by default)

2. **Script gating pattern (`ConditionalScript` component or hook):**
   - Create a `useConsentGate(category)` hook that returns `true` only if the user has consented to that category
   - Any analytics or non-essential script must check this gate before loading
   - Use `document.createElement('script')` to dynamically inject scripts ONLY after consent -- never use static `<script>` tags in `index.html` for non-essential scripts
   - If no analytics tool is currently used: add a lightweight one (e.g., a simple Google Analytics snippet or Plausible) specifically to demonstrate functional blocking in the demo video

3. **Revocation behavior:**
   - When user revokes consent for a category: delete cookies associated with that category, update the consent cookie, and prevent scripts from loading on next navigation
   - Do NOT attempt to unload already-executed JavaScript (unreliable) -- instead, trigger a page reload or rely on next navigation
   - Clear specific cookies by name (e.g., `_ga`, `_gid` for Google Analytics) when analytics consent is revoked

4. **Backend considerations:**
   - If implementing the consent audit trail (US-17), add a POST endpoint (e.g., `/api/consent`) that logs consent events server-side
   - The backend should set appropriate cookie headers: `SameSite=Lax`, `Secure` (in production), and `Path=/`
   - CSP header must allow any analytics domains that are conditionally loaded (add them to `script-src` and `connect-src`)
   - Consider setting `HttpOnly` on session/auth cookies but NOT on the consent cookie (it must be readable by JavaScript)

5. **Verification checklist for demo video:**
   - Open DevTools > Application > Cookies before accepting: only `boh_cookie_consent` (with `declined` or absent) and session cookies should exist
   - Accept analytics: analytics cookies appear, network tab shows tracking requests
   - Revoke analytics: analytics cookies disappear after reload, no tracking requests
   - Fresh incognito window: no non-essential cookies on first load

### Plan Items Not Required by Rubric (Stretch Goals)

These items are in the plan but carry zero direct rubric points. They should be deprioritized unless time permits:

| Plan Item | Rubric Relevance | Effort | Recommendation |
|-----------|-----------------|--------|----------------|
| US-16: Version history system | None | Medium | DEPRIORITIZE -- a static "Last updated" date is sufficient |
| US-17: Server-side consent audit trail | Partial credit under "Additional security features" (2 pts) | Medium-High | KEEP AS STRETCH -- valuable for additional security points |
| US-18: DPA references | None | Low | INCLUDE -- just a few paragraphs of policy text, trivial effort |
| US-21: Print/PDF export | None | Medium | DEPRIORITIZE -- nice UX but no rubric points |
| US-22: International data transfer | None | Low | INCLUDE -- one paragraph of policy text |
| US-23: Breach notification | Partial credit under "Additional security features" (2 pts) | Low | INCLUDE -- just policy text, supports additional security points |
| US-24: Resident/minor edge case | None | Low | INCLUDE -- one paragraph strengthens "customized" quality of policy |

### Cross-Cutting Rubric Items This Plan Impacts

| Rubric Item | How This Plan Contributes |
|-------------|--------------------------|
| Lighthouse accessibility >= 90% (IS 401) | US-13, US-14, US-15 ensure the cookie banner and policy page do not tank the accessibility score. The banner must have `role="dialog"`, `aria-label`, focus trapping, and keyboard dismissal. |
| Responsiveness on all pages (IS 401) | US-13 covers mobile cookie banner. The privacy policy page must also be responsive (standard layout concern). |
| HTTPS/TLS (IS 414, 1 pt) | Cookie consent cookie must have `Secure` flag in production. Plan should note this dependency. |
| CSP header (IS 414, 2 pts) | If analytics scripts are conditionally loaded, their domains must be in the CSP `script-src`. The consent mechanism must not rely on `unsafe-inline` for script injection -- use nonces or `strict-dynamic` if needed. |

---

## Above and Beyond Ideas

These ideas go beyond rubric requirements and could differentiate the project in the demo video or earn partial credit under "Additional security features."

### 1. Consent-Aware Analytics Dashboard (ties to IS 455 + IS 414)
Build a simple internal dashboard showing consent rates: what percentage of visitors accept all cookies, reject all, or customize. This demonstrates that the consent mechanism is instrumented end-to-end and feeds real data. Implementation: the consent audit trail (US-17) POST endpoint stores events; a simple admin page queries and charts them. This kills two birds: additional security feature credit AND demonstrates data-driven thinking.

### 2. Cookie Preference Stored as a Browser-Accessible Cookie (IS 414 additional security, explicit rubric item)
The rubric's "Additional security features" list specifically mentions: "Enable a browser accessible cookie (i.e., NOT an httponly cookie) that saves a user setting that is used by React to change the page." The cookie consent preference cookie (`boh_cookie_consent`) already IS this -- it is a non-HttpOnly cookie that React reads to conditionally load scripts and change page behavior. Make this explicit in the demo video to claim this as an additional security feature. Alternatively, add a light/dark theme preference cookie alongside it for a second example.

### 3. Automated Cookie Scanner on Build
Add a pre-deployment check (CI script or manual checklist) that verifies no non-essential cookies are set before consent. This could be a simple Playwright/Puppeteer test: load the site in a fresh browser, check `document.cookie` and the cookie jar, assert only essential cookies exist. This demonstrates security testing maturity and can be cited as an additional security feature.

### 4. Privacy-Respecting Analytics Alternative
Instead of Google Analytics (which sets multiple third-party cookies and raises GDPR concerns), use a privacy-first analytics tool like Plausible or Umami that:
- Does not use cookies at all (some modes)
- Is GDPR-compliant by design
- Can still be gated behind consent for maximum compliance
This is a strong talking point in the demo: "We chose a privacy-respecting analytics tool aligned with our organization's mission of protecting vulnerable populations."

### 5. Content Security Policy Synergy
Design the cookie consent script-injection mechanism to work cleanly with CSP from the start. Use nonce-based script loading: the backend generates a per-request nonce, passes it to the React app via a meta tag, and the consent provider uses that nonce when dynamically creating script elements. This avoids needing `unsafe-inline` or `unsafe-eval` in the CSP, which is a common pitfall. Demonstrating this in the video shows sophisticated understanding of how privacy and security mechanisms interact.

### 6. "Privacy by Design" Documentation Section
Add a brief section to the privacy policy (or a separate `/security` page) describing the organization's privacy-by-design principles: data minimization, purpose limitation, storage limitation, and integrity/confidentiality. This is pure text content but signals maturity and aligns with GDPR Art. 25. It costs almost nothing to implement but adds polish.

### 7. Geo-Aware Privacy Notice
Detect the visitor's approximate location (via timezone or Accept-Language header -- NOT IP geolocation, which would itself be a privacy concern) and surface the most relevant legal framework prominently. EU visitors see GDPR rights emphasized; Philippine visitors see RA 10173 rights emphasized. All rights are always available, but the UX highlights what is most relevant. This is a small touch that demonstrates thoughtfulness about international compliance.

---

## Implementation Plan

This plan is organized into four workstreams with a suggested implementation order at the end. All paths are relative to the project root (`/Users/dawsonpitcher/School/intex2`).

### 1. Privacy Policy Page

**Component:** `frontend/src/pages/PrivacyPolicyPage.tsx` (new file)
**Styles:** `frontend/src/pages/PrivacyPolicyPage.module.css` (new file)

#### Content Structure

The page is a single React component rendering static JSX content. No API calls required -- this is purely presentational. Structure the content with these sections, each with an `id` attribute for anchor linking:

```
<h1>  Privacy Policy
      "Last updated: [date]"

<nav> Table of Contents (anchor links to each h2)

<h2 id="data-we-collect">           1. Data We Collect
  <h3>                              - Visitor Data (pages visited, session duration, cookies)
  <h3>                              - Donor Data (name, email, donation amount -- NOT card numbers)
  <h3>                              - Staff/Employee Data (name, email, role, login credentials)
  <h3>                              - Resident Data (case records, histories -- classified as sensitive)

<h2 id="how-we-use-data">          2. How We Use Your Data
  Per-category lawful basis:
    - Donor data: contract (processing donation) + consent (communications)
    - Staff data: contract (employment) + legal obligation (DSWD reporting)
    - Resident data: legal obligation (DSWD mandate) + legitimate interest (child welfare)
    - Visitor data: consent (analytics cookies) + legitimate interest (site functionality)

<h2 id="protection-of-minors">     3. Protection of Minors' Data
  DEDICATED SECTION -- the key differentiator for "customized" credit.
  Content:
    - Resident data (names, case histories, counseling notes) classified as highly sensitive
      personal information under both GDPR Art. 9 and RA 10173 Sec. 3(l)
    - Access restricted to authorized staff with direct case relationship
    - Never shared with third parties except as required by Philippine law (DSWD reporting)
    - Never used in marketing, public reports, or impact dashboards in identifiable form
    - Impact dashboards display only aggregated, anonymized statistics
    - Legal basis for processing without parental consent: DSWD regulatory mandate for
      accredited child welfare organizations acting in loco parentis
    - Data anonymized or deleted when resident turns 18 or exits the program
    - Contact method for anyone who believes their data was inadvertently disclosed;
      organization commits to investigate and remediate within 48 hours

<h2 id="data-sharing">             4. Data Sharing & Third Parties
  Table format:
    | Service     | Purpose              | Data Shared           | Privacy Policy Link |
    |-------------|----------------------|-----------------------|---------------------|
    | Azure PostgreSQL | Database hosting | All stored data       | [link]              |
    | [Payment]   | Donation processing  | Payment details       | [link]              |
    | Azure       | Backend hosting      | Server-side data      | [link]              |
    | Vercel      | Frontend hosting     | Static assets, logs   | [link]              |
  Statement: Data is never sold. Resident data is never shared except as required by law.
  DPAs in place with all processors; copies available on request at [email].

<h2 id="international-transfers">   5. International Data Transfers
  - Primary storage: Azure PostgreSQL servers in [region]
  - Backend hosted on Azure West US 2
  - Frontend on Vercel (global CDN)
  - Legal mechanism: Standard Contractual Clauses where applicable
  - Organization honors the more protective standard (GDPR or Philippine DPA) for all users

<h2 id="data-retention">           6. Data Retention
  Table format:
    | Data Type              | Retention Period                           |
    |------------------------|--------------------------------------------|
    | Donor financial records | 7 years (tax compliance)                  |
    | Resident case records  | Duration of stay + 5 years (DSWD)          |
    | Staff account data     | Duration of employment + 1 year            |
    | Website usage data     | 2 years                                    |
    | Cookie consent records | 3 years                                    |
  After retention: anonymized or securely deleted. Legal holds can extend retention.

<h2 id="your-rights">              7. Your Rights
  Two subsections:
  <h3> GDPR Rights (EU data subjects): access, rectification, erasure, restriction,
       portability, objection
  <h3> Philippine DPA Rights (RA 10173): right to be informed, access, correction,
       erasure, data portability
  Process: email privacy@beaconofhope.org. Response within 30 days.
  Erasure note: "We will delete your personal information upon request but retain
  anonymized financial records as required for tax compliance."
  DPO contact: dpo@beaconofhope.org (or named role)

<h2 id="cookies">                  8. Cookies & Tracking
  Categories table:
    | Category    | Cookies         | Purpose                        | Duration  |
    |-------------|-----------------|--------------------------------|-----------|
    | Necessary   | boh_cookie_consent, session | Consent record, auth | 365d/session |
    | Analytics   | [if added]      | Anonymized usage statistics     | [duration]|
    | Functional  | boh_theme       | UI preferences (theme, etc.)   | 365d      |
  Link to manage preferences (triggers the cookie preference modal).
  States that non-essential cookies are blocked until user consents.

<h2 id="data-security">            9. Data Security
  Brief: encryption in transit (TLS), access controls, regular reviews.
  Does NOT disclose specific implementation details (no credential storage info).

<h2 id="breach-notification">      10. Data Breach Notification
  - Commitment to notify NPC within 72 hours per RA 10173
  - Affected data subjects notified promptly
  - Process: detect, contain, notify, remediate
  - Supports "additional security features" rubric line

<h2 id="contact">                  11. Contact Information
  - Data Protection Officer: [name/role], dpo@beaconofhope.org
  - General privacy inquiries: privacy@beaconofhope.org
  - National Privacy Commission: https://www.privacy.gov.ph/
  - EU supervisory authority: [relevant authority, if applicable]

<h2 id="changes">                  12. Changes to This Policy
  - "Last updated" date at top reflects current version
  - Material changes will be announced via site banner
  - Version 1.0 -- Initial policy (launch date)
```

#### Component Implementation Notes

- Use CSS Modules for styling (`PrivacyPolicyPage.module.css`)
- Table of Contents: render a `<nav>` with anchor links (`<a href="#data-we-collect">`)
- Each section heading gets an `id` for deep linking
- Add a "Print this page" button that calls `window.print()`
- Add a `@media print` stylesheet block that hides header, footer, cookie banner, and the print button itself
- The "Manage cookie preferences" link in the Cookies section should call `openPreferencesModal()` from the `CookieConsentContext` (see section 2 below)
- Mobile: single-column layout, TOC collapses to a sticky dropdown or scrolls horizontally

#### Route Registration

In `frontend/src/App.tsx`, add:
```tsx
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
// ...
<Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicyPage /></PublicLayout>} />
```

Also add a redirect from `/privacy` to `/privacy-policy` so the old footer link does not 404:
```tsx
import { Navigate } from 'react-router-dom';
// ...
<Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
```

---

### 2. Cookie Consent Upgrade (Cosmetic to Functional)

The current `CookieConsent.tsx` stores a value in `localStorage` and blocks nothing. The upgrade introduces a React Context/Provider pattern that gates script injection on consent state.

#### 2a. CookieConsentProvider Context

**File:** `frontend/src/contexts/CookieConsentContext.tsx` (new file)

Responsibilities:
- On mount, read the `boh_cookie_consent` cookie (first-party, not localStorage)
- Parse it as JSON: `{ version: "1.0", timestamp: string, categories: { necessary: true, analytics: boolean, functional: boolean } }`
- If no cookie exists, all non-essential categories default to `false` (blocked)
- Expose via context:
  - `consentState: { necessary: true, analytics: boolean, functional: boolean }`
  - `consentGiven: boolean` (whether user has made any choice)
  - `updateConsent(categories: Partial<ConsentCategories>): void`
  - `openPreferencesModal(): void` / `closePreferencesModal(): void`
  - `showBanner: boolean`
  - `showPreferences: boolean`
- `updateConsent()` writes the cookie via `document.cookie` with `SameSite=Lax; Secure; Path=/; Max-Age=31536000` (365 days)
- If the policy version in the stored cookie does not match the current `POLICY_VERSION` constant, re-show the banner (handles US-11 version re-consent)
- Export a `POLICY_VERSION` constant (e.g., `"1.0"`) that is bumped when the policy changes

Cookie format (stored as URL-encoded JSON):
```
boh_cookie_consent={"v":"1.0","ts":"2026-04-06T00:00:00Z","cat":{"n":true,"a":false,"f":false}}
```

Utility functions needed (put in a `frontend/src/utils/cookies.ts` helper):
- `setCookie(name, value, maxAgeDays)` -- sets with `SameSite=Lax; Secure; Path=/`
- `getCookie(name)` -- parses `document.cookie`
- `deleteCookie(name)` -- sets `Max-Age=0`
- `deleteAnalyticsCookies()` -- deletes known analytics cookies by name (e.g., `_ga`, `_gid`)

#### 2b. useConsentGate Hook

**File:** `frontend/src/hooks/useConsentGate.ts` (new file)

```typescript
function useConsentGate(category: 'analytics' | 'functional'): boolean
```

Reads from `CookieConsentContext` and returns `true` only if the user has consented to that category. Components/effects that depend on non-essential cookies check this gate before executing.

#### 2c. useConsentScript Hook (Script Injection)

**File:** `frontend/src/hooks/useConsentScript.ts` (new file)

```typescript
function useConsentScript(options: {
  category: 'analytics' | 'functional';
  src: string;
  id: string;
  onLoad?: () => void;
}): void
```

Implementation:
- Calls `useConsentGate(category)` internally
- If consent is `true` and the script tag with `id` does not already exist in the DOM:
  - Create a `<script>` element via `document.createElement('script')`
  - Set `src`, `id`, `async = true`
  - Append to `document.head`
  - Call `onLoad` when loaded
- If consent becomes `false` (revoked):
  - Remove the script tag from the DOM (prevents re-execution on next navigation)
  - Call `deleteAnalyticsCookies()` to clean up
  - Note: already-executed JS cannot be unloaded; rely on next navigation for full cleanup

This pattern means NO analytics `<script>` tags exist in `index.html`. All non-essential scripts are injected dynamically via this hook.

#### 2d. Demonstrable Non-Essential Script

The site currently has no analytics. To demonstrate functional blocking in the demo video, add a lightweight analytics snippet. Two options (pick one):

**Option A: Google Analytics 4 (most recognizable for graders)**
- Use `useConsentScript({ category: 'analytics', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX', id: 'ga-script' })`
- After load, call `window.gtag('config', 'G-XXXXXXX')` in the `onLoad` callback
- Verifiable: `_ga` and `_gid` cookies appear only after analytics consent

**Option B: Plausible Analytics (privacy-first, better org alignment)**
- `useConsentScript({ category: 'analytics', src: 'https://plausible.io/js/script.js', id: 'plausible-script' })`
- Set `data-domain` attribute on the script element
- Plausible is cookieless by default, but gating it behind consent still demonstrates the mechanism

**Recommendation:** Option A for demo clarity (graders can see cookies appear/disappear in DevTools).

Create a thin wrapper component:
**File:** `frontend/src/components/AnalyticsLoader.tsx` (new file)
```tsx
export default function AnalyticsLoader() {
  useConsentScript({
    category: 'analytics',
    src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX',
    id: 'ga-script',
    onLoad: () => { /* gtag init */ }
  });
  return null; // renders nothing
}
```

Render `<AnalyticsLoader />` inside the `CookieConsentProvider` in `App.tsx`.

#### 2e. Refactored CookieConsent Banner Component

**File:** `frontend/src/components/CookieConsent.tsx` (modify existing)

Changes:
- Remove all `localStorage` logic
- Remove internal `useState` for visibility -- read `showBanner` from `CookieConsentContext`
- Three buttons: "Accept All", "Reject Non-Essential", "Manage Preferences"
  - "Accept All": calls `updateConsent({ analytics: true, functional: true })`
  - "Reject Non-Essential": calls `updateConsent({ analytics: false, functional: false })`
  - "Manage Preferences": calls `openPreferencesModal()`
- Update the privacy policy link from `/privacy` to `/privacy-policy`
- Keep existing CSS Module styling; add styles for the third button

#### 2f. Cookie Preferences Modal

**File:** `frontend/src/components/CookiePreferencesModal.tsx` (new file)
**Styles:** `frontend/src/components/CookiePreferencesModal.module.css` (new file)

Content:
- Overlay modal (centered, with backdrop)
- `role="dialog"` and `aria-label="Cookie preferences"` and `aria-modal="true"`
- Focus trap (Tab cycles within modal, Escape closes it)
- Three categories with toggle switches:
  - **Necessary** (always on, toggle disabled, grayed out) -- "Session management, security, consent record"
  - **Analytics** (toggle) -- "Anonymized usage statistics to help us improve the site"
  - **Functional** (toggle) -- "UI preferences such as theme selection"
- Pre-populated with current consent state from context
- "Save Preferences" button: calls `updateConsent()` with selected categories, closes modal
- "Accept All" shortcut button
- Keyboard accessible: toggles via Space/Enter, modal dismissed via Escape

#### 2g. App.tsx Integration

**File:** `frontend/src/App.tsx` (modify)

Wrap the entire app in `<CookieConsentProvider>`:
```tsx
import { CookieConsentProvider } from './contexts/CookieConsentContext';

function App() {
  return (
    <CookieConsentProvider>
      <BrowserRouter>
        {/* ... existing routes ... */}
      </BrowserRouter>
      <AnalyticsLoader />
    </CookieConsentProvider>
  );
}
```

Move `<CookieConsent />` out of `PublicLayout` and into the `CookieConsentProvider` scope so it renders on all pages (including admin). Or keep it in `PublicLayout` and also add it to `AdminLayout` -- either approach works, but the provider must wrap everything.

#### 2h. Footer Update

**File:** `frontend/src/components/Footer.tsx` (modify)

Changes:
- Update `<Link to="/privacy">` to `<Link to="/privacy-policy">`
- Wire the "Cookie Settings" button to call `openPreferencesModal()` from context:
  ```tsx
  import { useCookieConsent } from '../contexts/CookieConsentContext';
  // ...
  const { openPreferencesModal } = useCookieConsent();
  // ...
  <button onClick={openPreferencesModal} className={styles.cookieBtn}>Cookie Settings</button>
  ```

---

### 3. Backend Work

#### 3a. Content Security Policy (CSP) Middleware

**File:** `backend/Program.cs` (modify)

Add CSP headers via middleware, placed before `app.UseHttpsRedirection()`:

```csharp
app.Use(async (context, next) =>
{
    context.Response.Headers.Append(
        "Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; " +
        "style-src 'self' 'unsafe-inline'; " +   // CSS Modules inject inline styles
        "img-src 'self' data: https:; " +
        "connect-src 'self' https://www.google-analytics.com ; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "frame-ancestors 'none'; " +
        "form-action 'self'; " +
        "base-uri 'self'"
    );
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});
```

Notes:
- `script-src` includes the Google Analytics domain only because we conditionally load it. If using Plausible instead, substitute `https://plausible.io`.
- `'unsafe-inline'` for `style-src` is needed because CSS Modules and React inject inline styles. To avoid this, a nonce-based approach could be used (see "Above and Beyond" idea #5), but that adds complexity.
- `frame-ancestors 'none'` prevents clickjacking.
- The CSP must match the analytics domains allowed by the cookie consent script injection.

#### 3b. Cookie Configuration on Backend Responses

The backend currently does not set any cookies (auth is not yet implemented). When authentication is added, ensure:

- Session/auth cookies: `SameSite=Lax; Secure; HttpOnly; Path=/`
- The `boh_cookie_consent` cookie is set on the frontend via JavaScript, so it must NOT be `HttpOnly` (it needs to be readable by React). This is correct and intentional -- the rubric explicitly mentions "Enable a browser accessible cookie (i.e., NOT an httponly cookie) that saves a user setting that is used by React to change the page."

If adding a consent audit endpoint (stretch goal):

#### 3c. Consent Audit Endpoint (Stretch -- US-17)

**File:** `backend/Program.cs` (modify -- add endpoint)

```csharp
app.MapPost("/api/consent", async (HttpContext httpContext, AppDbContext db) =>
{
    var body = await httpContext.Request.ReadFromJsonAsync<ConsentEvent>();
    // ... validate and store ...
    return Results.Ok();
});
```

**File:** `backend/Models/ConsentEvent.cs` (new file)

```csharp
public class ConsentEvent
{
    public int Id { get; set; }
    public string? SessionId { get; set; }
    public string PolicyVersion { get; set; } = "";
    public bool AnalyticsAccepted { get; set; }
    public bool FunctionalAccepted { get; set; }
    public DateTime Timestamp { get; set; }
    public string? IpHash { get; set; }  // hashed, not raw IP
}
```

Add the corresponding `DbSet<ConsentEvent>` to `AppDbContext` and run a migration. This is append-only (no UPDATE or DELETE endpoints).

---

### 4. Complete File List

#### New Files

| File | Purpose |
|------|---------|
| `frontend/src/pages/PrivacyPolicyPage.tsx` | Privacy policy page component |
| `frontend/src/pages/PrivacyPolicyPage.module.css` | Privacy policy page styles (including `@media print`) |
| `frontend/src/contexts/CookieConsentContext.tsx` | React context/provider for consent state management |
| `frontend/src/hooks/useConsentGate.ts` | Hook returning boolean for whether a category is consented |
| `frontend/src/hooks/useConsentScript.ts` | Hook for conditionally injecting `<script>` tags based on consent |
| `frontend/src/utils/cookies.ts` | Cookie read/write/delete utility functions |
| `frontend/src/components/CookiePreferencesModal.tsx` | Granular cookie preferences modal |
| `frontend/src/components/CookiePreferencesModal.module.css` | Modal styles |
| `frontend/src/components/AnalyticsLoader.tsx` | Thin wrapper that uses `useConsentScript` for GA/Plausible |

#### Modified Files

| File | Changes |
|------|---------|
| `frontend/src/App.tsx` | Wrap in `CookieConsentProvider`, add `/privacy-policy` and `/privacy` redirect routes, render `AnalyticsLoader` |
| `frontend/src/components/CookieConsent.tsx` | Replace localStorage logic with context consumption, add third "Manage Preferences" button, update link to `/privacy-policy` |
| `frontend/src/components/CookieConsent.module.css` | Add styles for "Manage Preferences" button |
| `frontend/src/components/Footer.tsx` | Update privacy link to `/privacy-policy`, wire "Cookie Settings" button to `openPreferencesModal()` |
| `backend/Program.cs` | Add CSP header middleware and additional security headers |

#### Stretch Goal Files (only if time permits)

| File | Purpose |
|------|---------|
| `backend/Models/ConsentEvent.cs` | EF model for consent audit trail |
| `backend/Data/AppDbContext.cs` | Add `DbSet<ConsentEvent>` |
| `backend/Program.cs` | Add `POST /api/consent` endpoint |
| EF migration files | Generated via `dotnet ef migrations add AddConsentAudit` |

---

### 5. Suggested Implementation Order

**Phase 1: Cookie Consent Infrastructure (do first -- highest rubric risk)**

Rationale: The cookie consent being "fully functional" is the key differentiator between partial and full credit. The current implementation is cosmetic and earns zero points.

1. Create `frontend/src/utils/cookies.ts` (small utility, no dependencies)
2. Create `frontend/src/contexts/CookieConsentContext.tsx` (the core state machine)
3. Create `frontend/src/hooks/useConsentGate.ts` and `frontend/src/hooks/useConsentScript.ts`
4. Refactor `frontend/src/components/CookieConsent.tsx` to consume context (three-button banner)
5. Update `frontend/src/components/CookieConsent.module.css` for the third button
6. Create `frontend/src/components/CookiePreferencesModal.tsx` and its CSS module
7. Create `frontend/src/components/AnalyticsLoader.tsx` with a GA4 snippet
8. Update `frontend/src/App.tsx` to wrap in provider and render AnalyticsLoader
9. Update `frontend/src/components/Footer.tsx` to wire Cookie Settings button
10. **Test:** Open DevTools > Application > Cookies in incognito. Verify: no analytics cookies on first load; accept analytics; verify `_ga`/`_gid` appear; revoke; verify they disappear after reload.

**Phase 2: Privacy Policy Page**

11. Create `frontend/src/pages/PrivacyPolicyPage.tsx` with all 12 sections
12. Create `frontend/src/pages/PrivacyPolicyPage.module.css` with print stylesheet
13. Add `/privacy-policy` route and `/privacy` redirect in `App.tsx`
14. Update Footer privacy link from `/privacy` to `/privacy-policy`
15. Wire the "Manage cookie preferences" link in the Cookies section to `openPreferencesModal()`
16. **Test:** Navigate to `/privacy-policy`, verify all sections render, TOC anchors work, print button works, old `/privacy` URL redirects.

**Phase 3: Backend Security Headers**

17. Add CSP middleware and additional security headers to `backend/Program.cs`
18. **Test:** Check response headers via DevTools > Network tab. Verify CSP does not block the conditionally loaded analytics script. Verify `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` headers are present.

**Phase 4: Integration & Polish**

19. Add privacy policy links to login/registration/donation forms (if those pages exist)
20. Accessibility pass: verify `role="dialog"`, `aria-label`, focus trapping, keyboard navigation on banner and modal
21. Mobile pass: verify banner is under 30% viewport height, buttons are touch-friendly (44px min), modal scrolls
22. Cross-browser test: Chrome, Safari mobile, Firefox

**Phase 5: Stretch Goals (only if time permits)**

23. Consent audit trail endpoint (`POST /api/consent`) and `ConsentEvent` model
24. Version history section on privacy policy page
25. Print/PDF export with clean formatting
26. Automated cookie scanner (Playwright test that verifies no non-essential cookies before consent)
