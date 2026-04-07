# Donors & Contributions Plan

## Purpose

The Donors & Contributions page manages supporter profiles and tracks all types of contributions to Beacon of Hope. This includes monetary donations, in-kind gifts, volunteer time, professional skills, and social media advocacy. The page supports the full lifecycle of donor management: creating supporter profiles, recording donations, tracking allocations across safehouses and programs, and providing donors with visibility into their own giving history.

### IS413 Requirement
"View, create, manage supporter profiles by type (monetary, volunteer, skills, etc.) and status. Track all contribution types. Record and review donation activity. View donation allocations across safehouses and program areas."

### Database Tables
- `supporters` (primary -- supporter profiles)
- `donations` (monetary and time-based donations)
- `donation_allocations` (how donations are distributed across safehouses/programs)
- `in_kind_donation_items` (physical goods donated)
- `social_media_posts` (advocacy contributions)
- `partners` (organizational partners)
- `partner_assignments` (partner-safehouse relationships)

### RBAC
- **Admin:** Full CRUD on all supporters, donations, allocations
- **Staff/Employee:** View supporters and donations; create donations and in-kind records; limited edit
- **Donor:** View own profile and own donation history only; no access to other donors' data

---

## Personas

### 1. Grace Flores (Donor Relations Coordinator)
- **Age:** 29
- **Location:** Manila, Philippines
- **Device:** Laptop (Windows, Edge)
- **Role:** Staff/Employee
- **Background:** Manages all donor relationships for Beacon of Hope. She enters new supporter records, logs donations as they come in, tracks in-kind donations from churches and businesses, and prepares donor acknowledgment letters. She manages approximately 200 active supporters.
- **Goals:** Quickly enter new supporters and donations. Track which supporters are lapsing (haven't donated recently). See donation totals by campaign and time period. Generate data for thank-you letters and tax receipts.
- **Frustrations:** Manually tracking donations in spreadsheets is error-prone. No way to see a supporter's full giving history in one place. In-kind donations are hard to value and track. Can't easily identify top donors for personal outreach.
- **Key Question:** "Who are our most engaged supporters, who is lapsing, and how are donations distributed across our safehouses?"

### 2. Maria Chen (Recurring Donor)
- **Age:** 42
- **Location:** San Francisco, CA
- **Device:** iPhone 14 Pro, Safari
- **Role:** Donor
- **Background:** Donates $200/month to Beacon of Hope. Wants to see where her money goes and feel connected to the impact. She sponsors a specific safehouse and wants confirmation her donations are allocated there.
- **Goals:** View her complete donation history. See how her donations are allocated. Download tax receipts for year-end filing. Update her contact and payment information.
- **Frustrations:** Can't tell if her donations are going where she specified. No easy way to get a year-end summary for taxes. Doesn't know how her giving compares to the org's total needs.
- **Key Question:** "Where exactly is my $200/month going, and can I get a tax receipt without emailing someone?"

### 3. Director Reyes (Co-Founder / Admin)
- **Age:** 52
- **Location:** Portland, OR
- **Device:** MacBook Pro, Chrome
- **Role:** Admin
- **Background:** Oversees fundraising strategy. Needs to understand donation trends, identify major donors, evaluate campaign effectiveness, and ensure donation allocations align with safehouse needs.
- **Goals:** See total donations by time period, source, and allocation. Identify trends (growing/declining giving). Manage supporter statuses (active, lapsed, major donor). Allocate undesignated donations across safehouses.
- **Frustrations:** No visibility into donation pipeline. Can't compare giving across campaigns. Allocation decisions are made ad hoc without data. Board wants quarterly fundraising reports and data is scattered.
- **Key Question:** "Are we on track for our fundraising goals, and how should we allocate the undesignated funds?"

### 4. Pastor James Okafor (Community Leader / Church Partner)
- **Age:** 55
- **Location:** Lagos, Nigeria
- **Device:** Desktop PC, Chrome
- **Role:** Unauthenticated (potential supporter) / Donor (if registered)
- **Background:** His church is considering a partnership with Beacon of Hope that would include monthly financial support and in-kind donations (clothing, school supplies). He wants to understand how church contributions would be tracked and reported.
- **Goals:** Understand the supporter types and how church contributions are categorized. See how allocations work. Get reports he can share with his church leadership. Track both monetary and in-kind contributions from his church.
- **Frustrations:** Orgs that don't provide transparency about how church funds are used. Difficulty getting organized reports for church board meetings. In-kind donations that go unacknowledged or untracked.
- **Key Question:** "If our church partners with Beacon of Hope, how will our contributions be tracked and reported back to us?"

---

## User Stories

### Supporter Management

**US-1: View supporter directory**
As Grace (donor relations), I want to see a searchable directory of all supporters, so that I can manage donor relationships.
- **Acceptance Criteria:**
  - Table view with columns: name, supporter type, status, total given (lifetime), last donation date, city/country
  - Searchable by name, email, organization name
  - Sortable by any column
  - Pagination: 20 per page (10/20/50/100 options)
  - Quick filter tabs: All, Active, Lapsed (no donation in 6+ months), Major Donors (>$5,000 lifetime), New (joined in last 90 days)
  - Total supporter count displayed

**US-2: Create new supporter profile**
As Grace (donor relations), I want to create a new supporter profile, so that I can track a new donor or partner.
- **Acceptance Criteria:**
  - Form fields:
    - Name (first, last -- or organization name for churches/businesses)
    - Supporter type (multi-select: Monetary Donor, Volunteer, Skills Provider, In-Kind Donor, Social Media Advocate, Prayer Partner)
    - Status (Active, Inactive, Prospective, Lapsed)
    - Contact info: email, phone, mailing address, preferred contact method
    - Organization affiliation (optional: church, company, foundation)
    - Notes (free text for relationship notes)
    - How they heard about us (dropdown: referral, social media, church, event, website, other)
    - Preferred communication frequency (monthly, quarterly, annually)
  - Required fields: name, at least one supporter type, email or phone
  - Duplicate detection: warn if email already exists

**US-3: View supporter detail profile**
As Grace (donor relations), I want to see a complete supporter profile with giving history, so that I can prepare for donor calls.
- **Acceptance Criteria:**
  - Profile page at /donors/:supporterId
  - Sections:
    - Contact Information
    - Supporter Types & Status
    - Donation History (table of all donations, sorted newest first)
    - In-Kind Donations (separate list with item details)
    - Allocation Summary (pie chart: how their donations were distributed)
    - Relationship Notes & Communication Log
  - Lifetime giving total prominently displayed
  - "Edit Profile" button (staff/admin)
  - "Record Donation" quick action button

**US-4: Edit supporter profile**
As Grace (donor relations), I want to update supporter information, so that records stay current when donors move or change contact preferences.
- **Acceptance Criteria:**
  - Inline edit on the supporter detail page
  - All fields editable by staff and admin
  - Status change from Active to Lapsed triggers a "reactivation outreach" reminder
  - Changes logged in audit trail
  - Cancel reverts to saved state

**US-5: Donor self-service profile**
As Maria (donor), I want to view and update my own profile, so that I can manage my contact information.
- **Acceptance Criteria:**
  - Donor portal at /donor/portal shows Maria's own profile
  - Can view: name, email, phone, mailing address, communication preferences
  - Can edit: phone, mailing address, communication preferences
  - Cannot edit: name, email (must contact admin for these changes)
  - Cannot see other supporters' data

### Donation Recording

**US-6: Record a monetary donation**
As Grace (donor relations), I want to record a monetary donation, so that all giving is tracked in the system.
- **Acceptance Criteria:**
  - Form fields:
    - Supporter (searchable dropdown)
    - Amount (currency input with PHP/USD selector)
    - Date received
    - Payment method (Cash, Check, Bank Transfer, Credit Card, Online/PayPal, Mobile Payment)
    - Reference number (check number, transaction ID)
    - Donation type (One-Time, Recurring, Pledge Fulfillment, Campaign)
    - Campaign/Fund (dropdown from active campaigns, or "General/Undesignated")
    - Designation (dropdown: General Operations, Safehouse 1, Safehouse 2, Safehouse 3, Education Program, Health Program, Specific Resident Support)
    - Notes
    - Receipt sent (checkbox)
  - Required: supporter, amount, date, payment method
  - Auto-generates a donation ID
  - Confirmation: "Donation of $200.00 from Maria Chen recorded successfully"

**US-7: Record recurring donation schedule**
As Grace (donor relations), I want to flag a donation as recurring with a schedule, so that I can track expected monthly/quarterly gifts.
- **Acceptance Criteria:**
  - Recurring donation toggle on the donation form
  - If recurring: frequency (Monthly, Quarterly, Annually), start date, expected amount
  - Recurring donations appear in a "Expected Donations" report
  - When recording a new donation from a recurring donor, system suggests the expected amount
  - Alert if a recurring donor misses an expected donation (based on frequency)

**US-8: Record in-kind donation**
As Grace (donor relations), I want to record in-kind donations with item details, so that non-monetary giving is tracked.
- **Acceptance Criteria:**
  - In-kind donation form:
    - Supporter
    - Date received
    - Items (repeatable group): item description, category (Clothing, Food, School Supplies, Hygiene Products, Medical Supplies, Furniture, Electronics, Other), quantity, estimated value (optional)
    - Condition (New, Gently Used, Used)
    - Designated safehouse (optional)
    - Received by (staff member)
    - Photo of items (optional upload, max 5 photos)
    - Notes
  - Items stored in `in_kind_donation_items` table
  - Total estimated value calculated and displayed
  - Acknowledgment letter can be generated

**US-9: Record volunteer/skills contribution**
As Grace (donor relations), I want to record volunteer hours and skills contributions, so that non-monetary support is valued and tracked.
- **Acceptance Criteria:**
  - Contribution form for non-monetary types:
    - Supporter
    - Contribution type (Volunteer Time, Professional Skills, Social Media Advocacy)
    - Date(s) of contribution
    - Hours contributed (for volunteer/skills)
    - Description of contribution
    - Safehouse/program benefited
    - Impact notes
  - For Social Media Advocacy: link to post, platform, estimated reach (optional)
  - Linked to `social_media_posts` table for advocacy contributions
  - Volunteer hours aggregated on supporter profile

### Donation Allocations

**US-10: Allocate donations to safehouses/programs**
As Director Reyes (admin), I want to allocate donations across safehouses and program areas, so that funds are distributed according to need and donor intent.
- **Acceptance Criteria:**
  - Allocation form accessible from the donation detail page
  - For designated donations: pre-populated with the donor's specified allocation
  - For undesignated donations: admin selects allocation percentages across safehouses and programs
  - Allocation categories: Safehouse 1, Safehouse 2, Safehouse 3, Education Program, Health & Wellness, Staff Development, Operations, Emergency Fund
  - Percentages must sum to 100%
  - Allocation saved to `donation_allocations` table
  - Allocation displayed on the donation record and the donor's profile

**US-11: View allocation dashboard**
As Director Reyes (admin), I want to see how donations are allocated across safehouses and programs, so that I can ensure equitable distribution.
- **Acceptance Criteria:**
  - Dashboard showing allocation totals by safehouse and program area
  - Time period filter: this month, this quarter, this year, custom range
  - Visual: stacked bar chart or pie chart showing distribution
  - Comparison view: allocation vs. budget/need per safehouse
  - Unallocated donations highlighted (need admin action)
  - Drill-down: click a safehouse to see individual donations allocated there

**US-12: Donor sees their allocation**
As Maria (donor), I want to see how my donations were allocated, so that I know my money is going where I intended.
- **Acceptance Criteria:**
  - Donor portal shows allocation for each donation
  - Pie chart of lifetime allocation across safehouses/programs
  - If a donation was designated, confirmation that it was allocated as specified
  - If a donation was undesignated, shows where admin allocated it
  - No access to other donors' allocations

### Donor Portal (Self-Service)

**US-13: Donor donation history**
As Maria (donor), I want to see my complete donation history, so that I can track my giving.
- **Acceptance Criteria:**
  - Chronological list of all donations (newest first)
  - Each entry: date, amount, type, payment method, campaign, allocation
  - Total giving: this year, last year, lifetime
  - Filter by year, donation type
  - Pagination for donors with extensive history

**US-14: Download tax receipt**
As Maria (donor), I want to download a tax receipt for my donations, so that I can claim charitable deductions.
- **Acceptance Criteria:**
  - "Download Receipt" button per donation and "Annual Summary" button per year
  - Individual receipt: PDF with org name, EIN (501(c)(3) number), donor name, donation date, amount, statement that no goods/services were provided in exchange
  - Annual summary: PDF listing all donations for the calendar year with total
  - PDF includes Beacon of Hope letterhead and authorized signature
  - Download logged for audit

**US-15: Donor communication preferences**
As Maria (donor), I want to manage how often I hear from Beacon of Hope, so that I'm not overwhelmed with emails.
- **Acceptance Criteria:**
  - Communication preferences section in donor portal
  - Options: receive updates (monthly/quarterly/never), receive donation receipts by email (yes/no), receive annual impact report (yes/no)
  - Preferences saved to supporter profile
  - Unsubscribe from all non-transactional communications with one click
  - Changes take effect immediately

### Search, Filter & Reporting

**US-16: Filter supporters by type and status**
As Grace (donor relations), I want to filter supporters by type and status, so that I can segment donors for targeted outreach.
- **Acceptance Criteria:**
  - Filter bar with dropdowns:
    - Supporter type (multi-select: all types)
    - Status (Active, Inactive, Lapsed, Prospective)
    - Giving level: Major ($5,000+), Mid-Level ($1,000-$4,999), Regular ($100-$999), Small (<$100)
    - Last donation date range
    - Location (country, state/province)
  - Filters combinable
  - Result count updates in real time
  - "Save Filter" option to create reusable segments (e.g., "Lapsed Major Donors")

**US-17: Donation search and filter**
As Grace (donor relations), I want to search and filter the donation list, so that I can find specific transactions.
- **Acceptance Criteria:**
  - Donation list page showing all donations (staff/admin)
  - Searchable by: donor name, donation ID, reference number
  - Filterable by: date range, amount range, payment method, donation type, campaign, safehouse allocation
  - Sortable by: date, amount, donor name
  - Total amount displayed for current filter results
  - Pagination: 20 per page

**US-18: Lapsed donor identification**
As Grace (donor relations), I want to see which recurring donors have stopped giving, so that I can reach out for reactivation.
- **Acceptance Criteria:**
  - "Lapsed Donors" report showing supporters who:
    - Had recurring donations but missed 2+ expected payments
    - Were active donors but haven't given in 6+ months
  - Columns: name, last donation date, days since last donation, previous frequency, lifetime total
  - Sorted by: most recently lapsed first
  - "Send Reactivation Outreach" action to log that outreach was attempted
  - Report exportable to CSV

**US-19: Campaign performance tracking**
As Director Reyes (admin), I want to see donation totals by campaign, so that I can evaluate fundraising effectiveness.
- **Acceptance Criteria:**
  - Campaign summary view: campaign name, goal amount, raised amount, progress percentage, donor count, average gift
  - Progress bar visual for each campaign
  - Date range for active campaigns
  - Drill-down to see individual donations within a campaign
  - Compare campaigns side-by-side
  - Create/edit campaigns (admin only): name, goal, start/end dates, description

### Bulk Operations

**US-20: Bulk donation entry**
As Grace (donor relations), I want to enter multiple donations at once (e.g., from a church collection), so that batch processing is efficient.
- **Acceptance Criteria:**
  - "Bulk Entry" mode on the donation page
  - Spreadsheet-like interface: rows for each donation, columns for supporter, amount, date, method, campaign
  - Auto-complete for supporter names
  - "Add Row" button; minimum 5 rows shown
  - Validation runs on all rows before submission
  - Summary before confirmation: "Create 12 donations totaling $3,450?"
  - All donations logged individually with the same batch ID for audit

**US-21: Export supporter and donation data**
As Director Reyes (admin), I want to export supporter and donation data to CSV, so that I can prepare board reports and mail merges.
- **Acceptance Criteria:**
  - Export buttons on supporter list and donation list (admin only)
  - Exports respect current filters
  - Supporter export columns: name, email, phone, address, type, status, lifetime giving, last donation date
  - Donation export columns: date, donor name, amount, type, method, campaign, allocation
  - Filename includes date and filter context
  - Export logged in audit trail

### Security & Privacy

**US-22: Donor data isolation**
As Maria (donor), I want to be certain I can only see my own data, so that my giving is private.
- **Acceptance Criteria:**
  - Donor role API endpoints filter by authenticated user's supporter_id
  - No endpoint returns other donors' data to donor role
  - Attempting to access another donor's profile returns 403
  - Donor cannot see staff views of the supporter directory
  - Automated test verifies data isolation

**US-23: Financial data audit trail**
As Director Reyes (admin), I want all donation records and allocations logged immutably, so that financial integrity is verifiable.
- **Acceptance Criteria:**
  - Every donation create/edit logged: user, timestamp, all field values
  - Every allocation create/change logged similarly
  - Audit entries immutable
  - Accessible to admin from donation detail and supporter detail pages
  - Exportable for financial audit

### Performance & Accessibility

**US-24: Mobile-responsive donor portal**
As Maria (on her phone), I want the donor portal to work well on mobile, so that I can check my donations during my commute.
- **Acceptance Criteria:**
  - Donation history in card layout on mobile (not table)
  - Allocation pie chart responsive and readable
  - PDF download works on mobile (opens in browser or downloads)
  - All touch targets minimum 44px
  - No horizontal scroll

**US-25: Fast supporter directory loading**
As Grace (with 200+ supporters), I want the directory to load within 2 seconds, so that I can find donors quickly.
- **Acceptance Criteria:**
  - Server-side pagination and filtering
  - Search debounced at 300ms
  - Skeleton loading states
  - Saved filters load instantly from localStorage
  - Initial load shows the most recently active supporters

---

## Definition of Done

- [ ] Supporter directory displays a paginated, searchable, filterable table of all supporters
- [ ] Supporter profiles show contact info, types, status, donation history, in-kind donations, allocation summary, and relationship notes
- [ ] Create/edit supporter forms with duplicate detection and audit logging
- [ ] Monetary donation recording with all fields: amount, date, method, type, campaign, designation
- [ ] Recurring donation tracking with expected payment alerts for missed donations
- [ ] In-kind donation recording with item details, quantities, estimated values, and photos
- [ ] Volunteer/skills contribution recording with hours and impact tracking
- [ ] Donation allocation to safehouses/programs with percentage-based distribution
- [ ] Allocation dashboard with visual charts and drill-down capability
- [ ] Donor self-service portal: view own history, download tax receipts (individual and annual PDF), manage communication preferences
- [ ] Donor data isolation: donor role sees only own data, verified by tests
- [ ] Supporter filtering by type, status, giving level, recency, location; saved filter segments
- [ ] Lapsed donor identification report with reactivation tracking
- [ ] Campaign performance tracking with goals, progress bars, and comparison
- [ ] Bulk donation entry with spreadsheet-like interface
- [ ] CSV export for supporters and donations (admin only)
- [ ] Financial audit trail for all donation and allocation changes
- [ ] Mobile-responsive donor portal and staff views (360px+)
- [ ] All 25 user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox

---

## Critique & Improvement Notes

### Coverage Assessment

**Supporter types:** All four required types are covered (monetary donor, volunteer, skills contributor, social media advocate). The plan actually goes beyond by adding In-Kind Donor and Prayer Partner as additional types in US-2. This is fine but the core four from the requirement are present.

**Donation/contribution types:** All five required types are covered: monetary (US-6/US-7), in-kind (US-8), time/volunteer (US-9), skills (US-9), and social media (US-9). Good coverage.

**Supporter status management (active/inactive):** Covered in US-2 with statuses Active, Inactive, Prospective, Lapsed. The requirement only specifies active/inactive but the additions are reasonable. US-4 covers status transitions. US-18 covers lapsed donor identification.

**Donation allocation tracking across safehouses AND program areas:** Well covered by US-10, US-11, and US-12. Allocation categories include both safehouses and program areas.

**Campaign tracking:** Covered by US-19 with campaign creation, goals, progress tracking, and drill-down.

**In-kind donation item tracking (quantity, estimated value, condition):** Covered in US-8 with quantity, estimated value, condition (New, Gently Used, Used), plus category and photos.

**RBAC (admin CUD, donor sees own history):** Covered in the RBAC section and enforced through US-5, US-12, US-13, US-22. However, see gaps below.

### Gaps and Issues

1. **RBAC is too permissive for Staff/Employee role.** The requirement says staff can "view, create, and manage" supporter profiles -- but the RBAC section gives Staff "limited edit." The plan should clarify exactly what Staff can and cannot edit. The requirement implies Staff should have full CUD on supporters and donations. Consider: should Staff be able to delete donations? The requirement says "manage" which typically includes update but not necessarily delete. Recommend: Staff gets Create and Update on supporters and donations; only Admin gets Delete.

2. **No explicit Delete story.** There is no user story for deleting a supporter or a donation. Even if soft-delete is intended, there should be a story covering deactivation/archival of supporter records and voiding/canceling erroneous donation entries. Add a US for "void/cancel a donation" (admin only) and "archive a supporter" (admin only).

3. **Campaign CRUD is buried.** US-19 mentions "Create/edit campaigns (admin only)" as a sub-bullet of acceptance criteria. This deserves its own user story since campaigns are a first-class entity referenced throughout the donation recording flow (US-6 uses a campaign dropdown). A separate US for campaign management would make the scope clearer.

4. **Partner/organizational supporter flow is underdeveloped.** The Database Tables section lists `partners` and `partner_assignments` tables, and Persona 4 (Pastor Okafor) is specifically about church partnerships. But no user story addresses creating or managing partner records, linking partners to safehouses, or tracking partner-level contribution rollups. Either add user stories for partner management or remove the partner tables from scope and handle organizational supporters purely through the supporter profile's "organization affiliation" field.

5. **Donation edit/correction story is missing.** US-6 covers creation, but there is no explicit story for editing a recorded donation (correcting an amount, changing the date, updating allocation). US-23 mentions edit logging, which implies editing is possible, but there is no story defining the edit flow and who can do it. Add a US: "As Grace, I want to correct a donation record so that errors can be fixed while maintaining an audit trail."

6. **Social media advocacy tracking is thin.** US-9 bundles social media advocacy with volunteer/skills contributions. Given that the `social_media_posts` table is listed and social media is a distinct contribution type in the requirement, consider a dedicated story or at least more detailed acceptance criteria: platform options, post type (share, original content, story), engagement metrics beyond "estimated reach," and whether posts are verified by staff.

7. **No mention of the `campaigns` table.** The Database Tables section lists supporters, donations, donation_allocations, in_kind_donation_items, social_media_posts, partners, and partner_assignments -- but US-19 requires campaign tracking. A `campaigns` table (or equivalent) should be listed.

8. **Donor role RBAC needs tightening in RBAC section.** The RBAC section says "Donor: View own profile and own donation history only; no access to other donors' data." This is correct but should explicitly state: Donor has NO create, update, or delete on donations or supporters (except limited self-profile edits per US-5). The current wording could be interpreted as allowing donors to create donations.

9. **Tax receipt generation (US-14) may be out of scope for MVP.** Generating PDFs with letterhead, authorized signatures, and EIN numbers is non-trivial. If this is a "nice to have," mark it as such. If required, ensure the backend PDF generation approach is planned (e.g., a library like QuestPDF for .NET or a React-PDF solution for the frontend).

10. **Bulk entry (US-20) complexity.** The spreadsheet-like interface with auto-complete and batch validation is a significant UI effort. Consider whether this is MVP or a stretch goal. A simpler alternative for MVP: CSV upload with validation and preview.

### Recommended Additions

- **US-NEW-A: Void/cancel a donation (Admin only).** Admin can void a donation entry with a reason. Voided donations are excluded from totals but remain visible in audit trail with a "VOIDED" badge.
- **US-NEW-B: Archive a supporter (Admin only).** Admin can archive a supporter, removing them from the active directory but preserving all history. Archived supporters can be restored.
- **US-NEW-C: Manage campaigns (Admin only).** Full CRUD for campaigns: name, description, goal amount, start/end dates, status (draft/active/completed/cancelled). Campaign dropdown in donation form pulls from active campaigns only.
- **US-NEW-D: Edit a donation record.** Staff/Admin can edit donation fields (amount, date, method, campaign, notes) with all changes logged in the audit trail. Original values preserved in audit log.
- Add `campaigns` to the Database Tables list.
- Clarify Staff role permissions: "Staff/Employee: Full Create and Read on supporters and donations; Update on supporters and donations they created; no Delete access."

---

## Requirements Coverage Matrix

This matrix maps each IS413 and IS414 requirement phrase to the plan's user stories, and flags coverage status.

| # | Requirement (source) | Plan Coverage | Status |
|---|----------------------|---------------|--------|
| 1 | "View ... supporter profiles" (IS413) | US-1 (directory), US-3 (detail profile) | COVERED |
| 2 | "Create ... supporter profiles" (IS413) | US-2 (create new supporter) | COVERED |
| 3 | "Manage supporter profiles" (IS413) | US-4 (edit), US-NEW-B (archive). No explicit delete/void story for supporters in original plan. | GAP -- add US-NEW-B |
| 4 | "Classification by type (monetary donor, volunteer, skills contributor, etc.)" (IS413) | US-2 multi-select: Monetary Donor, Volunteer, Skills Provider, In-Kind Donor, Social Media Advocate, Prayer Partner | COVERED (exceeds requirement) |
| 5 | "Status (active/inactive)" (IS413) | US-2 statuses: Active, Inactive, Prospective, Lapsed. US-4 status transitions. | COVERED (exceeds requirement) |
| 6 | "Tracks all types of contributions -- monetary" (IS413) | US-6 (record monetary), US-7 (recurring) | COVERED |
| 7 | "Tracks all types of contributions -- in-kind" (IS413) | US-8 (in-kind with items, quantities, values, condition). Maps to `in_kind_donation_items` table. | COVERED |
| 8 | "Tracks all types of contributions -- time" (IS413) | US-9 (volunteer hours) | COVERED |
| 9 | "Tracks all types of contributions -- skills" (IS413) | US-9 (professional skills contribution) | COVERED |
| 10 | "Tracks all types of contributions -- social media" (IS413) | US-9 (social media advocacy). Maps to `social_media_posts` table. | COVERED (thin -- see critique #6) |
| 11 | "Record and review donation activity" (IS413) | US-6 (record), US-17 (search/filter donations), US-3 (review on profile). Missing: edit existing donation. | GAP -- add US-NEW-D |
| 12 | "Viewing donation allocations across safehouses" (IS413) | US-10 (allocate), US-11 (allocation dashboard by safehouse), US-12 (donor sees allocation). Maps to `donation_allocations` with `safehouse_id` FK. | COVERED |
| 13 | "Viewing donation allocations across program areas" (IS413) | US-10 (allocation categories include program areas), US-11 (dashboard shows program area totals). Maps to `donation_allocations.program_area` column. | COVERED |
| 14 | "Only admin user can CUD" (IS414 RBAC, 1.5 pts) | RBAC section: Admin full CRUD. But Staff also has Create -- need to reconcile. IS414 says "only admin" for CUD; IS413 says staff can "create and manage." Resolution: Staff gets Create (per IS413), Admin gets Update/Delete. Deletion requires confirmation (IS414 Integrity). | NEEDS CLARIFICATION -- Staff Create is required by IS413 but IS414 says only admin CUD. Document the reconciliation explicitly. |
| 15 | "Only authenticated users who are donors should be able to see their donor history and the impact of those donations" (IS414 RBAC) | US-5 (donor self-service profile), US-12 (donor sees allocation/impact), US-13 (donor donation history), US-22 (data isolation). | COVERED |
| 16 | "Confirmation required to delete data" (IS414 Integrity, 1 pt) | Not explicitly in any user story. US-NEW-A (void donation) and US-NEW-B (archive supporter) need confirmation modals. | GAP -- add confirmation dialog requirement to US-NEW-A and US-NEW-B |
| 17 | "Campaign tracking" (implied by IS413 donation activity + campaign_name in DB) | US-19 (campaign performance). But campaign CRUD is only a sub-bullet, not a standalone story. No `campaigns` table in schema -- `campaign_name` is a text field on `donations` and `social_media_posts`. | GAP -- add US-NEW-C; decide whether campaigns table is needed or if campaign_name text field suffices |
| 18 | "APIs should have appropriate authentication/authorization" (IS414) | US-22 (donor data isolation at API level), RBAC section. Need to ensure every API endpoint is locked down, not just the UI. | COVERED in plan intent; verify during implementation |

### Schema-to-Plan Alignment

| DB Table | Plan References | Notes |
|----------|----------------|-------|
| `supporters` | US-1 through US-5, US-16 | Primary entity. Columns align well: `supporter_type`, `status`, `display_name`, `organization_name`, `email`, `phone`, `region`, `country`, `acquisition_channel`. Missing from schema: `mailing_address`, `preferred_contact_method`, `communication_frequency`, `notes`. These may need migration or can be stored differently. |
| `donations` | US-6, US-7, US-8, US-9, US-17 | Schema has `donation_type`, `amount`, `donation_date`, `channel_source`, `currency_code`, `is_recurring`, `campaign_name`, `notes`. Missing from schema: `payment_method` (vs `channel_source`?), `reference_number`, `designation`, `receipt_sent`. Clarify mapping. |
| `donation_allocations` | US-10, US-11, US-12 | Schema has `safehouse_id`, `program_area`, `amount_allocated`, `allocation_date`. Supports both safehouse and program area allocation as required. Does NOT store percentage -- stores absolute amount. Plan US-10 says "percentages must sum to 100%" but schema stores amounts. UI can compute percentages from amounts. |
| `in_kind_donation_items` | US-8 | Schema has `item_name`, `item_category`, `quantity`, `unit_of_measure`, `estimated_unit_value`, `intended_use`, `received_condition`. Good alignment. Missing from schema: `photo` (US-8 mentions optional photo upload). |
| `social_media_posts` | US-9 (social media advocacy) | This table is primarily an analytics/content table, not a "contribution" table. It tracks post metrics (impressions, reach, likes, etc.), not supporter contributions. The link between a supporter's advocacy and this table is unclear -- there is no `supporter_id` on `social_media_posts`. The `donations.referral_post_id` FK goes the other direction (post led to donation). Plan needs to clarify how advocacy contributions link to supporters. |
| `partners` / `partner_assignments` | Listed in Database Tables section | No user stories cover partner CRUD. Critique #4 flagged this. Either add partner stories or remove from scope. |

### RBAC Reconciliation (IS413 vs IS414)

The IS413 requirement says staff can "view, create, and manage" supporter profiles and donation activity. The IS414 requirement says "only an authenticated user with an admin role should be able to add, modify, or in rare cases delete data." These appear to conflict.

**Recommended resolution:** IS414 also says "You may choose whether or not to have a staff (or employee) role that differs from the admin user." This means having a Staff role is optional. If we include a Staff role, it must be a deliberate, documented subset of Admin. Propose:
- **Admin:** Full CRUD on all entities. Delete requires confirmation modal (IS414 Integrity).
- **Staff:** Create and Read on supporters and donations. Update only on records they created. No Delete.
- **Donor:** Read-only on own data (supporters record where supporter_id matches auth user). Limited Update on own contact preferences (US-5). No Create/Delete on any entity.

This satisfies IS413 ("staff can create and manage") and IS414 ("only admin can CUD" for the full CUD, staff gets a limited subset with explicit justification).

---

## Above and Beyond Ideas

These are features that go beyond the stated requirements and could earn distinction in the video demo. Ordered by estimated impact-to-effort ratio.

### High Impact, Moderate Effort

1. **Donor Impact Dashboard (personalized).** When a donor logs in, show a visual summary: "Your $2,400 this year helped house 3 residents and funded 12 counseling sessions." Pull from `donation_allocations` joined to `safehouse_monthly_metrics` and `residents` counts. This directly satisfies the IS414 RBAC note about donors seeing "the impact of those donations" and turns a data requirement into a compelling feature.

2. **Real-time allocation visualization.** Interactive Sankey diagram or alluvial chart showing money flow: Donors -> Campaigns -> Safehouses -> Programs. Built with D3 or Recharts. Admins see the full picture; donors see only their own flow. This makes the allocation requirement visually memorable for the video.

3. **Donation trend sparklines on supporter directory.** Each row in the supporter table shows a tiny sparkline of their last 12 months of giving. Instant visual of engagement trajectory without clicking into the profile. Lightweight to render, impressive in demo.

### Medium Impact, Low Effort

4. **Smart lapsed donor alerts.** Instead of a static report (US-18), add a banner/notification on the admin dashboard: "4 recurring donors have missed expected payments this month." Click to see the list. Adds proactive intelligence beyond the basic report.

5. **Donation receipt PDF generation.** Implement US-14 with a client-side PDF library (e.g., `@react-pdf/renderer`). Include org letterhead, donor info, donation details, and IRS-required language. Annual summary rolls up all donations for a calendar year. This is explicitly in the plan but would be considered above-and-beyond if done well with professional formatting.

6. **CSV import for bulk donations.** Simpler alternative to the spreadsheet-like UI in US-20. Drag-and-drop a CSV, preview parsed rows in a table, validate, then bulk insert. Lower UI complexity, same functional outcome.

7. **Audit trail viewer.** A dedicated admin page showing a chronological log of all donation and supporter changes. Filter by entity, user, date range. Each entry shows before/after diff. This is required by US-23 but building it as a polished, searchable timeline would stand out.

### Stretch Goals (High Effort, High Wow Factor)

8. **Donor self-registration flow.** Allow Pastor Okafor (Persona 4) to register as a supporter from the public site, creating a pending supporter record that staff can approve. Bridges the gap between the public landing page and the authenticated donor portal.

9. **Campaign thermometer widget.** Embeddable progress bar for active campaigns that could be shown on the public impact page. Shows goal, raised amount, donor count, days remaining. Updates in real time via Supabase subscriptions.

10. **Donation heatmap calendar.** GitHub-style contribution calendar on the supporter detail page showing donation activity by day over the past year. Visually compelling and easy to implement with a library like `react-calendar-heatmap`.

---

## Implementation Plan

This plan covers backend API endpoints, frontend components, schema considerations, RBAC enforcement, files to create/modify, and a suggested build order. Tech stack: .NET 10 minimal APIs, React + Vite + TypeScript, EF Core + PostgreSQL.

---

### 1. Backend API Endpoints

All endpoints live under `/api` and are grouped by authorization context. Every endpoint requires authentication (JWT) unless noted. Role checks are enforced at the endpoint level via policy-based authorization.

#### 1.1 Admin/Staff Supporter Endpoints

| Method | Route | Role(s) | Description |
|--------|-------|---------|-------------|
| GET | `/api/admin/supporters` | Admin, Staff | Paginated supporter directory. Query params: `page`, `pageSize`, `search` (name/email/org), `type` (supporter_type enum, multi-value), `status` (Active/Inactive/Lapsed/Prospective), `channel` (acquisition_channel), `givingLevel` (Major/Mid/Regular/Small), `lastDonationBefore`, `lastDonationAfter`, `country`, `sortBy`, `sortDir`. Returns: `{ items: Supporter[], totalCount, page, pageSize }`. Includes computed fields: `lifetimeGiving`, `lastDonationDate`. |
| GET | `/api/admin/supporters/{id}` | Admin, Staff | Full supporter profile. Includes nested: `donationHistory` (last 20, paginated via separate call), `inKindDonations`, `allocationSummary` (aggregated by safehouse and program area), `lifetimeGiving`, `socialMediaPosts`. |
| POST | `/api/admin/supporters` | Admin, Staff | Create supporter. Body: `{ firstName, lastName, organizationName?, supporterTypes[], status, email?, phone?, region?, country?, acquisitionChannel?, notes?, preferredContactMethod?, communicationFrequency? }`. Validates: at least one of email/phone required, at least one supporterType. Returns 409 if email already exists (duplicate detection). |
| PUT | `/api/admin/supporters/{id}` | Admin, Staff (own records or all for Admin) | Update supporter. Same body as POST. Staff can update records they created; Admin can update any. Changes written to audit log. Status change to Lapsed triggers a flag for reactivation outreach. |
| DELETE | `/api/admin/supporters/{id}` | Admin | Soft-delete (archive). Sets `is_archived = true`, `archived_at = now()`. Archived supporters excluded from directory queries by default. Query param `includeArchived=true` to show them. Returns 400 if supporter has unresolved donations. |

#### 1.2 Admin/Staff Donation Endpoints

| Method | Route | Role(s) | Description |
|--------|-------|---------|-------------|
| GET | `/api/admin/donations` | Admin, Staff | Paginated donation list. Query params: `page`, `pageSize`, `search` (donor name, donation ID, reference number), `dateFrom`, `dateTo`, `amountMin`, `amountMax`, `paymentMethod`, `donationType`, `campaignName`, `safehouseId` (via allocation join), `sortBy`, `sortDir`. Returns: `{ items: Donation[], totalCount, totalAmount }`. |
| GET | `/api/admin/donations/{id}` | Admin, Staff | Single donation with allocations, in-kind items (if applicable), and audit trail entries. |
| POST | `/api/admin/donations` | Admin, Staff | Create donation. Body: `{ supporterId, amount?, currencyCode?, donationDate, donationType, channelSource?, referenceNumber?, campaignName?, designation?, notes?, isRecurring?, recurringFrequency?, receiptSent?, items[]? (for in-kind: { itemName, itemCategory, quantity, unitOfMeasure?, estimatedUnitValue?, receivedCondition?, intendedUse? }), hoursContributed? (for volunteer/skills), socialMediaPostUrl? }`. Validates required fields per donation type. For in-kind, creates parent `donations` row + child `in_kind_donation_items` rows in a transaction. |
| PUT | `/api/admin/donations/{id}` | Admin, Staff (own records or all for Admin) | Update donation fields. All changes logged to audit trail with before/after values. Cannot change `supporterId` (must void and re-create). |
| POST | `/api/admin/donations/{id}/void` | Admin | Void a donation. Body: `{ reason }`. Sets `is_voided = true`, `voided_at`, `void_reason`. Voided donations excluded from totals but visible in audit trail. Cascades: voids related allocations. |
| POST | `/api/admin/donations/bulk` | Admin, Staff | Bulk create. Body: `{ donations: CreateDonationDto[] }`. Validates all rows, returns errors per row index. Creates all in a single transaction with a shared `batch_id`. Returns `{ created: number, batchId: string }`. |

#### 1.3 Donation Allocation Endpoints

| Method | Route | Role(s) | Description |
|--------|-------|---------|-------------|
| GET | `/api/admin/allocations` | Admin, Staff | Aggregated allocation data. Query params: `dateFrom`, `dateTo`, `safehouseId`, `programArea`, `groupBy` (safehouse, programArea, both). Returns: `{ allocations: [{ safehouseId?, safehouseName?, programArea?, totalAllocated, donationCount }], unallocatedTotal }`. |
| GET | `/api/admin/allocations/by-safehouse` | Admin, Staff | Allocation totals grouped by safehouse. Query params: `dateFrom`, `dateTo`. Returns array with safehouse name, total allocated, donation count. |
| GET | `/api/admin/allocations/by-program` | Admin, Staff | Allocation totals grouped by program area. Query params: `dateFrom`, `dateTo`. |
| POST | `/api/admin/donations/{donationId}/allocations` | Admin | Create/replace allocations for a donation. Body: `{ allocations: [{ safehouseId?, programArea, amountAllocated }] }`. Validates: sum of `amountAllocated` equals donation amount. Replaces existing allocations (delete + insert in transaction). Logged to audit trail. |
| GET | `/api/admin/donations/{donationId}/allocations` | Admin, Staff | Get allocations for a specific donation. |

#### 1.4 Donor (Self-Service) Endpoints

These endpoints are scoped to the authenticated user's `supporter_id` (stored in JWT claims or looked up via `auth_user_id` on the `supporters` table).

| Method | Route | Role(s) | Description |
|--------|-------|---------|-------------|
| GET | `/api/donor/my-profile` | Donor | Returns the authenticated donor's supporter record. If no matching supporter found, returns 404. |
| PUT | `/api/donor/my-profile` | Donor | Update limited fields: `phone`, `region`, `country`, `communicationFrequency`, `preferredContactMethod`. Cannot change `firstName`, `lastName`, `email`. |
| GET | `/api/donor/my-donations` | Donor | Paginated donation history filtered to `supporter_id` matching the authenticated user. Query params: `page`, `pageSize`, `year`, `donationType`. Returns: `{ items: DonationSummaryDto[], totalCount, totalThisYear, totalLastYear, totalLifetime }`. Each item includes its allocations. |
| GET | `/api/donor/my-donations/{id}` | Donor | Single donation detail. Returns 403 if the donation does not belong to the authenticated donor. Includes allocations. |
| GET | `/api/donor/my-allocations` | Donor | Aggregated allocation summary for the donor's donations. Returns: `{ allocations: [{ safehouseName, programArea, totalAllocated }] }` suitable for rendering a pie chart. |

#### 1.5 Export Endpoints

| Method | Route | Role(s) | Description |
|--------|-------|---------|-------------|
| GET | `/api/admin/supporters/export` | Admin | CSV export of supporters. Respects the same filter query params as the list endpoint. Returns `text/csv` with `Content-Disposition: attachment`. |
| GET | `/api/admin/donations/export` | Admin | CSV export of donations. Same filter params as list endpoint. |

#### 1.6 Campaign Endpoints (Lightweight)

Campaigns are stored as `campaign_name` text on the `donations` table (no separate campaigns table). These endpoints aggregate from donation data.

| Method | Route | Role(s) | Description |
|--------|-------|---------|-------------|
| GET | `/api/admin/campaigns` | Admin, Staff | Distinct campaign names with aggregated stats: `{ campaignName, totalRaised, donorCount, averageGift, firstDonationDate, lastDonationDate }`. Sorted by most recent activity. |
| GET | `/api/admin/campaigns/{name}/donations` | Admin, Staff | Donations filtered to a specific campaign name. Standard pagination. |

---

### 2. Frontend Components

All components live under `src/` in the React app. Use a feature-based folder structure.

#### 2.1 Directory Structure

```
src/
  features/
    supporters/
      SupporterDirectory.tsx        -- US-1, US-16, US-25
      SupporterProfile.tsx          -- US-3
      SupporterForm.tsx             -- US-2, US-4
      SupporterFilters.tsx          -- US-16 filter bar
      components/
        SupporterTable.tsx          -- Reusable table with sorting/pagination
        SupporterCard.tsx           -- Mobile card layout alternative
        DonationSparkline.tsx       -- Above-and-beyond: sparkline in table row
      hooks/
        useSupporters.ts            -- React Query hook for GET /api/admin/supporters
        useSupporter.ts             -- React Query hook for GET /api/admin/supporters/:id
        useSupporterMutations.ts    -- Create/update/delete mutations
    donations/
      DonationList.tsx              -- US-17
      DonationDetail.tsx            -- Single donation view with allocations
      DonationForm.tsx              -- US-6, US-7, US-8, US-9 (type-specific fields)
      DonationFilters.tsx           -- US-17 filter bar
      BulkDonationEntry.tsx         -- US-20
      components/
        MonetaryFields.tsx          -- Amount, currency, payment method, reference #
        InKindFields.tsx            -- Repeatable item rows (name, category, qty, value, condition)
        VolunteerFields.tsx         -- Hours, description, safehouse/program
        SocialMediaFields.tsx       -- Post URL, platform, reach
        DonationTypeSelector.tsx    -- Tabs or radio to switch between type-specific forms
      hooks/
        useDonations.ts
        useDonationMutations.ts
    allocations/
      AllocationView.tsx            -- US-11 dashboard (charts + drill-down)
      AllocationForm.tsx            -- US-10 (percentage/amount inputs per safehouse/program)
      components/
        AllocationPieChart.tsx      -- Recharts pie chart
        AllocationBarChart.tsx      -- Stacked bar by safehouse
        UnallocatedBanner.tsx       -- Highlight unallocated donations needing admin action
      hooks/
        useAllocations.ts
    campaigns/
      CampaignList.tsx              -- US-19
      CampaignDetail.tsx            -- Drill-down to donations in a campaign
      components/
        CampaignProgressBar.tsx     -- Goal vs raised visual
      hooks/
        useCampaigns.ts
    donor-portal/
      DonorPortal.tsx               -- US-5, US-12, US-13 (layout/container)
      DonorProfile.tsx              -- US-5 (view/edit own profile)
      DonorDonationHistory.tsx      -- US-13 (own donation list with totals)
      DonorAllocationSummary.tsx    -- US-12 (pie chart of own allocations)
      DonorPreferences.tsx          -- US-15 (communication preferences)
      hooks/
        useDonorProfile.ts
        useDonorDonations.ts
        useDonorAllocations.ts
  shared/
    components/
      ConfirmDeleteModal.tsx        -- IS414 delete confirmation requirement
      AuditTrailViewer.tsx          -- US-23 audit log display
      CsvExportButton.tsx           -- US-21
      SearchableDropdown.tsx        -- Supporter selector used in donation forms
      PaginationControls.tsx
      SkeletonTable.tsx             -- US-25 loading state
```

#### 2.2 Key Component Details

**SupporterDirectory (US-1, US-16, US-25)**
- Server-side pagination via `useSupporters` hook (React Query).
- Filter bar across the top: type multi-select, status dropdown, giving level dropdown, date range picker, location selectors.
- Quick filter tabs: All | Active | Lapsed | Major Donors | New.
- Search input with 300ms debounce.
- Column sorting (click column headers).
- Page size selector: 10/20/50/100.
- Skeleton loading state on initial load and filter changes.
- "Export CSV" button (admin only, calls `/api/admin/supporters/export`).
- Each row links to `SupporterProfile`.

**SupporterProfile (US-3)**
- Route: `/donors/:supporterId`.
- Tabs or sections: Contact Info | Donation History | In-Kind Donations | Allocations | Notes.
- Lifetime giving total in a prominent stat card at the top.
- Donation History: embedded `DonationList` filtered to this supporter, with pagination.
- In-Kind Donations: table of `in_kind_donation_items` with item name, category, quantity, estimated value, condition.
- Allocations: `AllocationPieChart` showing how this supporter's donations were distributed.
- Action buttons: "Edit Profile" (opens `SupporterForm` in edit mode), "Record Donation" (opens `DonationForm` with supporter pre-selected).

**SupporterForm (US-2, US-4)**
- Dual-mode: create (POST) and edit (PUT).
- Supporter type as multi-select checkboxes.
- Status dropdown.
- Duplicate detection: on email blur, call GET `/api/admin/supporters?search={email}` and warn if match found.
- Validation: at least one of email/phone required, at least one supporter type.
- On save, invalidates the supporters query cache.

**DonationForm (US-6, US-7, US-8, US-9)**
- Top section (common to all types): Supporter (searchable dropdown), Date, Notes.
- `DonationTypeSelector` switches the bottom section between type-specific field groups:
  - **Monetary (MonetaryFields):** Amount (number input), Currency (PHP/USD dropdown), Payment Method (Cash/Check/Bank Transfer/Credit Card/Online/Mobile Payment), Reference Number, Donation Type (One-Time/Recurring/Pledge/Campaign), Campaign Name (dropdown from existing campaigns + free text), Designation (safehouse/program dropdown), Receipt Sent checkbox. If Recurring: frequency selector (Monthly/Quarterly/Annually), start date.
  - **In-Kind (InKindFields):** Repeatable item rows with "Add Item" button. Each row: Item Description (text), Category (dropdown: Clothing/Food/School Supplies/Hygiene/Medical/Furniture/Electronics/Other), Quantity (number), Estimated Value (currency, optional), Condition (New/Gently Used/Used). Designated safehouse dropdown. Received By (staff member dropdown).
  - **Volunteer/Skills (VolunteerFields):** Contribution Type (Volunteer Time / Professional Skills), Hours Contributed (number), Description (textarea), Safehouse/Program benefited (dropdown).
  - **Social Media (SocialMediaFields):** Post URL, Platform (dropdown: Facebook/Instagram/Twitter/TikTok/YouTube/Other), Estimated Reach (number, optional), Description.
- Validation rules vary by type. Monetary requires amount; in-kind requires at least one item; volunteer requires hours.

**AllocationView (US-11)**
- Time period filter: This Month / This Quarter / This Year / Custom Range.
- Two chart panels side by side:
  - `AllocationPieChart`: distribution by safehouse.
  - `AllocationBarChart`: stacked bar by program area.
- Summary cards: total allocated, total unallocated, number of donations.
- `UnallocatedBanner` at top if there are donations without allocations.
- Drill-down: click a safehouse/program to see the underlying donations.

**DonorPortal (US-5, US-12, US-13)**
- Route: `/donor/portal` (donor role only).
- Separate layout from admin/staff views -- simpler navigation, no access to directory or other donors.
- Sections:
  - Profile card with editable contact fields (phone, address, preferences).
  - Giving summary stats: This Year, Last Year, Lifetime.
  - Donation history table/cards (mobile-responsive: cards on small screens, table on desktop).
  - Allocation pie chart.
  - Communication preferences toggles.
- All data fetched from `/api/donor/my-*` endpoints, ensuring server-side isolation.

---

### 3. Schema Considerations

#### 3.1 `supporters` Table

The existing schema covers the core fields. Additional columns may be needed (check existing migration):
- `preferred_contact_method` (varchar, nullable) -- Email, Phone, Mail
- `communication_frequency` (varchar, nullable) -- Monthly, Quarterly, Annually
- `notes` (text, nullable) -- Relationship notes
- `is_archived` (boolean, default false) -- Soft delete
- `archived_at` (timestamp, nullable)
- `created_by_user_id` (FK to auth users, nullable) -- For staff "own records" RBAC
- `auth_user_id` (FK or external ID, nullable) -- Links a supporter record to a login account for donor portal

**`supporter_type`** is currently a single column. If a supporter can have multiple types (US-2 says multi-select), either:
- (a) Store as a PostgreSQL text array (`text[]`) and query with `@>` operator, or
- (b) Use a comma-separated string and parse in application code, or
- (c) Create a `supporter_types` junction table (`supporter_id`, `type_name`).

Recommendation: Use a PostgreSQL text array (`text[]`). EF Core supports this via `List<string>` with the Npgsql provider. Simplest approach for querying and filtering.

#### 3.2 `donations` Table

Key points:
- `campaign_name` is a text field on donations, not a FK to a campaigns table. Campaign reports aggregate by this text value. Keep it simple.
- `donation_type` covers: Monetary, InKind, Volunteer, Skills, SocialMedia. This determines which child data is relevant.
- `is_recurring`, `recurring_frequency` (Monthly/Quarterly/Annually) support recurring donation tracking (US-7).
- `is_voided`, `voided_at`, `void_reason` support donation voiding (US-NEW-A).
- `batch_id` (uuid, nullable) groups bulk-entered donations.
- `channel_source` maps to the "payment method" concept in the plan. Clarify naming in the DTO layer -- expose as `paymentMethod` in the API, map to `channel_source` in the DB.

Columns to verify/add:
- `reference_number` (varchar, nullable)
- `designation` (varchar, nullable) -- Where the donor wants funds directed
- `receipt_sent` (boolean, default false)
- `is_voided` (boolean, default false)
- `voided_at` (timestamp, nullable)
- `void_reason` (text, nullable)
- `batch_id` (uuid, nullable)
- `hours_contributed` (decimal, nullable) -- For volunteer/skills
- `created_by_user_id` (FK, nullable) -- For staff RBAC

#### 3.3 `in_kind_donation_items` Table

Child of `donations` (FK: `donation_id`). Each in-kind donation can have multiple items. Existing columns appear sufficient: `item_name`, `item_category`, `quantity`, `unit_of_measure`, `estimated_unit_value`, `received_condition`, `intended_use`.

No photo column -- photo upload (US-8 optional) can be deferred to above-and-beyond or stored as a URL in `intended_use`/`notes` if needed.

#### 3.4 `donation_allocations` Table

- `donation_id` (FK)
- `safehouse_id` (FK, nullable -- null if allocated to a program area without a specific safehouse)
- `program_area` (varchar)
- `amount_allocated` (decimal)
- `allocation_date` (timestamp)

The UI shows percentages, but the DB stores absolute amounts. The API computes percentages from `amount_allocated / donation.amount * 100` for display.

#### 3.5 `social_media_posts` Table

This table tracks content/analytics and does NOT have a `supporter_id` column. For tracking social media advocacy as a contribution type, the link goes through the `donations` table: create a donation record with `donation_type = 'SocialMedia'` and `supporter_id`, then optionally link to a `social_media_posts` record via `referral_post_id`. This is an indirect relationship. For MVP, social media advocacy contributions are simply donation records of type SocialMedia with a description and URL in the notes field. No changes needed to `social_media_posts` schema.

#### 3.6 Audit Trail

Create an `audit_log` table (if not already present):

| Column | Type | Description |
|--------|------|-------------|
| `id` | serial PK | |
| `entity_type` | varchar | "supporter", "donation", "allocation" |
| `entity_id` | int | ID of the affected record |
| `action` | varchar | "create", "update", "delete", "void" |
| `changed_by_user_id` | FK | Who made the change |
| `changed_at` | timestamp | When |
| `changes_json` | jsonb | `{ "field": { "old": "...", "new": "..." } }` for updates; full record snapshot for creates |

EF Core interceptor or `SaveChanges` override to automatically capture changes on tracked entities.

---

### 4. RBAC Implementation

#### 4.1 Role Definitions

Three roles relevant to this feature area. Enforced via ASP.NET policy-based authorization.

**Admin:**
- Full CRUD on `supporters`, `donations`, `donation_allocations`.
- Delete (soft-delete/void) requires confirmation on frontend; backend just checks role.
- Access to export endpoints.
- Access to audit trail.

**Staff:**
- Create supporters and donations.
- Read all supporters and donations.
- Update supporters and donations *they created* (`created_by_user_id` matches auth user).
- No delete/void access.
- No export access.

**Donor:**
- Read own supporter profile (matched via `auth_user_id` on `supporters`).
- Read own donations (filtered by `supporter_id`).
- Read own allocations.
- Update limited fields on own profile (phone, address, communication preferences).
- No access to other donors' data. No create/delete on any entity.
- All `/api/donor/*` endpoints enforce `supporter_id` scoping at the query level -- not just authorization check but actual WHERE clause filtering.

#### 4.2 Implementation Approach

1. **JWT Claims:** Include `role` and `userId` in the JWT. For donors, also include `supporterId` (looked up at login time from `supporters.auth_user_id`).

2. **Authorization Policies** (registered in `Program.cs`):
   - `RequireAdmin` -- `role == "Admin"`
   - `RequireStaff` -- `role in ["Admin", "Staff"]`
   - `RequireDonor` -- `role == "Donor"`
   - `RequireAdminOrStaff` -- alias for `RequireStaff`

3. **Endpoint-level enforcement:** Each endpoint group applies `.RequireAuthorization("PolicyName")`.

4. **Row-level enforcement for Staff updates:** In the PUT handler, load the entity, check `created_by_user_id == currentUserId || role == Admin`. Return 403 if not authorized.

5. **Donor data isolation:** All `/api/donor/*` endpoints extract `supporterId` from the JWT claims and use it as a mandatory filter in the EF Core query. Never accept a `supporterId` parameter from the request for donor endpoints.

---

### 5. Files to Create/Modify

#### 5.1 Backend (.NET)

**New files:**

| File | Purpose |
|------|---------|
| `Endpoints/SupporterEndpoints.cs` | Maps all `/api/admin/supporters/*` routes. |
| `Endpoints/DonationEndpoints.cs` | Maps all `/api/admin/donations/*` routes. |
| `Endpoints/AllocationEndpoints.cs` | Maps all `/api/admin/allocations/*` routes. |
| `Endpoints/CampaignEndpoints.cs` | Maps `/api/admin/campaigns/*` routes. |
| `Endpoints/DonorPortalEndpoints.cs` | Maps all `/api/donor/*` routes. |
| `Endpoints/ExportEndpoints.cs` | Maps CSV export routes. |
| `DTOs/SupporterDto.cs` | Request/response DTOs: `CreateSupporterRequest`, `UpdateSupporterRequest`, `SupporterListResponse`, `SupporterDetailResponse`. |
| `DTOs/DonationDto.cs` | `CreateDonationRequest`, `UpdateDonationRequest`, `DonationListResponse`, `DonationDetailResponse`, `BulkDonationRequest`, `InKindItemDto`. |
| `DTOs/AllocationDto.cs` | `CreateAllocationsRequest`, `AllocationSummaryResponse`. |
| `DTOs/DonorPortalDto.cs` | `DonorProfileResponse`, `UpdateDonorProfileRequest`, `DonorDonationResponse`, `DonorAllocationResponse`. |
| `Services/SupporterService.cs` | Business logic: CRUD, duplicate detection, archive, filtering, CSV export. |
| `Services/DonationService.cs` | Business logic: CRUD, void, bulk create, type-specific validation, audit logging. |
| `Services/AllocationService.cs` | Business logic: create/replace allocations, aggregation queries. |
| `Services/AuditService.cs` | Generic audit trail logging: `LogChange(entityType, entityId, action, changesJson, userId)`. |
| `Services/CsvExportService.cs` | Generates CSV streams for supporters and donations. |
| `Models/AuditLog.cs` | EF Core entity for the `audit_log` table (if not already present). |
| `Authorization/Policies.cs` | Policy definitions and registration helper. |

**Modified files:**

| File | Change |
|------|--------|
| `Program.cs` (or equivalent startup) | Register new endpoint groups, authorization policies, and services via DI. |
| `Data/AppDbContext.cs` (or equivalent) | Add `DbSet<AuditLog>` if needed. Verify `Supporter`, `Donation`, `DonationAllocation`, `InKindDonationItem` entities are mapped. |
| `Models/Supporter.cs` | Add missing properties: `PreferredContactMethod`, `CommunicationFrequency`, `Notes`, `IsArchived`, `ArchivedAt`, `CreatedByUserId`, `AuthUserId`, `SupporterTypes` (as `List<string>` for text[]). |
| `Models/Donation.cs` | Add missing properties: `ReferenceNumber`, `Designation`, `ReceiptSent`, `IsVoided`, `VoidedAt`, `VoidReason`, `BatchId`, `HoursContributed`, `CreatedByUserId`. |

**Migration:**
- One migration to add any missing columns to `supporters` and `donations`, and to create the `audit_log` table if it does not exist.

#### 5.2 Frontend (React + TypeScript)

**New files:** All files listed in the Directory Structure (Section 2.1) -- approximately 35-40 files.

**Modified files:**

| File | Change |
|------|--------|
| `src/App.tsx` (or router config) | Add routes: `/donors` (directory), `/donors/:supporterId` (profile), `/donors/new` (create), `/donations` (list), `/donations/new` (create), `/donations/:donationId` (detail), `/allocations` (dashboard), `/campaigns` (list), `/donor/portal` (donor self-service). |
| `src/components/Sidebar.tsx` (or nav) | Add navigation links for Supporters, Donations, Allocations, Campaigns under admin/staff nav. Add Donor Portal link for donor role. |
| `src/api/client.ts` (or equivalent) | Add API function wrappers for all new endpoints. |
| `src/types/index.ts` (or equivalent) | Add TypeScript interfaces: `Supporter`, `Donation`, `DonationAllocation`, `InKindItem`, `AuditLogEntry`, `CampaignSummary`, `DonorProfile`. |

---

### 6. Suggested Implementation Order

Build in vertical slices -- each phase delivers a testable, demo-able increment.

#### Phase 1: Supporter CRUD (Foundation)
**Backend:** `SupporterEndpoints`, `SupporterService`, DTOs, authorization policies. GET list with pagination + filtering, GET detail, POST create, PUT update, DELETE archive. Add missing columns via migration.
**Frontend:** `SupporterDirectory`, `SupporterProfile`, `SupporterForm`, `SupporterFilters`, `useSupporters` hook.
**Test:** Create a supporter, view in directory, filter by type/status, edit, archive.
**Covers:** US-1, US-2, US-3, US-4, US-16, US-25, US-NEW-B.

#### Phase 2: Monetary Donation Recording
**Backend:** `DonationEndpoints` (POST, GET list, GET detail, PUT), `DonationService`, DTOs. Audit logging via `AuditService`. Migration for missing donation columns + `audit_log` table.
**Frontend:** `DonationForm` with `MonetaryFields` and `DonationTypeSelector`, `DonationList`, `DonationDetail`, `DonationFilters`.
**Test:** Record a monetary donation, view in list, filter, edit, verify audit trail.
**Covers:** US-6, US-7, US-17, US-NEW-D, US-23.

#### Phase 3: In-Kind and Volunteer/Skills Donations
**Backend:** Extend `DonationEndpoints` POST/PUT to handle in-kind items (transactional child inserts) and volunteer hours. No new endpoint files -- same `/api/admin/donations` with type-specific logic.
**Frontend:** `InKindFields`, `VolunteerFields`, `SocialMediaFields` components. Update `DonationForm` to switch fields based on type.
**Test:** Record in-kind donation with multiple items, record volunteer hours, verify on supporter profile.
**Covers:** US-8, US-9.

#### Phase 4: Donation Allocations
**Backend:** `AllocationEndpoints`, `AllocationService`. POST allocations for a donation, GET aggregated allocations by safehouse and program.
**Frontend:** `AllocationForm`, `AllocationView` dashboard with `AllocationPieChart` and `AllocationBarChart`, `UnallocatedBanner`.
**Test:** Allocate a donation, view allocation dashboard, verify percentages sum correctly.
**Covers:** US-10, US-11.

#### Phase 5: Donor Portal
**Backend:** `DonorPortalEndpoints`. GET my-profile, PUT my-profile, GET my-donations, GET my-allocations. Strict `supporterId` scoping from JWT.
**Frontend:** `DonorPortal`, `DonorProfile`, `DonorDonationHistory`, `DonorAllocationSummary`, `DonorPreferences`. Mobile-responsive layouts.
**Test:** Log in as donor, view own history, verify cannot access other donors. Test on mobile viewport.
**Covers:** US-5, US-12, US-13, US-15, US-22, US-24.

#### Phase 6: Campaigns, Void, Bulk, Export
**Backend:** `CampaignEndpoints` (aggregate queries on `campaign_name`), void endpoint on donations, bulk donation endpoint, `ExportEndpoints` with `CsvExportService`.
**Frontend:** `CampaignList`, `CampaignDetail`, `CampaignProgressBar`, `BulkDonationEntry`, `CsvExportButton`, `ConfirmDeleteModal` (for void/archive actions).
**Test:** View campaign stats, void a donation with confirmation, bulk enter 5 donations, export CSV.
**Covers:** US-19, US-20, US-21, US-NEW-A, US-NEW-C.

#### Phase 7: Polish and Above-and-Beyond
- Lapsed donor report (US-18).
- Donation sparklines in supporter directory.
- Donor impact dashboard (Above-and-Beyond #1).
- Tax receipt PDF generation (US-14, Above-and-Beyond #5).
- Audit trail viewer component (US-23, Above-and-Beyond #7).
- Cross-browser testing (Chrome, Safari mobile, Firefox).
- Accessibility pass (44px touch targets, keyboard navigation, ARIA labels).

---

### Implementation Notes

- **React Query** for all data fetching -- provides caching, background refetch, optimistic updates, and pagination support out of the box.
- **Recharts** for pie charts, bar charts, and allocation visualizations. Lightweight, React-native, TypeScript support.
- **Form handling** with React Hook Form + Zod validation. Type-specific schemas composed via discriminated unions on `donationType`.
- **Debounced search** via `useDeferredValue` or a custom `useDebounce` hook (300ms for directory search).
- **Skeleton loading** via a reusable `SkeletonTable` component that mirrors the actual table column layout.
- **Mobile responsiveness** via Tailwind breakpoints. Donation history switches from table to card layout below `md` breakpoint.
- **CSV export** returns a streamed response. Frontend triggers download via a hidden anchor tag with `blob:` URL.
- **Audit logging** is handled by a shared `AuditService` called from service layer methods, not EF interceptors, to keep it explicit and testable.
