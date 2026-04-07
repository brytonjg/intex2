# Home Visitation & Case Conferences Plan

## Purpose

The Home Visitation & Case Conferences page enables social workers to log field visits and manage case conference histories. Home visitations are critical to the reintegration process -- they assess family readiness, document safety concerns, and track the transition of residents from safehouse care to family or community placement. Case conferences bring together multidisciplinary teams to make collective decisions about a resident's care plan.

### IS413 Requirement
"Log home/field visits including visit type (initial assessment, routine follow-up, reintegration assessment, post-placement monitoring, emergency), observations, family cooperation, safety concerns, follow-up actions. Also case conference history and upcoming conferences."

### Database Tables
- `home_visitations` (primary)
- `residents` (linked via resident_id)
- `safehouses` (linked for location context)
- `intervention_plans` (referenced in case conferences)

### RBAC
- **Admin:** Full CRUD on all visitations and case conferences across all safehouses
- **Staff/Employee:** View and create visitations for residents in their caseload; edit own records within 72 hours
- **Donor:** No access (403)

---

## Personas

### 1. Elena Reyes (Social Worker)
- **Age:** 34
- **Location:** Cebu City, Philippines
- **Device:** Android phone in the field; office desktop for write-up
- **Role:** Staff/Employee
- **Background:** Conducts 2-3 home visitations per week, often traveling to rural barangays outside Cebu City. She visits families of residents who are being assessed for reintegration or who have already been placed back with family. She documents visits on her phone during travel and writes detailed reports at the office.
- **Goals:** Log visit details quickly on mobile during or immediately after a visit. Flag safety concerns that need immediate supervisor attention. Track whether families are cooperating with the reintegration plan. Maintain a schedule of upcoming visits.
- **Frustrations:** Poor mobile connectivity in rural areas. Losing notes typed on her phone when signal drops. No way to quickly escalate a safety concern from the field. Visits pile up without documentation because the form is too long for mobile.
- **Key Question:** "Can I log a visit on my phone in 5 minutes while sitting in a tricycle between appointments?"

### 2. Director Reyes (Co-Founder / Admin)
- **Age:** 52
- **Location:** Portland, OR
- **Device:** MacBook Pro, Chrome
- **Role:** Admin
- **Background:** Reviews visitation reports to assess reintegration readiness across safehouses. Particularly concerned about safety flags -- any indication that a family environment is unsafe must be addressed immediately. Also chairs monthly case conferences for complex cases.
- **Goals:** See all safety-flagged visits across safehouses. Review visitation frequency to ensure DSWD compliance (minimum visit cadence). Schedule and manage case conferences. Review case conference outcomes and decisions.
- **Frustrations:** Safety concerns buried in long narrative reports. No dashboard showing overdue visits. Case conference scheduling is done via email and spreadsheets. Decisions made in conferences aren't tracked systematically.
- **Key Question:** "Are there any safety concerns across our safehouses right now, and are we maintaining our visit cadence?"

### 3. Grace Flores (Donor Relations Coordinator)
- **Age:** 29
- **Location:** Manila, Philippines
- **Device:** Laptop, Edge
- **Role:** Staff/Employee (limited access)
- **Background:** Needs aggregate visitation data for impact reports (e.g., "342 home visits conducted this year, 87% of families showed cooperation improvement"). Does not access individual visit details.
- **Goals:** Get aggregate counts and trends for donor reporting. Understand reintegration success metrics tied to visitation patterns.
- **Frustrations:** Has to ask social workers to compile visit counts manually. No pre-built reports for donor communications.
- **Key Question:** "How many home visits were conducted this quarter and what are the cooperation trends?"

### 4. Barangay Social Worker (External Partner)
- **Age:** 38
- **Location:** Rural barangay, Cebu province
- **Device:** Personal smartphone (older Android, slow connection)
- **Role:** Not a system user -- but is a stakeholder whose input Elena documents
- **Background:** Local government social worker who participates in joint home visits with Elena. Provides community-level context about the family. Their observations are documented by Elena in the visit record.
- **Goals (as represented by Elena):** Have their input captured accurately. Receive follow-up information about decisions made regarding the family. Feel that the visit was productive and well-documented.
- **Frustrations:** Visits feel redundant if previous visit notes aren't referenced. Follow-up actions from last visit weren't completed. No feedback loop about case conference decisions.
- **Key Question:** "Were the concerns I raised at the last visit addressed, and what happened at the case conference?"

---

## User Stories

### Home Visitation Entry

