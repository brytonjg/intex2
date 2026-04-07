# Process Recording Plan

## Purpose

The Process Recording page is the primary counseling documentation tool for Beacon of Hope social workers. It provides forms for entering and viewing dated counseling session notes for each resident, capturing session metadata (date, social worker, session type), emotional state tracking, narrative summaries, interventions applied, and follow-up actions. This page is critical to the healing process -- it documents each resident's therapeutic journey and enables continuity of care across social workers.

### IS413 Requirement
"Provides forms for entering and viewing dated counseling session notes for each resident. Captures session date, social worker, session type, emotional state, narrative summary, interventions applied, follow-up actions. View full history chronologically."

### Database Tables
- `process_recordings` (primary)
- `residents` (linked via resident_id)
- `intervention_plans` (linked for reference during sessions)

### RBAC
- **Admin:** Full CRUD on all process recordings across all safehouses
- **Staff/Employee:** View and create recordings for residents in their caseload; edit own recordings within 48 hours
- **Donor:** No access (403)

---

## Personas

### 1. Elena Reyes (Social Worker -- Primary User)
- **Age:** 34
- **Location:** Cebu City, Philippines
- **Device:** Office desktop (Windows, Chrome); occasionally Android phone
- **Role:** Staff/Employee
- **Background:** Licensed social worker at Safehouse 2 managing 12 residents. Conducts 3-5 counseling sessions per day. She writes detailed narrative summaries after each session, often while the conversation is still fresh. Process recordings are central to her professional practice -- they help her track progress, plan future sessions, and provide continuity if another worker takes over a case.
- **Goals:** Enter a session recording quickly after each session. Track emotional state trends over time for each resident. Reference past sessions when preparing for the next one. Flag urgent follow-ups that need supervisor attention.
- **Frustrations:** Long forms that interrupt her clinical thinking. Losing narrative text because of accidental navigation or timeout. Not being able to see the last session's notes while writing the current one. Typing long narratives on a phone is painful.
- **Key Question:** "Can I document a session in under 10 minutes and easily review a resident's emotional trajectory over time?"

### 2. Director Reyes (Co-Founder / Admin)
- **Age:** 52
- **Location:** Portland, OR
- **Device:** MacBook Pro, Chrome
- **Role:** Admin
- **Background:** Oversees clinical quality across all safehouses. Reviews process recordings to ensure documentation standards are met, to identify residents who may need additional support, and to assess social worker performance. She reads recordings weekly.
- **Goals:** Review recent recordings across safehouses. Identify residents with declining emotional states. Ensure all social workers are documenting consistently. Look for patterns that indicate program effectiveness.
- **Frustrations:** Having to open each resident individually to find recordings. No way to filter for "urgent" or "concerning" sessions. Inconsistent narrative quality across social workers. No summary view of emotional state trends.
- **Key Question:** "Are my social workers documenting effectively, and are there any residents whose emotional trajectory concerns me?"

### 3. Supervising Social Worker
- **Age:** 45
- **Location:** Manila, Philippines
- **Device:** Laptop (Windows, Chrome)
- **Role:** Staff/Employee (supervisory)
- **Background:** Senior social worker who supervises 4 junior workers across Safehouse 1. Reviews their process recordings for quality and provides clinical supervision. Needs to co-sign recordings and provide feedback.
- **Goals:** Review recordings submitted by supervised workers. Add supervisor notes or feedback. Co-sign recordings to confirm review. Track which recordings are pending review.
- **Frustrations:** No notification when new recordings are submitted. Can't add annotations without editing the original record. Reviewing 15-20 recordings per week is time-consuming without a queue.
- **Key Question:** "Which recordings need my review, and how can I provide feedback efficiently without altering the original clinical notes?"

### 4. Relief/Substitute Social Worker
- **Age:** 30
- **Location:** Cebu City, Philippines
- **Device:** Office desktop, Chrome
- **Role:** Staff/Employee
- **Background:** Fills in when Elena is on leave. Needs to quickly understand each resident's recent counseling history to provide continuity of care. Does not have long-standing relationships with these residents.
- **Goals:** Read the last 3-5 sessions for a resident to understand their current state. Identify open follow-up actions. Understand what interventions have been tried. Document the substitute session with context about being a relief worker.
- **Frustrations:** Narratives are too long to read quickly between sessions. No summary or highlight of key points from recent sessions. Follow-up actions from previous sessions are buried in the narrative.
- **Key Question:** "What do I need to know about this resident's recent sessions to provide competent care today?"

---

## User Stories

### Session Recording Entry

**US-1: Create new process recording**
As Elena (social worker), I want to create a new process recording for a resident, so that I document the counseling session immediately after it occurs.
- **Acceptance Criteria:**
  - "New Recording" button on the resident's profile page and on the process recordings list
  - Form fields:
    - Session date (default: today, cannot be future)
    - Resident (pre-filled if navigated from resident profile, searchable dropdown otherwise)
    - Social worker (auto-filled with current user, admin can change)
    - Session type (dropdown: Individual Counseling, Group Therapy, Crisis Intervention, Family Counseling, Art/Play Therapy, Psychoeducation, Assessment)
    - Emotional state at start (scale 1-10 with labeled anchors: 1=Severe Distress, 5=Neutral, 10=Thriving)
    - Emotional state at end (same scale)
    - Narrative summary (rich text area, minimum 50 characters)
    - Interventions applied (multi-select from predefined list + free text for "Other")
    - Follow-up actions (repeatable field: action description + due date + priority)
    - Session duration (minutes)
    - Confidentiality flag (checkbox: "Contains highly sensitive disclosures")
  - Required fields: session date, resident, session type, emotional states, narrative summary
  - "Save" creates the recording; "Save & Add Another" saves and opens a blank form

**US-2: Rich text narrative editor**
As Elena (social worker), I want a rich text editor for the narrative summary, so that I can format my clinical notes with structure (headings, lists, emphasis).
- **Acceptance Criteria:**
  - WYSIWYG editor with toolbar: bold, italic, underline, bullet list, numbered list, heading (h3/h4)
  - Minimum height: 200px, auto-expands as content grows
  - Character count shown (with minimum of 50 and suggested range of 200-1000)
  - Auto-save every 30 seconds (saved to localStorage and indicated with "Draft saved" timestamp)
  - Paste from Word/Google Docs preserves basic formatting
  - No image upload (security -- no photos of residents in session notes)

**US-3: Intervention checklist**
As Elena (social worker), I want to select from a predefined list of interventions, so that documentation is standardized and reportable.
- **Acceptance Criteria:**
  - Multi-select checklist of interventions:
    - Cognitive Behavioral Therapy (CBT)
    - Trauma-Focused CBT
    - Play Therapy
    - Art Therapy
    - Narrative Therapy
    - Psychoeducation
    - Grounding Techniques
    - Safety Planning
    - Crisis De-escalation
    - Family Systems Work
    - Life Skills Training
    - Other (free text field appears when selected)
  - Multiple interventions can be selected per session
  - Selected interventions are searchable/filterable in the recording list

**US-4: Follow-up action tracking**
As Elena (social worker), I want to add follow-up actions with due dates, so that I don't forget tasks that emerged from the session.
- **Acceptance Criteria:**
  - Repeatable field group: action description (text), due date (date picker), priority (Low/Medium/High/Urgent), assigned to (default: current user)
  - Multiple follow-ups per recording
  - Follow-ups appear on the resident's timeline
  - Overdue follow-ups highlighted on the caseload inventory page
  - Follow-ups can be marked as "Complete" from the recording or from a follow-up dashboard
  - Completing a follow-up requires a brief completion note

**US-5: Auto-save and draft recovery**
As Elena (social worker), I want the form to auto-save my work, so that I don't lose a 30-minute narrative if the browser crashes.
- **Acceptance Criteria:**
  - Form data auto-saved to localStorage every 30 seconds
  - If the user navigates to the form and a draft exists, prompt: "You have an unsaved draft from [date/time]. Resume or discard?"
  - "Resume" restores all form fields
  - "Discard" clears the draft and shows a blank form
  - Draft cleared after successful server save
  - Visual indicator: "Draft saved at 2:30 PM" near the narrative editor

### Session History View

**US-6: View chronological session history**
As Elena (social worker), I want to see all process recordings for a resident in chronological order, so that I can track the counseling journey.
- **Acceptance Criteria:**
  - Accessible from the resident's profile page (tab or section)
  - Recordings listed newest-first with: date, session type, social worker name, emotional state (start/end), brief narrative preview (first 100 chars)
  - Clicking a recording expands to show the full details in-line
  - Pagination: 10 per page with "Load More" button
  - Total count displayed: "23 sessions recorded"

