# Caseload Inventory Plan

## Purpose

The Caseload Inventory is the core case management page of the Beacon of Hope application. It maintains comprehensive records for all residents following the Philippine Department of Social Welfare and Development (DSWD) agency structure. This is the largest and most complex page in the system, managing 40+ fields per resident across demographics, case categorization, disability information, family socio-demographic profiles, admission details, referral information, social worker assignments, and reintegration tracking.

### IS413 Requirement
"Maintains records for all residents following Philippine social welfare agency structure. Staff can view, create, and update resident profiles including demographics, case category/sub-categories, disability info, family socio-demographic profile, admission details, referral info, assigned social workers, reintegration tracking. Support filtering and searching by case status, safehouse, case category, and other key fields."

### Database Tables
- `residents` (primary -- 40+ fields)
- `safehouses` (linked via safehouse assignment)
- `intervention_plans` (linked per resident)
- `education_records` (linked per resident)
- `health_wellbeing_records` (linked per resident)

### RBAC
- **Admin:** Full CRUD on all residents across all safehouses
- **Staff/Employee:** View all residents in their assigned safehouse; create and update residents in their safehouse
- **Donor:** No access to this page

---

## Personas

### 1. Elena Reyes (Social Worker)
- **Age:** 34
- **Location:** Cebu City, Philippines
- **Device:** Office desktop (Windows, Chrome); Android phone for field work
- **Role:** Staff/Employee
- **Background:** Licensed social worker assigned to Safehouse 2 in Cebu. Manages a caseload of 12 residents. She enters data daily -- intake forms, status updates, reintegration notes. She needs to find specific residents quickly and navigate the complex form without losing data.
- **Goals:** Quickly find a specific resident by name or case number. Enter a new resident intake with all required fields in one session. Update case status when a resident progresses through the program. Track which residents are approaching reintegration milestones.
- **Frustrations:** Forms that lose data when the connection drops. Too many required fields during initial intake when information isn't available yet. No way to see at a glance which residents need attention. Searching is slow or doesn't filter correctly.
- **Key Question:** "Can I efficiently manage my caseload of 12 residents without spending more time on data entry than on actual case work?"

### 2. Director Reyes (Co-Founder / Admin)
- **Age:** 52
- **Location:** Portland, OR (remote from US)
- **Device:** MacBook Pro, Chrome; iPad for reviews
- **Role:** Admin
- **Background:** Co-founded Beacon of Hope. Oversees all 3 safehouses remotely. Needs a bird's-eye view of all residents across all locations to make strategic decisions about capacity, staffing, and program effectiveness.
- **Goals:** See total resident counts by safehouse and status. Identify trends (e.g., increasing referrals from a region). Review individual cases flagged by staff. Export data for board reports and DSWD compliance reporting.
- **Frustrations:** Having to click into each safehouse separately to understand overall capacity. No aggregated view of case statuses. Can't quickly compare safehouses. Reports require manual data compilation.
- **Key Question:** "What is the current state of all our safehouses, and are there any cases that need my attention?"

### 3. Grace Flores (Donor Relations Coordinator)
- **Age:** 29
- **Location:** Manila, Philippines
- **Device:** Laptop (Windows, Edge)
- **Role:** Staff/Employee (limited access)
- **Background:** Manages donor relationships and needs anonymized/aggregated data about residents for impact reports and donor communications. She never sees individual resident names or details, only aggregate counts and anonymized outcomes.
- **Goals:** Get aggregate counts (e.g., "15 residents currently in Safehouse 1, 8 in active healing program"). Access anonymized outcome data for donor reports. Understand program categories to explain the org's work to donors.
- **Frustrations:** Either has too much access (sees sensitive individual data she shouldn't) or too little (can't get the aggregate numbers she needs). Has to ask social workers to compile data manually for every report.
- **Key Question:** "Can I get the aggregate numbers I need for donor reports without ever seeing individual resident details?"