**US-1: Create new home visitation record**
As Elena (social worker), I want to log a home visitation, so that the visit is formally documented for the resident's case file.
- **Acceptance Criteria:**
  - Form fields:
    - Visit date (default: today, cannot be future)
    - Resident (searchable dropdown, pre-filled if navigated from resident profile)
    - Visit type (dropdown: Initial Assessment, Routine Follow-Up, Reintegration Assessment, Post-Placement Monitoring, Emergency Visit)
    - Location visited (text: address or barangay name)
    - Persons present (multi-line text: names and relationships)
    - Family members contacted (multi-select from resident's family profile, plus free-text add)
    - Observations (rich text area, minimum 100 characters)
    - Family cooperation level (scale: Non-Cooperative, Minimally Cooperative, Cooperative, Highly Cooperative)
    - Safety concerns (toggle: Yes/No; if Yes, text area and severity: Low/Medium/High/Critical)
    - Follow-up actions (repeatable: action, due date, assigned to, priority)
    - Visit duration (minutes)
    - Accompanying staff or partners (text)
    - Next scheduled visit date (date picker, optional)
  - Required fields: visit date, resident, visit type, observations, family cooperation level
  - "Save" and "Save & Add Another" buttons

**US-2: Safety concern flagging with escalation**
As Elena (social worker), I want to flag safety concerns during a visit, so that my supervisor is immediately alerted.
- **Acceptance Criteria:**
  - Safety concern toggle prominently placed in the form (not buried)
  - When toggled to "Yes":
    - Severity selector appears: Low (monitoring needed), Medium (follow-up within 1 week), High (follow-up within 48 hours), Critical (immediate action required)
    - Safety concern description field (required, minimum 50 characters)
    - "Critical" severity triggers immediate notification to supervisor and Director Reyes
    - Safety concern type checkboxes: Physical Safety, Emotional Abuse, Neglect, Substance Abuse in Home, Unsuitable Living Conditions, Family Conflict, Other
  - Visit records with safety concerns display a red warning icon in list views
  - Safety concern history visible on the resident's profile

**US-3: Quick mobile visit logging**
As Elena (in the field on her phone), I want a simplified mobile form, so that I can log the essentials quickly and add details later at the office.
- **Acceptance Criteria:**
  - On mobile (< 768px), form shows a "Quick Log" mode by default
  - Quick Log captures: visit date, resident, visit type, cooperation level, safety concern (Y/N + description if Y), brief notes (text, no minimum)
  - "Save as Quick Log" saves with a "Needs Detail" flag
  - Quick Logs appear in the visitation list with a pencil icon indicating they need completion
  - Elena can expand the Quick Log to the full form later on desktop
  - Auto-save to localStorage every 15 seconds on mobile

**US-4: Visit observations with structured sections**
As Elena (social worker), I want observation prompts organized by category, so that I document consistently across visits.
- **Acceptance Criteria:**
  - Observation section has collapsible sub-sections with prompts:
    - Home Environment (cleanliness, safety hazards, sleeping arrangements, space adequacy)
    - Family Dynamics (interactions observed, communication patterns, discipline methods)
    - Resident's Behavior (comfort level, interaction with family, regression signs, positive indicators)
    - Community Integration (school attendance, peer relationships, community support)
    - Economic Situation (employment, food security, basic needs met)
  - Each sub-section has a text area for notes
  - Sub-sections are optional (not all apply to every visit type)
  - Combined narrative is generated from sub-sections for the full record

**US-5: Reference previous visit during entry**
As Elena (social worker), I want to see the previous visit's notes while entering a new visit, so that I can reference follow-ups and track changes.
- **Acceptance Criteria:**
  - Collapsible panel showing the most recent visit for the same resident
  - Shows: date, type, cooperation level, safety concerns, follow-up actions (with completion status)
  - Outstanding follow-ups from previous visits highlighted
  - Panel does not interfere with the current form on desktop (side-by-side layout)
  - On mobile: accessible via a "Previous Visit" button that opens a drawer

### Visitation List & History

**US-6: View visitation history for a resident**
As Elena (social worker), I want to see all home visitations for a resident chronologically, so that I can track the family engagement pattern.
- **Acceptance Criteria:**
  - Accessible from the resident's profile page (tab: "Home Visits")
  - Listed newest-first: date, visit type, cooperation level, safety flag (icon), social worker
  - Expandable rows showing full visit details
  - Cooperation level displayed as a colored indicator (red/yellow/green/blue)
  - Total visit count and date of last visit shown at top
  - Pagination: 10 per page

**US-7: Cooperation trend chart**
As Elena (social worker), I want to see a chart of family cooperation over time, so that I can assess whether the family is becoming more receptive.
- **Acceptance Criteria:**
  - Bar or line chart showing cooperation level (1-4 scale) plotted against visit dates
  - Color-coded: red (non-cooperative) to green (highly cooperative)
  - Chart displayed above the visit history list
  - Hoverable data points showing visit type and date
  - Trend line showing direction (improving/declining/stable)

**US-8: Cross-resident visitation dashboard**
As Director Reyes (admin), I want a dashboard of all recent visitations across safehouses, so that I can monitor field activity.
- **Acceptance Criteria:**
  - Dashboard view accessible from main navigation
  - Shows all visits from the last 30 days
  - Filterable by: safehouse, visit type, cooperation level, safety concern (Y/N), social worker, date range
  - Summary cards at top: total visits this month, visits with safety concerns, overdue follow-ups, average cooperation level
  - Safety-flagged visits highlighted and sortable to top
  - Click through to individual visit records

**US-9: Overdue visit alerts**
As Director Reyes (admin), I want to see which residents are overdue for a visit, so that we maintain DSWD-required visit cadence.
- **Acceptance Criteria:**
  - Visit cadence rules configurable per visit type:
    - Post-Placement Monitoring: every 30 days for first 6 months
    - Routine Follow-Up: every 60 days for active residents with family contact
    - Reintegration Assessment: every 14 days during transition period
  - Dashboard widget: "Overdue Visits" showing residents past their scheduled cadence
  - Sorted by days overdue (most overdue first)
  - Social worker name shown for accountability
  - Click to create a new visit for that resident

### Case Conferences

**US-10: Schedule a case conference**
As Director Reyes (admin), I want to schedule a case conference, so that the multidisciplinary team can discuss a resident's care plan.
- **Acceptance Criteria:**
  - "Schedule Conference" button on the case conference tab
  - Form fields: resident, conference date/time, type (Initial Case Review, Progress Review, Reintegration Planning, Emergency, Discharge Planning), invited attendees (multi-select from staff + free text for external), agenda items (repeatable text fields), location (dropdown: safehouse meeting room, virtual, external venue)
  - Scheduling creates a record visible to all invited attendees
  - Notification sent to all attendees (in-app notification at minimum)
  - Conference appears on a calendar view

**US-11: Record case conference outcomes**
As Elena (social worker), I want to document the decisions and action items from a case conference, so that outcomes are tracked.
- **Acceptance Criteria:**
  - After a conference date, an "Add Minutes" button appears
  - Minutes form: attendees present (checkbox from invited list), discussion summary (rich text), decisions made (repeatable: decision text, rationale), action items (repeatable: action, assigned to, due date, priority), next conference date (optional)
  - Minutes linked to the resident's timeline
  - Action items appear in the follow-up dashboard
  - Minutes are read-only after 48 hours (editable by admin always)

**US-12: Upcoming conference calendar**
As Elena (social worker), I want to see upcoming case conferences, so that I can prepare in advance.
- **Acceptance Criteria:**
  - Calendar or list view of upcoming conferences
  - Shows: resident (code or first name), date/time, type, attendees
  - Filterable by: my conferences only, all conferences, safehouse
  - Conferences in the next 7 days highlighted
  - Link to the resident's profile and recent recordings for preparation
  - "My Schedule" default view shows only conferences the user is invited to

**US-13: Case conference history**
As Director Reyes (admin), I want to review past case conference minutes, so that I can track how decisions are being implemented.
- **Acceptance Criteria:**
  - Past conferences listed chronologically (newest first) on the resident's profile
  - Each showing: date, type, attendees, decision summary (preview), action item completion percentage
  - Expandable to show full minutes
  - Action items show status (open/completed/overdue)
  - Filterable by conference type and date range

### Follow-Up Management

**US-14: Unified follow-up dashboard**
As Elena (social worker), I want a single view of all follow-up actions from visits and conferences, so that nothing falls through the cracks.
- **Acceptance Criteria:**
  - Dashboard tab showing all follow-ups assigned to the current user
  - Source column indicates origin: "Home Visit - [date]" or "Case Conference - [date]"
  - Columns: resident, action, due date, priority, source, status
  - Sorted by due date; overdue items at top with red highlight
  - "Mark Complete" with completion note
  - Filter by: overdue only, priority, resident, source type

**US-15: Follow-up completion from visitation record**
As Elena (social worker), I want to mark follow-ups complete directly from the visitation record, so that I can update status while reviewing the visit.
- **Acceptance Criteria:**
  - Follow-up actions displayed in the visit detail with status (Open/Completed)
  - "Complete" button next to each open follow-up
  - Completion requires: brief note about outcome
  - Completed follow-ups show: completion date, completed by, completion note
  - Status change reflected in the follow-up dashboard immediately

### Reporting & Export

**US-16: Visitation statistics for impact reporting**
As Grace (donor relations), I want aggregate visitation statistics, so that I can include them in donor communications.
- **Acceptance Criteria:**
  - API endpoint returning aggregate stats (no individual data):
    - Total visits by type and time period
    - Average cooperation level trend
    - Percentage of visits with safety concerns (declining = good)
    - Visit frequency by safehouse
  - Accessible to staff with reporting permission
  - Data refreshed daily

**US-17: Export visitation data**
As Director Reyes (admin), I want to export visitation records to CSV, so that I can prepare DSWD compliance reports.
- **Acceptance Criteria:**
  - "Export" button on the visitation dashboard (admin only)
  - Exports current filtered view
  - CSV columns: visit date, resident code, visit type, cooperation level, safety concern (Y/N), social worker, follow-up count, follow-ups completed
  - Option to include or exclude narrative observations (sensitive data)
  - Filename includes date range and filters

### Edit & Audit

**US-18: Edit visitation record**
As Elena (social worker), I want to edit my visit records within 72 hours, so that I can add details after returning to the office.
- **Acceptance Criteria:**
  - "Edit" button on own records within 72 hours of creation
  - Edit to Quick Logs extends the 72-hour window (encourages completion)
  - Admin can edit any record at any time
  - Edit reason required
  - Version history preserved; original accessible
  - All edits logged in audit trail

**US-19: Audit trail for visitation records**
As Director Reyes (admin), I want all visitation record changes logged, so that data integrity is verifiable.
- **Acceptance Criteria:**
  - Every create, edit, and status change logged: user, timestamp, fields changed, old/new values
  - Audit log accessible from the visit detail page (admin only)
  - Immutable log entries
  - Safety concern changes logged with extra detail (who changed severity, when)

### Accessibility & Performance

**US-20: Offline-capable visit logging**
As Elena (in a rural area with no connectivity), I want to log a visit offline and sync when I have signal, so that I can document immediately.
- **Acceptance Criteria:**
  - Form saves to localStorage/IndexedDB when offline
  - Visual indicator: "Offline mode -- data will sync when connected"
  - Automatic sync when connection is restored
  - Conflict handling if the resident record was modified while offline
  - Queued offline visits shown in a "Pending Sync" section
  - Maximum 10 offline visits stored locally

**US-21: Responsive layout for all views**
As Elena (phone user), I want all visitation views to work on mobile, so that I can review and log visits from the field.
- **Acceptance Criteria:**
  - Visit list: card layout on mobile (not table)
  - Quick Log form: single column, large touch targets
  - Cooperation chart: responsive, horizontal scroll if needed
  - Conference calendar: list view on mobile (no monthly grid)
  - All touch targets minimum 44px
  - No horizontal scroll on any view

**US-22: Fast dashboard loading**
As Director Reyes (admin), I want the visitation dashboard to load within 2 seconds, so that I can quickly assess the current state.
- **Acceptance Criteria:**
  - Summary cards load first (API call for aggregates)
  - Visit list loads with server-side pagination (20 per page)
  - Safety-flagged visits prioritized in initial load
  - Skeleton loading states for all sections
  - Filters applied server-side

---

## Definition of Done

- [ ] Home visitation form captures all required fields: date, resident, type, observations, cooperation level, safety concerns, follow-ups
- [ ] Safety concern flagging works with severity levels and immediate notification for Critical severity
- [ ] Quick Log mobile mode allows minimal entry with "Needs Detail" flag for later completion
- [ ] Structured observation sections provide consistent documentation prompts
- [ ] Previous visit panel available during new entry for reference
- [ ] Chronological visit history viewable per resident with cooperation trend chart
- [ ] Cross-safehouse visitation dashboard shows recent visits with safety flags and summary cards
- [ ] Overdue visit alerts based on configurable cadence rules per visit type
- [ ] Case conference scheduling with attendee notification and calendar view
- [ ] Conference minutes capture decisions, action items, and next conference date
- [ ] Unified follow-up dashboard aggregates actions from visits and conferences
- [ ] Follow-ups completable from the visit record with required completion notes
- [ ] Aggregate statistics endpoint available for donor reporting (no individual data)
- [ ] CSV export for admin with configurable field inclusion
- [ ] Edit window: 72 hours for authors, unlimited for admin; version history preserved
- [ ] Offline visit logging with automatic sync on reconnection
- [ ] Fully responsive (360px+) with mobile card layouts and large touch targets
- [ ] All 22 user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox

---

## Critique & Improvements (2026-04-06)

### Coverage Assessment Against IS413 Requirement

The IS413 requirement (line 105 of `intex_requirements.md`) states:

> "Allows staff to log home and field visits, including the visit type (initial assessment, routine follow-up, reintegration assessment, post-placement monitoring, or emergency), observations about the home environment, family cooperation level, safety concerns, and follow-up actions. Also provides a view of case conference history and upcoming conferences for each resident."

**Checklist:**

| Requirement Element | Covered? | Where | Notes |
|---|---|---|---|
| Visit type: initial assessment | Yes | US-1 dropdown | All 5 types listed |
| Visit type: routine follow-up | Yes | US-1 dropdown | |
| Visit type: reintegration assessment | Yes | US-1 dropdown | |
| Visit type: post-placement monitoring | Yes | US-1 dropdown | |
| Visit type: emergency | Yes | US-1 dropdown | |
| Observations about home environment | Yes | US-1 (observations field) + US-4 (structured sections) | Strong -- structured prompts go beyond the requirement |
| Family cooperation level | Yes | US-1 (4-level scale) + US-7 (trend chart) | Well done with trend tracking |
| Safety concerns | Yes | US-2 (flagging + escalation + severity) | Excellent -- severity levels and escalation are above and beyond |
| Follow-up actions | Yes | US-1 (repeatable follow-ups) + US-14/15 (dashboard + completion) | Very thorough |
| Case conference history | Yes | US-13 (past conferences per resident) | |
| Upcoming conferences | Yes | US-12 (calendar/list view) | |

**Verdict: All required elements are covered. The plan exceeds the minimum requirement in most areas.**

### Strengths

1. **Safety concern escalation** (US-2) is well-designed -- severity tiers, type checkboxes, immediate notification for Critical, and red icons in list views. This is exactly right for a child welfare context.
2. **Quick mobile logging** (US-3) with auto-save to localStorage is practical given the rural Philippines field context.
3. **Previous visit reference panel** (US-5) is a smart UX choice that will reduce redundant visits (addresses the barangay social worker persona's frustration).
4. **Unified follow-up dashboard** (US-14) properly aggregates actions from both visits AND conferences, which is how the requirement intends them to work together.
5. **Cooperation trend chart** (US-7) provides longitudinal insight that will be genuinely useful for reintegration decisions.

### Issues & Gaps

#### 1. Home visitation and case conferences need tighter page-level integration
The IS413 requirement says this is ONE page ("Home Visitation & Case Conferences"). The plan treats them somewhat separately -- visitations have their own stories (US-1 through US-9) and conferences have theirs (US-10 through US-13). The page layout itself is never described. **Add a user story or layout section that describes the unified page structure** -- likely a tabbed interface ("Visits" | "Conferences" | "Follow-Ups") or a single scrollable page with sections. Without this, a developer could build two separate pages, violating the IS413 intent.

**Recommended addition:**
> **US-0: Page layout and navigation**
> The Home Visitation & Case Conferences page uses a tabbed layout with three tabs: "Home Visits", "Case Conferences", and "Follow-Ups". When accessed from a resident's profile, the page is scoped to that resident. When accessed from the main nav, it shows the cross-safehouse dashboard view (US-8). The tab state persists in the URL (e.g., `/visitations?tab=conferences`).

#### 2. Case conference link to home visitation data is weak
Case conferences (US-10, US-11) do not reference recent home visitation findings. In practice, a case conference should surface the latest visit observations and safety concerns for the resident being discussed. **Add to US-10 or US-11:** "When scheduling or recording a conference, the resident's most recent 3 home visitations (with safety flags) are displayed as reference material."

#### 3. No explicit "per resident" scoping for conference history/upcoming
The IS413 requirement says "case conference history and upcoming conferences **for each resident**." US-12 (upcoming) is a general calendar view, and US-13 (history) is on the resident profile. US-12 should also be filterable/viewable from the resident profile, not just as a global calendar. **Add acceptance criterion to US-12:** "When accessed from a resident's profile, shows only conferences for that resident."

#### 4. Emergency visit type has no special handling
The plan has excellent handling for safety concern severity (Critical triggers notifications), but the "Emergency" visit type itself has no special workflow. An emergency visit should arguably auto-set safety concern to "Yes" or at minimum prompt the user. **Add to US-1:** "When visit type is 'Emergency Visit', safety concern toggle is auto-set to Yes and severity defaults to High (user can adjust)."

#### 5. Missing: conference attendee roles/titles
US-10 allows multi-select from staff + free text for external attendees, but does not capture their role (e.g., psychologist, DSWD representative, barangay captain). This is important for DSWD compliance reporting. **Add field:** "Role/title for each attendee (dropdown: Social Worker, Psychologist, DSWD Representative, Barangay Official, Legal, Medical, Other)."

#### 6. Offline support only covers visits, not conferences
US-20 covers offline visit logging, but conference scheduling/minutes have no offline consideration. This is likely acceptable since conferences happen at the office, but **add a note** confirming this is intentional.

#### 7. Grace persona (US-16) has no UI
US-16 describes an API endpoint for aggregate stats, but Grace has no actual page or dashboard to view these stats. Either give her a read-only summary view or clarify that she uses the Reports & Analytics page (which is a separate plan) and remove the API endpoint from this page's scope.

#### 8. Database table for case conferences is missing
The Database Tables section lists `home_visitations`, `residents`, `safehouses`, and `intervention_plans`, but does not list a `case_conferences` table (or `conference_minutes`, `conference_attendees`, `conference_action_items`). This is a significant omission -- **add the necessary tables**.

**Recommended addition to Database Tables:**
- `case_conferences` (conference scheduling, type, status)
- `conference_attendees` (many-to-many: conference + user/external name + role)
- `conference_minutes` (linked to case_conferences)
- `conference_action_items` (linked to conference_minutes)
- `follow_up_actions` (unified table for follow-ups from both visits and conferences)
- `visitation_safety_concerns` (or embedded in home_visitations with structured fields)

#### 9. No mention of linking visits to intervention plans
The Database Tables section references `intervention_plans`, but no user story connects a visit to a specific intervention plan. Home visitations during reintegration should reference the active intervention/reintegration plan. **Consider adding a field to US-1:** "Linked intervention plan (dropdown of active plans for the resident, optional)."

#### 10. Definition of Done is missing case conference items in detail
The DoD mentions "Case conference scheduling with attendee notification and calendar view" and "Conference minutes capture decisions, action items, and next conference date" but does not mention: conference history per resident, conference-to-visitation data linking, or attendee role tracking.

### Priority Ranking of Fixes

1. **HIGH** -- Add unified page layout story (Issue 1) -- without this, developers will build the wrong thing
2. **HIGH** -- Add case conference database tables (Issue 8) -- cannot build without them
3. **MEDIUM** -- Add per-resident scoping to upcoming conferences (Issue 3) -- required by IS413 wording
4. **MEDIUM** -- Link conference view to recent visit data (Issue 2) -- core to the combined page concept
5. **MEDIUM** -- Emergency visit auto-flagging (Issue 4) -- safety-critical UX improvement
6. **LOW** -- Attendee roles (Issue 5) -- nice for compliance but not in IS413 requirement
7. **LOW** -- Intervention plan linking (Issue 9) -- good practice but not required
8. **LOW** -- Grace persona UI clarification (Issue 7) -- scope question, not a gap
9. **LOW** -- Offline note for conferences (Issue 6) -- documentation only
10. **LOW** -- DoD detail expansion (Issue 10) -- follows from fixing the above

---

## Requirements Coverage Matrix

The IS413 requirement (line 105 of `intex_requirements.md`) breaks down into two functional areas. This matrix maps every required element to database support, user stories, and an assessment of readiness.

### Home Visitations

| Requirement Element | DB Column(s) in `home_visitations` | User Story | Gap? |
|---|---|---|---|
| Log home/field visits | Full table exists (visitation_id, resident_id, visit_date, etc.) | US-1 | No |
| Visit type: initial assessment | `visit_type text` (free text -- should be constrained via CHECK or app-level enum) | US-1 dropdown | Minor: no DB-level constraint on the 5 allowed values |
| Visit type: routine follow-up | `visit_type text` | US-1 dropdown | Same as above |
| Visit type: reintegration assessment | `visit_type text` | US-1 dropdown | Same as above |
| Visit type: post-placement monitoring | `visit_type text` | US-1 dropdown | Same as above |
| Visit type: emergency | `visit_type text` | US-1 dropdown | Same as above |
| Observations about home environment | `observations text` | US-1, US-4 (structured sections) | No |
| Family cooperation level | `family_cooperation_level text` | US-1 (4-level scale), US-7 (trend chart) | Minor: DB stores text, not a numeric scale -- chart (US-7) will need mapping |
| Safety concerns | `safety_concerns_noted boolean` | US-2 (severity, escalation, type checkboxes) | **Yes**: DB only has a boolean flag. Plan calls for severity (Low/Med/High/Critical), concern type checkboxes, and description text. Either add columns to `home_visitations` (safety_concern_severity, safety_concern_description, safety_concern_types) or create a child table `visitation_safety_concerns`. |
| Follow-up actions | `follow_up_needed boolean`, `follow_up_notes text` | US-1 (repeatable follow-ups), US-14/US-15 (dashboard) | **Yes**: DB stores a single boolean + notes. Plan calls for repeatable follow-up items with action, due date, assigned-to, priority, and completion status. Needs a `follow_up_actions` table. |

**Missing DB columns/tables for home visitations:**
- `persons_present text` -- plan (US-1) asks for multi-line persons present; DB has `family_members_present` which is close but differently named
- `visit_duration_minutes integer` -- plan (US-1) asks for visit duration; not in DB
- `accompanying_staff text` -- plan (US-1); not in DB
- `next_scheduled_visit date` -- plan (US-1); not in DB
- `quick_log boolean` / `needs_detail boolean` -- plan (US-3); not in DB
- Safety concern severity, description, types -- plan (US-2); not in DB (only a boolean exists)
- Structured observation sub-sections -- plan (US-4); could be stored in `observations` as JSON or in a child table

### Case Conferences

| Requirement Element | Current DB Support | User Story | Gap? |
|---|---|---|---|
| Case conference history per resident | `intervention_plans.case_conference_date` -- one date per plan | US-13 | **Significant gap** (see analysis below) |
| Upcoming conferences per resident | Same column, filtered by future dates | US-12 | **Significant gap** (see analysis below) |
| Schedule a conference | No scheduling fields (no time, type, attendees, agenda, location) | US-10 | **Yes**: needs new table |
| Record conference outcomes/minutes | No minutes, decisions, or action items | US-11 | **Yes**: needs new table(s) |
| Conference attendees | Not stored | US-10, US-11 | **Yes**: needs new table |

### Assessment: Is `intervention_plans.case_conference_date` Sufficient?

**For the literal IS413 minimum requirement ("a view of case conference history and upcoming conferences for each resident") -- it is barely sufficient, but only if you accept a very thin implementation.** Here is the reasoning:

1. **What it can do:** Query `SELECT case_conference_date, plan_category, plan_description, status FROM intervention_plans WHERE resident_id = ? AND case_conference_date IS NOT NULL ORDER BY case_conference_date DESC`. This yields a list of dates tied to intervention plans, split into past (history) and future (upcoming). You could display this as a simple table: "Date | Plan | Status".

2. **What it cannot do:** Store multiple conferences per plan, conference type, attendees, agenda, minutes, decisions, action items, or any detail beyond a bare date. A "case conference" in social work is a meeting with specific attendees and outcomes -- a single date column on a plan record is metadata about the plan, not a conference record.

3. **Verdict:** For a grading-viable minimum, you could build a read-only list view sourced from `intervention_plans.case_conference_date` and satisfy the IS413 rubric's literal wording. However, this would be a weak implementation that does not demonstrate the page's "dual nature" well. **The recommended approach is a middle path:**

**Recommended minimum new table:**

```sql
create table if not exists public.case_conferences (
  conference_id integer generated by default as identity primary key,
  resident_id integer not null references public.residents(resident_id) on delete cascade,
  conference_date date not null,
  conference_time time,
  conference_type text, -- Initial Case Review, Progress Review, Reintegration Planning, Emergency, Discharge Planning
  location text,
  agenda text,
  attendees text, -- JSON array or comma-separated for MVP
  minutes_summary text,
  decisions text, -- JSON array or plain text for MVP
  action_items text, -- JSON array or plain text for MVP
  next_conference_date date,
  created_by text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists case_conferences_resident_id_idx on public.case_conferences(resident_id);
```

This single table covers US-10 through US-13 at an MVP level without requiring a full normalized schema (separate `conference_attendees`, `conference_minutes`, `conference_action_items` tables). Those can be normalized later if needed. Store attendees, decisions, and action items as JSON columns initially -- this is pragmatic for a class project timeline.

**Keep `intervention_plans.case_conference_date`** as-is -- it still serves its purpose of tracking when a plan was last reviewed in conference. The new `case_conferences` table is the source of truth for conference records.

### Follow-Up Actions (Cross-Cutting)

The plan's US-14 (unified follow-up dashboard) requires a table that aggregates follow-ups from both visits and conferences. Neither currently exists in the DB.

```sql
create table if not exists public.follow_up_actions (
  action_id integer generated by default as identity primary key,
  resident_id integer not null references public.residents(resident_id) on delete cascade,
  source_type text not null, -- 'home_visit' or 'case_conference'
  source_id integer not null, -- visitation_id or conference_id
  action_description text not null,
  assigned_to text,
  due_date date,
  priority text, -- Low, Medium, High, Urgent
  status text default 'open', -- open, completed, overdue
  completion_date date,
  completion_note text,
  created_at timestamptz default now()
);
create index if not exists follow_up_actions_resident_id_idx on public.follow_up_actions(resident_id);
```

### Summary: What Must Change in the Database

| Change | Priority | Reason |
|---|---|---|
| Create `case_conferences` table | HIGH | IS413 requires conference history/upcoming views; `intervention_plans.case_conference_date` is insufficient for anything beyond a bare date list |
| Create `follow_up_actions` table | HIGH | Plan's US-14/US-15 require trackable, completable follow-ups from both visits and conferences |
| Add columns to `home_visitations`: safety_concern_severity, safety_concern_description | MEDIUM | US-2 requires severity levels and descriptions; DB only has a boolean |
| Add `visit_duration_minutes`, `next_scheduled_visit`, `quick_log` columns to `home_visitations` | LOW | Nice-to-have for US-1/US-3; can work without them initially |
| Add CHECK constraint on `visit_type` for the 5 required values | LOW | Data integrity; can enforce at app level instead |

---

## Above and Beyond Ideas

These ideas go beyond the IS413 minimum requirement and could earn distinction. They are ordered by impact-to-effort ratio.

### 1. Safety Concern Heat Map (High Impact, Medium Effort)
Display a visual summary of safety concerns across safehouses on the dashboard -- a small map or grid showing which safehouses/barangays have active Critical or High safety flags. Admins see red dots where attention is needed. This directly supports Director Reyes's key question and demonstrates real-time data visualization skills.

### 2. Cooperation Trend Sparklines in List Views (High Impact, Low Effort)
Instead of just showing the current cooperation level as a colored dot, show a tiny sparkline (last 5 visits) inline in the resident list and visitation dashboard. Libraries like `@fnando/sparkline` or a simple SVG render make this trivial. It visually communicates trajectory at a glance without clicking into the chart view.

### 3. Visit Cadence Compliance Indicator (High Impact, Medium Effort)
Add a green/yellow/red indicator next to each resident showing whether they are within, approaching, or past their required visit cadence (per US-9). This turns the overdue visit concept into a persistent, visible status rather than a separate dashboard widget. DSWD compliance becomes immediately scannable.

### 4. Auto-Generated Conference Prep Brief (Medium Impact, Medium Effort)
When a user opens an upcoming case conference (US-12), auto-generate a one-page prep brief: resident summary, last 3 home visitation summaries, open safety concerns, outstanding follow-ups, and current intervention plan status. This saves Elena 20 minutes of manual preparation per conference and demonstrates cross-table data integration.

### 5. Offline-First Progressive Web App (Medium Impact, High Effort)
Go beyond localStorage auto-save (US-20) to a true PWA with service worker caching, IndexedDB storage, and background sync. The visitation form works fully offline and syncs seamlessly. This is genuinely useful in rural Philippines and demonstrates modern web capabilities. Could be scoped to just the Quick Log form to reduce effort.

### 6. Voice-to-Text for Field Notes (Medium Impact, Low Effort)
Add a microphone button to the observations field that uses the Web Speech API (browser-native, no API key needed) to transcribe voice notes. Elena can dictate observations while in the tricycle instead of typing on a small screen. Simple to implement, high practical value, and shows accessibility thinking.

### 7. Follow-Up Action Reminders via In-App Notifications (Medium Impact, Medium Effort)
When a follow-up action's due date is approaching (3 days out) or past due, show a badge count on the navigation bar and a notification in the app. Does not require email/SMS infrastructure -- just a query on `follow_up_actions` where `due_date <= now() + interval '3 days'` and `status = 'open'`.

### 8. PDF Export of Visit Report (Low Impact, Low Effort)
Generate a formatted PDF of a single visitation record (or a conference minutes document) using a library like `@react-pdf/renderer` or server-side with `Puppeteer`. Social workers often need to share visit reports with DSWD or courts in printed form. A "Download PDF" button on the visit detail page is a small feature with real-world utility.

### 9. Linked Conference-to-Visit Timeline (Medium Impact, Medium Effort)
On the resident profile, show a unified chronological timeline interleaving home visits and case conferences (with distinct icons). This "case history at a glance" view is how social workers actually think about a case -- events in sequence, not separated by type. Demonstrates thoughtful UX and cross-entity data modeling.

### 10. Smart Visit Type Suggestion (Low Impact, Low Effort)
When creating a new visit, auto-suggest the visit type based on the resident's current status. If the resident has been placed with family for < 6 months, suggest "Post-Placement Monitoring." If no previous visit exists, suggest "Initial Assessment." Simple conditional logic that saves clicks and reduces data entry errors.

---

## Implementation Plan

This plan is grounded in the actual codebase: .NET 10 minimal APIs in `Program.cs`, EF Core models in `backend/Models/`, a single `AppDbContext` in `backend/Data/`, and a React+Vite+TypeScript frontend with pages in `frontend/src/pages/` and shared types in `frontend/src/types.ts`. All API calls go through `apiFetch()` in `frontend/src/api.ts`.

### 1. Schema Changes (Azure PostgreSQL)

#### 1a. Alter `home_visitations` -- add columns for safety detail and mobile workflow

```sql
ALTER TABLE public.home_visitations
  ADD COLUMN IF NOT EXISTS safety_concern_severity text,        -- Low, Medium, High, Critical
  ADD COLUMN IF NOT EXISTS safety_concern_description text,
  ADD COLUMN IF NOT EXISTS safety_concern_types text,           -- JSON array: ["Physical Safety","Neglect",...]
  ADD COLUMN IF NOT EXISTS visit_duration_minutes integer,
  ADD COLUMN IF NOT EXISTS accompanying_staff text,
  ADD COLUMN IF NOT EXISTS next_scheduled_visit date,
  ADD COLUMN IF NOT EXISTS is_quick_log boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS needs_detail boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS created_by text,
  ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();
```

**Rationale:** The existing `safety_concerns_noted boolean` stays as-is (backward compatible). The new columns capture severity, description, and concern types that US-2 requires. `is_quick_log` and `needs_detail` support US-3. `created_at`/`updated_at` enable the 72-hour edit window (US-18).

#### 1b. Create `case_conferences` table (new)

```sql
CREATE TABLE IF NOT EXISTS public.case_conferences (
  conference_id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  resident_id integer NOT NULL REFERENCES public.residents(resident_id) ON DELETE CASCADE,
  conference_date date NOT NULL,
  conference_time time,
  conference_type text,           -- Initial Case Review, Progress Review, Reintegration Planning, Emergency, Discharge Planning
  location text,
  agenda text,                    -- JSON array of agenda items for MVP
  attendees text,                 -- JSON array: [{name, role, is_staff, user_id?}]
  attendees_present text,         -- JSON array (filled in after conference): who actually attended
  minutes_summary text,
  decisions text,                 -- JSON array: [{decision, rationale}]
  action_items text,              -- JSON array: [{action, assigned_to, due_date, priority, status}]
  next_conference_date date,
  status text DEFAULT 'scheduled', -- scheduled, completed, cancelled
  created_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS case_conferences_resident_id_idx ON public.case_conferences(resident_id);
CREATE INDEX IF NOT EXISTS case_conferences_date_idx ON public.case_conferences(conference_date);
```

**Schema decision -- single table with JSON columns vs. fully normalized:**

The fully normalized approach (separate `conference_attendees`, `conference_minutes`, `conference_action_items` tables) is cleaner relationally but adds 3 extra models, 3 extra DbSets, and 3 extra sets of CRUD endpoints for a class project. The single-table approach with JSON columns for attendees, decisions, and action_items is the right call because:
- Conference records are read-heavy, write-infrequent (a few per month per resident)
- The JSON fields are not queried individually -- they are always loaded as part of the full conference record
- EF Core + PostgreSQL handles `text` columns containing JSON just fine (serialize/deserialize in the API layer)
- If the project later needs to query action items independently (e.g., for the follow-up dashboard), that is handled by the `follow_up_actions` table below

#### 1c. Create `follow_up_actions` table (new)

```sql
CREATE TABLE IF NOT EXISTS public.follow_up_actions (
  action_id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  resident_id integer NOT NULL REFERENCES public.residents(resident_id) ON DELETE CASCADE,
  source_type text NOT NULL,       -- 'home_visit' or 'case_conference'
  source_id integer NOT NULL,      -- visitation_id or conference_id
  action_description text NOT NULL,
  assigned_to text,
  due_date date,
  priority text,                   -- Low, Medium, High, Urgent
  status text DEFAULT 'open',      -- open, completed, overdue
  completion_date date,
  completion_note text,
  completed_by text,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS follow_up_actions_resident_id_idx ON public.follow_up_actions(resident_id);
CREATE INDEX IF NOT EXISTS follow_up_actions_status_idx ON public.follow_up_actions(status);
CREATE INDEX IF NOT EXISTS follow_up_actions_source_idx ON public.follow_up_actions(source_type, source_id);
```

**Why a separate table instead of keeping follow-ups as JSON in `home_visitations.action_items`:**
The follow-up dashboard (US-14) needs to query all open follow-ups across all visits and conferences, sorted by due date, filtered by assigned user. This is a relational query -- JSON columns would require complex JSON path queries and cannot be indexed efficiently. The `follow_up_actions` table is the source of truth; the JSON `action_items` in `case_conferences` is a denormalized convenience for reading conference records whole.

### 2. Backend: EF Core Models

#### 2a. Update `HomeVisitation.cs`

Add properties to match the new columns:

```csharp
// Add to backend/Models/HomeVisitation.cs
public string? SafetyConcernSeverity { get; set; }     // Low, Medium, High, Critical
public string? SafetyConcernDescription { get; set; }
public string? SafetyConcernTypes { get; set; }         // JSON string
public int? VisitDurationMinutes { get; set; }
public string? AccompanyingStaff { get; set; }
public DateOnly? NextScheduledVisit { get; set; }
public bool? IsQuickLog { get; set; }
public bool? NeedsDetail { get; set; }
public string? CreatedBy { get; set; }
public DateTime? CreatedAt { get; set; }
public DateTime? UpdatedAt { get; set; }
```

Update `OnModelCreating` in `AppDbContext.cs` to map these to snake_case column names (following the existing pattern).

#### 2b. Create `CaseConference.cs` (new model)

```csharp
// backend/Models/CaseConference.cs
namespace backend.Models;

public partial class CaseConference
{
    public int ConferenceId { get; set; }
    public int ResidentId { get; set; }
    public DateOnly ConferenceDate { get; set; }
    public TimeOnly? ConferenceTime { get; set; }
    public string? ConferenceType { get; set; }
    public string? Location { get; set; }
    public string? Agenda { get; set; }              // JSON
    public string? Attendees { get; set; }            // JSON
    public string? AttendeesPresent { get; set; }     // JSON
    public string? MinutesSummary { get; set; }
    public string? Decisions { get; set; }            // JSON
    public string? ActionItems { get; set; }          // JSON
    public DateOnly? NextConferenceDate { get; set; }
    public string? Status { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public virtual Resident Resident { get; set; } = null!;
}
```

#### 2c. Create `FollowUpAction.cs` (new model)

```csharp
// backend/Models/FollowUpAction.cs
namespace backend.Models;

public partial class FollowUpAction
{
    public int ActionId { get; set; }
    public int ResidentId { get; set; }
    public string SourceType { get; set; } = null!;   // "home_visit" or "case_conference"
    public int SourceId { get; set; }
    public string ActionDescription { get; set; } = null!;
    public string? AssignedTo { get; set; }
    public DateOnly? DueDate { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public DateOnly? CompletionDate { get; set; }
    public string? CompletionNote { get; set; }
    public string? CompletedBy { get; set; }
    public DateTime? CreatedAt { get; set; }

    public virtual Resident Resident { get; set; } = null!;
}
```

#### 2d. Update `AppDbContext.cs`

- Add `DbSet<CaseConference> CaseConferences` and `DbSet<FollowUpAction> FollowUpActions`
- Add entity configurations in `OnModelCreating` for both new tables (table name, column mappings, indexes, foreign keys) -- follow the exact pattern used for `HomeVisitation` and `IncidentReport`
- Add new column mappings for the expanded `HomeVisitation` properties

#### 2e. Update `Resident.cs`

Add navigation properties:

```csharp
public virtual ICollection<CaseConference> CaseConferences { get; set; } = new List<CaseConference>();
public virtual ICollection<FollowUpAction> FollowUpActions { get; set; } = new List<FollowUpAction>();
```

### 3. Backend: API Endpoints

All endpoints follow the existing minimal API pattern in `Program.cs`. Group them under `/api/visitations/` and `/api/conferences/` prefixes. Add a `/api/follow-ups/` group for the unified dashboard.

#### 3a. Home Visitation Endpoints

| Method | Route | Purpose | User Stories |
|--------|-------|---------|-------------|
| GET | `/api/visitations` | List visitations with filters (resident_id, safehouse_id, visit_type, safety_concern, date_range, social_worker). Server-side pagination (20/page). Returns list with resident internal_code, safehouse info. | US-6, US-8, US-22 |
| GET | `/api/visitations/{id}` | Single visitation detail with follow-up actions (joined from `follow_up_actions` where source_type='home_visit' and source_id=id). | US-6 |
| GET | `/api/visitations/previous/{residentId}` | Most recent visitation for a resident (for the reference panel). Returns visit + its follow-up actions with completion status. | US-5 |
| POST | `/api/visitations` | Create visitation. Validate required fields (visit_date, resident_id, visit_type, observations, family_cooperation_level). If visit_type is "Emergency Visit", auto-set safety_concerns_noted=true. Set created_at/updated_at. Return created record with ID. | US-1, US-3 |
| PUT | `/api/visitations/{id}` | Update visitation. Enforce 72-hour edit window (compare created_at to now; admin bypasses). Require edit_reason in request body (log but don't store in main record -- store in updated_at timestamp for audit). Set updated_at. | US-18 |
| DELETE | `/api/visitations/{id}` | Soft-delete or hard-delete (admin only). Not in user stories but needed for CRUD completeness. |
| GET | `/api/visitations/dashboard` | Aggregated dashboard data: total visits this month, safety concern count, overdue follow-ups count, average cooperation level. Filterable by safehouse_id. | US-8 |
| GET | `/api/visitations/overdue` | Residents overdue for visits based on cadence rules. Returns resident info, days overdue, last visit date, expected cadence. | US-9 |
| GET | `/api/visitations/stats` | Aggregate statistics for donor reporting: total by type/period, avg cooperation trend, safety concern %, visit frequency by safehouse. No individual data. | US-16 |
| GET | `/api/visitations/export` | CSV export of current filtered view (admin only). Query params mirror `/api/visitations` filters plus `include_observations` flag. | US-17 |

**Implementation notes for `Program.cs`:**
- Follow the existing sequential-await pattern (no `Task.WhenAll` -- see the codebase comment about DbContext thread safety)
- Use query parameters for filtering, not request bodies on GET
- Pagination: `?page=1&pageSize=20`, return `{ items: [], totalCount: N }`
- For CSV export, return `Content-Type: text/csv` with `Content-Disposition: attachment`

#### 3b. Case Conference Endpoints

| Method | Route | Purpose | User Stories |
|--------|-------|---------|-------------|
| GET | `/api/conferences` | List conferences with filters (resident_id, status, conference_type, date_range). For the calendar/list view. Returns upcoming first by default. | US-12, US-13 |
| GET | `/api/conferences/{id}` | Single conference detail. Includes parsed attendees, decisions, action items. Also returns the resident's 3 most recent home visitations as reference material. | US-10, US-11 |
| GET | `/api/conferences/upcoming` | Conferences in the next 30 days, optionally filtered by `assigned_to` (for "My Schedule" view). | US-12 |
| POST | `/api/conferences` | Schedule a conference. Required: resident_id, conference_date, conference_type. Status defaults to "scheduled". Creates follow_up_actions for any action_items included. | US-10 |
| PUT | `/api/conferences/{id}` | Update conference -- used both for editing schedule details AND for adding minutes after the conference. When minutes_summary is added, status changes to "completed". Syncs action_items to follow_up_actions table. | US-11 |
| DELETE | `/api/conferences/{id}` | Cancel conference (set status to "cancelled") or hard-delete. Admin only. |

**JSON handling pattern for conference endpoints:**

The `attendees`, `decisions`, and `action_items` columns store JSON strings. The API layer handles serialization:
- On POST/PUT: accept structured JSON objects in the request body, serialize to string before saving
- On GET: deserialize the JSON strings back to structured objects in the response
- Use `System.Text.Json.JsonSerializer` (already available in .NET 10)

#### 3c. Follow-Up Action Endpoints

| Method | Route | Purpose | User Stories |
|--------|-------|---------|-------------|
| GET | `/api/follow-ups` | List all follow-ups with filters (assigned_to, status, resident_id, source_type, priority). Sorted by due_date, overdue first. Server-side pagination. | US-14 |
| PUT | `/api/follow-ups/{id}/complete` | Mark a follow-up as completed. Required: completion_note. Sets completion_date, completed_by, status="completed". | US-15 |
| GET | `/api/follow-ups/overdue-count` | Count of overdue follow-ups for the current user (for badge/notification). | US-14 |

Follow-ups are created as side effects of POST/PUT on visitations and conferences -- there is no standalone POST endpoint for follow-ups.

### 4. Frontend: TypeScript Types

Add to `frontend/src/types.ts`:

```typescript
// -- Home Visitations --

export type VisitType =
  | 'Initial Assessment'
  | 'Routine Follow-Up'
  | 'Reintegration Assessment'
  | 'Post-Placement Monitoring'
  | 'Emergency Visit';

export type CooperationLevel =
  | 'Non-Cooperative'
  | 'Minimally Cooperative'
  | 'Cooperative'
  | 'Highly Cooperative';

export type SafetySeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface HomeVisitation {
  visitationId: number;
  residentId: number;
  residentCode?: string;          // joined from residents.internal_code
  visitDate: string;              // ISO date string
  socialWorker?: string;
  visitType: VisitType;
  locationVisited?: string;
  familyMembersPresent?: string;
  purpose?: string;
  observations?: string;
  familyCooperationLevel: CooperationLevel;
  safetyConcernsNoted: boolean;
  safetyConcernSeverity?: SafetySeverity;
  safetyConcernDescription?: string;
  safetyConcernTypes?: string[];   // parsed from JSON
  followUpNeeded?: boolean;
  followUpNotes?: string;
  visitOutcome?: string;
  visitDurationMinutes?: number;
  accompanyingStaff?: string;
  nextScheduledVisit?: string;
  isQuickLog?: boolean;
  needsDetail?: boolean;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  followUpActions?: FollowUpAction[];  // joined
}

// -- Case Conferences --

export type ConferenceType =
  | 'Initial Case Review'
  | 'Progress Review'
  | 'Reintegration Planning'
  | 'Emergency'
  | 'Discharge Planning';

export interface ConferenceAttendee {
  name: string;
  role?: string;   // Social Worker, Psychologist, DSWD Representative, etc.
  isStaff: boolean;
}

export interface ConferenceDecision {
  decision: string;
  rationale?: string;
}

export interface ConferenceActionItem {
  action: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
}

export interface CaseConference {
  conferenceId: number;
  residentId: number;
  residentCode?: string;
  conferenceDate: string;
  conferenceTime?: string;
  conferenceType: ConferenceType;
  location?: string;
  agenda?: string[];
  attendees?: ConferenceAttendee[];
  attendeesPresent?: ConferenceAttendee[];
  minutesSummary?: string;
  decisions?: ConferenceDecision[];
  actionItems?: ConferenceActionItem[];
  nextConferenceDate?: string;
  status: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  recentVisitations?: HomeVisitation[];  // joined for prep brief
}

// -- Follow-Up Actions --

export interface FollowUpAction {
  actionId: number;
  residentId: number;
  residentCode?: string;
  sourceType: 'home_visit' | 'case_conference';
  sourceId: number;
  sourceLabel?: string;            // "Home Visit - 2026-03-15" or "Case Conference - 2026-04-01"
  actionDescription: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: string;
  status: string;
  completionDate?: string;
  completionNote?: string;
  completedBy?: string;
  createdAt?: string;
}
```

### 5. Frontend: API Layer

Extend `frontend/src/api.ts` with mutation support (the current `apiFetch` is GET-only):

```typescript
export async function apiMutate<T>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: unknown
): Promise<T> {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText} — ${url}`);
  }
  return res.json();
}
```

Add typed fetch functions:

```typescript
// Visitations
export const fetchVisitations = (params: URLSearchParams) =>
  apiFetch<{ items: HomeVisitation[]; totalCount: number }>(`/api/visitations?${params}`);