**US-7: Emotional state trend visualization**
As Elena (social worker), I want to see a chart of a resident's emotional state over time, so that I can assess their healing trajectory.
- **Acceptance Criteria:**
  - Line chart showing emotional state (start and end) plotted against session dates
  - Two lines: "Start of Session" and "End of Session"
  - Y-axis: 1-10 scale with labeled anchors
  - X-axis: session dates
  - Hovering over a data point shows: date, session type, emotional state value
  - Trend line (moving average) optional toggle
  - Chart displayed above the session list on the resident's recording tab

**US-8: Filter session history**
As the supervising social worker, I want to filter recordings by session type or date range, so that I can review specific types of sessions.
- **Acceptance Criteria:**
  - Date range picker (from/to)
  - Session type dropdown filter
  - Social worker filter (for supervisors reviewing multiple workers' recordings)
  - "Flagged as sensitive" filter (confidentiality flag)
  - Filters combinable
  - Result count updates with filters

**US-9: Side-by-side session comparison**
As a relief social worker, I want to view the previous session's notes alongside the current entry form, so that I can provide continuity.
- **Acceptance Criteria:**
  - When creating a new recording, a collapsible panel shows the most recent recording for that resident
  - Panel shows: date, type, emotional states, full narrative, interventions, follow-ups
  - Panel can be expanded/collapsed without affecting the form
  - On desktop: side-by-side layout (form left, previous session right)
  - On mobile: previous session in a slide-out drawer

### Supervisor Review

**US-10: Supervisor review queue**
As the supervising social worker, I want a queue of recordings pending my review, so that I can efficiently review my team's documentation.
- **Acceptance Criteria:**
  - Dedicated "Pending Review" tab or section
  - Shows recordings by supervised workers that haven't been reviewed
  - Sorted by oldest first (most overdue at top)
  - Each entry shows: resident name, social worker, session date, days since submission
  - Recordings older than 7 days without review are highlighted
  - Count badge on the tab: "Pending Review (8)"

**US-11: Supervisor annotations**
As the supervising social worker, I want to add notes to a recording without modifying the original, so that I can provide feedback while preserving the clinical record.
- **Acceptance Criteria:**
  - "Add Supervisor Note" button on each recording (visible to supervisory staff and admin)
  - Opens a text area below the recording for supervisor comments
  - Supervisor note is visually distinct from the original recording (different background color, labeled "Supervisor Note")
  - Original recording text is not editable by the supervisor
  - Supervisor note saved with supervisor's name and timestamp
  - Recording marked as "Reviewed" after supervisor note is added

**US-12: Co-sign recording**
As the supervising social worker, I want to co-sign a recording, so that the organization has documented clinical oversight.
- **Acceptance Criteria:**
  - "Co-sign" button on recordings (supervisory staff only)
  - Co-signing records: supervisor name, timestamp, optional brief note
  - Co-signed recordings show a "Reviewed & Co-signed by [Name] on [Date]" badge
  - Co-sign is irreversible (cannot un-sign)
  - Report available: "Unsigned recordings" filtered by date range

### Edit & Delete

**US-13: Edit own recording within 48 hours**
As Elena (social worker), I want to edit my own recordings within 48 hours of creation, so that I can correct errors or add details I remembered later.
- **Acceptance Criteria:**
  - "Edit" button visible on own recordings created within the last 48 hours
  - After 48 hours, recordings are locked (read-only) for clinical integrity
  - Admin can edit any recording at any time (with audit log)
  - Edit saves a new version; original version is preserved in history
  - Edit reason required: "Why are you editing this recording?"
  - All edits logged in audit trail with before/after diff

**US-14: Version history for edited recordings**
As Director Reyes (admin), I want to see the version history of edited recordings, so that I can verify clinical integrity.
- **Acceptance Criteria:**
  - "Version History" link on recordings that have been edited
  - Shows all versions with: timestamp, editor, edit reason
  - Side-by-side diff view highlighting changes
  - Original version always accessible
  - Version history is read-only (cannot be modified)

**US-15: Delete recording (admin only)**
As Director Reyes (admin), I want to delete a recording in exceptional circumstances, so that erroneous records can be removed.
- **Acceptance Criteria:**
  - Delete option visible to admin only
  - Confirmation modal: "Permanently delete this recording? This action will be logged and cannot be undone."
  - Requires typing "DELETE" to confirm
  - Deleted recording is soft-deleted (marked as deleted, not physically removed)
  - Deletion logged in audit trail with admin name, timestamp, and reason
  - Soft-deleted records can be restored by admin within 30 days

### Cross-Resident Views

**US-16: All recent recordings dashboard**
As Director Reyes (admin), I want to see all recent recordings across all safehouses, so that I can monitor documentation activity organization-wide.
- **Acceptance Criteria:**
  - Dashboard view showing recordings from the last 7 days across all safehouses
  - Grouped by safehouse, then by resident
  - Shows: resident code (not full name for privacy at-a-glance), session date, type, social worker, emotional states
  - Filterable by safehouse, social worker, session type, date range
  - Click through to full recording
  - Summary stats: total sessions this week, average emotional state change, sessions per social worker

**US-17: Follow-up action dashboard**
As Elena (social worker), I want a dashboard of all my pending follow-up actions, so that I don't miss important tasks.
- **Acceptance Criteria:**
  - Accessible from the main navigation or the caseload page
  - Shows all open follow-ups assigned to the current user
  - Columns: resident name, action description, due date, priority, originating session date
  - Sorted by due date (overdue at top, highlighted red)
  - "Mark Complete" button with completion note
  - Filter by: priority, overdue only, resident

### Privacy & Security

**US-18: Confidentiality flag handling**
As Elena (social worker), I want to flag recordings that contain highly sensitive disclosures, so that access is further restricted.
- **Acceptance Criteria:**
  - "Contains highly sensitive disclosures" checkbox on the recording form
  - Flagged recordings show a shield icon in the list view
  - Flagged recordings are only visible to: the recording author, the resident's assigned social worker, supervisors, and admin
  - Other staff in the same safehouse cannot view flagged recordings
  - Attempting to access a flagged recording without permission shows: "This recording contains sensitive disclosures and is restricted."

**US-19: Print-friendly session summary**
As Elena (social worker), I want to print a session summary for case file documentation, so that hard copies can be maintained per DSWD requirements.
- **Acceptance Criteria:**
  - "Print" button on individual recordings
  - Print layout includes: organization header, resident code (not full name), session date, type, social worker, emotional states, full narrative, interventions, follow-ups
  - Print layout excludes: navigation, sidebar, other recordings
  - Formatted for A4/letter paper
  - "Print All" option on the recording history exports all sessions for a resident

### Accessibility & Performance

**US-20: Keyboard-accessible recording entry**
As any social worker, I want to complete the recording form entirely by keyboard, so that the form meets accessibility standards.
- **Acceptance Criteria:**
  - Tab order follows visual layout: session date -> resident -> session type -> emotional start -> emotional end -> narrative -> interventions -> follow-ups -> save
  - Emotional state slider operable via arrow keys
  - Intervention checkboxes operable via Space
  - Rich text editor toolbar accessible via keyboard shortcuts (Ctrl+B for bold, etc.)
  - Follow-up fields: Tab through action, date, priority, "Add Another" button
  - Focus visible on all interactive elements

**US-21: Mobile-friendly recording entry**
As Elena (entering notes on her phone after a home visit), I want the recording form to work on mobile, so that I can document sessions immediately.
- **Acceptance Criteria:**
  - Single-column layout on screens under 768px
  - Narrative editor has a minimum height of 150px on mobile
  - Emotional state uses a number input or segmented control instead of a slider on mobile
  - Dropdowns use native mobile selects
  - Touch targets minimum 44px
  - "Previous Session" panel accessible via slide-out drawer (not side-by-side)

**US-22: Fast session history loading**
As a relief social worker reviewing 50+ sessions, I want the history to load progressively, so that I can start reading while older sessions load.
- **Acceptance Criteria:**
  - First 10 recordings load within 1 second
  - "Load More" button fetches next 10
  - Emotional state chart renders with available data, updates as more loads
  - Skeleton loading states shown for pending content
  - No full-page spinner blocking content

---

## Definition of Done

- [ ] New recording form captures all required fields: session date, resident, social worker, type, emotional states (1-10), narrative (rich text, 50+ chars), interventions (multi-select), follow-ups (with due dates and priority)
- [ ] Rich text editor with auto-save every 30 seconds; draft recovery on form revisit
- [ ] Chronological session history viewable per resident with narrative previews
- [ ] Emotional state trend line chart (start and end) plotted over session dates
- [ ] Session history filterable by date range, type, social worker
- [ ] Side-by-side view of previous session notes when creating a new recording
- [ ] Supervisor review queue shows pending recordings with age indicators
- [ ] Supervisor annotations added without modifying original clinical notes
- [ ] Co-sign functionality records clinical oversight
- [ ] Edit window: 48 hours for authors, unlimited for admin; version history preserved
- [ ] Soft delete (admin only) with 30-day restore window
- [ ] Cross-safehouse recording dashboard for admin with summary statistics
- [ ] Follow-up action dashboard shows pending tasks sorted by due date
- [ ] Confidentiality flag restricts access to author, assigned worker, supervisor, admin
- [ ] Print-friendly layout for individual and bulk session summaries
- [ ] Fully keyboard accessible and mobile responsive (360px+)
- [ ] All 22 user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox

---

## Critique & Suggested Improvements

### Overall Assessment

This is a strong, thorough plan that treats process recordings with appropriate weight as "the primary tool for documenting the healing journey." The persona work is excellent -- Elena, the supervising worker, and the relief worker represent real clinical workflows. The plan goes well beyond the minimum IS413 requirement in useful ways (supervisor review, side-by-side comparison, emotional trend charts). That said, several gaps need attention.

### Required Fields Coverage

The IS413 requirement (line 104 of intex_requirements.md) specifies these exact fields:

| Required Field | Covered? | Notes |
|---|---|---|
| Session date | Yes | US-1, defaults to today, no future dates |
| Social worker | Yes | US-1, auto-filled with current user |
| Session type (individual or group) | Partially | The dropdown in US-1 lists 7 types (Individual Counseling, Group Therapy, Crisis Intervention, etc.) but the requirement says "individual or group." The expanded list is fine for clinical use, but make sure every type maps to one of those two categories for reporting. Consider adding a parent category field (Individual / Group) that auto-fills based on the specific type, so IS413 compliance is explicit. |
| Emotional state observed | Yes | 1-10 scale at start and end. Good -- exceeds the requirement by capturing both. |
| Narrative summary | Yes | US-1 + US-2, rich text with auto-save. |
| Interventions applied | Yes | US-3, multi-select checklist. |
| Follow-up actions | Yes | US-4, repeatable with due dates and priority. |

**Action needed:** Add a "Session Category" field (Individual / Group) that either auto-derives from the session type dropdown or is selected separately, so the IS413 individual/group distinction is explicitly captured and filterable.

### Chronological View Requirement

IS413 says: "view the full history of process recordings for any resident, displayed chronologically."

US-6 covers this but defaults to newest-first. Strictly speaking, "chronologically" means oldest-first (chronological order). The plan should:
- Default to oldest-first to match the requirement wording, OR
- Provide a toggle (oldest-first / newest-first) with oldest-first as the default
- The "full history" aspect is partially undermined by pagination (10 per page with "Load More"). Consider adding a "View All" option or at minimum ensuring the emotional state chart always reflects ALL sessions, not just the loaded page.

### Weight as the "Primary Tool for Documenting the Healing Journey"

The plan does treat this with appropriate seriousness in most respects: rich text editing, auto-save, draft recovery, emotional trend visualization, supervisor review workflows, and continuity-of-care features (side-by-side view for relief workers). This is one of the strongest aspects of the plan.

However, a few things would strengthen this further:

1. **No progress notes or milestone markers.** The plan captures individual sessions but has no mechanism for marking therapeutic milestones ("Resident spoke about the incident for the first time," "Resident expressed desire to return to school"). These are critical for the healing narrative. Consider adding a "Milestone" flag or tag on recordings, plus a milestone timeline view separate from the session list.

2. **No concern flagging beyond the confidentiality checkbox.** The plan has a "Contains highly sensitive disclosures" flag (US-18) but no clinical concern flag. Elena's persona mentions "Flag urgent follow-ups that need supervisor attention" and Director Reyes wants to "identify residents with declining emotional states," but there is no explicit mechanism for this. Add:
   - A "Clinical Concern" flag (e.g., self-harm risk, regression, disclosure of new abuse) that triggers a notification to the supervisor
   - Automatic flagging when emotional state drops below a threshold (e.g., 3 or lower) or drops significantly between sessions (e.g., more than 3 points)

3. **Emotional state tracking over time is present but incomplete.** US-7 provides a line chart, which is good. But it lacks:
   - Contextual annotations on the chart (e.g., marking when a new intervention was introduced, when a critical incident occurred)
   - Ability to compare a resident's trajectory against aggregate/anonymous benchmarks
   - Summary statistics: average emotional state over last 30 days, trend direction (improving/stable/declining), longest streak of improvement

4. **No session preparation workflow.** Elena conducts 3-5 sessions per day. There is no feature for pre-session preparation -- a view that shows the last session summary, open follow-ups, and current intervention plan for a resident before walking into the room. US-9 (side-by-side) only activates when creating a new recording. Consider a "Prepare for Session" read-only view accessible from the caseload page.

### Privacy Considerations -- Major Gap

These are counseling notes about minors who are trafficking victims. The plan's privacy measures are insufficient for this context:

1. **Session timeout and screen lock.** The plan mentions auto-save to localStorage (US-5) but does not address session timeout. Social workers may step away from shared office computers. The plan must specify:
   - Automatic session timeout after N minutes of inactivity (suggest 15 minutes)
   - localStorage drafts should be encrypted or at minimum cleared on logout
   - A "Lock Screen" button that requires re-authentication to continue

2. **Audit logging is mentioned only for edits and deletes.** Every VIEW of a process recording should be logged (who accessed it, when, for which resident). This is standard practice for counseling records involving minors. Add an audit trail for read access, not just write access.

3. **Data at rest and in transit.** The plan does not mention encryption. Process recordings should be encrypted at rest in the database and transmitted only over HTTPS. This should be stated explicitly even if it is handled at the infrastructure level.

4. **Print security.** US-19 allows printing session summaries, including a "Print All" option for all sessions. This is a significant data exfiltration risk for records about trafficked minors. Consider:
   - Adding a watermark with the printing user's name and timestamp
   - Logging all print actions in the audit trail
   - Requiring admin approval for "Print All" (bulk print)
   - Omitting the resident's full name from printed output (the plan already uses "resident code" which is good)

5. **Resident identification.** US-16 uses "resident code" in the cross-safehouse dashboard, which is good. But the individual recording view and forms use the resident's full name. For consistency, consider whether all process recording views should use a code or alias, with the full name available only on the resident profile page.

6. **Export/download controls.** The plan has no mention of data export restrictions. Can a staff member copy-paste narrative text? Can they screenshot it? While technical prevention is limited, the plan should at minimum state that bulk data export is admin-only and that the UI should not provide easy export mechanisms beyond the controlled print feature.

7. **Data retention policy.** There is no mention of how long process recordings are retained after a resident leaves the program, ages out, or is reintegrated. Philippine DSWD guidelines and child protection laws likely have specific retention requirements. The plan should state a data retention policy or at minimum flag this as a decision needed.

### Additional Gaps

1. **No offline support.** Elena occasionally uses her Android phone. If she is in an area with poor connectivity (common in rural Philippines), she cannot enter recordings. The auto-save to localStorage helps with browser crashes but not with offline entry. Consider: queue entries locally and sync when connectivity returns, or at minimum warn the user when they are offline and preserve their draft.

2. **No template or structured narrative option.** The rich text editor is flexible but may lead to inconsistent documentation. Consider offering optional narrative templates (e.g., "Session Context -> Client Presentation -> Interventions Used -> Client Response -> Plan") that pre-populate the editor with section headings. This helps junior workers and supports the supervising worker's concern about inconsistent narrative quality.

3. **Search within recordings.** There is no full-text search across process recording narratives. If a social worker wants to find "the session where the resident talked about her sister," there is no way to do that. Add a search bar on the session history that searches within narrative text.

4. **Notification system dependency.** US-10 (supervisor review queue) and the suggested concern flagging both imply notifications, but the plan does not specify how notifications are delivered (in-app badge, email, push notification). This should be specified or deferred with a note.

5. **Integration with intervention plans.** The database section mentions `intervention_plans` as a linked table, but no user story leverages this. When creating a recording, the form should show the resident's current intervention plan goals so the social worker can document progress against them.

### Summary of Required Changes

**Must fix (IS413 compliance or critical gaps):**
- Add explicit Individual/Group session category mapping
- Clarify chronological sort order (oldest-first as default)
- Add audit logging for read access (not just writes)
- Add session timeout / screen lock specification
- Add clinical concern flagging mechanism

**Should fix (plan quality and clinical utility):**
- Add milestone/progress markers on the timeline
- Add emotional state threshold alerts
- Add narrative templates for consistency
- Add full-text search within recordings
- Specify notification delivery mechanism
- Add print audit logging and watermarking
- State data retention policy or flag as TBD
- Link intervention plan goals to recording form

**Nice to have (deferred is acceptable):**
- Offline entry support
- Contextual annotations on emotional state chart
- Session preparation view
- Aggregate emotional state benchmarks

---

## Requirements Coverage Matrix

Cross-reference of the IS413 requirement (intex_requirements.md line 104) against the plan and the database schema (init_schema.sql lines 210-227).

### IS413 Required Fields

| # | Required Field | IS413 Wording | Plan Coverage | DB Column | Gap / Notes |
|---|---|---|---|---|---|
| 1 | Session date | "session date" | US-1: date picker, defaults to today, no future dates | `session_date date` | **Covered.** DB type is correct. |
| 2 | Social worker | "social worker" | US-1: auto-filled with current user, admin can change | `social_worker text` | **Covered.** Consider storing as a foreign key to a users/staff table rather than free text for referential integrity and consistent naming. |
| 3 | Session type (individual or group) | "session type (individual or group)" | US-1: dropdown with 7 specific types (Individual Counseling, Group Therapy, Crisis Intervention, etc.) | `session_type text` | **Partial gap.** The IS413 requirement explicitly says "individual or group." The plan's 7-type dropdown is clinically richer but does not explicitly map each type to the required Individual/Group binary. **Fix:** Add a `session_category` column (enum: 'individual', 'group') that auto-derives from the selected type, or add it as a separate required dropdown. This ensures IS413 compliance and enables filtering by the exact categories the rubric expects. |
| 4 | Emotional state observed | "emotional state observed" | US-1: 1-10 numeric scale at start AND end of session (exceeds requirement) | `emotional_state_observed text`, `emotional_state_end text` | **Partial gap.** Plan specifies integer 1-10, but DB stores as `text`. **Fix:** Change columns to `integer` with a CHECK constraint (1-10) so the emotional trend chart (US-7) can query numerically without casting. |
| 5 | Narrative summary | "a narrative summary of the session" | US-1 + US-2: rich text editor with auto-save, 50-char minimum, WYSIWYG toolbar | `session_narrative text` | **Covered.** `text` type is appropriate for long-form content. Rich text will be stored as HTML; consider whether to sanitize on write or read. |
| 6 | Interventions applied | "interventions applied" | US-3: multi-select checklist of 12 predefined interventions + "Other" free text | `interventions_applied text` | **Schema mismatch.** Plan requires multi-select (multiple interventions per session), but DB stores as a single `text` column. **Fix:** Either change to `jsonb` to store an array of selected interventions, or create a junction table `recording_interventions(recording_id, intervention_id)` with a reference table of intervention types. The junction table approach is better for filtering/reporting (US-3 says "Selected interventions are searchable/filterable"). |
| 7 | Follow-up actions | "follow-up actions" | US-4: repeatable field group with action description, due date, priority (Low/Med/High/Urgent), assigned-to | `follow_up_actions text` | **Schema mismatch.** Plan requires structured, repeatable follow-ups with due dates and priority levels, completion tracking (US-4, US-17). A single `text` column cannot support this. **Fix:** Create a separate `follow_up_actions` table: `(action_id, recording_id, description, due_date, priority, assigned_to, completed_at, completion_note)`. This enables the follow-up dashboard (US-17), overdue highlighting, and "Mark Complete" functionality. |

### IS413 Required Capabilities

| # | Required Capability | IS413 Wording | Plan Coverage | Gap / Notes |
|---|---|---|---|---|
| 8 | View full history chronologically | "view the full history of process recordings for any resident, displayed chronologically" | US-6: chronological list, newest-first, paginated 10/page with Load More | **Minor gap.** "Chronologically" typically means oldest-first. Plan defaults to newest-first. Critique already flagged this. **Fix:** Default to oldest-first or add a sort toggle. Also, ensure the emotional state chart (US-7) always reflects ALL sessions, not just the currently loaded page. |
| 9 | Forms for entering and viewing | "Provides forms for entering and viewing dated counseling session notes" | US-1 (entry form), US-6 (viewing), US-9 (side-by-side) | **Covered.** |
| 10 | Primary tool for healing journey | "This is the primary tool for documenting the healing journey of each resident" | Plan treats this seriously: rich text, auto-save, emotional trends, supervisor review, continuity features | **Covered in spirit.** Critique identified additional improvements: milestone markers, clinical concern flags, narrative templates. |

### DB Schema Gaps (columns missing from `process_recordings` table)

These columns are required by plan user stories but do not exist in the current schema:

| Missing Column(s) | Required By | Suggested Addition |
|---|---|---|
| `session_category` (enum: individual/group) | IS413 requirement, critique | `session_category text not null check (session_category in ('individual', 'group'))` |
| `confidentiality_flag` (boolean) | US-18 | `confidentiality_flag boolean default false` |
| `created_by` (user ID) | US-13 (edit own), US-18 (author access) | `created_by uuid references auth.users(id)` |
| `created_at`, `updated_at` | US-13 (48-hour edit window), audit trail | `created_at timestamptz default now()`, `updated_at timestamptz default now()` |
| `deleted_at` | US-15 (soft delete) | `deleted_at timestamptz` (null = active) |
| `review_status` | US-10 (supervisor queue) | `review_status text default 'pending' check (review_status in ('pending', 'reviewed', 'cosigned'))` |
| `co_signed_by`, `co_signed_at` | US-12 | `co_signed_by uuid references auth.users(id)`, `co_signed_at timestamptz` |

### Missing Tables

| Table | Required By | Key Columns |
|---|---|---|
| `recording_interventions` | US-3 (multi-select, filterable) | `recording_id, intervention_id` |
| `intervention_types` | US-3 (predefined list) | `intervention_id, name, active` |
| `recording_follow_ups` | US-4, US-17 (structured follow-ups) | `action_id, recording_id, description, due_date, priority, assigned_to, completed_at, completion_note` |
| `supervisor_notes` | US-11 (annotations without modifying original) | `note_id, recording_id, supervisor_id, note_text, created_at` |
| `recording_versions` | US-13, US-14 (version history) | `version_id, recording_id, version_number, snapshot_json, edited_by, edit_reason, created_at` |
| `recording_audit_log` | US-13, US-15, critique (read access logging) | `log_id, recording_id, action (view/edit/delete/print), user_id, timestamp, details` |

### IS414 Security Rubric Alignment

| Security Requirement | Rubric Points | Plan Coverage | Gap |
|---|---|---|---|
| HTTPS/TLS | 1 | Not mentioned | Infrastructure-level; should be stated explicitly |
| Auth required on pages/endpoints | 1 | RBAC section defines roles | Covered by RBAC definition; implementation must enforce |
| RBAC - admin-only CUD | 1.5 | US-15 (admin-only delete), edit restrictions | Plan allows staff to Create (US-1) and edit within 48h (US-13), which is correct -- rubric says "CUD" but process recordings need staff create access by design. Document this RBAC exception clearly in the video. |
| Confirmation to delete | 1 | US-15: modal requiring typing "DELETE" | **Covered.** Exceeds requirement. |
| Privacy policy | 1 | Not in this page's scope | Handled elsewhere |
| CSP header | 2 | Not in this page's scope | Handled elsewhere; note that the rich text editor (US-2) may require CSP exceptions for inline styles. Test this. |
| Additional security features | 2 | Confidentiality flag (US-18), audit logging, 48-hour edit lock, soft delete | **Strong candidate for bonus points.** Session timeout, print watermarking, and read-access audit logging would further strengthen this. |

---

## Above and Beyond Ideas

Ideas that go beyond IS413 minimum requirements to demonstrate technical depth, UX polish, and sensitivity to the domain. Prioritized by impact-to-effort ratio.

### Tier 1: High Impact, Moderate Effort (implement these)

**1. Auto-save with conflict resolution (US-2, US-5)**
The plan specifies localStorage auto-save every 30 seconds. Go further:
- Save drafts server-side (database row with `status = 'draft'`) so drafts survive device changes and localStorage clearing.
- If two workers open the same resident's form, detect the conflict and warn: "Elena started a recording for this resident 5 minutes ago. Continue anyway?"
- Show a "Last saved: 2:31 PM (server)" indicator that distinguishes local vs. server saves.
- **Why it matters:** Social workers lose 30-minute narratives regularly to browser crashes, session timeouts, and shared computers. This directly addresses Elena's top frustration.

**2. Session timeout and screen lock (privacy critique)**
- Implement a 15-minute inactivity timeout that locks the screen with a blurred overlay and requires re-authentication (password or PIN).
- Add a manual "Lock Screen" button in the nav bar (keyboard shortcut: Ctrl+L).
- On timeout, server-side draft is preserved; localStorage draft is encrypted with the user's session key or cleared.
- **Why it matters:** These are counseling notes about trafficked minors. A social worker stepping away from a shared office computer with a process recording open is a real and serious risk. This is the single most impactful privacy improvement the critique identified.

**3. Read-access audit logging (privacy critique)**
- Log every view of a process recording: `{user_id, recording_id, action: 'view', timestamp, ip_address}`.
- Admin can view the audit log for any recording: "This recording was viewed by Elena Reyes on April 3, Director Reyes on April 5."
- **Why it matters:** Standard practice for counseling records involving minors. Also satisfies IS414's "additional security features" rubric item (2 points).

**4. Emotional state threshold alerts (critique)**
- When a social worker saves a recording with emotional state <= 3, or a drop of 3+ points from the previous session, automatically flag the recording for supervisor review.
- Show a non-blocking alert: "This resident's emotional state has declined significantly. A notification has been sent to the supervising social worker."
- On the supervisor's dashboard, these appear with an orange/red indicator.
- **Why it matters:** Director Reyes's persona explicitly wants to "identify residents with declining emotional states." This automates what would otherwise require manually scanning every recording.

**5. Narrative templates (critique)**
- Offer 2-3 optional templates that pre-populate the rich text editor with section headings:
  - **Standard session:** "Session Context / Client Presentation / Interventions Used / Client Response / Plan for Next Session"
  - **Crisis intervention:** "Presenting Crisis / Immediate Safety Assessment / Interventions / Stabilization Outcome / Safety Plan / Immediate Follow-ups"
  - **Assessment:** "Reason for Assessment / Observations / Findings / Recommendations"
- Templates are optional -- the worker can dismiss them and write freeform.
- **Why it matters:** Addresses the supervising social worker's frustration about inconsistent narrative quality. Junior workers get scaffolding; senior workers can ignore it.

### Tier 2: Medium Impact, Lower Effort (implement if time permits)

**6. Print audit trail and watermarking (US-19, privacy critique)**
- When a user clicks "Print," log the action in the audit trail: `{user_id, recording_id, action: 'print', timestamp}`.
- Add a light watermark to the printed output: "Printed by Elena Reyes on 2026-04-06 14:30. CONFIDENTIAL."
- Require admin approval for "Print All" (bulk print of all sessions for a resident).
- **Why it matters:** Printed session notes about trafficked minors are a data exfiltration vector. The watermark creates accountability; the audit log creates visibility.

**7. Full-text search within recordings (critique)**
- Add a search bar on the session history page that searches within `session_narrative` text.
- Use PostgreSQL's `to_tsvector` / `to_tsquery` for full-text search.
- Results highlight matching terms within the narrative preview.
- **Why it matters:** Relief social workers need to quickly find specific topics across 50+ sessions. "Find the session where she talked about her sister" is a real use case that the current plan cannot support.

**8. Intervention plan integration (critique)**
- When creating a new recording, display the resident's current intervention plan goals in a read-only sidebar panel.
- Social worker can check off which goals were addressed in this session.
- Over time, generate a report showing goal coverage: "Goal 'Build trust with adults' addressed in 8 of 12 sessions."
- **Why it matters:** The DB section mentions `intervention_plans` as a linked table but no user story uses it. This closes the loop between planning and documentation.

**9. Keyboard shortcut cheat sheet**
- Overlay accessible via `?` key showing all keyboard shortcuts for the recording form.
- Include: Ctrl+S (save), Ctrl+B/I/U (formatting), Tab navigation order, Escape (close panels).
- **Why it matters:** Small touch that demonstrates accessibility awareness. Maps to US-20 (keyboard accessible).

### Tier 3: Impressive but Time-Intensive (stretch goals)

**10. Offline draft entry with sync**
- Use a service worker to detect offline state.
- When offline, show a banner: "You are offline. Your recording will be saved locally and synced when connectivity returns."
- Queue the recording in IndexedDB; sync automatically when online.
- **Why it matters:** Elena occasionally uses her Android phone in areas with poor connectivity. This is a genuine need for field social workers in rural Philippines but requires significant engineering effort.

**11. AI-assisted narrative summary**
- After the social worker finishes typing the narrative, offer an optional "Generate Summary" button that produces a 2-3 sentence summary using an LLM.
- Summary stored separately and shown in the session list (US-6) instead of truncating the first 100 characters.
- **Why it matters:** Relief workers reviewing 50+ sessions benefit from accurate summaries rather than arbitrary truncations. Also a strong IS455 (ML pipeline) integration point.

**12. Comparative emotional trajectory dashboard**
- For admin/supervisor view: overlay multiple residents' emotional trajectories on one chart (anonymized by resident code).
- Show cohort averages, identify outliers.
- **Why it matters:** Director Reyes wants to "assess program effectiveness." Cohort-level emotional trends directly measure whether the healing program works. Strong IS455 tie-in.

---

## Implementation Plan

This plan covers the concrete backend, frontend, and schema work needed to implement process recordings. It is scoped to the **must-have** features (IS413 compliance + core clinical workflow) with callouts for above-and-beyond items that can be layered in.

### 1. Schema Changes (PostgreSQL Migration)

The existing `process_recordings` table needs column additions, and several new tables are required. All changes should be applied as a single EF Core migration.

#### 1a. Alter `process_recordings` table

Add these columns to the existing table:

```sql
ALTER TABLE process_recordings
  ADD COLUMN session_category text NOT NULL DEFAULT 'individual'
    CHECK (session_category IN ('individual', 'group')),
  ADD COLUMN emotional_state_start integer CHECK (emotional_state_start BETWEEN 1 AND 10),
  ADD COLUMN confidentiality_flag boolean NOT NULL DEFAULT false,
  ADD COLUMN created_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN updated_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN deleted_at timestamptz,
  ADD COLUMN review_status text NOT NULL DEFAULT 'pending'
    CHECK (review_status IN ('pending', 'reviewed', 'cosigned')),
  ADD COLUMN co_signed_by text,
  ADD COLUMN co_signed_at timestamptz,
  ADD COLUMN edit_reason text;
```

Additionally, migrate existing data:
- Copy `emotional_state_observed` (text) values into the new `emotional_state_start` (integer) column, then drop the old column or keep it as a legacy alias.
- Change `emotional_state_end` from text to integer (may require a two-step migration: add new int column, migrate data, drop old column, rename).
- Derive `session_category` from existing `session_type` values: anything containing "Group" maps to `'group'`, everything else maps to `'individual'`.

#### 1b. New tables

**`intervention_types`** -- Reference table for the predefined intervention checklist (US-3).

```sql
CREATE TABLE intervention_types (
  intervention_type_id serial PRIMARY KEY,
  name text NOT NULL UNIQUE,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0
);

-- Seed data
INSERT INTO intervention_types (name, sort_order) VALUES
  ('Cognitive Behavioral Therapy (CBT)', 1),
  ('Trauma-Focused CBT', 2),
  ('Play Therapy', 3),
  ('Art Therapy', 4),
  ('Narrative Therapy', 5),
  ('Psychoeducation', 6),
  ('Grounding Techniques', 7),
  ('Safety Planning', 8),
  ('Crisis De-escalation', 9),
  ('Family Systems Work', 10),
  ('Life Skills Training', 11),
  ('Other', 99);
```

**`recording_interventions`** -- Junction table replacing the plain-text `interventions_applied` column.

```sql
CREATE TABLE recording_interventions (
  recording_id integer NOT NULL REFERENCES process_recordings(recording_id) ON DELETE CASCADE,
  intervention_type_id integer NOT NULL REFERENCES intervention_types(intervention_type_id),
  other_description text, -- populated only when intervention_type is "Other"
  PRIMARY KEY (recording_id, intervention_type_id)
);
CREATE INDEX idx_recording_interventions_recording ON recording_interventions(recording_id);
```

**`recording_follow_ups`** -- Structured follow-up actions replacing the plain-text `follow_up_actions` column (US-4, US-17).

```sql
CREATE TABLE recording_follow_ups (
  follow_up_id serial PRIMARY KEY,
  recording_id integer NOT NULL REFERENCES process_recordings(recording_id) ON DELETE CASCADE,
  description text NOT NULL,
  due_date date,
  priority text NOT NULL DEFAULT 'Medium'
    CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  assigned_to text, -- social worker name (matches process_recordings.social_worker)
  completed_at timestamptz,
  completion_note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_follow_ups_recording ON recording_follow_ups(recording_id);
CREATE INDEX idx_follow_ups_assigned ON recording_follow_ups(assigned_to) WHERE completed_at IS NULL;
```

**`recording_audit_log`** -- Audit trail for view, edit, delete, and print actions (privacy requirement).

```sql
CREATE TABLE recording_audit_log (
  log_id bigserial PRIMARY KEY,
  recording_id integer NOT NULL REFERENCES process_recordings(recording_id),
  action text NOT NULL CHECK (action IN ('view', 'create', 'edit', 'delete', 'restore', 'print')),
  performed_by text NOT NULL,
  details jsonb, -- e.g., {"edit_reason": "...", "fields_changed": [...]}
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_log_recording ON recording_audit_log(recording_id);
CREATE INDEX idx_audit_log_user ON recording_audit_log(performed_by);
```

**`supervisor_notes`** -- Annotations on recordings without modifying the original (US-11).

```sql
CREATE TABLE supervisor_notes (
  note_id serial PRIMARY KEY,
  recording_id integer NOT NULL REFERENCES process_recordings(recording_id) ON DELETE CASCADE,
  supervisor_name text NOT NULL,
  note_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_supervisor_notes_recording ON supervisor_notes(recording_id);
```

#### 1c. EF Core model changes

Update `ProcessRecording.cs` to add the new properties and navigation collections. Create new model classes: `InterventionType`, `RecordingIntervention`, `RecordingFollowUp`, `RecordingAuditLog`, `SupervisorNote`. Update `AppDbContext.OnModelCreating` with the table mappings and relationships.

---

### 2. Backend API Endpoints

All endpoints are added to `Program.cs` as minimal API `MapGet`/`MapPost`/`MapPut`/`MapDelete` calls, following the existing pattern. Each endpoint receives `AppDbContext` via DI. No `Task.WhenAll` -- all queries are sequential per the project's documented constraint.

#### 2a. GET /api/admin/recordings

**Purpose:** List recordings, filterable by resident, with chronological ordering (oldest-first default per IS413).

**Query parameters:**
- `residentId` (int, optional) -- filter to one resident
- `sessionType` (string, optional) -- filter by session type
- `sessionCategory` (string, optional) -- "individual" or "group"
- `socialWorker` (string, optional) -- filter by social worker name
- `fromDate` / `toDate` (DateOnly, optional) -- date range filter
- `confidentialOnly` (bool, optional) -- filter flagged recordings
- `reviewStatus` (string, optional) -- "pending", "reviewed", "cosigned"
- `sortOrder` (string, optional) -- "asc" (default) or "desc"
- `page` (int, default 1), `pageSize` (int, default 10, max 50)

**Response shape:**
```json
{
  "items": [
    {
      "recordingId": 1,
      "residentId": 42,
      "residentCode": "SH2-0042",
      "sessionDate": "2026-03-15",
      "sessionType": "Individual Counseling",
      "sessionCategory": "individual",
      "socialWorker": "Elena Reyes",
      "emotionalStateStart": 4,
      "emotionalStateEnd": 6,
      "narrativePreview": "Resident discussed her feelings about...",
      "confidentialityFlag": false,
      "reviewStatus": "pending",
      "interventions": ["CBT", "Grounding Techniques"],
      "followUpCount": 2,
      "openFollowUpCount": 1,
      "sessionDurationMinutes": 45,
      "createdAt": "2026-03-15T14:30:00Z"
    }
  ],
  "totalCount": 47,
  "page": 1,
  "pageSize": 10
}
```

**Implementation notes:**
- Exclude soft-deleted records (`deleted_at IS NULL`) by default.
- Narrative preview: first 150 characters of `session_narrative`, HTML-stripped.
- Join to `residents` to get `internal_code` as `residentCode`.
- Join to `recording_interventions` + `intervention_types` for the interventions array.
- Subquery count on `recording_follow_ups` for follow-up counts.
- Log a `view` audit entry only on the detail endpoint (GET /:id), not on the list endpoint, to avoid excessive logging.

#### 2b. GET /api/admin/recordings/:id

**Purpose:** Full detail of a single recording including narrative, interventions, follow-ups, supervisor notes, and audit log summary.

**Response:** Full `ProcessRecording` fields plus:
- `interventions`: array of `{ interventionTypeId, name, otherDescription }`.
- `followUps`: array of `{ followUpId, description, dueDate, priority, assignedTo, completedAt, completionNote }`.
- `supervisorNotes`: array of `{ noteId, supervisorName, noteText, createdAt }`.
- `residentCode`, `residentSafehouseCode` for display without revealing the full name.
- `isEditable`: computed boolean (`true` if current user is the author and `created_at` is within 48 hours, or current user is admin).

**Side effects:**
- Insert a `view` row into `recording_audit_log`.

#### 2c. POST /api/admin/recordings

**Purpose:** Create a new process recording.

**Request body:**
```json
{
  "residentId": 42,
  "sessionDate": "2026-03-15",
  "socialWorker": "Elena Reyes",
  "sessionType": "Individual Counseling",
  "sessionCategory": "individual",
  "sessionDurationMinutes": 45,
  "emotionalStateStart": 4,
  "emotionalStateEnd": 6,
  "sessionNarrative": "<p>Resident discussed...</p>",
  "confidentialityFlag": false,
  "progressNoted": true,
  "concernsFlagged": false,
  "referralMade": false,
  "notesRestricted": null,
  "interventions": [
    { "interventionTypeId": 1 },
    { "interventionTypeId": 7 },
    { "interventionTypeId": 12, "otherDescription": "Breathing exercises" }
  ],
  "followUps": [
    {
      "description": "Schedule family counseling session",
      "dueDate": "2026-03-22",
      "priority": "High",
      "assignedTo": "Elena Reyes"
    }
  ]
}
```

**Validation rules:**
- `residentId` must reference an existing resident.
- `sessionDate` must not be in the future.
- `sessionNarrative` must be at least 50 characters (after HTML stripping).
- `emotionalStateStart` and `emotionalStateEnd` must be integers 1-10.
- `sessionCategory` must be "individual" or "group".
- `sessionType` must be one of the 7 predefined values.
- At least one intervention must be selected.
- Return `400 Bad Request` with structured validation errors.

**Side effects:**
- Set `created_at` and `updated_at` to `DateTime.UtcNow`.
- Insert `recording_interventions` rows.
- Insert `recording_follow_ups` rows.
- Insert a `create` audit log entry.
- Return `201 Created` with the new recording ID.

#### 2d. PUT /api/admin/recordings/:id

**Purpose:** Update an existing recording. Subject to the 48-hour edit window for non-admin users.

**Additional rules:**
- If the current user is not admin and `created_at` is older than 48 hours, return `403 Forbidden` with message "Recording is locked after 48 hours."
- `edit_reason` is required in the request body.
- Before overwriting, snapshot the current state as a JSON blob in the `recording_audit_log.details` field for version history (satisfies US-14 without a separate `recording_versions` table; simpler for the MVP).
- Update `updated_at`.
- Replace `recording_interventions` (delete existing, insert new).
- For `recording_follow_ups`: update existing (match by `follow_up_id`), insert new (no `follow_up_id`), delete removed ones.

#### 2e. DELETE /api/admin/recordings/:id

**Purpose:** Soft-delete a recording. Admin only.

**Request body:**
```json
{
  "reason": "Duplicate entry created in error"
}
```

**Rules:**
- Set `deleted_at = DateTime.UtcNow`. Do not physically remove the row.
- Insert a `delete` audit log entry with the reason.
- Return `204 No Content`.

#### 2f. Supporting endpoints

**GET /api/admin/recordings/emotional-trend?residentId=42**
Returns all emotional state data points for a resident (for the Recharts line chart). Always returns ALL sessions regardless of pagination.

```json
[
  { "sessionDate": "2026-01-10", "start": 3, "end": 5, "sessionType": "Individual Counseling" },
  { "sessionDate": "2026-01-17", "start": 5, "end": 6, "sessionType": "Group Therapy" }
]
```

**GET /api/admin/intervention-types**
Returns the list of active intervention types for populating the multi-select checklist.

**GET /api/admin/follow-ups?assignedTo=Elena+Reyes&overdueOnly=true**
Returns open follow-up actions for the follow-up dashboard (US-17). Joins to `process_recordings` and `residents` for context.

**POST /api/admin/recordings/:id/supervisor-notes**
Add a supervisor annotation. Sets `review_status = 'reviewed'` on the recording.

**POST /api/admin/recordings/:id/cosign**
Co-sign a recording. Sets `co_signed_by`, `co_signed_at`, and `review_status = 'cosigned'`.

**PATCH /api/admin/follow-ups/:id/complete**
Mark a follow-up as complete. Requires `completionNote` in the body.

---

### 3. Frontend Components

All new files go under `frontend/src/`. Follow the existing pattern: pages in `pages/`, shared components in `components/`, types in `types.ts`, API helpers in `api.ts`.

#### 3a. Types (`types.ts` additions)

```typescript
export interface ProcessRecording {
  recordingId: number;
  residentId: number;
  residentCode: string;
  sessionDate: string;
  sessionType: string;
  sessionCategory: 'individual' | 'group';
  socialWorker: string;
  emotionalStateStart: number;
  emotionalStateEnd: number;
  sessionNarrative: string;
  narrativePreview: string;
  confidentialityFlag: boolean;
  reviewStatus: 'pending' | 'reviewed' | 'cosigned';
  progressNoted: boolean;
  concernsFlagged: boolean;
  referralMade: boolean;
  notesRestricted: string | null;
  sessionDurationMinutes: number;
  interventions: RecordingIntervention[];
  followUps: RecordingFollowUp[];
  supervisorNotes: SupervisorNote[];
  isEditable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RecordingIntervention {
  interventionTypeId: number;
  name: string;
  otherDescription?: string;
}

export interface RecordingFollowUp {
  followUpId: number;
  description: string;
  dueDate: string | null;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  assignedTo: string;
  completedAt: string | null;
  completionNote: string | null;
}

export interface InterventionType {
  interventionTypeId: number;
  name: string;
}

export interface SupervisorNote {
  noteId: number;
  supervisorName: string;
  noteText: string;
  createdAt: string;
}

export interface EmotionalTrendPoint {
  sessionDate: string;
  start: number;
  end: number;
  sessionType: string;
}
```

#### 3b. API helpers (`api.ts` additions)

Extend `apiFetch` to support POST/PUT/DELETE by adding an `apiMutate` helper:

```typescript
export async function apiMutate<T>(
  path: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  body?: unknown
): Promise<T> {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}
```

#### 3c. Pages and components

**`pages/ProcessRecordingsPage.tsx`** -- Main page routed at `/admin/recordings`.
- Top section: filter bar (resident dropdown, session type, date range, social worker, review status).
- Below filters: `<EmotionalTrendChart />` (shown when a single resident is selected).
- Main content: `<RecordingsList />` with paginated recording cards.
- FAB or top-right button: "New Recording" linking to `/admin/recordings/new`.

**`pages/RecordingFormPage.tsx`** -- Create/edit form, routed at `/admin/recordings/new` and `/admin/recordings/:id/edit`.
- Uses `react-quill` or `tiptap` for the rich text narrative editor (ensure CSP compatibility).
- Left panel: the form fields (session date, resident search/select, session type dropdown, session category auto-derived, emotional state sliders with labeled anchors, narrative editor, intervention multi-select checklist, repeatable follow-up fields).
- Right panel (desktop only, collapsible): previous session summary for the selected resident (US-9).
- Auto-save: `useEffect` with a 30-second interval saving form state to `localStorage` under key `draft-recording-{residentId}`. Show "Draft saved at HH:MM" indicator.
- On mount: check for existing draft, prompt to resume or discard.
- On successful save: clear the draft from localStorage.
- Character count below the narrative editor.
- "Save" and "Save & Add Another" buttons.
- If editing: show "Edit Reason" required text field; pre-populate all fields from the existing recording.

**`pages/RecordingDetailPage.tsx`** -- Read-only view, routed at `/admin/recordings/:id`.
- Displays all recording fields in a clean read layout.
- Emotional state shown as colored badges (red for 1-3, yellow for 4-6, green for 7-10).
- Interventions as tag pills.
- Follow-ups as a checklist with "Mark Complete" buttons.
- Supervisor notes section at the bottom with "Add Supervisor Note" form (visible to supervisors/admin).
- "Co-sign" button (supervisors only, visible when `review_status !== 'cosigned'`).
- "Edit" button (visible per `isEditable` flag).
- "Delete" button (admin only) with confirmation modal requiring typed "DELETE".
- "Print" button triggering `window.print()` with a print-specific CSS stylesheet.
- Confidentiality flag shown as a shield icon with explanatory text.

**`components/RecordingsList.tsx`** -- Reusable list of recording summary cards.
- Props: recordings array, loading state, pagination controls.
- Each card shows: date, session type badge, social worker, emotional state start/end as small colored dots, narrative preview (first 150 chars, HTML-stripped), intervention count, open follow-up count, confidentiality shield icon if flagged, review status badge.
- Click navigates to `/admin/recordings/:id`.
- Skeleton loading state (no full-page spinner).

**`components/EmotionalTrendChart.tsx`** -- Recharts line chart (US-7).
- Props: `residentId` (fetches data from `/api/admin/recordings/emotional-trend`).
- Two `<Line>` series: "Start of Session" (blue) and "End of Session" (green).
- Y-axis: 1-10, labeled anchors (1=Severe Distress, 5=Neutral, 10=Thriving).
- X-axis: session dates formatted as "Jan 10", "Jan 17", etc.
- Custom `<Tooltip>` showing date, session type, and exact values.
- Uses the existing `ChartTooltip` component pattern from the codebase.
- Responsive container (`<ResponsiveContainer>`).

**`components/InterventionSelect.tsx`** -- Multi-select checklist for interventions.
- Fetches intervention types from `/api/admin/intervention-types`.
- Renders checkboxes with labels.
- When "Other" is checked, shows a free-text input.
- Props: `value` (selected interventions array), `onChange` callback.

**`components/FollowUpFields.tsx`** -- Repeatable follow-up action field group.
- Each row: description (text input), due date (date picker), priority (select: Low/Medium/High/Urgent), assigned to (text, defaults to current social worker).
- "Add Follow-up" button appends a new empty row.
- "Remove" button on each row (with confirmation if it has content).
- Props: `value` (follow-ups array), `onChange` callback.

**`components/EmotionalStateInput.tsx`** -- Slider/number input for the 1-10 emotional state scale.
- Desktop: styled range slider with labeled tick marks (1=Severe Distress, 5=Neutral, 10=Thriving).
- Color gradient from red (1) to yellow (5) to green (10).
- Current value displayed as a large number.
- Keyboard accessible (arrow keys change value).
- Props: `value`, `onChange`, `label` ("Start of Session" / "End of Session").

**`components/DeleteConfirmModal.tsx`** -- Reusable modal requiring typed confirmation.
- Props: `confirmText` (e.g., "DELETE"), `onConfirm`, `onCancel`, `title`, `message`.
- Input field that must match `confirmText` exactly before the confirm button enables.

#### 3d. CSS Modules

Each component gets a `.module.css` file following the existing `AdminLayout.module.css` pattern. Key considerations:
- Print stylesheet (`@media print`) on `RecordingDetailPage` hides nav, sidebar, buttons; shows only the recording content with organization header and watermark.
- Mobile breakpoint at 768px: single-column layout, previous-session panel becomes a slide-out drawer.
- Touch targets minimum 44px on mobile.

#### 3e. Routing additions (`App.tsx`)

Add child routes under the `/admin` route:

```tsx
<Route path="recordings" element={<ProcessRecordingsPage />} />
<Route path="recordings/new" element={<RecordingFormPage />} />
<Route path="recordings/:id" element={<RecordingDetailPage />} />
<Route path="recordings/:id/edit" element={<RecordingFormPage />} />
```

---

### 4. Privacy Considerations

These are counseling notes about minors who are trafficking survivors. The following safeguards are required:

#### 4a. Access controls

- **RBAC enforcement on every endpoint.** Every `/api/admin/recordings*` endpoint must verify the caller's role. Until a full auth system is wired up, add a middleware comment/TODO marking where role checks will go. When auth is implemented:
  - Admin: full CRUD on all recordings.
  - Staff: can create recordings; can view recordings for residents in their safehouse; can edit own recordings within 48 hours.
  - Donor role: return `403` on all recording endpoints.
- **Confidentiality flag restriction.** Recordings with `confidentiality_flag = true` are only returned to: the recording author, the resident's assigned social worker, supervisors in the same safehouse, and admin. The list and detail endpoints must filter these out for other users.
- **Resident code, not name.** All recording list views display `internal_code` (e.g., "SH2-0042"), never the resident's personal name. The form uses a searchable dropdown that shows the code.

#### 4b. Audit logging

- **Every view** of a recording detail (GET /:id) is logged with the viewer's identity and timestamp.
- **Every create, edit, and delete** is logged with the actor, timestamp, and for edits, the before-state snapshot.
- **Every print action** is logged (frontend sends a POST to `/api/admin/recordings/:id/audit` with `action: 'print'` when the print button is clicked, before triggering `window.print()`).
- Admin can view the audit log for any recording via the detail page.

#### 4c. UI safeguards

- **Session timeout.** Implement a 15-minute inactivity timer on the admin layout. After 15 minutes with no mouse/keyboard activity, show a blurred overlay with a re-authentication prompt. Auto-save the current form draft to localStorage before locking.
- **No image upload** in the rich text editor -- disable image insertion to prevent photos of residents in session notes.
- **No bulk export** -- no CSV/Excel download of recording narratives. Only the controlled print feature.
- **Print watermark.** The print stylesheet adds a diagonal watermark: "CONFIDENTIAL -- Printed by [user] on [date]".
- **localStorage draft security.** Clear all recording drafts from localStorage on logout. Do not store resident names in draft keys (use resident ID only).

#### 4d. Data transmission

- All API calls over HTTPS (enforced by `app.UseHttpsRedirection()` already in `Program.cs`).
- Narrative HTML is sanitized on the server before storage (strip `<script>`, `<iframe>`, event handlers) to prevent XSS.

---

### 5. Files to Create / Modify

#### New files (backend)

| File | Purpose |
|---|---|
| `backend/Models/InterventionType.cs` | EF Core model for the `intervention_types` reference table |
| `backend/Models/RecordingIntervention.cs` | EF Core model for the `recording_interventions` junction table |
| `backend/Models/RecordingFollowUp.cs` | EF Core model for the `recording_follow_ups` table |
| `backend/Models/RecordingAuditLog.cs` | EF Core model for the `recording_audit_log` table |
| `backend/Models/SupervisorNote.cs` | EF Core model for the `supervisor_notes` table |
| `backend/Migrations/{timestamp}_AddProcessRecordingStructuredData.cs` | EF Core migration for all schema changes |

#### Modified files (backend)

| File | Changes |
|---|---|
| `backend/Models/ProcessRecording.cs` | Add new properties: `SessionCategory`, `EmotionalStateStart` (int), `ConfidentialityFlag`, `CreatedAt`, `UpdatedAt`, `DeletedAt`, `ReviewStatus`, `CoSignedBy`, `CoSignedAt`, `EditReason`. Add navigation properties: `Interventions`, `FollowUps`, `SupervisorNotes`, `AuditLogs`. Remove or deprecate `EmotionalStateObserved` (text) and `InterventionsApplied` (text) and `FollowUpActions` (text). |
| `backend/Data/AppDbContext.cs` | Add `DbSet` properties for the 5 new tables. Add `OnModelCreating` configuration for new entities (table names, column names, relationships, indexes). |
| `backend/Program.cs` | Add all API endpoints listed in section 2. Add the new endpoint paths to the `/api/health` endpoint list. |

#### New files (frontend)

| File | Purpose |
|---|---|
| `frontend/src/pages/ProcessRecordingsPage.tsx` | Main recordings list page with filters |
| `frontend/src/pages/ProcessRecordingsPage.module.css` | Styles for the list page |
| `frontend/src/pages/RecordingFormPage.tsx` | Create/edit recording form |
| `frontend/src/pages/RecordingFormPage.module.css` | Styles for the form page |
| `frontend/src/pages/RecordingDetailPage.tsx` | Read-only recording detail view |
| `frontend/src/pages/RecordingDetailPage.module.css` | Styles for the detail page |
| `frontend/src/components/RecordingsList.tsx` | Reusable recording summary card list |
| `frontend/src/components/RecordingsList.module.css` | Styles for recording cards |
| `frontend/src/components/EmotionalTrendChart.tsx` | Recharts line chart for emotional state over time |
| `frontend/src/components/EmotionalTrendChart.module.css` | Styles for the chart container |
| `frontend/src/components/InterventionSelect.tsx` | Multi-select checklist for interventions |
| `frontend/src/components/InterventionSelect.module.css` | Styles |
| `frontend/src/components/FollowUpFields.tsx` | Repeatable follow-up action field group |
| `frontend/src/components/FollowUpFields.module.css` | Styles |
| `frontend/src/components/EmotionalStateInput.tsx` | Slider input for 1-10 emotional scale |
| `frontend/src/components/EmotionalStateInput.module.css` | Styles |
| `frontend/src/components/DeleteConfirmModal.tsx` | Modal requiring typed confirmation to delete |
| `frontend/src/components/DeleteConfirmModal.module.css` | Styles |

#### Modified files (frontend)

| File | Changes |
|---|---|
| `frontend/src/types.ts` | Add all interfaces from section 3a |
| `frontend/src/api.ts` | Add `apiMutate` helper function |
| `frontend/src/App.tsx` | Add 4 new routes under `/admin` for recordings pages |

#### NPM dependencies to add

| Package | Purpose |
|---|---|
| `react-quill` or `@tiptap/react` + `@tiptap/starter-kit` | Rich text editor for session narrative (US-2). Evaluate CSP compatibility -- tiptap is generally more CSP-friendly than react-quill. |
| `recharts` | Already likely available (used for impact page charts). Verify. |

---

### 6. Suggested Implementation Order

Work in vertical slices so the feature is demoable at each checkpoint.

**Phase 1: Schema + read-only list (Days 1-2)**
1. Create all new EF Core models (`InterventionType`, `RecordingIntervention`, `RecordingFollowUp`, `RecordingAuditLog`, `SupervisorNote`).
2. Update `ProcessRecording.cs` with new columns and navigation properties.
3. Update `AppDbContext.cs` with new DbSets and OnModelCreating configuration.
4. Generate and apply the EF Core migration.
5. Seed the `intervention_types` table.
6. Implement `GET /api/admin/recordings` (list) and `GET /api/admin/recordings/:id` (detail).
7. Implement `GET /api/admin/intervention-types`.
8. Add types to `frontend/src/types.ts` and `apiMutate` to `api.ts`.
9. Build `RecordingsList.tsx` and `ProcessRecordingsPage.tsx` (list view with filters, read-only).
10. Add routes to `App.tsx`.

**Checkpoint:** Navigate to `/admin/recordings`, see existing data in a filterable list.

**Phase 2: Create form (Days 3-4)**
1. Install rich text editor dependency (tiptap recommended).
2. Build `EmotionalStateInput.tsx`, `InterventionSelect.tsx`, `FollowUpFields.tsx`.
3. Build `RecordingFormPage.tsx` with all form fields, validation, and auto-save to localStorage.
4. Implement `POST /api/admin/recordings` with server-side validation.
5. Wire up form submission with error handling.
6. Build the previous-session side panel (US-9).

**Checkpoint:** Create a new recording with all fields; verify it appears in the list.

**Phase 3: Detail view + edit + delete (Days 5-6)**
1. Build `RecordingDetailPage.tsx` with full read layout.
2. Build `DeleteConfirmModal.tsx`.
3. Implement `PUT /api/admin/recordings/:id` with 48-hour edit window logic.
4. Implement `DELETE /api/admin/recordings/:id` (soft delete).
5. Implement `RecordingFormPage` edit mode (pre-populate from existing recording, require edit reason).
6. Implement audit logging on create, view, edit, delete.

**Checkpoint:** Full CRUD cycle works; edits blocked after 48 hours for non-admin; soft delete with typed confirmation.

**Phase 4: Emotional trend chart (Day 7)**
1. Implement `GET /api/admin/recordings/emotional-trend`.
2. Build `EmotionalTrendChart.tsx` with Recharts.
3. Integrate into `ProcessRecordingsPage` (visible when a resident is selected).

**Checkpoint:** Select a resident in the filter, see their emotional trajectory as a line chart above the session list.

**Phase 5: Follow-up dashboard + supervisor features (Days 8-9)**
1. Implement `GET /api/admin/follow-ups` and `PATCH /api/admin/follow-ups/:id/complete`.
2. Add follow-up completion UI to `RecordingDetailPage`.
3. Implement `POST /api/admin/recordings/:id/supervisor-notes` and `POST /api/admin/recordings/:id/cosign`.
4. Add supervisor notes section and co-sign button to `RecordingDetailPage`.
5. Add review status badge and filtering to the list view.

**Checkpoint:** Supervisor can annotate and co-sign recordings; follow-ups can be marked complete.

**Phase 6: Privacy hardening + polish (Day 10)**
1. Add print stylesheet with watermark and audit logging for print actions.
2. Implement inactivity timeout on the admin layout.
3. HTML sanitization for narrative content on the server.
4. Mobile responsive pass on all new components.
5. Keyboard accessibility pass (tab order, aria labels, focus indicators).
6. Final manual testing of all RBAC rules, validation, and edge cases.

**Checkpoint:** Feature complete, privacy-hardened, responsive, and accessible.