### 4. New Social Worker (Onboarding)
- **Age:** 26
- **Location:** Davao City, Philippines
- **Device:** Office desktop (Windows, Chrome)
- **Role:** Staff/Employee (newly assigned)
- **Background:** Just joined Beacon of Hope and is learning the system. Has social work training but has never used this specific case management system. Needs clear guidance on what fields mean and what data to enter.
- **Goals:** Understand the intake process step by step. Know which fields are required vs optional. Learn what the case categories and sub-categories mean. Successfully enter a resident record without errors.
- **Frustrations:** Overwhelming number of fields with no explanation. Unclear terminology (what's the difference between "case category" and "sub-category"?). Fear of entering wrong data for a real resident. No way to save a draft and come back later.
- **Key Question:** "How do I enter a new resident correctly when I don't have all the information yet?"

---

## User Stories

### Resident List View

**US-1: View resident inventory table**
As Elena (social worker), I want to see a table of all residents in my assigned safehouse, so that I can quickly scan my caseload.
- **Acceptance Criteria:**
  - Table displays: resident code/ID, first name, age, case status, case category, date admitted, assigned social worker, safehouse
  - Default sort is by most recently admitted
  - Rows are clickable to open the resident detail view
  - Staff see only residents in their assigned safehouse(s)
  - Admin see all residents across all safehouses
  - Table shows total count (e.g., "Showing 12 of 12 residents")

**US-2: Search residents**
As Elena (social worker), I want to search residents by name or ID, so that I can find a specific resident instantly.
- **Acceptance Criteria:**
  - Search bar at the top of the inventory page
  - Searches across: resident code, first name, last name
  - Results update as user types (debounced, 300ms delay)
  - No results state shows "No residents match your search"
  - Search is case-insensitive
  - Search term is preserved when navigating back from a detail view

**US-3: Filter residents by case status**
As Director Reyes (admin), I want to filter residents by case status, so that I can see which residents are active, reintegrated, or in transition.
- **Acceptance Criteria:**
  - Dropdown filter for case status (e.g., Active, In Transition, Reintegrated, Discharged, Pending Intake)
  - Filter can be combined with other filters (safehouse, category)
  - Active filter chips show below the filter bar for visibility
  - "Clear all filters" button resets to default view
  - URL updates with filter params so filtered views can be bookmarked/shared

**US-4: Filter residents by safehouse**
As Director Reyes (admin), I want to filter residents by safehouse, so that I can focus on a specific location.
- **Acceptance Criteria:**
  - Dropdown with all safehouses (pulled from `safehouses` table)
  - Admin can select one or multiple safehouses
  - Staff users have this pre-filtered to their assigned safehouse (filter visible but not changeable)
  - Count updates to reflect filtered results

**US-5: Filter by case category and sub-category**
As Elena (social worker), I want to filter by case category, so that I can review all residents with a specific case type.
- **Acceptance Criteria:**
  - Dropdown for case category (e.g., Abuse, Trafficking, Neglect, Abandonment)
  - Dependent dropdown for sub-category that updates based on selected category
  - Filters combinable with status and safehouse filters
  - Filter chips display selected values

**US-6: Pagination**
As Director Reyes (admin), I want the resident list to be paginated, so that the page loads quickly even with hundreds of residents.
- **Acceptance Criteria:**
  - Default page size: 20 residents
  - Page size selector: 10, 20, 50, 100
  - Pagination controls at bottom: previous/next, page numbers, jump to page
  - Total count and current range displayed ("Showing 1-20 of 87 residents")
  - Filters and search are applied before pagination

**US-7: Sort resident table columns**
As Elena (social worker), I want to sort the table by any column, so that I can organize residents by date, name, or status.
- **Acceptance Criteria:**
  - Clickable column headers toggle sort direction (ascending/descending)
  - Sort indicator (arrow) shows on the active sort column
  - Default sort: date admitted, descending (newest first)
  - Sort persists when combined with filters
  - Sort state resets when navigating away and returning

### Resident Detail View

**US-8: View full resident profile**
As Elena (social worker), I want to view a resident's complete profile, so that I can review all case information in one place.
- **Acceptance Criteria:**
  - Profile page at /caseload/:residentId
  - Organized into collapsible sections:
    1. Demographics (name, age, date of birth, gender, photo placeholder)
    2. Case Information (case category, sub-categories, case status, date admitted, referral source)
    3. Disability Information (type, severity, accommodations needed)
    4. Family Socio-Demographic Profile (family composition, economic status, family contact info)
    5. Admission Details (admission date, admitted by, referral source, referring agency, initial assessment summary)
    6. Assigned Staff (primary social worker, secondary workers, supervisor)
    7. Reintegration Tracking (target date, readiness score, placement type, post-placement monitoring dates)
  - Each section shows a summary in collapsed state and full fields when expanded
  - "Edit" button on each section (staff/admin only)
  - "Back to Caseload" navigation breadcrumb

**US-9: View resident timeline**
As Elena (social worker), I want to see a chronological timeline of all activities for a resident, so that I can understand the full case history at a glance.
- **Acceptance Criteria:**
  - Timeline sidebar or tab on the resident detail page
  - Shows entries from: process recordings, home visitations, health records, education updates, incident reports, intervention plan changes
  - Each entry shows: date, type (icon-coded), brief summary, staff member
  - Entries link to their full records
  - Most recent entries at top
  - Filterable by entry type

### Create & Edit Resident

**US-10: Create new resident (multi-step intake form)**
As Elena (social worker), I want to enter a new resident using a multi-step form, so that I can complete the intake process without being overwhelmed by 40+ fields at once.
- **Acceptance Criteria:**
  - "Add Resident" button on the caseload inventory page (staff/admin only)
  - Form is broken into steps matching the profile sections:
    - Step 1: Demographics (required: first name, date of birth, gender)
    - Step 2: Case Information (required: case category, referral source)
    - Step 3: Admission Details (required: admission date, safehouse)
    - Step 4: Family Profile (optional at intake)
    - Step 5: Disability Info (optional at intake)
    - Step 6: Staff Assignment (required: primary social worker)
    - Step 7: Review & Submit
  - Progress indicator shows current step and completion
  - User can navigate between steps freely
  - Data persists across steps (not lost when going back)
  - "Save as Draft" available on any step (creates record with "Pending Intake" status)

**US-11: Draft/partial save for incomplete intakes**
As Elena (social worker), I want to save an incomplete resident record as a draft, so that I can finish data entry later when I have more information.
- **Acceptance Criteria:**
  - "Save as Draft" button available on every step of the intake form
  - Drafts are saved to the database with status "Pending Intake"
  - Drafts appear in the caseload inventory with a "Draft" badge
  - Opening a draft resumes from where the user left off
  - Only the creator or an admin can edit a draft
  - Drafts older than 30 days trigger a reminder notification

**US-12: Edit existing resident profile**
As Elena (social worker), I want to edit any section of a resident's profile, so that I can keep records current as situations change.
- **Acceptance Criteria:**
  - "Edit" button on each section of the resident detail page
  - Clicking opens an inline edit form for that section only
  - Pre-populated with current values
  - Required fields validated before save
  - "Cancel" discards changes and reverts to view mode
  - "Save" updates the record and shows success confirmation
  - Edit history is tracked (who changed what, when) -- stored in an audit log

**US-13: Field-level validation with helpful messages**
As a new social worker (onboarding), I want clear validation messages on each field, so that I understand what data format is expected.
- **Acceptance Criteria:**
  - Required fields marked with asterisk and "(required)" for screen readers
  - Date fields validate format and logical constraints (DOB not in future, admission date not before DOB)
  - Age auto-calculates from date of birth
  - Case category selection determines which sub-categories are available
  - Phone numbers validate Philippine format
  - Validation messages appear inline below the field on blur
  - Form-level validation summary at the top lists all errors before submission

**US-14: Field tooltips and help text**
As a new social worker (onboarding), I want tooltips explaining what each field means, so that I enter data correctly.
- **Acceptance Criteria:**
  - Info icon (?) next to complex fields
  - Hovering/tapping shows a tooltip with: field description, expected format, example value
  - Tooltips available for: case category definitions, sub-category descriptions, disability classifications, referral source types, reintegration readiness criteria
  - Help text does not interfere with data entry (positioned to avoid covering input fields)

### Case Status Management

**US-15: Update case status with required notes**
As Elena (social worker), I want to change a resident's case status, so that the record reflects their current stage in the program.
- **Acceptance Criteria:**
  - Status can be changed via a dedicated "Update Status" action (not buried in the edit form)
  - Status transitions follow a defined workflow:
    - Pending Intake -> Active
    - Active -> In Transition
    - In Transition -> Reintegrated OR Active (if reintegration fails)
    - Any status -> Discharged (with reason required)
  - Status change requires a note explaining the reason
  - Status change is logged with timestamp and user
  - Notification sent to supervisor when status changes to "Discharged" or "Reintegrated"

**US-16: Reintegration tracking**
As Elena (social worker), I want to track reintegration milestones for residents approaching discharge, so that transitions are planned and monitored.
- **Acceptance Criteria:**
  - Reintegration section on resident profile activates when status is "In Transition"
  - Fields: target reintegration date, placement type (family reunification, independent living, foster care, transfer), readiness assessment score, family preparation status
  - Milestone checklist: family assessment complete, community resources identified, transition plan approved, post-placement monitoring scheduled
  - Progress bar shows completion percentage of checklist
  - Overdue milestones highlighted in red

### Sensitive Data Handling

**US-17: Role-based field visibility**
As Director Reyes (admin), I want certain sensitive fields restricted based on role, so that staff only see data relevant to their responsibilities.
- **Acceptance Criteria:**
  - Admin: sees all fields
  - Staff (social worker): sees all fields for residents in their caseload
  - Staff (non-case-assigned): sees demographics and case status only (no family details, no disability info, no admission narrative)
  - No resident data visible to donor role (page returns 403)
  - Grace (donor relations) sees only the aggregated statistics endpoint, not the caseload page

**US-18: Audit trail for resident record changes**
As Director Reyes (admin), I want all changes to resident records logged, so that data integrity can be verified and any unauthorized changes detected.
- **Acceptance Criteria:**
  - Every create, update, and status change logged with: user ID, timestamp, field changed, old value, new value
  - Audit log accessible from the resident detail page (admin only)
  - Audit entries are immutable (no editing or deleting)
  - Log is filterable by date range, user, and field
  - Bulk export of audit log available for compliance

**US-19: Data anonymization for non-case staff**
As Grace (donor relations), I want to access aggregate resident statistics without seeing personal details, so that I can create impact reports ethically.
- **Acceptance Criteria:**
  - API endpoint for aggregate statistics: count by safehouse, count by status, count by case category, average length of stay, reintegration success rate
  - No individual names, IDs, or identifying details in the response
  - Accessible to staff role with "reports" permission
  - Data refreshed daily (not real-time to prevent identification by correlation)

### Bulk Operations

**US-20: Bulk status update**
As Director Reyes (admin), I want to update the status of multiple residents at once, so that I can efficiently process batch changes (e.g., marking several residents as reintegrated after a program cohort completes).
- **Acceptance Criteria:**
  - Checkbox column in the resident table
  - "Select All" checkbox in the header
  - Bulk action dropdown appears when 1+ rows selected: "Update Status", "Assign Social Worker", "Export Selected"
  - Bulk status update opens a modal: select new status, enter a shared note
  - Confirmation dialog shows count: "Update status for 5 residents?"
  - Each update logged individually in the audit trail

**US-21: Export resident data**
As Director Reyes (admin), I want to export resident data to CSV, so that I can prepare reports for the DSWD and the board.
- **Acceptance Criteria:**
  - "Export" button on the caseload inventory page (admin only)
  - Exports current filtered/searched view (respects active filters)
  - CSV includes all visible columns
  - Option to include or exclude sensitive fields (family info, disability details)
  - Filename includes date and applied filters (e.g., "residents_safehouse2_active_2026-04-06.csv")
  - Export logged in audit trail

### Performance & Reliability

**US-22: Fast load time for large caseloads**
As Elena (social worker), I want the caseload page to load within 2 seconds, so that I'm not waiting around when I need to check a record quickly.
- **Acceptance Criteria:**
  - Initial page load (first 20 residents) completes in under 2 seconds on a 3G connection
  - Server-side pagination (not loading all residents and paginating client-side)
  - Filters applied server-side to minimize data transfer
  - Search debounced at 300ms to avoid excessive API calls
  - Loading skeleton shown while data is fetching

**US-23: Offline-resilient form submission**
As Elena (social worker on field visit), I want the system to handle connection drops gracefully during data entry, so that I don't lose work.
- **Acceptance Criteria:**
  - Form data auto-saved to localStorage every 30 seconds during editing
  - If connection drops during save, error message: "Save failed. Your changes are preserved locally. We'll retry when connected."
  - Automatic retry on reconnection
  - Conflict resolution if the record was changed by someone else during offline period (show diff, let user choose)
  - localStorage draft cleared after successful server save

**US-24: Responsive design for the complex form**
As Elena (using her phone during a home visit), I want the intake form to work on mobile, so that I can start a record in the field.
- **Acceptance Criteria:**
  - Multi-step form works on 360px+ screens
  - One column layout on mobile (no side-by-side fields)
  - Dropdowns use native mobile select elements
  - Date fields use native date pickers on mobile
  - Sticky navigation between form steps
  - All touch targets min 44px

**US-25: Confirmation before destructive actions**
As any user, I want confirmation dialogs before irreversible actions, so that I don't accidentally delete or discharge a resident.
- **Acceptance Criteria:**
  - "Are you sure?" modal for: status change to Discharged, deleting a draft, bulk status updates
  - Modal states the action clearly: "Change status to Discharged for [Resident Name]? This action will be logged and cannot be undone."
  - Requires typing "CONFIRM" for deletion actions
  - Cancel button is visually prominent (not just a small link)
  - No confirmation needed for routine saves (would slow down workflow)

---

## Definition of Done

- [ ] Resident list view displays a paginated, sortable table of residents with columns: ID, name, age, status, category, admission date, social worker, safehouse
- [ ] Search bar filters residents by name or ID with debounced real-time results
- [ ] Filter dropdowns work for: case status, safehouse, case category/sub-category; filters are combinable and URL-persistent
- [ ] Pagination works with server-side data (10/20/50/100 per page)
- [ ] Resident detail page shows all 40+ fields organized into collapsible sections
- [ ] Timeline view aggregates all activity types chronologically
- [ ] Multi-step intake form breaks 40+ fields into 7 logical steps with progress indicator
- [ ] Draft save works on any step; drafts visible in inventory with badge
- [ ] Inline section editing works on the detail page with pre-populated values
- [ ] Field validation provides inline messages; tooltips explain complex fields
- [ ] Case status transitions follow defined workflow with required notes
- [ ] Reintegration tracking activates for "In Transition" residents with milestone checklist
- [ ] RBAC enforced: admin sees all, staff sees assigned safehouse, donor gets 403
- [ ] Audit trail logs all creates, updates, and status changes with user/timestamp/diff
- [ ] Aggregate statistics endpoint available for non-case staff (anonymized)
- [ ] Bulk status update and CSV export work for admin role
- [ ] Page loads within 2 seconds; form data auto-saved to localStorage
- [ ] Responsive on mobile (360px+); confirmation dialogs on destructive actions
- [ ] All 25 user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox

---

## Review Notes

### Overall Assessment

This plan is strong in UX design, persona coverage, and structural organization. However, there are gaps between what the plan describes and what the actual database schema provides, as well as a few missing requirements from IS413/IS414. Below is a field-by-field audit, missing requirements, and corrections.

---

### 1. Schema vs. Plan Field Coverage Audit

The actual `residents` table has **48 columns** (including `resident_id`, `created_at`). The plan's Section 8 (US-8) organizes fields into 7 collapsible sections. Here is what is covered and what is missing:

**Fields present in schema but NOT mentioned in any user story:**

| Schema Column | Status in Plan |
|---|---|
| `case_control_no` | Listed as "resident code/ID" in US-1 -- OK but ambiguous. The schema has BOTH `case_control_no` AND `internal_code`. Plan should clarify which is displayed and whether both are searchable. |
| `internal_code` | Not mentioned anywhere. Needs to be in demographics or case info section. |
| `birth_status` | Not mentioned. Should be in Demographics section. |
| `place_of_birth` | Not mentioned. Should be in Demographics section. |
| `religion` | Not mentioned. Should be in Demographics section. |
| `sub_cat_orphaned` through `sub_cat_child_with_hiv` | Plan mentions "sub-categories" generically but the schema uses **10 individual boolean flags**, not a multi-select. The form design must reflect this (checkboxes, not a dropdown). |
| `is_pwd` / `pwd_type` | Covered as "disability info" but plan says "type, severity, accommodations needed" -- schema only has `is_pwd` (boolean) and `pwd_type` (text). No `severity` or `accommodations_needed` columns exist. Plan overpromises. |
| `has_special_needs` / `special_needs_diagnosis` | Not mentioned separately from disability. These are distinct from PWD fields in the schema. |
| `family_is_4ps` | Mentioned in requirements doc ("4Ps beneficiary") but plan's family section (US-8) says "family composition, economic status" which is too vague. Must explicitly list the 5 family boolean flags. |
| `family_parent_pwd` | Not mentioned. |
| `age_upon_admission` | Not mentioned. |
| `present_age` | Plan says "age auto-calculates from DOB" (US-13) but schema stores `present_age` as TEXT. Need to decide: calculate or store? If stored, form must populate it. |
| `length_of_stay` | Not mentioned. Schema stores as TEXT. Should be calculated or displayed. |
| `date_colb_registered` / `date_colb_obtained` | Not mentioned anywhere. COLB = Certificate of Live Birth. Important for Philippine social welfare compliance. Must be in the form. |
| `date_case_study_prepared` | Not mentioned. Should be in Case Information section. |
| `initial_risk_level` / `current_risk_level` | Not mentioned. These are important case management fields. Should be visible and filterable. |
| `date_enrolled` / `date_closed` | Not mentioned. These mark the lifecycle of the case. |
| `notes_restricted` | Not mentioned. This is a sensitive field -- plan should specify who can view/edit it. |

**Fields the plan INVENTS that do NOT exist in the schema:**

| Plan Field | Issue |
|---|---|
| Disability "severity" | No column in schema |
| Disability "accommodations needed" | No column in schema |
| Family "economic status" | No column; only boolean flags (4Ps, solo parent, etc.) |
| Family "contact info" | No column in schema |
| "Admitted by" (US-8 Admission) | No column in schema |
| "Initial assessment summary" (US-8 Admission) | Closest is `initial_case_assessment` -- use correct name |
| Reintegration "readiness score" | No column in schema |
| Reintegration "placement type" | Closest is `reintegration_type` -- use correct name |
| Reintegration "post-placement monitoring dates" | No column in schema |
| "Secondary workers" / "supervisor" (US-8 Staff) | Schema only has `assigned_social_worker` (single text field) |
| Resident "first name" / "last name" | **No name columns exist in the schema at all.** The schema identifies residents by `case_control_no` and `internal_code` only. This is likely intentional for data protection in Philippine social welfare contexts, OR it is a schema gap that must be resolved. This is a critical finding. |
| Resident "photo placeholder" | No column in schema |
| Resident "gender" | Schema has `sex` not `gender` -- use the schema's terminology |

**ACTION REQUIRED:** Either (a) add missing columns to the schema via a new migration, or (b) update the plan to match what the schema actually provides. The absence of name fields is the most critical issue -- verify with the team whether names are intentionally excluded for privacy or if the schema is incomplete.

---

### 2. Sub-Category Handling (Critical Design Issue)

The plan (US-5) describes sub-categories as a "dependent dropdown" on case category. But the schema uses **10 independent boolean columns** (`sub_cat_orphaned`, `sub_cat_trafficked`, `sub_cat_child_labor`, etc.). A resident can have MULTIPLE sub-categories simultaneously (e.g., both trafficked AND victim of physical abuse).

**Fix:** US-5 and US-10 Step 2 must use a **checkbox group**, not a dependent dropdown. Filtering (US-5) should support multi-select boolean logic ("show residents who are trafficked AND/OR physically abused").

---

### 3. Missing IS413 Filtering Requirements

The IS413 requirement explicitly says: *"support filtering and searching by case status, safehouse, case category, and other key fields."*

The plan covers case status (US-3), safehouse (US-4), and case category (US-5). However, "other key fields" is under-specified. Based on the schema, the following filters should also be supported:

- **Risk level** (`initial_risk_level`, `current_risk_level`) -- high-risk residents need quick identification
- **Assigned social worker** -- staff need to filter by their own caseload, admins need to see workload distribution
- **Reintegration status** -- distinct from case status; tracks the reintegration pipeline
- **Date range filters** (admission date, enrollment date) -- for reporting periods
- **PWD / special needs** -- for accommodation planning
- **Family flags** (4Ps, indigenous, etc.) -- for DSWD reporting compliance

**Add US-5b:** Filter by additional key fields (risk level, social worker, reintegration status, date ranges, PWD status, family profile flags).

---

### 4. Missing Delete Operation (IS414 Requirement)

IS414 explicitly requires: *"there must be confirmation required to delete data."*

The plan has US-25 for confirmation dialogs but **never defines a delete operation for residents**. US-25 mentions "deleting a draft" but not deleting an actual resident record. The RBAC section (line 18) says "Full CRUD" for admin but no user story covers the D.

**Add US-25b: Delete resident record (admin only)**
- Delete button visible only to admin role
- Confirmation modal: "Permanently delete record for [Resident ID]? This will also delete all associated process recordings, home visitations, education records, health records, intervention plans, and incident reports."
- Requires typing the resident's case control number to confirm
- Deletion cascades per schema FK constraints (ON DELETE CASCADE)
- Deletion logged in audit trail before execution
- Consider soft-delete (add `deleted_at` column) instead of hard delete for data integrity

---

### 5. RBAC Conflicts with IS414

The plan defines three roles: Admin, Staff/Employee, Donor. But IS414 says:

> *"Only an authenticated user with an admin role should be able to add, modify, or in rare cases delete data."*

The plan (line 19) gives Staff/Employee the ability to "create and update residents in their safehouse." This **contradicts** IS414 unless the team explicitly defines a staff role that differs from admin (which IS414 permits: "You may choose whether or not to have a staff (or employee) role that differs from the admin user").

**Resolution:** The plan should explicitly note this design decision and justify it. If staff can create/update, document that the team is exercising the IS414 option to have a staff role with limited write access. Otherwise, restrict all CUD to admin only and make staff read-only.

---

### 6. Missing Edge Cases and Improvements

**A. No first-name/last-name in schema:**
The entire search-by-name feature (US-2) is impossible with the current schema. Either add `first_name` and `last_name` columns, or change US-2 to search by `case_control_no` and `internal_code` only.

**B. Concurrent editing:**
US-12 (inline edit) does not address what happens when two social workers edit the same resident simultaneously. Add optimistic locking (use `updated_at` timestamp to detect conflicts).

**C. Case status values not enumerated:**
US-3 lists example statuses (Active, In Transition, Reintegrated, Discharged, Pending Intake) but the schema has `case_status` as free text. Either (a) add a CHECK constraint or enum table, or (b) the plan should define the canonical list and enforce it at the application layer.

**D. Reintegration type/status values:**
Schema has `reintegration_type` and `reintegration_status` as text. Plan should define allowed values (e.g., family reunification, independent living, foster care, transfer to another agency).

**E. COLB tracking (Philippine compliance):**
Certificate of Live Birth registration/obtainment dates (`date_colb_registered`, `date_colb_obtained`) are in the schema but completely absent from the plan. These are critical for DSWD compliance. Add to the Admission Details section and consider a filter/alert for residents missing COLB.

**F. Risk level management:**
`initial_risk_level` and `current_risk_level` are in the schema but not in any user story. Add a user story for viewing and updating risk level, including who can change it and whether changes require notes.

**G. Data export format:**
US-21 only mentions CSV. Consider adding PDF export for individual resident profiles (useful for case conferences and DSWD submissions).

---

### 7. Updated User Stories

The following user stories should be added or modified:

**US-2 (MODIFIED): Search residents**
- Update acceptance criteria to search across: `case_control_no`, `internal_code`, and name fields (if added to schema)
- Add: search by assigned social worker name

**US-5b (NEW): Filter by additional key fields**
As Director Reyes (admin), I want to filter residents by risk level, assigned social worker, reintegration status, admission date range, PWD status, and family profile flags, so that I can generate targeted reports and identify residents needing attention.
- **Acceptance Criteria:**
  - Dropdown for risk level (Low, Medium, High, Critical)
  - Dropdown for assigned social worker (populated from distinct values)
  - Dropdown for reintegration status
  - Date range picker for admission date
  - Toggle filters for PWD and special needs
  - Toggle filters for family flags (4Ps, solo parent, indigenous, parent PWD, informal settler)
  - All combinable with existing filters (US-3, US-4, US-5)

**US-8 (MODIFIED): View full resident profile**
Update the collapsible sections to match the actual schema:
1. **Identification:** case_control_no, internal_code, safehouse_id, case_status
2. **Demographics:** sex, date_of_birth, birth_status, place_of_birth, religion, present_age
3. **Case Information:** case_category, 10 sub-category boolean flags (as checkboxes/tags), initial_risk_level, current_risk_level, initial_case_assessment, date_case_study_prepared
4. **Disability & Special Needs:** is_pwd, pwd_type, has_special_needs, special_needs_diagnosis
5. **Family Socio-Demographic Profile:** family_is_4ps, family_solo_parent, family_indigenous, family_parent_pwd, family_informal_settler
6. **Admission Details:** date_of_admission, age_upon_admission, length_of_stay, date_enrolled, date_closed, date_colb_registered, date_colb_obtained
7. **Referral Information:** referral_source, referring_agency_person
8. **Staff Assignment:** assigned_social_worker
9. **Reintegration Tracking:** reintegration_type, reintegration_status
10. **Restricted Notes:** notes_restricted (admin and assigned social worker only)

**US-10 (MODIFIED): Create new resident**
Update form steps to match actual schema fields (remove invented fields, add missing ones). Sub-categories step must use checkboxes, not dropdown.

**US-25b (NEW): Delete resident record**
As Director Reyes (admin), I want to delete a resident record with full confirmation, so that erroneous or duplicate records can be removed while maintaining data integrity.
- **Acceptance Criteria:**
  - Delete button on resident detail page, visible to admin only
  - Confirmation modal explains cascade: all linked process recordings, home visitations, education records, health records, intervention plans, and incident reports will also be deleted
  - User must type the case control number to confirm
  - Deletion logged in audit trail (record snapshot preserved)
  - Consider soft-delete pattern (add `deleted_at` timestamp) to allow recovery

**US-26 (NEW): Track COLB registration**
As Elena (social worker), I want to record Certificate of Live Birth registration and obtainment dates, so that DSWD compliance requirements are met.
- **Acceptance Criteria:**
  - COLB fields visible in Admission Details section
  - Alert/badge on residents missing COLB after 30 days of admission
  - Filterable: show all residents without COLB obtained

**US-27 (NEW): Manage risk levels**
As Elena (social worker), I want to view and update a resident's risk level, so that high-risk cases receive appropriate attention.
- **Acceptance Criteria:**
  - Risk level displayed prominently on resident detail and in list view (color-coded badge)
  - Risk level change requires a note explaining the assessment
  - Risk level change logged in audit trail
  - Filter by risk level in inventory view (per US-5b)

---

### 8. Summary of Critical Action Items

1. **CRITICAL: Resolve the missing name fields.** Schema has no `first_name`/`last_name`. Either add them via migration or redesign search/display around `case_control_no` and `internal_code`.
2. **CRITICAL: Sub-categories are booleans, not a dropdown.** Redesign US-5 and US-10 accordingly.
3. **REQUIRED: Add delete user story** (IS414 mandates confirmation for delete).
4. **REQUIRED: Add COLB, risk level, and all other schema fields** to the form and detail view.
5. **REQUIRED: Remove invented fields** (severity, accommodations, readiness score, etc.) or add them to the schema.
6. **RECOMMENDED: Clarify RBAC decision** -- document whether staff can CUD or only read.
7. **RECOMMENDED: Add concurrent edit handling** (optimistic locking).
8. **RECOMMENDED: Define canonical enum values** for case_status, reintegration_type, reintegration_status, risk_level.

---

## Requirements Coverage Matrix

This matrix maps every IS413/IS414 requirement for the Caseload Inventory page to the user stories in this plan that satisfy it. Gaps are flagged.

| # | Requirement Source | Requirement | Covering User Story | Status |
|---|---|---|---|---|
| R1 | IS413 (line 103) | Maintain records for all residents following Philippine social welfare agency structure | US-1, US-8, US-10, US-12 | COVERED |
| R2 | IS413 (line 103) | Staff can view resident profiles | US-1, US-8 | COVERED |
| R3 | IS413 (line 103) | Staff can create resident profiles | US-10, US-11 | COVERED (but see RBAC note R16) |
| R4 | IS413 (line 103) | Staff can update resident profiles | US-12, US-15 | COVERED (but see RBAC note R16) |
| R5 | IS413 (line 103) | Demographics | US-8 section 2 (revised) | COVERED after review fix -- must use schema fields (sex, DOB, birth_status, place_of_birth, religion, present_age) |
| R6 | IS413 (line 103) | Case category and sub-categories (e.g., trafficked, victim of physical abuse, neglected) | US-5, US-8 section 3 (revised) | PARTIALLY COVERED -- plan must switch from dropdown to checkbox group for the 10 boolean sub-category flags |
| R7 | IS413 (line 103) | Disability information | US-8 section 4 (revised) | COVERED after review fix -- must use is_pwd, pwd_type, has_special_needs, special_needs_diagnosis only (remove invented severity/accommodations fields) |
| R8 | IS413 (line 103) | Family socio-demographic profile (4Ps beneficiary, solo parent, indigenous group, informal settler) | US-8 section 5 (revised) | COVERED after review fix -- must use 5 boolean flags: family_is_4ps, family_solo_parent, family_indigenous, family_parent_pwd, family_informal_settler |
| R9 | IS413 (line 103) | Admission details | US-8 section 6 (revised), US-10 | COVERED after review fix -- must include date_of_admission, age_upon_admission, length_of_stay, date_enrolled, date_closed, date_colb_registered, date_colb_obtained |
| R10 | IS413 (line 103) | Referral information | US-8 section 7 (revised) | COVERED -- referral_source, referring_agency_person |
| R11 | IS413 (line 103) | Assigned social workers | US-8 section 8 (revised) | COVERED after review fix -- schema has single `assigned_social_worker` text field only; remove invented secondary/supervisor fields |
| R12 | IS413 (line 103) | Reintegration tracking | US-8 section 9 (revised), US-16 | COVERED after review fix -- must use reintegration_type, reintegration_status only; remove invented readiness_score, placement_type, post-placement monitoring |
| R13 | IS413 (line 103) | Support filtering by case status | US-3 | COVERED |
| R14 | IS413 (line 103) | Support filtering by safehouse | US-4 | COVERED |
| R15 | IS413 (line 103) | Support filtering by case category and other key fields | US-5, US-5b (new) | PARTIALLY COVERED -- US-5b adds risk level, social worker, date range, PWD, family flags filters |
| R16 | IS414 (line 136) | RBAC -- only admin can CUD | RBAC section + US-25b | GAP -- Plan gives staff create/update permission. Must explicitly document team decision to exercise IS414 option for staff role with limited write access. Rubric awards 1.5 pts for "Only admin user can CUD (including endpoints)" -- safest interpretation: restrict CUD to admin, give staff read-only. If team decides staff can CUD, document justification prominently. |
| R17 | IS414 (line 139) | Confirmation required to delete data | US-25, US-25b (new) | COVERED after review fix -- US-25b adds explicit delete-resident user story with typed confirmation |
| R18 | IS414 (line 133) | All APIs have appropriate auth/authz | Not explicitly in plan | GAP -- Plan must specify that all CUD API endpoints require `[Authorize(Roles = "Admin")]` or equivalent. Read endpoints for caseload data require at minimum `[Authorize]`. |
| R19 | IS413 (line 103) | Searching by key fields | US-2 | PARTIALLY COVERED -- search by name is impossible without name columns in schema. Must search by case_control_no, internal_code, and assigned_social_worker at minimum. |
| R20 | IS413 (line 114) | Validate data and handle errors | US-13 | COVERED -- field-level validation, logical constraints, inline messages |
| R21 | IS413 (line 114) | Pagination | US-6 | COVERED |
| R22 | IS413 (line 114) | Finishing touches (titles, icons, consistent look) | US-14, US-24 | COVERED |
| R23 | DSWD Compliance | COLB tracking (Certificate of Live Birth) | US-26 (new) | COVERED after review fix -- date_colb_registered, date_colb_obtained in form + missing-COLB alerts |
| R24 | DSWD Compliance | Risk level tracking | US-27 (new) | COVERED after review fix -- initial_risk_level, current_risk_level with color-coded badges |
| R25 | Schema | Restricted notes (sensitive field) | US-8 section 10 (revised) | COVERED after review fix -- notes_restricted visible to admin and assigned social worker only |

**Summary:** 10 of 25 requirements are fully covered as-is. 10 are covered only after applying the review fixes. 3 are partially covered and need additional work. 2 have gaps that require explicit team decisions.

---

## Schema Reconciliation

### Residents Table: Complete Column-to-UI Mapping

Every column from `public.residents` (migration lines 157-207) is listed below with its exact mapping to a UI element.

| # | Schema Column | Type | UI Section | UI Element | Notes |
|---|---|---|---|---|---|
| 1 | `resident_id` | integer (PK, auto) | System | Not displayed to user | Internal PK; used in URLs (/caseload/:residentId) |
| 2 | `case_control_no` | text | Identification | Read-only text in list table + detail header | Primary visible identifier; used in search (US-2) |
| 3 | `internal_code` | text | Identification | Read-only text in detail view | Secondary identifier; also searchable (US-2) |
| 4 | `safehouse_id` | integer (FK) | Identification | Dropdown (populated from `safehouses` table) | Filter target (US-4); staff pre-filtered to assigned safehouse |
| 5 | `case_status` | text | Case Information | Status badge in list + dedicated "Update Status" action (US-15) | Filter target (US-3); define enum: Active, In Transition, Reintegrated, Discharged, Pending Intake |
| 6 | `sex` | text | Demographics | Dropdown (Male/Female/Intersex) | NOT "gender" -- use schema terminology |
| 7 | `date_of_birth` | date | Demographics | Date picker | Validate: not in future, not after admission date |
| 8 | `birth_status` | text | Demographics | Dropdown or text input | Clarify allowed values (e.g., Legitimate, Illegitimate, Unknown) |
| 9 | `place_of_birth` | text | Demographics | Text input | Free text; Philippine city/province |
| 10 | `religion` | text | Demographics | Dropdown with "Other" option | Common PH values: Catholic, Islam, INC, Protestant, etc. |
| 11 | `case_category` | text | Case Information | Dropdown | Values: Abuse, Trafficking, Neglect, Abandonment, etc.; filter target (US-5) |
| 12 | `sub_cat_orphaned` | boolean | Case Information | Checkbox | Part of checkbox group; NOT a dropdown |
| 13 | `sub_cat_trafficked` | boolean | Case Information | Checkbox | Part of checkbox group |
| 14 | `sub_cat_child_labor` | boolean | Case Information | Checkbox | Part of checkbox group |
| 15 | `sub_cat_physical_abuse` | boolean | Case Information | Checkbox | Part of checkbox group |
| 16 | `sub_cat_sexual_abuse` | boolean | Case Information | Checkbox | Part of checkbox group |
| 17 | `sub_cat_osaec` | boolean | Case Information | Checkbox | OSAEC = Online Sexual Abuse and Exploitation of Children |
| 18 | `sub_cat_cicl` | boolean | Case Information | Checkbox | CICL = Children in Conflict with the Law |
| 19 | `sub_cat_at_risk` | boolean | Case Information | Checkbox | Part of checkbox group |
| 20 | `sub_cat_street_child` | boolean | Case Information | Checkbox | Part of checkbox group |
| 21 | `sub_cat_child_with_hiv` | boolean | Case Information | Checkbox | Part of checkbox group |
| 22 | `is_pwd` | boolean | Disability & Special Needs | Checkbox (toggle) | PWD = Person With Disability; when checked, shows pwd_type field |
| 23 | `pwd_type` | text | Disability & Special Needs | Text input or dropdown (conditionally visible when is_pwd = true) | Conditional field |
| 24 | `has_special_needs` | boolean | Disability & Special Needs | Checkbox (toggle) | When checked, shows special_needs_diagnosis field |
| 25 | `special_needs_diagnosis` | text | Disability & Special Needs | Text input (conditionally visible when has_special_needs = true) | Conditional field |
| 26 | `family_is_4ps` | boolean | Family Socio-Demographic | Checkbox | 4Ps = Pantawid Pamilyang Pilipino Program (Philippine conditional cash transfer) |
| 27 | `family_solo_parent` | boolean | Family Socio-Demographic | Checkbox | |
| 28 | `family_indigenous` | boolean | Family Socio-Demographic | Checkbox | Indigenous Peoples (IP) community membership |
| 29 | `family_parent_pwd` | boolean | Family Socio-Demographic | Checkbox | Parent/guardian is a PWD |
| 30 | `family_informal_settler` | boolean | Family Socio-Demographic | Checkbox | Informal settler / squatter community |
| 31 | `date_of_admission` | date | Admission Details | Date picker | Required at intake (US-10 Step 3); filter target for date range (US-5b) |
| 32 | `age_upon_admission` | text | Admission Details | Text (auto-populated from DOB and admission date, or manually entered) | Stored as text -- may contain non-numeric values |
| 33 | `present_age` | text | Demographics (display) | Computed or text input | Plan says auto-calculate from DOB (US-13) but schema stores as text. Recommend: calculate for display, store on save |
| 34 | `length_of_stay` | text | Admission Details (display) | Computed or text | Calculate from admission date to now (or date_closed); store on save |
| 35 | `referral_source` | text | Referral Information | Dropdown or text | e.g., DSWD, LGU, NGO, Self-referral, Police |
| 36 | `referring_agency_person` | text | Referral Information | Text input | Name of referring person or agency |
| 37 | `date_colb_registered` | date | Admission Details | Date picker | COLB = Certificate of Live Birth; DSWD compliance critical |
| 38 | `date_colb_obtained` | date | Admission Details | Date picker | Alert if null after 30 days post-admission (US-26) |
| 39 | `assigned_social_worker` | text | Staff Assignment | Dropdown (populated from distinct values or staff list) | Single assignment only -- no secondary/supervisor in schema; filter target (US-5b) |
| 40 | `initial_case_assessment` | text | Case Information | Textarea (multiline) | Plan called this "initial assessment summary" -- use schema name |
| 41 | `date_case_study_prepared` | date | Case Information | Date picker | |
| 42 | `reintegration_type` | text | Reintegration Tracking | Dropdown | Values: family reunification, independent living, foster care, transfer |
| 43 | `reintegration_status` | text | Reintegration Tracking | Dropdown or status badge | Define enum values at application layer |
| 44 | `initial_risk_level` | text | Case Information | Dropdown (Low, Medium, High, Critical) + color badge | Set at intake; immutable after initial assessment? Clarify policy. |
| 45 | `current_risk_level` | text | Case Information | Dropdown + color badge (prominently displayed) | Filterable (US-5b); changes require notes (US-27) |
| 46 | `date_enrolled` | date | Admission Details | Date picker | Marks formal enrollment in program |
| 47 | `date_closed` | date | Admission Details | Date picker | Marks case closure; conditionally visible when status = Discharged or Reintegrated |
| 48 | `created_at` | timestamptz | System | Display as "Record created" timestamp in detail view footer | Auto-set by database |
| 49 | `notes_restricted` | text | Restricted Notes | Textarea | Visible to admin + assigned social worker ONLY; hidden from other staff |

### Fields the Plan Invented That Do NOT Exist in Schema

These must be removed from the plan OR added to the schema via a new migration:

| Invented Field | Used In | Resolution |
|---|---|---|
| first_name / last_name | US-1, US-2, US-8, US-10, US-25 | CRITICAL: No name columns exist. Either add via migration or redesign all name references to use case_control_no/internal_code. Verify with team if omission is intentional (PH data protection). |
| gender | US-8, US-10 | Use `sex` (schema term) instead |
| photo placeholder | US-8 | Remove from plan; no schema column |
| disability severity | US-8 | Remove; not in schema |
| disability accommodations_needed | US-8 | Remove; not in schema |
| family economic_status | US-8 | Remove; use the 5 boolean family flags instead |
| family contact_info | US-8 | Remove; not in schema |
| admitted_by | US-8 | Remove; not in schema |
| initial_assessment_summary | US-8 | Rename to `initial_case_assessment` (schema name) |
| reintegration readiness_score | US-8, US-16 | Remove; not in schema |
| reintegration placement_type | US-8, US-16 | Rename to `reintegration_type` (schema name) |
| post-placement monitoring dates | US-8, US-16 | Remove; not in schema |
| secondary social workers | US-8 | Remove; schema has single `assigned_social_worker` only |
| supervisor | US-8 | Remove; not in schema |

### Related Tables Referenced in Plan

| Table | Relationship | Usage in Caseload Page |
|---|---|---|
| `safehouses` | FK: residents.safehouse_id -> safehouses.safehouse_id | Safehouse dropdown in filters (US-4) and intake form (US-10) |
| `intervention_plans` | FK: intervention_plans.resident_id -> residents.resident_id | Timeline view (US-9); linked records in detail view |
| `education_records` | FK: education_records.resident_id -> residents.resident_id | Timeline view (US-9); linked records in detail view |
| `health_wellbeing_records` | FK: health_wellbeing_records.resident_id -> residents.resident_id | Timeline view (US-9); linked records in detail view |
| `process_recordings` | FK: process_recordings.resident_id -> residents.resident_id | Timeline view (US-9) |
| `home_visitations` | FK: home_visitations.resident_id -> residents.resident_id | Timeline view (US-9) |
| `incident_reports` | FK: incident_reports.resident_id -> residents.resident_id | Timeline view (US-9); cascade-delete warning (US-25b) |

---

## Above and Beyond Ideas

Ideas that go beyond minimum IS413/IS414 requirements and could earn extra credit or differentiate the project:

1. **COLB Compliance Dashboard Widget** -- Add a small card to the Admin Dashboard showing count of residents missing COLB beyond 30 days, with a direct link to the filtered caseload view. This demonstrates DSWD-specific domain knowledge and proactive compliance monitoring.

2. **Risk Level Heatmap** -- On the Admin Dashboard or Reports page, show a visual heatmap of current risk levels across safehouses. High-risk residents surface immediately. Integrates with the risk level filter (US-5b) and the risk management story (US-27).

3. **Soft-Delete with Recovery** -- Instead of hard-deleting resident records, add a `deleted_at` timestamptz column. Deleted records are hidden from normal views but recoverable by admin within 30 days. This exceeds the IS414 delete-confirmation requirement and demonstrates data integrity best practices.

4. **Optimistic Locking for Concurrent Edits** -- Use the `created_at` (or add an `updated_at`) timestamp to detect when two users edit the same resident simultaneously. Show a conflict resolution UI. This addresses a real-world case management problem and demonstrates advanced data integrity handling.

5. **PDF Export for Individual Resident Profiles** -- Generate a formatted PDF of a resident's complete profile for case conferences and DSWD submissions. US-21 only covers CSV export of the list view; individual PDF export adds significant value for real social work workflows.

6. **Audit Trail with Diff View** -- Beyond just logging changes (US-18), show a side-by-side diff of old vs. new values, similar to GitHub's diff view. Admin can review exactly what changed, when, and by whom. Could use a dedicated `audit_log` table.

7. **Smart Search with Typeahead** -- Extend US-2's search to provide typeahead suggestions as the user types, showing matching case_control_no and internal_code with the safehouse name. Reduces time to find a specific resident from seconds to keystrokes.

8. **Bulk Import from DSWD Excel Template** -- Philippine social welfare agencies use standardized Excel templates. Allow admin to upload a filled DSWD template and auto-map columns to the residents table. This demonstrates deep domain understanding and would be genuinely useful.

9. **Case Status Workflow Visualization** -- Show the status transition workflow (Pending Intake -> Active -> In Transition -> Reintegrated/Discharged) as a visual pipeline/kanban board, with resident counts at each stage and the ability to drag residents between stages (admin only).

10. **Offline-First PWA with Background Sync** -- Go beyond US-23's localStorage fallback by making the caseload page a Progressive Web App that works fully offline and syncs when connectivity returns. Relevant for social workers doing field work in areas with poor internet coverage in the Philippines.

---

## Implementation Plan

### Overview

This plan covers the full-stack implementation of the Caseload Inventory page. The existing codebase uses .NET 10 minimal APIs (no controllers), React+Vite+TypeScript on the frontend, EF Core with PostgreSQL (Supabase), and a single `Program.cs` file for all endpoint definitions. There is already a basic `GET /api/admin/residents` endpoint that returns the top 20 active residents for the admin dashboard widget; the caseload page requires a complete replacement with full CRUD, filtering, pagination, and sorting.

The current `apiFetch` helper in `frontend/src/api.ts` only supports GET. It must be extended to support POST/PUT/DELETE with JSON bodies. Auth is not yet wired up in the codebase -- endpoints below are written as if auth middleware exists; the actual `[Authorize]` setup is a separate task.

---

### 1. Backend API Endpoints

All endpoints live in `backend/Program.cs` as minimal API `Map*` calls, following the existing pattern. DTOs are defined in a new `backend/DTOs/` directory.

#### 1a. GET /api/admin/residents -- Paginated list with filtering, searching, sorting

**Query parameters:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | int | 1 | Page number (1-based) |
| `pageSize` | int | 20 | Items per page (allowed: 10, 20, 50, 100) |
| `search` | string? | null | Searches across `case_control_no`, `internal_code`, `assigned_social_worker` |
| `sortBy` | string? | `"dateOfAdmission"` | Column to sort on |
| `sortDir` | string? | `"desc"` | `"asc"` or `"desc"` |
| `caseStatus` | string? | null | Filter by exact case_status value |
| `safehouseId` | int? | null | Filter by safehouse FK |
| `caseCategory` | string? | null | Filter by case_category |
| `currentRiskLevel` | string? | null | Filter by current_risk_level |
| `assignedSocialWorker` | string? | null | Filter by assigned_social_worker |
| `isPwd` | bool? | null | Filter by is_pwd flag |
| `subCat` | string? | null | Comma-separated sub-category column names to filter where value = true (e.g., `"subCatTrafficked,subCatOrphaned"`) |
| `admittedFrom` | DateOnly? | null | Admission date range start |
| `admittedTo` | DateOnly? | null | Admission date range end |

**Response shape:**

```json
{
  "items": [
    {
      "residentId": 1,
      "caseControlNo": "CCN-001",
      "internalCode": "IC-001",
      "safehouseId": 2,
      "safehouseName": "SH2 Cebu",
      "caseStatus": "Active",
      "sex": "Female",
      "dateOfBirth": "2012-05-15",
      "presentAge": "13",
      "caseCategory": "Trafficking",
      "currentRiskLevel": "High",
      "dateOfAdmission": "2025-11-01",
      "assignedSocialWorker": "Elena Reyes",
      "subCategories": ["trafficked", "physicalAbuse"]
    }
  ],
  "totalCount": 87,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5
}
```

The list endpoint returns a **summary projection** (not all 49 columns). The sub-categories are collapsed into a string array of active flags for display as tags in the table.

**Implementation notes:**
- Replace the existing hardcoded `GET /api/admin/residents` endpoint (Program.cs line 292) with this new version. The admin dashboard widget can call this with `?caseStatus=Active&pageSize=20&sortBy=currentRiskLevel`.
- Build the `IQueryable<Resident>` pipeline: start with `db.Residents.AsQueryable()`, chain `.Where()` for each non-null filter param, apply search via `.Where(r => r.CaseControlNo.Contains(search) || r.InternalCode.Contains(search) || r.AssignedSocialWorker.Contains(search))`, apply sort via a switch on `sortBy`, then `.Skip((page-1)*pageSize).Take(pageSize)`.
- Use `CountAsync()` on the filtered query (before Skip/Take) for `totalCount`.
- Join safehouse name inline: `.Select(r => new { ..., safehouseName = r.Safehouse != null ? r.Safehouse.SafehouseCode + " " + r.Safehouse.City : null })`.
- Sub-category collapse: in the Select projection, build a list of strings from the 10 boolean flags.

#### 1b. GET /api/admin/residents/{id} -- Full resident detail

**Response shape:** All 49 columns mapped to a flat DTO, plus the safehouse name and computed fields.

```json
{
  "residentId": 1,
  "caseControlNo": "CCN-001",
  "internalCode": "IC-001",
  "safehouseId": 2,
  "safehouseName": "SH2 Cebu",
  "caseStatus": "Active",
  "sex": "Female",
  "dateOfBirth": "2012-05-15",
  "birthStatus": "Legitimate",
  "placeOfBirth": "Cebu City",
  "religion": "Catholic",
  "presentAge": "13",
  "caseCategory": "Trafficking",
  "subCatOrphaned": false,
  "subCatTrafficked": true,
  "subCatChildLabor": false,
  "subCatPhysicalAbuse": true,
  "subCatSexualAbuse": false,
  "subCatOsaec": false,
  "subCatCicl": false,
  "subCatAtRisk": false,
  "subCatStreetChild": false,
  "subCatChildWithHiv": false,
  "isPwd": false,
  "pwdType": null,
  "hasSpecialNeeds": false,
  "specialNeedsDiagnosis": null,
  "familyIs4ps": true,
  "familySoloParent": false,
  "familyIndigenous": false,
  "familyParentPwd": false,
  "familyInformalSettler": false,
  "dateOfAdmission": "2025-11-01",
  "ageUponAdmission": "12",
  "lengthOfStay": "5 months",
  "referralSource": "DSWD",
  "referringAgencyPerson": "Maria Santos",
  "dateColbRegistered": "2012-06-01",
  "dateColbObtained": "2012-06-15",
  "assignedSocialWorker": "Elena Reyes",
  "initialCaseAssessment": "...",
  "dateCaseStudyPrepared": "2025-12-01",
  "reintegrationType": null,
  "reintegrationStatus": null,
  "initialRiskLevel": "High",
  "currentRiskLevel": "High",
  "dateEnrolled": "2025-11-05",
  "dateClosed": null,
  "createdAt": "2025-11-01T08:00:00Z",
  "notesRestricted": "Sensitive case notes..."
}
```

**Implementation notes:**
- Return 404 if not found.
- `notesRestricted` should be included only when the requesting user is admin or the assigned social worker (once auth is wired up).

#### 1c. POST /api/admin/residents -- Create new resident

**Request body:** `ResidentCreateDto` -- all fields except `residentId` and `createdAt` (auto-set). All fields nullable except those marked required in the form (safehouseId, caseCategory, dateOfAdmission).

```json
{
  "caseControlNo": "CCN-088",
  "internalCode": "IC-088",
  "safehouseId": 2,
  "caseStatus": "Pending Intake",
  "sex": "Female",
  "dateOfBirth": "2013-03-20",
  "birthStatus": "Legitimate",
  "placeOfBirth": "Manila",
  "religion": "Catholic",
  "caseCategory": "Abuse",
  "subCatOrphaned": false,
  "subCatTrafficked": false,
  "subCatChildLabor": false,
  "subCatPhysicalAbuse": true,
  "subCatSexualAbuse": false,
  "subCatOsaec": false,
  "subCatCicl": false,
  "subCatAtRisk": false,
  "subCatStreetChild": false,
  "subCatChildWithHiv": false,
  "isPwd": false,
  "pwdType": null,
  "hasSpecialNeeds": false,
  "specialNeedsDiagnosis": null,
  "familyIs4ps": false,
  "familySoloParent": false,
  "familyIndigenous": false,
  "familyParentPwd": false,
  "familyInformalSettler": false,
  "dateOfAdmission": "2026-04-06",
  "ageUponAdmission": "13",
  "referralSource": "DSWD",
  "referringAgencyPerson": "Juan Cruz",
  "assignedSocialWorker": "Elena Reyes",
  "initialRiskLevel": "Medium",
  "currentRiskLevel": "Medium",
  "notesRestricted": null
}
```

**Response:** 201 Created with the full `ResidentDetailDto` (same shape as GET /:id response), including the generated `residentId`.

**Implementation notes:**
- Map DTO to `Resident` entity, set `CreatedAt = DateTime.UtcNow`, compute `PresentAge` from DOB if DOB is provided.
- Validate: `safehouseId` must exist in safehouses table, `caseStatus` must be one of the canonical values, date constraints (DOB not in future, admission not before DOB).
- Return 400 with validation errors object `{ errors: { "fieldName": ["message"] } }`.

#### 1d. PUT /api/admin/residents/{id} -- Update existing resident

**Request body:** Same shape as `ResidentCreateDto` (all fields). The full object is sent; the API overwrites all fields.

**Response:** 200 OK with the updated `ResidentDetailDto`.

**Implementation notes:**
- Return 404 if `id` not found.
- Same validation as POST.
- Recalculate `PresentAge` and `LengthOfStay` on save if DOB and admission date are present.
- Do NOT allow changing `residentId` or `createdAt`.

#### 1e. DELETE /api/admin/residents/{id} -- Delete resident

**Response:** 204 No Content on success, 404 if not found.

**Implementation notes:**
- EF Core will cascade-delete related records (process recordings, home visitations, education records, health records, intervention plans, incident reports) based on FK constraints in the schema.
- Admin-only endpoint (once auth is wired).
- Consider logging the deletion before executing it.

#### 1f. GET /api/admin/residents/filter-options -- Dropdown population

**Response:**

```json
{
  "safehouses": [
    { "safehouseId": 1, "label": "SH1 Manila" },
    { "safehouseId": 2, "label": "SH2 Cebu" }
  ],
  "caseStatuses": ["Active", "Pending Intake", "In Transition", "Reintegrated", "Discharged"],
  "caseCategories": ["Abuse", "Trafficking", "Neglect", "Abandonment"],
  "riskLevels": ["Low", "Medium", "High", "Critical"],
  "socialWorkers": ["Elena Reyes", "Maria Santos", "..."]
}
```

**Implementation notes:**
- `safehouses`: query `db.Safehouses.Select(s => new { s.SafehouseId, Label = s.SafehouseCode + " " + s.City })`.
- `caseStatuses` and `riskLevels`: hardcoded canonical arrays (defined as constants).
- `caseCategories`: `db.Residents.Select(r => r.CaseCategory).Distinct()` to discover actual values.
- `socialWorkers`: `db.Residents.Select(r => r.AssignedSocialWorker).Where(w => w != null).Distinct()`.

---

### 2. Frontend Components

#### Component Tree

```
pages/
  caseload/
    CaseloadPage.tsx              -- Route: /caseload (the list view)
    CaseloadPage.module.css
    ResidentDetailPage.tsx        -- Route: /caseload/:residentId (detail view)
    ResidentDetailPage.module.css
    ResidentFormPage.tsx          -- Route: /caseload/new and /caseload/:residentId/edit
    ResidentFormPage.module.css

components/
  caseload/
    ResidentsTable.tsx            -- Table with sortable columns, row click
    ResidentsTable.module.css
    ResidentFilters.tsx           -- Filter bar (dropdowns + search + date range)
    ResidentFilters.module.css
    ResidentDetailSections.tsx    -- Collapsible sections for all 49 fields
    ResidentDetailSections.module.css
    ResidentFormSections.tsx      -- Accordion/step form sections for create/edit
    ResidentFormSections.module.css
    DeleteResidentDialog.tsx      -- Confirmation modal with typed case_control_no
    DeleteResidentDialog.module.css
    StatusBadge.tsx               -- Color-coded badge for case_status and risk_level
    RiskBadge.tsx                 -- Color-coded badge for risk level
    SubCategoryTags.tsx           -- Renders active sub-category booleans as tag chips
    Pagination.tsx                -- Page controls (prev/next, page numbers, page size selector)
    Pagination.module.css
```

#### 2a. CaseloadPage (ResidentsList)

The main list view at `/caseload`.

**State management:**
- URL search params drive all state (page, pageSize, search, sortBy, sortDir, filters). This enables bookmarkable/shareable filtered views per US-3 acceptance criteria.
- `useSearchParams()` from React Router to read/write URL params.
- A custom `useResidents(params)` hook wraps the `apiFetch` call and returns `{ data, isLoading, error }`.
- A custom `useFilterOptions()` hook fetches `/api/admin/residents/filter-options` once on mount.

**Layout:**
1. Page header: "Caseload Inventory" title + "Add Resident" button (admin/staff)
2. Filter bar (`ResidentFilters`): search input (debounced 300ms), dropdowns for case status, safehouse, case category, risk level, social worker. Active filter chips below with "Clear all" button.
3. Results summary: "Showing 1-20 of 87 residents"
4. Table (`ResidentsTable`): columns = Case ID, Internal Code, Safehouse, Status, Category, Sub-Categories (tags), Risk Level, Admitted, Social Worker. Clickable column headers for sorting. Rows clickable to navigate to detail page.
5. Pagination controls (`Pagination`): page size selector, prev/next, page numbers.

**Key behaviors:**
- Search is debounced: `useState` for the input value, `useEffect` with 300ms timeout to push to URL params.
- Changing any filter resets page to 1.
- Loading skeleton shows while `isLoading` is true.
- Empty state: "No residents match your filters" with a "Clear filters" link.

#### 2b. ResidentDetailPage

The detail view at `/caseload/:residentId`.

**Layout:**
1. Breadcrumb: "Caseload > CCN-001"
2. Header: Case Control No, Internal Code, Status badge, Risk badge, Safehouse name
3. Action buttons: "Edit" (navigates to edit form), "Update Status" (opens status modal), "Delete" (admin only, opens delete dialog)
4. Collapsible sections (`ResidentDetailSections`), matching the 10 schema-reconciled sections:
   - **Identification:** case_control_no, internal_code, safehouse, case_status
   - **Demographics:** sex, date_of_birth, birth_status, place_of_birth, religion, present_age
   - **Case Information:** case_category, 10 sub-category tags, initial_risk_level, current_risk_level, initial_case_assessment, date_case_study_prepared
   - **Disability & Special Needs:** is_pwd, pwd_type (conditional), has_special_needs, special_needs_diagnosis (conditional)
   - **Family Socio-Demographic:** 5 boolean flags displayed as yes/no badges with labels
   - **Admission Details:** date_of_admission, age_upon_admission, length_of_stay, date_enrolled, date_closed, date_colb_registered, date_colb_obtained
   - **Referral Information:** referral_source, referring_agency_person
   - **Staff Assignment:** assigned_social_worker
   - **Reintegration Tracking:** reintegration_type, reintegration_status
   - **Restricted Notes:** notes_restricted (visible only to admin / assigned worker; otherwise section shows "Access restricted")

Each section: header with expand/collapse chevron, summary line in collapsed state (e.g., "Female, DOB 2012-05-15, Catholic"), full field grid when expanded. First 3 sections expanded by default.

#### 2c. ResidentFormPage (Create / Edit)

Shared component for both `/caseload/new` and `/caseload/:residentId/edit`.

**Layout approach:** Accordion sections (not multi-step wizard). All sections visible at once but collapsed; user expands the one they are working on. This is simpler to implement than a multi-step wizard and avoids the problem of losing data between steps. Each section has a validation indicator (green check or red X) in the header.

**Sections (matching detail sections):**
1. Identification & Demographics (required: safehouse_id, sex)
2. Case Information (required: case_category)
3. Disability & Special Needs (all optional)
4. Family Socio-Demographic (all optional)
5. Admission Details (required: date_of_admission)
6. Referral Information (optional)
7. Staff Assignment (required: assigned_social_worker)
8. Reintegration Tracking (optional; only relevant for In Transition status)
9. Restricted Notes (optional; admin only field)

**Form state:**
- `react-hook-form` with a Zod schema for validation.
- For edit mode: fetch the existing resident and populate all fields via `reset()`.
- Auto-save draft to `localStorage` every 30 seconds (US-23). Key: `"resident-draft-{residentId|new}"`. Clear on successful submit.
- Computed fields: `presentAge` calculated on the fly from `dateOfBirth`, `ageUponAdmission` calculated from DOB and admission date, `lengthOfStay` calculated from admission date to now.

**Sub-category handling:** Rendered as a checkbox group inside the Case Information section. Each of the 10 boolean flags gets its own labeled checkbox with a tooltip explaining the category.

**Conditional fields:**
- `pwdType` input only visible when `isPwd` is checked.
- `specialNeedsDiagnosis` only visible when `hasSpecialNeeds` is checked.
- Reintegration fields only enabled when `caseStatus` is "In Transition" or "Reintegrated".
- `dateClosed` only enabled when `caseStatus` is "Discharged" or "Reintegrated".

**Submit behavior:**
- POST for new, PUT for edit.
- On success: navigate to the detail page with a success toast.
- On 400: map server errors to fields and display inline.

#### 2d. DeleteResidentDialog

Modal dialog triggered from the detail page (admin only).

- Shows: "Permanently delete resident [CCN-001]? This will also delete all associated process recordings, home visitations, education records, health records, intervention plans, and incident reports."
- Text input: "Type the case control number to confirm"
- Delete button disabled until typed text matches `caseControlNo` exactly.
- Cancel button visually prominent.
- On confirm: calls `DELETE /api/admin/residents/{id}`, navigates to list on success.

---

### 3. Schema Issues to Resolve

#### 3a. No Name Fields (CRITICAL)

The `residents` table has no `first_name` or `last_name` columns. Residents are identified solely by `case_control_no` and `internal_code`. This is likely intentional for Philippine data protection (RA 10173 - Data Privacy Act).

**Resolution for this implementation:** Design the UI around case_control_no and internal_code as the primary identifiers. The table shows these as the "ID" column. Search (US-2) searches across `case_control_no`, `internal_code`, and `assigned_social_worker`. The UI never refers to "resident name" -- it uses "Case ID" and "Internal Code" instead.

If the team later decides to add name fields, a migration adds `first_name` and `last_name` columns, and the search/display are updated accordingly. The implementation should be structured so this is a straightforward addition (the search params and table column configs are data-driven).

#### 3b. Sub-Categories Are Booleans, Not Dropdowns

The 10 `sub_cat_*` columns are independent booleans. A resident can have multiple sub-categories simultaneously.

**Resolution:**
- **Detail view:** Show active sub-categories as colored tag chips (e.g., "Trafficked", "Physical Abuse"). Inactive ones are not shown.
- **Form:** Checkbox group with 10 checkboxes, each labeled with the human-readable name plus a tooltip explaining the category.
- **List view:** Show as small tags in the sub-categories column (max 2 visible + "+N more" overflow).
- **Filtering:** The `subCat` query param accepts comma-separated column names. The backend builds `.Where()` conditions using OR logic (show residents matching ANY of the selected sub-categories). The filter UI uses a multi-select checkbox dropdown.

#### 3c. 13+ Fields Missing from Original Plan

The schema reconciliation section above identifies 13+ fields that were not in the original user stories. All of these are now included in the implementation:

- `birth_status`, `place_of_birth`, `religion` -- added to Demographics section
- `internal_code` -- added to Identification section and search
- `age_upon_admission`, `length_of_stay` -- added to Admission Details (computed where possible)
- `present_age` -- computed from DOB, stored on save
- `date_colb_registered`, `date_colb_obtained` -- added to Admission Details
- `date_case_study_prepared` -- added to Case Information
- `initial_risk_level`, `current_risk_level` -- added to Case Information with color badges
- `date_enrolled`, `date_closed` -- added to Admission Details
- `notes_restricted` -- added as a restricted section

#### 3d. Invented Fields to Remove

The following fields from the original user stories do NOT exist in the schema and are excluded from this implementation: disability severity, accommodations needed, family economic status, family contact info, admitted by, readiness score, post-placement monitoring dates, secondary social workers, supervisor, resident photo, first/last name, gender (use `sex` instead).

#### 3e. Text Fields That Should Be Enums

`case_status`, `risk_level`, `reintegration_type`, `reintegration_status`, `case_category`, `birth_status`, `sex`, and `religion` are all stored as free text in the schema. The application enforces canonical values via frontend dropdowns and backend validation. Canonical values are defined as constants in a shared location (`backend/Constants/ResidentEnums.cs` and `frontend/src/constants/residentEnums.ts`).

Canonical values:
- **case_status:** `"Active"`, `"Pending Intake"`, `"In Transition"`, `"Reintegrated"`, `"Discharged"`
- **risk_level:** `"Low"`, `"Medium"`, `"High"`, `"Critical"`
- **sex:** `"Male"`, `"Female"`, `"Intersex"`
- **birth_status:** `"Legitimate"`, `"Illegitimate"`, `"Unknown"`
- **religion:** `"Catholic"`, `"Islam"`, `"INC"`, `"Protestant"`, `"Seventh-day Adventist"`, `"Other"`
- **reintegration_type:** `"Family Reunification"`, `"Independent Living"`, `"Foster Care"`, `"Transfer"`
- **reintegration_status:** `"Not Started"`, `"In Progress"`, `"Completed"`, `"Failed"`

---

### 4. Filtering and Searching

#### Server-Side Filtering Strategy

All filtering happens server-side in the `GET /api/admin/residents` endpoint. The `IQueryable<Resident>` pipeline applies filters conditionally:

```csharp
var query = db.Residents.Include(r => r.Safehouse).AsQueryable();

if (!string.IsNullOrEmpty(search))
    query = query.Where(r =>
        (r.CaseControlNo != null && r.CaseControlNo.Contains(search)) ||
        (r.InternalCode != null && r.InternalCode.Contains(search)) ||
        (r.AssignedSocialWorker != null && r.AssignedSocialWorker.Contains(search)));

if (!string.IsNullOrEmpty(caseStatus))
    query = query.Where(r => r.CaseStatus == caseStatus);

if (safehouseId.HasValue)
    query = query.Where(r => r.SafehouseId == safehouseId);

if (!string.IsNullOrEmpty(caseCategory))
    query = query.Where(r => r.CaseCategory == caseCategory);

if (!string.IsNullOrEmpty(currentRiskLevel))
    query = query.Where(r => r.CurrentRiskLevel == currentRiskLevel);

if (!string.IsNullOrEmpty(assignedSocialWorker))
    query = query.Where(r => r.AssignedSocialWorker == assignedSocialWorker);

if (isPwd.HasValue)
    query = query.Where(r => r.IsPwd == isPwd);

if (admittedFrom.HasValue)
    query = query.Where(r => r.DateOfAdmission >= admittedFrom);

if (admittedTo.HasValue)
    query = query.Where(r => r.DateOfAdmission <= admittedTo);

// Sub-category filter: OR logic across selected sub-cat flags
if (!string.IsNullOrEmpty(subCat))
{
    var flags = subCat.Split(',');
    // Build expression dynamically or use a predicate builder
    // Each flag maps to a boolean column
}
```

#### Sorting Strategy

Sort is applied via a switch statement on the `sortBy` parameter:

```csharp
query = sortBy switch
{
    "caseControlNo" => sortDir == "asc" ? query.OrderBy(r => r.CaseControlNo) : query.OrderByDescending(r => r.CaseControlNo),
    "caseStatus" => sortDir == "asc" ? query.OrderBy(r => r.CaseStatus) : query.OrderByDescending(r => r.CaseStatus),
    "caseCategory" => sortDir == "asc" ? query.OrderBy(r => r.CaseCategory) : query.OrderByDescending(r => r.CaseCategory),
    "currentRiskLevel" => /* custom order: Critical > High > Medium > Low */,
    "assignedSocialWorker" => sortDir == "asc" ? query.OrderBy(r => r.AssignedSocialWorker) : query.OrderByDescending(r => r.AssignedSocialWorker),
    _ => sortDir == "asc" ? query.OrderBy(r => r.DateOfAdmission) : query.OrderByDescending(r => r.DateOfAdmission),
};
```

#### Frontend Filter State

All filter state is stored in URL search params via `useSearchParams()`. This means:
- Filters survive page refresh.
- Filtered views are bookmarkable and shareable.
- Browser back/forward navigates through filter history.
- The filter bar reads from URL params on mount and writes to URL params on change.

The search input is debounced with a 300ms delay before updating the URL param.

---

### 5. Files to Create / Modify

#### Files to CREATE (new files):

**Backend:**
| File | Purpose |
|---|---|
| `backend/DTOs/ResidentListItemDto.cs` | Response DTO for paginated list items (summary fields) |
| `backend/DTOs/ResidentDetailDto.cs` | Response DTO for full resident detail (all 49 fields) |
| `backend/DTOs/ResidentCreateDto.cs` | Request DTO for creating a resident |
| `backend/DTOs/ResidentUpdateDto.cs` | Request DTO for updating a resident (same shape as create) |
| `backend/DTOs/PaginatedResponse.cs` | Generic wrapper: `{ items, totalCount, page, pageSize, totalPages }` |
| `backend/DTOs/FilterOptionsDto.cs` | Response DTO for filter dropdown options |
| `backend/Constants/ResidentEnums.cs` | Canonical values for case_status, risk_level, sex, etc. |

**Frontend:**
| File | Purpose |
|---|---|
| `frontend/src/pages/caseload/CaseloadPage.tsx` | Resident list page with filters, search, table, pagination |
| `frontend/src/pages/caseload/CaseloadPage.module.css` | Styles for list page |
| `frontend/src/pages/caseload/ResidentDetailPage.tsx` | Full resident detail with collapsible sections |
| `frontend/src/pages/caseload/ResidentDetailPage.module.css` | Styles for detail page |
| `frontend/src/pages/caseload/ResidentFormPage.tsx` | Create/edit form with accordion sections |
| `frontend/src/pages/caseload/ResidentFormPage.module.css` | Styles for form page |
| `frontend/src/components/caseload/ResidentsTable.tsx` | Sortable table component |
| `frontend/src/components/caseload/ResidentsTable.module.css` | Table styles |
| `frontend/src/components/caseload/ResidentFilters.tsx` | Filter bar with dropdowns, search, chips |
| `frontend/src/components/caseload/ResidentFilters.module.css` | Filter styles |
| `frontend/src/components/caseload/ResidentDetailSections.tsx` | Collapsible detail sections |
| `frontend/src/components/caseload/ResidentDetailSections.module.css` | Detail section styles |
| `frontend/src/components/caseload/ResidentFormSections.tsx` | Accordion form sections |
| `frontend/src/components/caseload/ResidentFormSections.module.css` | Form section styles |
| `frontend/src/components/caseload/DeleteResidentDialog.tsx` | Delete confirmation modal |
| `frontend/src/components/caseload/DeleteResidentDialog.module.css` | Dialog styles |
| `frontend/src/components/caseload/StatusBadge.tsx` | Color-coded status badge |
| `frontend/src/components/caseload/RiskBadge.tsx` | Color-coded risk level badge |
| `frontend/src/components/caseload/SubCategoryTags.tsx` | Sub-category tag chips |
| `frontend/src/components/caseload/Pagination.tsx` | Pagination controls |
| `frontend/src/components/caseload/Pagination.module.css` | Pagination styles |
| `frontend/src/hooks/useResidents.ts` | Hook: fetch paginated residents with filters |
| `frontend/src/hooks/useResident.ts` | Hook: fetch single resident by ID |
| `frontend/src/hooks/useFilterOptions.ts` | Hook: fetch filter dropdown options |
| `frontend/src/constants/residentEnums.ts` | Canonical enum values matching backend |
| `frontend/src/types/resident.ts` | TypeScript interfaces for resident DTOs |

#### Files to MODIFY (existing files):

| File | Change |
|---|---|
| `backend/Program.cs` | Replace existing `GET /api/admin/residents` (line 292-321) with the 6 new endpoints (1a-1f). Add `using backend.DTOs;` and `using backend.Constants;`. |
| `frontend/src/api.ts` | Add `apiPost<T>`, `apiPut<T>`, `apiDelete` functions that send JSON bodies and handle non-GET methods. |
| `frontend/src/types.ts` | Add resident-related type exports (or re-export from `types/resident.ts`). |
| `frontend/src/App.tsx` | Add routes: `/caseload`, `/caseload/new`, `/caseload/:residentId`, `/caseload/:residentId/edit`. |

---

### 6. Suggested Implementation Order

Build in vertical slices so the feature is testable at each stage.

#### Phase 1: Backend Foundation (Day 1-2)

1. Create `backend/DTOs/` directory and all DTO files.
2. Create `backend/Constants/ResidentEnums.cs` with canonical values.
3. Implement `GET /api/admin/residents` with pagination only (no filters yet). Test with browser/curl.
4. Implement `GET /api/admin/residents/{id}`. Test.
5. Implement `GET /api/admin/residents/filter-options`. Test.

#### Phase 2: Frontend List View (Day 2-3)

6. Create `frontend/src/types/resident.ts` with TypeScript interfaces.
7. Create `frontend/src/constants/residentEnums.ts`.
8. Create `useResidents` hook.
9. Build `CaseloadPage.tsx` with `ResidentsTable` and `Pagination` (no filters yet).
10. Add route in `App.tsx` and verify the page loads with real data.
11. Build `StatusBadge`, `RiskBadge`, `SubCategoryTags` components.

#### Phase 3: Filtering and Search (Day 3-4)

12. Add all filter query params to the backend `GET /api/admin/residents` endpoint.
13. Build `ResidentFilters` component with search, dropdowns, filter chips.
14. Create `useFilterOptions` hook.
15. Wire filter state to URL search params.
16. Test: verify filters combine correctly, page resets to 1, URL is bookmarkable.

#### Phase 4: Detail View (Day 4-5)

17. Create `useResident` hook.
18. Build `ResidentDetailPage.tsx` with `ResidentDetailSections`.
19. Implement all 10 collapsible sections with proper field rendering.
20. Add route and verify navigation from table row click.

#### Phase 5: Create / Edit Form (Day 5-7)

21. Extend `api.ts` with `apiPost`, `apiPut`, `apiDelete` helpers.
22. Implement `POST /api/admin/residents` and `PUT /api/admin/residents/{id}` on backend with validation.
23. Build `ResidentFormPage.tsx` with `ResidentFormSections`.
24. Implement Zod validation schema.
25. Wire up form submission, error handling, success navigation.
26. Test: create a new resident, edit an existing one.
27. Add localStorage auto-save for draft resilience.

#### Phase 6: Delete and Polish (Day 7-8)

28. Implement `DELETE /api/admin/residents/{id}` on backend.
29. Build `DeleteResidentDialog` component.
30. Wire up delete from detail page.
31. Add sorting to list view (clickable column headers).
32. Add empty states, loading skeletons, error states.
33. Responsive CSS pass for mobile (360px+ breakpoints).
34. End-to-end manual testing of all CRUD operations with filters.

#### Phase 7: Stretch Goals (Day 8+, if time permits)

35. Soft-delete pattern (add `deleted_at` column via migration).
36. CSV export endpoint and button.
37. Audit trail (requires new `audit_log` table and migration).
38. Timeline view on detail page (aggregates from related tables).
39. Bulk status update with checkbox selection.