export const fetchVisitation = (id: number) =>
  apiFetch<HomeVisitation>(`/api/visitations/${id}`);
export const createVisitation = (data: Partial<HomeVisitation>) =>
  apiMutate<HomeVisitation>('/api/visitations', 'POST', data);
export const updateVisitation = (id: number, data: Partial<HomeVisitation>) =>
  apiMutate<HomeVisitation>(`/api/visitations/${id}`, 'PUT', data);

// Conferences
export const fetchConferences = (params: URLSearchParams) =>
  apiFetch<{ items: CaseConference[]; totalCount: number }>(`/api/conferences?${params}`);
export const fetchConference = (id: number) =>
  apiFetch<CaseConference>(`/api/conferences/${id}`);
export const createConference = (data: Partial<CaseConference>) =>
  apiMutate<CaseConference>('/api/conferences', 'POST', data);
export const updateConference = (id: number, data: Partial<CaseConference>) =>
  apiMutate<CaseConference>(`/api/conferences/${id}`, 'PUT', data);

// Follow-Ups
export const fetchFollowUps = (params: URLSearchParams) =>
  apiFetch<{ items: FollowUpAction[]; totalCount: number }>(`/api/follow-ups?${params}`);
export const completeFollowUp = (id: number, note: string) =>
  apiMutate<FollowUpAction>(`/api/follow-ups/${id}/complete`, 'PUT', { completionNote: note });
```

### 6. Frontend: Component Architecture

The page is ONE page at route `/visitations` with a tabbed layout per the IS413 requirement. Tab state is persisted in the URL via query parameter (`?tab=visits|conferences|follow-ups`).

#### 6a. Page Component

**`frontend/src/pages/HomeVisitationsPage.tsx`** -- the top-level page

- Reads `?tab=` from URL (default: "visits")
- Reads optional `?residentId=` to scope all tabs to a single resident (when navigated from a resident profile)
- Renders three tabs: "Home Visits", "Case Conferences", "Follow-Ups"
- Each tab lazy-loads its content component
- Summary cards at the top (visible on all tabs): total visits this month, active safety concerns, overdue follow-ups, upcoming conferences

**`frontend/src/pages/HomeVisitationsPage.module.css`** -- styles

#### 6b. Home Visits Tab Components

| Component | File | Purpose |
|-----------|------|---------|
| `VisitationsList` | `frontend/src/components/visitations/VisitationsList.tsx` | Paginated table/card list of visitations. Filters: resident, visit type, safety concern, date range, social worker. Expandable rows for detail. Cooperation level shown as colored badge. Safety-flagged rows highlighted with red icon. "Needs Detail" flag shown with pencil icon. Responsive: table on desktop, cards on mobile. |
| `VisitationForm` | `frontend/src/components/visitations/VisitationForm.tsx` | Create/edit form. All fields from US-1. Visit type dropdown with 5 options. Cooperation level radio/select. Safety concern toggle with conditional severity/description/type fields (US-2). Follow-up actions as repeatable rows (action, due date, assigned to, priority). "Save" and "Save & Add Another" buttons. On mobile (< 768px), shows Quick Log mode by default (US-3). Emergency visit type auto-sets safety concern to Yes. |
| `VisitationDetail` | `frontend/src/components/visitations/VisitationDetail.tsx` | Read-only detail view of a single visitation. Shows all fields, follow-up actions with status, "Edit" button (if within 72 hours or admin). "Complete" button on each open follow-up (US-15). |
| `PreviousVisitPanel` | `frontend/src/components/visitations/PreviousVisitPanel.tsx` | Side panel (desktop) or drawer (mobile) showing the most recent visit for the same resident. Displayed alongside the VisitationForm. Shows date, type, cooperation, safety flags, follow-up status. (US-5) |
| `CooperationChart` | `frontend/src/components/visitations/CooperationChart.tsx` | Bar/line chart of cooperation levels (mapped to 1-4 numeric scale) over time. Colored data points. Trend line. Displayed above VisitationsList when scoped to a single resident. (US-7) |

#### 6c. Case Conferences Tab Components

| Component | File | Purpose |
|-----------|------|---------|
| `ConferencesList` | `frontend/src/components/conferences/ConferencesList.tsx` | List view of conferences. Two modes: upcoming (default, sorted by date ascending) and past (sorted descending). Shows: resident code, date/time, type, attendee count, status badge (scheduled/completed/cancelled). Action item completion percentage for completed conferences. Filterable by type, resident, date range. |
| `ConferenceForm` | `frontend/src/components/conferences/ConferenceForm.tsx` | Schedule a new conference. Fields: resident (searchable dropdown), date, time, type (5 options), location, agenda items (repeatable text fields), attendees (name + role pairs, repeatable). |
| `ConferenceMinutesForm` | `frontend/src/components/conferences/ConferenceMinutesForm.tsx` | Add/edit minutes for a completed conference. "Add Minutes" button appears after conference date passes. Fields: attendees present (checkboxes from invited list), discussion summary (textarea), decisions (repeatable: decision + rationale), action items (repeatable: action, assigned to, due date, priority). Read-only after 48 hours (admin always editable). |
| `ConferenceDetail` | `frontend/src/components/conferences/ConferenceDetail.tsx` | Read-only detail showing full conference record including minutes, decisions, action items with status. Also shows the resident's 3 most recent home visitations as a "Prep Brief" section (US-10 improvement from critique). |

#### 6d. Follow-Ups Tab Components

| Component | File | Purpose |
|-----------|------|---------|
| `FollowUpDashboard` | `frontend/src/components/follow-ups/FollowUpDashboard.tsx` | Unified list of all follow-up actions. Columns: resident, action, due date, priority, source (with link to originating visit/conference), status. Overdue items at top with red highlight. "Mark Complete" button opens inline form for completion note. Filters: overdue only, priority, resident, source type. |

#### 6e. Shared Components

| Component | File | Purpose |
|-----------|------|---------|
| `SafetyConcernBadge` | `frontend/src/components/visitations/SafetyConcernBadge.tsx` | Red warning icon + severity label. Used in lists and detail views. |
| `CooperationBadge` | `frontend/src/components/visitations/CooperationBadge.tsx` | Colored badge (red/yellow/green/blue) for cooperation level. |
| `StatusBadge` | `frontend/src/components/shared/StatusBadge.tsx` | Reusable colored badge for status values (open/completed/overdue, scheduled/completed/cancelled). |

### 7. Frontend: Routing

Add to the router configuration (likely in `App.tsx` or a routes file):

```typescript
{ path: '/visitations', element: <HomeVisitationsPage /> }
```

The page handles its own tab routing via URL search params, not separate routes.

### 8. Files to Create

| File | Type | Description |
|------|------|-------------|
| `backend/Models/CaseConference.cs` | New | EF Core model |
| `backend/Models/FollowUpAction.cs` | New | EF Core model |
| `frontend/src/pages/HomeVisitationsPage.tsx` | New | Main page component |
| `frontend/src/pages/HomeVisitationsPage.module.css` | New | Page styles |
| `frontend/src/components/visitations/VisitationsList.tsx` | New | Visit list |
| `frontend/src/components/visitations/VisitationForm.tsx` | New | Create/edit form |
| `frontend/src/components/visitations/VisitationDetail.tsx` | New | Detail view |
| `frontend/src/components/visitations/PreviousVisitPanel.tsx` | New | Reference panel |
| `frontend/src/components/visitations/CooperationChart.tsx` | New | Trend chart |
| `frontend/src/components/visitations/SafetyConcernBadge.tsx` | New | Badge component |
| `frontend/src/components/visitations/CooperationBadge.tsx` | New | Badge component |
| `frontend/src/components/conferences/ConferencesList.tsx` | New | Conference list |
| `frontend/src/components/conferences/ConferenceForm.tsx` | New | Schedule form |
| `frontend/src/components/conferences/ConferenceMinutesForm.tsx` | New | Minutes form |
| `frontend/src/components/conferences/ConferenceDetail.tsx` | New | Detail view |
| `frontend/src/components/follow-ups/FollowUpDashboard.tsx` | New | Follow-up list |
| `frontend/src/components/shared/StatusBadge.tsx` | New | Reusable badge |
| `backend/Migrations/YYYYMMDD_case_conferences.cs` | New | EF Core migration |

### 9. Files to Modify

| File | Change |
|------|--------|
| `backend/Models/HomeVisitation.cs` | Add 10 new properties (safety detail, quick log, timestamps) |
| `backend/Models/Resident.cs` | Add `CaseConferences` and `FollowUpActions` navigation collections |
| `backend/Data/AppDbContext.cs` | Add 2 new DbSets, entity configs for both new tables, update HomeVisitation column mappings |
| `backend/Program.cs` | Add ~12 new API endpoints (visitations CRUD, conferences CRUD, follow-ups) |
| `frontend/src/types.ts` | Add all new TypeScript interfaces and type unions |
| `frontend/src/api.ts` | Add `apiMutate` helper, add typed fetch/mutate functions for all 3 entities |
| `frontend/src/App.tsx` (or router) | Add `/visitations` route |
| `frontend/src/components/Header.tsx` | Add "Visitations" link to navigation |

### 10. Suggested Implementation Order

#### Phase 1: Database + Models (Day 1)
1. Run the EF Core migration (ALTER TABLE + 2 CREATE TABLE statements)
2. Update `HomeVisitation.cs` with new properties
3. Create `CaseConference.cs` and `FollowUpAction.cs`
4. Update `AppDbContext.cs` (DbSets + entity configuration)
5. Update `Resident.cs` (navigation properties)
6. Build the backend project to verify compilation

#### Phase 2: Visitation API Endpoints (Day 1-2)
7. Add GET/POST/PUT/DELETE `/api/visitations` endpoints in `Program.cs`
8. Add GET `/api/visitations/previous/{residentId}` endpoint
9. Add GET `/api/visitations/dashboard` and `/api/visitations/overdue` endpoints
10. Test all endpoints with `.http` file or curl

#### Phase 3: Conference + Follow-Up API Endpoints (Day 2)
11. Add GET/POST/PUT/DELETE `/api/conferences` endpoints
12. Add GET `/api/conferences/upcoming` endpoint
13. Add GET/PUT `/api/follow-ups` endpoints
14. Test all endpoints

#### Phase 4: Frontend Types + API Layer (Day 2)
15. Add types to `types.ts`
16. Add `apiMutate` and typed functions to `api.ts`

#### Phase 5: Visitations Tab UI (Day 3-4)
17. Create `HomeVisitationsPage.tsx` with tabbed layout
18. Build `VisitationsList.tsx` (table + filters + pagination)
19. Build `VisitationForm.tsx` (full form with safety concern section)
20. Build `VisitationDetail.tsx` and `PreviousVisitPanel.tsx`
21. Build badge components (`SafetyConcernBadge`, `CooperationBadge`)
22. Add route and navigation link

#### Phase 6: Conferences Tab UI (Day 4-5)
23. Build `ConferencesList.tsx`
24. Build `ConferenceForm.tsx`
25. Build `ConferenceMinutesForm.tsx`
26. Build `ConferenceDetail.tsx`

#### Phase 7: Follow-Ups Tab UI (Day 5)
27. Build `FollowUpDashboard.tsx`
28. Build `StatusBadge.tsx`

#### Phase 8: Polish + Above-and-Beyond (Day 5-6)
29. `CooperationChart.tsx` (use recharts or similar -- check if already in dependencies)
30. Mobile responsive pass (Quick Log mode, card layouts, touch targets)
31. Pick 1-2 above-and-beyond items (recommended: cooperation trend sparklines + smart visit type suggestion -- both low effort, high impact)
32. CSV export endpoint + download trigger in UI

### 11. Key Implementation Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Case conference schema | Single `case_conferences` table with JSON columns for attendees/decisions/action_items | Pragmatic for class project scope; avoids 3 extra tables/models/endpoints. JSON fields are never queried independently. |
| Follow-up actions | Separate normalized `follow_up_actions` table | Required for the unified dashboard (US-14) which queries across visit and conference follow-ups with filtering/sorting. Cannot do this efficiently with JSON. |
| Page structure | Single page with 3 tabs (URL-persisted) | IS413 requires ONE page. Tabs keep it organized without separate routes. |
| Edit enforcement | Compare `created_at` to `DateTime.UtcNow` in the PUT endpoint | Simple server-side check. No need for a separate audit table for MVP -- `updated_at` tracks when changes occurred. |
| Offline support | localStorage auto-save in the form component | True PWA/IndexedDB is above-and-beyond. localStorage is sufficient for draft preservation during connectivity drops. |
| Cooperation chart | Client-side rendering with recharts | Small dataset per resident (dozens of visits, not thousands). No server-side aggregation needed. |
