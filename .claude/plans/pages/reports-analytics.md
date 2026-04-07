# Reports & Analytics Plan

## Purpose

The Reports & Analytics page provides aggregated insights and trends for decision-making across all areas of Beacon of Hope's operations. It surfaces donation trends, resident outcome metrics, safehouse performance comparisons, and reintegration success rates. The page also considers the Philippine Annual Accomplishment Report format used by DSWD, which categorizes services as Caring, Healing, and Teaching, and tracks beneficiary counts and program outcomes.

### IS413 Requirement
"Aggregated insights and trends for decision-making. Donation trends, resident outcome metrics, safehouse performance comparisons, reintegration success rates. Consider Philippine Annual Accomplishment Report format (services: caring/healing/teaching, beneficiary counts, program outcomes)."

### Database Tables
- `safehouse_monthly_metrics` (aggregated safehouse-level data)
- `public_impact_snapshots` (public-facing impact numbers)
- `donations` + `donation_allocations` (financial trends)
- `residents` (outcome metrics, status counts)
- `process_recordings` (session counts, emotional trends)
- `home_visitations` (visit counts, cooperation trends)
- `education_records` (education outcomes)
- `health_wellbeing_records` (health metrics)
- `safehouses` (safehouse metadata for comparisons)

### RBAC
- **Admin:** Full access to all reports, can export any data, can configure report parameters
- **Staff/Employee:** Access to reports for their assigned safehouse; aggregate cross-safehouse data (no individual resident data from other safehouses)
- **Donor:** Access to public impact snapshots only (anonymized, high-level)

---

## Personas

### 1. Director Reyes (Co-Founder / Admin)
- **Age:** 52
- **Location:** Portland, OR
- **Device:** MacBook Pro, Chrome; projects reports on large screen during board meetings
- **Role:** Admin
- **Background:** Presents quarterly reports to the board of directors and annual reports to DSWD. Needs data-driven insights to make strategic decisions about resource allocation, program effectiveness, and organizational growth. She is the primary consumer of analytics.
- **Goals:** Generate board-ready reports with charts and summaries. Compare safehouse performance side-by-side. Track reintegration success rates over time. Identify trends that require strategic intervention. Produce the DSWD Annual Accomplishment Report.
- **Frustrations:** Manually compiling data from multiple spreadsheets for every board meeting. No year-over-year comparison capability. Charts that look unprofessional when projected. Can't answer board questions in real-time because data isn't at her fingertips.
- **Key Question:** "Is our organization improving year-over-year, and can I prove it with data the board and DSWD will trust?"

### 2. Grace Flores (Donor Relations Coordinator)
- **Age:** 29
- **Location:** Manila, Philippines
- **Device:** Laptop (Windows, Edge)
- **Role:** Staff/Employee
- **Background:** Creates donor impact reports, fundraising summaries, and social media content about the org's outcomes. Needs anonymized aggregate data she can share externally without compromising resident privacy.
- **Goals:** Get donation trend data for fundraising reports. Access anonymized impact metrics (number helped, reintegration rates). Create compelling visual summaries for donor newsletters. Track fundraising goals vs. actuals.
- **Frustrations:** Has to ask Director Reyes for numbers every time she writes a newsletter. No self-service access to pre-built donor-facing reports. Impact numbers are inconsistent because different people calculate them differently.
- **Key Question:** "What are our latest impact numbers, and can I get them in a format I can drop into a donor newsletter?"

### 3. Elena Reyes (Social Worker)
- **Age:** 34
- **Location:** Cebu City, Philippines
- **Device:** Office desktop, Chrome
- **Role:** Staff/Employee
- **Background:** Wants to understand patterns in her caseload -- which interventions are most effective, how her residents' emotional states are trending, whether her documentation is keeping up with standards. Uses analytics to reflect on her clinical practice.
- **Goals:** See her safehouse's metrics compared to organizational benchmarks. Review emotional state trends for her caseload. Track her own documentation compliance (sessions recorded per resident per month). Understand education and health outcomes for her residents.
- **Frustrations:** No way to see if her caseload is on track without manually counting. Can't see how her safehouse compares to others. Reports are only available from the admin, not in real-time.
- **Key Question:** "How are my residents progressing, and how does my safehouse compare to the organizational benchmarks?"

### 4. Maria Chen (Recurring Donor)
- **Age:** 42
- **Location:** San Francisco, CA
- **Device:** iPhone 14 Pro, Safari
- **Role:** Donor
- **Background:** Wants to see the impact of her donations -- not individual resident data, but aggregate outcomes. Is Beacon of Hope actually helping girls heal and reintegrate? She looks at the impact section when deciding whether to increase her monthly giving.
- **Goals:** See high-level impact numbers: how many girls helped, reintegration success rate, educational achievements. Understand where donations are going. Feel confident her money is making a difference.
- **Frustrations:** Impact pages that use vague language ("many girls helped") instead of real numbers. No year-over-year trending to show improvement. Can't tell if the org is growing or stagnating.
- **Key Question:** "How many girls has Beacon of Hope helped this year, and are outcomes improving?"

---

## User Stories

### Dashboard Overview

**US-1: Analytics dashboard home**
As Director Reyes (admin), I want a dashboard landing page with key metrics at a glance, so that I can quickly assess organizational health.
- **Acceptance Criteria:**
  - KPI cards at the top:
    - Total active residents (across all safehouses)
    - Residents reintegrated this year
    - Reintegration success rate (% who remain stable 12 months post-placement)
    - Total donations this year (vs. last year, with % change)
    - Active supporters count
    - Average emotional state improvement (across all residents with 3+ sessions)
  - Each card shows current value, comparison to previous period, and trend arrow (up/down)
  - Cards link to detailed reports when clicked
  - Date range selector: this month, this quarter, this year, last year, custom
  - Dashboard loads within 2 seconds

**US-2: Safehouse summary cards**
As Director Reyes (admin), I want to see a summary card for each safehouse, so that I can compare performance at a glance.
- **Acceptance Criteria:**
  - Card per safehouse showing: name, location, current capacity (residents/max), admission count this period, reintegration count this period, average length of stay, top case category
  - Capacity shown as a progress bar with color coding (green < 80%, yellow 80-95%, red > 95%)
  - Cards sortable by any metric
  - Click a card to drill into that safehouse's detailed metrics
  - Comparison mode: side-by-side view of 2-3 safehouses

### Donation Analytics

**US-3: Donation trend chart**
As Director Reyes (admin), I want to see donation trends over time, so that I can assess fundraising momentum.
- **Acceptance Criteria:**
  - Line chart showing monthly donation totals over the selected time range
  - Toggle between: total amount, number of donations, average gift size
  - Overlay option: compare to same period last year
  - Filter by: donation type, campaign, safehouse allocation
  - Hover shows: month, total amount, donation count, top donor (admin only)
  - Chart exportable as PNG for presentations

**US-4: Donation by source breakdown**
As Grace (donor relations), I want to see donations broken down by source/method, so that I know which channels are most effective.
- **Acceptance Criteria:**
  - Pie or donut chart showing donations by payment method (Cash, Check, Bank Transfer, Online, Mobile)
  - Secondary chart: donations by type (One-Time, Recurring, Campaign, Pledge)
  - Table below with exact amounts and percentages
  - Time period filter
  - Comparison to previous period

**US-5: Campaign performance report**
As Director Reyes (admin), I want a campaign performance report, so that I can evaluate fundraising strategy.
- **Acceptance Criteria:**
  - Table showing all campaigns: name, goal, raised, % of goal, donor count, average gift, start/end dates
  - Progress bar for each campaign
  - Sort by any column
  - Active campaigns highlighted
  - Historical campaigns included (filterable by date range)
  - "Top Campaigns" chart showing top 5 by amount raised

**US-6: Allocation distribution report**
As Director Reyes (admin), I want to see how donations are allocated across safehouses and programs, so that I can ensure equitable distribution.
- **Acceptance Criteria:**
  - Stacked bar chart showing allocation by safehouse over time (monthly)
  - Pie chart showing allocation by program area (Education, Health, Operations, etc.)
  - Table: safehouse name, allocated amount, % of total, number of donations
  - Unallocated donations highlighted as a separate category
  - Comparison to safehouse budgets (if available)

### Resident Outcome Analytics

**US-7: Reintegration success metrics**
As Director Reyes (admin), I want to see reintegration success rates, so that I can assess program effectiveness.
- **Acceptance Criteria:**
  - KPI: reintegration success rate (residents who remain stable 6 and 12 months post-placement)
  - Trend chart showing success rate over time (quarterly)
  - Breakdown by: safehouse, placement type (family reunification, independent living, foster care), case category
  - Funnel chart: Active -> In Transition -> Reintegrated -> Successful (12 months)
  - Average time from admission to reintegration
  - Comparison across safehouses

**US-8: Emotional state trends (aggregated)**
As Elena (social worker), I want to see aggregated emotional state trends for my safehouse, so that I can assess the overall healing trajectory.
- **Acceptance Criteria:**
  - Line chart showing average emotional state (start and end of session) over time for all residents in a safehouse
  - Gap between start and end indicates session effectiveness (end > start = positive)
  - Filterable by safehouse (staff sees own), all safehouses (admin)
  - No individual resident names on the aggregate chart
  - Admin can drill down to individual resident trends (with proper access)
  - Benchmark line showing organizational average

**US-9: Case category distribution**
As Director Reyes (admin), I want to see the distribution of case categories across safehouses, so that I understand the types of cases we serve.
- **Acceptance Criteria:**
  - Stacked bar chart: safehouses on X-axis, case categories as stacked segments
  - Table: category, count, percentage, trend (increasing/decreasing)
  - Time period filter
  - Drill-down: click a category to see sub-category breakdown
  - Year-over-year comparison

**US-10: Length of stay analysis**
As Director Reyes (admin), I want to understand resident length of stay patterns, so that I can plan capacity and assess program timelines.
- **Acceptance Criteria:**
  - Histogram showing distribution of length of stay (in months)
  - Average, median, and range statistics
  - Breakdown by: safehouse, case category, admission year
  - Comparison: average stay for reintegrated vs. still active residents
  - Trend: is average length of stay changing over time?

### Safehouse Performance Comparison

**US-11: Safehouse comparison dashboard**
As Director Reyes (admin), I want to compare safehouses side by side, so that I can identify best practices and areas needing support.
- **Acceptance Criteria:**
  - Comparison matrix with safehouses as columns, metrics as rows:
    - Current occupancy (%)
    - New admissions this period
    - Reintegrations this period
    - Average length of stay
    - Average emotional state improvement
    - Process recordings per resident per month
    - Home visits completed vs. required
    - Donation allocation received
  - Color coding: green (above benchmark), yellow (at benchmark), red (below benchmark)
  - Benchmarks configurable by admin
  - Time period selector
  - Export comparison table as CSV or PDF

**US-12: Safehouse monthly metrics history**
As Director Reyes (admin), I want to see monthly metrics for a specific safehouse over time, so that I can track its trajectory.
- **Acceptance Criteria:**
  - Data sourced from `safehouse_monthly_metrics` table
  - Multi-line chart: occupancy, admissions, reintegrations, incident count over 12 months
  - Each metric can be toggled on/off
  - Data table below the chart with exact values
  - Month-over-month change indicators
  - Exportable

### Philippine DSWD Reporting

**US-13: Annual Accomplishment Report generator**
As Director Reyes (admin), I want to generate data for the DSWD Annual Accomplishment Report, so that compliance reporting is streamlined.
- **Acceptance Criteria:**
  - Report template organized by DSWD categories:
    - **Caring Services:** residents served, admissions, discharges, average occupancy
    - **Healing Services:** counseling sessions conducted, unique residents receiving therapy, intervention types used, emotional state improvement metrics
    - **Teaching Services:** education enrollment rates, grade level progression, skills training completion, vocational outcomes
  - Beneficiary counts: total served, new admissions, current residents, reintegrated, by age group, by gender, by case category
  - Program outcomes: reintegration success rate, education completion rate, health improvement metrics
  - Report covers a fiscal year (configurable start month)
  - Pre-populated from system data; admin can add narrative commentary
  - Export as PDF with DSWD-compatible formatting
  - Export as Excel for further editing

**US-14: Services breakdown (Caring/Healing/Teaching)**
As Director Reyes (admin), I want a visual breakdown of services provided across the three DSWD categories, so that I can communicate program balance.
- **Acceptance Criteria:**
  - Three-panel view: Caring, Healing, Teaching
  - Each panel shows:
    - Key metric count (e.g., Healing: 1,245 counseling sessions)
    - Trend compared to previous year
    - Sub-metrics relevant to category
  - Visual: treemap or proportional area chart showing service volume
  - Filterable by safehouse and time period

### Public Impact Reports

**US-15: Public impact snapshot**
As Maria (donor), I want to see a public-facing impact summary, so that I can see how the org is performing without accessing sensitive data.
- **Acceptance Criteria:**
  - Accessible from the donor portal and the public website
  - Data sourced from `public_impact_snapshots` table (pre-approved numbers)
  - Shows: total girls served (all-time and this year), safehouses operating, reintegration success rate (rounded), education enrollment rate, countries of supporter origin
  - No individual or identifiable data
  - Visually compelling: large numbers with icons
  - Admin controls which numbers are published (approval workflow)
  - Updated quarterly by admin

**US-16: Donor impact visualization**
As Maria (donor), I want to see a visualization of how donations translate to outcomes, so that I feel my giving makes a difference.
- **Acceptance Criteria:**
  - Infographic-style page: "$X provides Y months of care for one girl"
  - Shows: total donations this year, programs funded, girls helped
  - Impact equivalencies (configurable by admin): e.g., "$50 = 1 month of schooling"
  - Year-over-year comparison showing growth
  - Shareable (generate link or image for social media)

### Documentation Compliance

**US-17: Documentation compliance report**
As Director Reyes (admin), I want to see whether social workers are meeting documentation standards, so that clinical quality is maintained.
- **Acceptance Criteria:**
  - Report showing per social worker:
    - Process recordings per resident per month (target: 4)
    - Home visits completed vs. required cadence
    - Average time from session to documentation (target: <24 hours)
    - Percentage of recordings co-signed by supervisor
  - Traffic light indicators: green (meets target), yellow (within 80%), red (below 80%)
  - Filterable by safehouse, social worker, time period
  - Admin can set targets/benchmarks
  - Trend over time per worker

**US-18: Overdue documentation alerts**
As Director Reyes (admin), I want to see a list of overdue documentation items, so that I can follow up with staff.
- **Acceptance Criteria:**
  - Alert list showing:
    - Residents without a process recording in the last 14 days
    - Residents overdue for home visits (per cadence rules)
    - Process recordings pending supervisor review for 7+ days
    - Quick Logs not completed within 72 hours
  - Grouped by social worker for accountability
  - Count badge on the Reports nav item
  - Email summary option: weekly digest to admin

### Export & Sharing

**US-19: Export charts as images**
As Director Reyes (presenting to the board), I want to export charts as PNG images, so that I can include them in presentations.
- **Acceptance Criteria:**
  - "Export as PNG" button on every chart/visualization
  - Exported image includes chart title, legend, date range, and "Beacon of Hope" watermark
  - Resolution sufficient for projection (min 1200px wide)
  - Background set to white (not transparent) for slide compatibility

**US-20: Export reports as PDF**
As Director Reyes (admin), I want to export a full report page as a PDF, so that I can share it with board members who don't have system access.
- **Acceptance Criteria:**
  - "Export as PDF" button on report pages
  - PDF includes: report title, date range, all charts (rendered as images), data tables, and KPI cards
  - Beacon of Hope letterhead/branding
  - Page numbers and generation timestamp
  - Formatted for letter/A4 paper
  - Charts rendered at print resolution

**US-21: Export data tables as CSV**
As Director Reyes (admin), I want to export any data table to CSV, so that I can do further analysis in Excel.
- **Acceptance Criteria:**
  - "Export CSV" button on all data tables in reports
  - Exports current view (respects filters and date range)
  - Column headers match displayed headers
  - Numbers formatted without currency symbols (raw data)
  - Dates in ISO format (YYYY-MM-DD)
  - Filename includes report name and date range

### Filtering & Configuration

**US-22: Global date range filter**
As any report viewer, I want a global date range filter that applies to all charts on the page, so that I can analyze a specific time period consistently.
- **Acceptance Criteria:**
  - Date range picker at the top of the reports page
  - Presets: This Month, Last Month, This Quarter, Last Quarter, This Year, Last Year, Custom
  - Changing the date range reloads all charts and KPIs
  - Selected range displayed prominently ("Showing data for Jan 1 - Mar 31, 2026")
  - Range persisted in URL params for bookmarking

**US-23: Safehouse filter**
As Elena (staff), I want to filter reports to my safehouse, so that I see metrics relevant to my work.
- **Acceptance Criteria:**
  - Safehouse dropdown filter on report pages
  - Staff users default to their assigned safehouse; can select "All Safehouses" for aggregate view
  - Admin can select any safehouse or "All"
  - Filter applies to all charts and tables on the page
  - Some metrics (like comparison dashboard) override this to show all safehouses

**US-24: Custom report builder (admin)**
As Director Reyes (admin), I want to build a custom report by selecting metrics, so that I can create reports for specific board requests.
- **Acceptance Criteria:**
  - "Custom Report" builder page
  - Step 1: Select metrics from a catalog (donation totals, resident counts, reintegration rates, session counts, visit counts, etc.)
  - Step 2: Select dimensions (by safehouse, by time period, by case category, etc.)
  - Step 3: Select visualization type (table, bar chart, line chart, pie chart)
  - Step 4: Set date range and filters
  - Preview before saving
  - Save custom reports with a name; accessible from a "My Reports" section
  - Saved reports can be re-run with updated data

### Performance & Accessibility

**US-25: Fast report loading with progressive rendering**
As Director Reyes (loading reports during a board meeting), I want reports to render progressively, so that I see data quickly.
- **Acceptance Criteria:**
  - KPI cards load first (lightweight aggregates)
  - Charts load independently (parallel API calls)
  - Skeleton loading states for each chart
  - Total page load under 3 seconds for standard reports
  - Large custom reports may take longer; progress indicator shown
  - Data cached for 15 minutes (configurable); "Refresh Data" button for real-time
  - Charts use lazy loading (only render when scrolled into view)

---

## Definition of Done

- [ ] Dashboard landing page shows KPI cards with trend indicators and safehouse summary cards
- [ ] Donation analytics: trend chart (monthly), source breakdown, campaign performance, allocation distribution
- [ ] Resident outcome analytics: reintegration success rate with funnel, emotional state trends (aggregated), case category distribution, length of stay analysis
- [ ] Safehouse comparison dashboard with configurable benchmarks and color-coded performance matrix
- [ ] Safehouse monthly metrics history with multi-line chart and data table
- [ ] Philippine DSWD Annual Accomplishment Report generator with Caring/Healing/Teaching categories, beneficiary counts, and program outcomes; exportable as PDF and Excel
- [ ] Public impact snapshot with admin-approved numbers, accessible to donors and public
- [ ] Donor impact visualization with cost-per-outcome equivalencies
- [ ] Documentation compliance report showing per-worker documentation rates against targets
- [ ] Overdue documentation alerts with counts and grouping by social worker
- [ ] Export capabilities: charts as PNG, full reports as PDF, data tables as CSV
- [ ] Global date range filter with presets; safehouse filter defaulting to user's assignment
- [ ] Custom report builder (admin) with metric catalog, dimension selection, and saved reports
- [ ] Progressive rendering: KPI cards first, charts lazy-loaded, total load under 3 seconds
- [ ] RBAC enforced: admin sees all, staff sees own safehouse + aggregates, donor sees public impact only
- [ ] All 25 user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox; charts render correctly on projected displays

---

## Critique & Improvements (added 2026-04-06)

### What the plan does well

The plan is thorough. It covers every element named in the IS 413 requirement (line 106): donation trends over time, resident outcome metrics (education progress, health improvements), safehouse performance comparisons, reintegration success rates, and the Philippine Annual Accomplishment Report format with Caring/Healing/Teaching categories, beneficiary counts, and program outcomes. The personas are well-chosen, export capabilities (PNG, PDF, CSV) are all addressed, and the RBAC model is clear. The custom report builder (US-24) and documentation compliance reporting (US-17/18) add real depth beyond the baseline requirement.

### Issues and gaps

#### 1. Overlap with the public Impact page is acknowledged but not cleanly separated

US-15 (Public impact snapshot) and US-16 (Donor impact visualization) replicate functionality already planned in detail on the public Impact page (`03-impact-page.md`). That page has 20 user stories covering the same donor-facing data: donation trends, outcome charts, safehouse operations, and shareable visuals. Having both pages render the same `public_impact_snapshots` data creates two code paths for the same view.

**Recommendation:** Remove US-15 and US-16 from this plan entirely. The Reports & Analytics page is admin/staff-only. Donors who need impact data should be routed to the public Impact page, which already handles that audience. If the admin needs to *preview or approve* what donors see, add a single "Preview Public Impact Page" link or an "Approve Snapshot" workflow (which US-15 hints at with "Admin controls which numbers are published") -- but that is an admin action on the Impact page data, not a separate report. This sharpens the Reports page's identity as the deep operational analytics layer.

#### 2. ML pipeline outputs are not surfaced anywhere

The IS 455 requirement explicitly states that deployed ML models should be "integrated with the web application in a meaningful way" and should "provide value to end users." The Reports & Analytics page is the natural home for ML-derived insights, yet the plan has zero mention of ML.

**Recommendation:** Add a new section (or user stories) for ML pipeline outputs. Possible integrations:
- **Predictive risk scores**: Show a distribution of current residents' ML-predicted risk levels, surfacing which residents the model flags as high-risk for unsuccessful reintegration. This could appear on the dashboard or as a drillable metric on US-7.
- **Donation forecasting**: Overlay a predicted donation trend line on the US-3 chart, using a time-series model trained on historical donation data. Helps Director Reyes answer "are we on track?" with a forward-looking estimate.
- **Resident outcome predictions**: Surface the ML model's predicted reintegration success probability per resident (admin only), or show aggregate model confidence across the caseload.
- **Anomaly detection**: Flag unusual patterns (e.g., a safehouse with a sudden spike in incidents, a drop in session counts) automatically using an ML anomaly detection pipeline.
- **Churn/lapse prediction for donors**: Show which donors the model predicts are likely to lapse, integrated into the donation analytics section or as its own alert list.

At minimum, the plan should include a placeholder user story:

> **US-26: ML model output dashboard**
> As Director Reyes (admin), I want to see outputs from deployed ML models (risk predictions, donation forecasts, anomaly flags), so that I can make data-informed proactive decisions.
> - Acceptance Criteria:
>   - At least one ML pipeline output is displayed on the Reports page
>   - Output includes model confidence/probability where applicable
>   - Admin can see when the model was last retrained and its evaluation metrics
>   - Predictions are clearly labeled as model-generated, not observed data

#### 3. Education progress and health improvement metrics are mentioned but underspecified

The requirement explicitly calls out "education progress" and "health improvements" as resident outcome metrics. The plan references `education_records` and `health_wellbeing_records` in the Database Tables section and touches on emotional state trends (US-8), but there are no dedicated user stories for:
- Average education progress over time (attendance rates, grade-level progression, completion rates)
- Average health/wellbeing scores over time (general health, nutrition, sleep, energy)

US-8 covers emotional state from `process_recordings`, which is one dimension of healing, but is not the same as the structured health data in `health_wellbeing_records` or the education data in `education_records`.

**Recommendation:** Add two user stories:

> **US-27: Education progress trends**
> As Director Reyes (admin), I want to see aggregated education progress metrics over time, so that I can assess how well our Teaching services are performing.
> - Acceptance Criteria:
>   - Line chart showing average education progress %, attendance rate, and completion rate over time
>   - Filterable by safehouse, education type (formal, non-formal, skills training)
>   - Breakdown by grade level
>   - Year-over-year comparison

> **US-28: Health and wellbeing trends**
> As Director Reyes (admin), I want to see aggregated health and wellbeing scores over time, so that I can assess how well our Caring/Healing services are improving residents' physical health.
> - Acceptance Criteria:
>   - Line chart showing average general health score, nutrition score, sleep quality, and energy level over time
>   - Filterable by safehouse
>   - Comparison: intake health scores vs. current scores (before/after)
>   - Trend arrows indicating improvement or decline

These two stories would directly feed into the DSWD Annual Accomplishment Report (US-13) under Teaching and Caring/Healing, creating a clean data pipeline from operational tracking to compliance reporting.

#### 4. The DSWD Annual Accomplishment Report section could be more specific about format

US-13 is good but somewhat generic. Philippine DSWD reports follow a specific structure that typically includes: (a) organizational profile, (b) services and programs by category, (c) statistical tables of beneficiaries by age/gender/case type, (d) accomplishments vs. targets, (e) problems encountered, and (f) recommendations. The plan covers (b) and (c) but does not mention targets vs. actuals, which is central to DSWD compliance reporting.

**Recommendation:** Add to US-13 acceptance criteria:
- Targets vs. actuals comparison for each service category (admin sets annual targets; report shows % achieved)
- Beneficiary demographics table: age brackets (0-5, 6-12, 13-17, 18+), gender, case category, region of origin
- Problems/challenges section where admin can enter narrative text
- Recommendations section where admin can enter narrative text

#### 5. Export capabilities are present but lack a "board packet" workflow

US-19/20/21 cover individual exports (PNG, PDF, CSV), but Director Reyes's primary frustration is "manually compiling data from multiple spreadsheets for every board meeting." The plan does not offer a way to bundle multiple reports into a single board-ready document.

**Recommendation:** Add:

> **US-29: Board report packet generator**
> As Director Reyes (admin), I want to generate a single PDF containing multiple report sections (executive summary, donation trends, resident outcomes, safehouse comparisons), so that I can distribute a complete board packet without manual assembly.
> - Acceptance Criteria:
>   - Admin selects which report sections to include
>   - Generates a single PDF with table of contents, page numbers, and Beacon of Hope branding
>   - Includes the date range and generation timestamp
>   - Can be saved as a template for recurring quarterly generation

#### 6. No scheduled/automated report delivery

Director Reyes and Grace both describe frustrations about having to manually pull data. The plan has no mention of scheduled report generation or email delivery.

**Recommendation:** Consider adding (lower priority, could be a stretch goal):

> **US-30: Scheduled report delivery (stretch)**
> As Director Reyes (admin), I want to schedule reports to be emailed to me and board members on a recurring basis, so that I don't have to manually generate them each quarter.
> - Acceptance Criteria:
>   - Admin can schedule any saved report or board packet for recurring delivery (monthly, quarterly, annually)
>   - Report delivered as PDF attachment via email
>   - Email includes a summary of key metrics in the body

#### 7. Year-over-year comparisons are mentioned repeatedly but not standardized

Multiple user stories mention year-over-year comparisons (US-3, US-5, US-9, US-14), but the mechanism is different each time. There is no consistent pattern for how historical comparison works across the page.

**Recommendation:** Standardize the comparison pattern in the Filtering & Configuration section. The global date range filter (US-22) should have a "Compare to" toggle that overlays the previous period on all charts simultaneously, rather than each chart implementing its own comparison logic independently.

### Summary of recommended changes

| Priority | Action | Rationale |
|----------|--------|-----------|
| High | Remove US-15 and US-16 (or reduce to "preview/approve" admin action) | Eliminates duplication with public Impact page |
| High | Add ML pipeline output user story (US-26) | IS 455 requirement for deployed model integration |
| High | Add education progress (US-27) and health trends (US-28) stories | Explicitly required by IS 413, currently missing dedicated stories |
| Medium | Enhance US-13 with targets vs. actuals and demographic tables | Better alignment with actual DSWD report format |
| Medium | Add board packet generator (US-29) | Directly addresses Director Reyes's core frustration |
| Low | Add scheduled report delivery (US-30) as stretch goal | Nice-to-have automation |
| Low | Standardize year-over-year comparison pattern across all charts | Reduces implementation inconsistency |

---

## Requirements Coverage Matrix

This matrix maps every explicit IS 413 and IS 455 requirement to the user stories (or gaps) in this plan.

### IS 413 Requirements (from line 106 of intex_requirements.md)

| Requirement | Covered By | Status |
|-------------|-----------|--------|
| Donation trends over time | US-3 (trend chart), US-4 (source breakdown), US-5 (campaign performance), US-6 (allocation distribution) | Fully covered |
| Resident outcome metrics -- education progress | US-27 (proposed: education progress trends) | Gap -- needs dedicated story added |
| Resident outcome metrics -- health improvements | US-28 (proposed: health and wellbeing trends) | Gap -- needs dedicated story added |
| Safehouse performance comparisons | US-2 (summary cards), US-11 (comparison dashboard), US-12 (monthly metrics history) | Fully covered |
| Reintegration success rates | US-7 (reintegration success metrics with funnel, breakdown, and trend) | Fully covered |
| Annual Accomplishment Report format (Philippine DSWD) | US-13 (report generator), US-14 (services breakdown) | Covered, but US-13 should be enhanced with targets-vs-actuals and demographic tables |
| Services: caring/healing/teaching | US-14 (three-panel view by DSWD category) | Covered |
| Beneficiary counts | US-13 (beneficiary counts by age, gender, case category) | Covered |
| Program outcomes | US-13 (reintegration success rate, education completion rate, health metrics) | Covered |

### IS 455 Requirements (from lines 183-249 of intex_requirements.md, rubric.md)

| Requirement | Covered By | Status |
|-------------|-----------|--------|
| Deployed ML models integrated into web app | US-26 (proposed: ML model output dashboard) | Gap -- no ML outputs in current plan |
| Models provide value to end users | US-26 + specific integration points below | Gap -- needs concrete integration points |
| Model outputs on a dashboard | Reports page is the natural home | Gap -- plan must define where each pipeline surfaces |
| Interactive interface for predictions/insights | Could live on Reports or on individual admin pages | Gap -- not yet specified |

### Overlap Resolution: Reports vs. Public Impact Page

| Item | Reports Page | Impact Page | Resolution |
|------|-------------|-------------|------------|
| US-15 (public impact snapshot) | Currently here | Duplicated in Impact page plan | Remove from Reports; donor-facing data belongs on Impact page |
| US-16 (donor impact visualization) | Currently here | Duplicated in Impact page plan | Remove from Reports; keep on Impact page |
| Admin approval of public numbers | US-15 hints at admin approval workflow | Not addressed | Add a lightweight "Approve Public Snapshot" admin action to Reports, linking to Impact page data |

---

## ML Integration Points

The IS 455 requirement states that deployed models must be "integrated with the web application in a meaningful way" and "provide value to end users." The Reports & Analytics page is the primary surface for ML outputs because it is where decision-makers (Director Reyes, staff) already go for data-driven insights.

Below maps each ML pipeline identified in the project audit to a concrete integration point on the Reports page.

### Pipeline 1: Donor Retention / Churn Prediction (Predictive)

- **Business question:** Which donors are at risk of lapsing?
- **Where it surfaces:** Donation Analytics section, as a new sub-tab or widget alongside US-3/US-4.
- **What it shows:**
  - List of donors flagged as high churn risk (top 20), with predicted probability and key contributing factors (e.g., declining gift frequency, no engagement in 6+ months).
  - Aggregate churn risk distribution chart (low / medium / high buckets).
  - Recommended retention actions (e.g., "send personal thank-you to donors in the high-risk group").
- **User story link:** Could extend US-3 with a "Predicted Trends" overlay, or become part of US-26.
- **RBAC:** Admin only.

### Pipeline 2: Donor Upsell Opportunity (Predictive)

- **Business question:** Which donors are likely to increase their giving if approached?
- **Where it surfaces:** Donation Analytics section, as a companion widget to Pipeline 1.
- **What it shows:**
  - Ranked list of donors with highest predicted upsell probability.
  - Key features driving the prediction (e.g., recent increase in gift size, high engagement score).
  - Suggested ask amount based on model output.
- **User story link:** Could be a tab within US-26 or a card on the dashboard (US-1).
- **RBAC:** Admin only.

### Pipeline 3: Resident Reintegration Readiness (Predictive)

- **Business question:** Which residents are most likely to succeed in reintegration, and when?
- **Where it surfaces:** Resident Outcome Analytics section, alongside US-7 (reintegration success metrics).
- **What it shows:**
  - Per-resident readiness score (probability of successful 12-month reintegration), displayed as a distribution chart across all active residents.
  - Admin drill-down: individual resident scores with top contributing factors (e.g., education progress, emotional state improvement, family cooperation level).
  - Trend: average readiness score for the caseload over time.
  - Clear label: "Model-generated prediction -- not a clinical assessment."
- **User story link:** Directly extends US-7; could also surface as a KPI card on US-1.
- **RBAC:** Admin sees individual scores; staff sees aggregate for their safehouse.

### Pipeline 4: Intervention Effectiveness (Explanatory)

- **Business question:** Which interventions (counseling types, education programs, health services) have the strongest causal relationship with positive outcomes?
- **Where it surfaces:** A new "Intervention Insights" panel within the Resident Outcome Analytics section.
- **What it shows:**
  - Ranked list of interventions by estimated effect size on reintegration success / emotional improvement.
  - Coefficient table or feature importance chart from the explanatory model.
  - Confidence intervals to communicate uncertainty.
  - Business recommendation: "Residents receiving [intervention X] show Y% higher reintegration success, controlling for case category and length of stay."
- **User story link:** Feeds into US-13 (DSWD report) under program outcomes; could also inform US-8 (emotional trends).
- **RBAC:** Admin and staff.

### Pipeline 5: Social Media to Donation Conversion (Explanatory)

- **Business question:** Which social media activities drive the most donation conversions?
- **Where it surfaces:** Donation Analytics section, as a "Channel Effectiveness" panel.
- **What it shows:**
  - Feature importance chart showing which social media metrics (post type, platform, engagement rate, timing) most strongly predict donation activity.
  - Actionable insight: "Posts about [topic X] on [platform Y] are associated with Z% higher donation conversion."
  - Trend overlay on US-3 showing social media campaign periods mapped against donation spikes.
- **User story link:** Extends US-5 (campaign performance) with social media attribution.
- **RBAC:** Admin only.

### Pipeline 6: Social Media Engagement Drivers (Explanatory)

- **Business question:** What factors drive higher engagement on social media posts?
- **Where it surfaces:** Could surface on Reports page as a "Social Media Insights" panel, or on a separate Social Media management page if one exists.
- **What it shows:**
  - Feature importance: post type, content category, posting time, platform, hashtags vs. engagement metrics.
  - Recommendations: "Posts published on [day] at [time] about [topic] receive X% more engagement."
- **User story link:** Less natural fit for Reports -- could be a lightweight card on the dashboard (US-1) or a standalone section.
- **RBAC:** Admin and staff.

### Shared ML Display Requirements

All ML integration points should satisfy:
- Model outputs clearly labeled as "ML-generated" to distinguish from observed data.
- Last-retrained date and key evaluation metric (e.g., AUC, RMSE) displayed in a tooltip or info panel.
- Admin can view model metadata: features used, training data date range, evaluation results.
- Predictions refresh when the underlying model is retrained (not real-time per-request inference unless latency allows).

---

## Above and Beyond Ideas

These are features that go beyond the baseline IS 413 and IS 455 requirements. They would differentiate the project and demonstrate depth.

### 1. Natural Language Report Summaries

Use an LLM API call (or a simple template engine) to generate a plain-English executive summary paragraph at the top of each report section. For example: "In Q1 2026, total donations increased 12% year-over-year, driven primarily by recurring gifts. Safehouse Cebu admitted 8 new residents, the highest of any safehouse. Reintegration success rate held steady at 78%." This directly addresses Director Reyes's need to present data to a non-technical board.

### 2. Anomaly Detection Alerts

Build a lightweight anomaly detection pipeline (could be as simple as z-score thresholds on rolling averages, or a proper isolation forest model) that flags unusual data points across the system: sudden drop in session documentation, spike in admissions at one safehouse, donation amount that is 10x the average. Surface these as alert cards at the top of the Reports dashboard. This would count as an additional ML pipeline for IS 455.

### 3. Predictive Donation Forecast Overlay

On the donation trend chart (US-3), overlay a forward-looking forecast line (e.g., 3-month projection) generated by a time-series model (ARIMA, Prophet, or a simple exponential smoothing). Show confidence intervals as a shaded band. This lets Director Reyes answer "are we on track for our annual fundraising goal?" with a data-driven projection rather than gut feel.

### 4. "What-If" Scenario Tool

An interactive tool where the admin can adjust inputs (e.g., "What if we increase counseling sessions per resident from 4/month to 6/month?") and see the ML model's predicted impact on reintegration success rate. This demonstrates genuine integration of the explanatory model (Pipeline 4) into decision-making, which is exactly what the IS 455 rubric rewards under "Deployment & Integration."

### 5. Board Packet Auto-Generation with Narrative

Combine US-29 (board packet generator) with the natural language summary idea: auto-generate a full board report PDF with charts, tables, and AI-written narrative sections. The admin reviews and edits before finalizing. This addresses Director Reyes's core frustration more completely than any competitor is likely to attempt.

### 6. Comparative Benchmarking Against External Data

If publicly available data on Philippine DSWD residential care outcomes exists, pull in external benchmarks so Director Reyes can compare Beacon of Hope's performance against national averages. Even a static dataset of national reintegration rates would add significant value to the safehouse comparison dashboard (US-11).

### 7. Real-Time Collaboration on Reports

Allow multiple admins/staff to view the same report simultaneously with shared filters (like a lightweight Google Docs experience for analytics). This is technically ambitious but would be a strong differentiator for the board meeting use case.

### 8. Exportable ML Model Cards

For each deployed ML pipeline, generate a "Model Card" (a standardized document describing the model's purpose, training data, evaluation metrics, limitations, and fairness considerations). Make these downloadable from the Reports page. This demonstrates ML maturity and aligns with responsible AI practices -- a strong signal for the IS 455 rubric's evaluation criteria.

---

## Implementation Plan

This plan translates the user stories and ML integration points above into concrete backend endpoints, frontend components, chart specifications, and file-level implementation details. The tech stack is .NET 10 minimal APIs (`Program.cs`), React + Vite + TypeScript, Recharts, EF Core + PostgreSQL (Supabase).

**Critical constraint from existing codebase:** DbContext is NOT thread-safe with the Supabase pooler. All queries within a single endpoint must be awaited sequentially -- never use `Task.WhenAll()` with multiple DB queries on the same `AppDbContext` instance. See the warning at line 79 of `Program.cs`.

---

### 1. Backend API Endpoints

All endpoints live in `Program.cs` as minimal API `MapGet`/`MapPost` calls, following the existing pattern. Each endpoint under `/api/reports/` requires admin or staff role (enforced by auth middleware added later). Endpoints under `/api/reports/public/` are available to donors.

#### 1.1 Donation Trend Endpoints

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/donations/monthly` | GET | `startDate`, `endDate`, `safehouseId?`, `campaignName?` | `{ year, month, total, count, avgGiftSize }[]` | US-3 |
| `/api/reports/donations/by-source` | GET | `startDate`, `endDate` | `{ paymentMethod, total, count, pct }[]` | US-4 |
| `/api/reports/donations/by-type` | GET | `startDate`, `endDate` | `{ donationType, total, count, pct }[]` | US-4 |
| `/api/reports/donations/campaigns` | GET | `startDate?`, `endDate?`, `activeOnly?` | `{ campaignName, goal, raised, pctOfGoal, donorCount, avgGift, startDate, endDate, isActive }[]` | US-5 |
| `/api/reports/donations/allocations` | GET | `startDate`, `endDate` | `{ safehouseId, safehouseCode, programArea, amount, pct }[]` | US-6 |
| `/api/reports/donations/yoy` | GET | `year` | `{ month, currentYear, previousYear }[]` for overlay comparison | US-3 |

**Implementation notes:**
- `donations/monthly` groups `Donations` by `Year`/`Month` of `DonationDate`, sums `Amount`, counts rows, and divides for `avgGiftSize`. Filters on `DonationDate` range.
- `donations/by-source` groups by `PaymentMethod` (enum on `Donation` model), calculates percentage of total.
- `donations/campaigns` pulls campaign metadata. If a campaign goal column does not exist in the `Donation` model, add a `Campaigns` table or derive from `CampaignName` grouping.
- `donations/yoy` runs two grouped queries (current year and previous year) and joins by month.

#### 1.2 Resident Outcome Endpoints

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/residents/reintegration` | GET | `startDate`, `endDate`, `safehouseId?` | `{ period, total, reintegrated, successRate, avgDaysToReintegration, byType: { placementType, count, rate }[] }` | US-7 |
| `/api/reports/residents/reintegration-funnel` | GET | `safehouseId?` | `{ stage: "Active" | "In Transition" | "Reintegrated" | "Successful 12mo", count }[]` | US-7 |
| `/api/reports/residents/emotional-trends` | GET | `startDate`, `endDate`, `safehouseId?` | `{ year, month, avgStartEmotion, avgEndEmotion, sessionCount }[]` | US-8 |
| `/api/reports/residents/case-categories` | GET | `startDate`, `endDate`, `safehouseId?` | `{ safehouseCode, category, count, pct }[]` | US-9 |
| `/api/reports/residents/length-of-stay` | GET | `safehouseId?`, `caseCategory?` | `{ bucket: "0-3mo" | "3-6mo" | "6-12mo" | "12-24mo" | "24mo+", count, avgDays, medianDays }[]` | US-10 |
| `/api/reports/residents/education-progress` | GET | `startDate`, `endDate`, `safehouseId?`, `educationType?` | `{ year, month, avgProgress, attendanceRate, completionRate }[]` | US-27 |
| `/api/reports/residents/health-trends` | GET | `startDate`, `endDate`, `safehouseId?` | `{ year, month, avgHealth, avgNutrition, avgSleep, avgEnergy }[]` | US-28 |

**Implementation notes:**
- `reintegration` queries `Residents` where `ReintegrationStatus` changes. The "successful 12 months" metric requires checking residents reintegrated 12+ months ago whose status has not reverted.
- `emotional-trends` queries `ProcessRecordings`, grouping by month and averaging `EmotionalStateStart` and `EmotionalStateEnd`.
- `education-progress` queries `EducationRecords`, grouping by month and averaging `ProgressPercent`, `AttendanceRate`, etc.
- `health-trends` extends the existing `/api/impact/health-trends` with additional fields: `NutritionScore`, `SleepQuality`, `EnergyLevel` from `HealthWellbeingRecords`.
- `length-of-stay` computes `DATEDIFF` between `DateOfAdmission` and `DateOfDischarge` (or current date for active residents), then buckets into histogram ranges.

#### 1.3 Safehouse Comparison Endpoints

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/safehouses/comparison` | GET | `startDate`, `endDate` | `{ safehouseId, code, name, occupancyPct, newAdmissions, reintegrations, avgLengthOfStay, avgEmotionalImprovement, recordingsPerResident, homeVisitsCompleted, homeVisitsRequired, donationAllocation }[]` | US-11 |
| `/api/reports/safehouses/monthly-metrics` | GET | `safehouseId`, `months?` (default 12) | `{ year, month, occupancy, admissions, reintegrations, incidentCount, sessionCount }[]` | US-12 |

**Implementation notes:**
- `comparison` aggregates across multiple tables sequentially (Residents, ProcessRecordings, HomeVisitations, DonationAllocations) per safehouse. Due to the DbContext constraint, each aggregate query runs sequentially.
- `monthly-metrics` pulls directly from `SafehouseMonthlyMetrics` table if pre-aggregated, or computes from source tables.

#### 1.4 DSWD Report Data Endpoints

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/dswd/services-summary` | GET | `fiscalYear`, `safehouseId?` | `{ caring: { residentsServed, admissions, discharges, avgOccupancy }, healing: { counselingSessions, uniqueResidents, interventionTypes, emotionalImprovement }, teaching: { enrollmentRate, gradeProgression, completionRate, vocationalOutcomes } }` | US-13, US-14 |
| `/api/reports/dswd/beneficiary-demographics` | GET | `fiscalYear`, `safehouseId?` | `{ byAge: { bracket, count }[], byGender: { gender, count }[], byCaseCategory: { category, count }[], byRegion: { region, count }[] }` | US-13 |
| `/api/reports/dswd/targets-vs-actuals` | GET | `fiscalYear` | `{ category, metric, target, actual, pctAchieved }[]` | US-13 (enhanced) |

**Implementation notes:**
- `services-summary` maps database tables to DSWD categories:
  - **Caring:** `Residents` (admissions, discharges, occupancy counts)
  - **Healing:** `ProcessRecordings` (session counts, emotional deltas), `InterventionPlans` (intervention types)
  - **Teaching:** `EducationRecords` (enrollment, progress, completion)
- `beneficiary-demographics` queries `Residents` and groups by computed age bracket (from `DateOfBirth`), `Gender`, `CaseCategory`, and `RegionOfOrigin`.
- `targets-vs-actuals` requires a new `DswdTargets` table (or a JSON config) where admin sets annual targets per category. Compare against computed actuals.

#### 1.5 Documentation Compliance Endpoints

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/compliance/documentation` | GET | `startDate`, `endDate`, `safehouseId?` | `{ socialWorker, recordingsPerResidentPerMonth, homeVisitsCompleted, homeVisitsRequired, avgDocumentationLagHours, pctCosigned, meetsTarget }[]` | US-17 |
| `/api/reports/compliance/overdue` | GET | `safehouseId?` | `{ overdueRecordings: { residentCode, daysSinceLastRecording, socialWorker }[], overdueVisits: { residentCode, visitCadence, daysSinceLastVisit, socialWorker }[], pendingReview: { recordingId, daysPending, socialWorker }[] }` | US-18 |

#### 1.6 ML Model Endpoints

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/ml/reintegration-readiness` | GET | `safehouseId?` | `{ residents: { residentCode, probability, riskBucket, topFactors: string[] }[], distribution: { bucket, count }[], avgReadiness, modelMetadata }` | US-26, Pipeline 3 |
| `/api/reports/ml/donor-churn` | GET | `limit?` | `{ donors: { supporterId, displayName, churnProbability, topFactors: string[] }[], distribution: { bucket, count }[], modelMetadata }` | US-26, Pipeline 1 |
| `/api/reports/ml/intervention-effectiveness` | GET | -- | `{ interventions: { name, effectSize, confidence, pValue }[], modelMetadata }` | Pipeline 4 |
| `/api/reports/ml/model-metadata/{modelName}` | GET | -- | `{ modelType, trainingDate, features, metrics: { roc_auc, f1, accuracy }, trainRows, testRows }` | Shared ML requirements |
| `/api/reports/ml/donation-forecast` | GET | `months?` (default 3) | `{ month, predicted, lowerBound, upperBound }[]` | Above-and-beyond #3 |

**Implementation approach for ML endpoints:**

The ML models are already trained and serialized as `.pkl`/`.sav` files in `/models/`. Two approaches:

**Option A -- Pre-computed results (recommended for MVP):**
1. Run a Python batch script (`ml-scripts/score_all.py`) on a schedule (daily or on-demand via admin trigger) that loads each `.pkl` model, scores the current data from PostgreSQL, and writes results to new database tables: `ml_reintegration_scores`, `ml_donor_churn_scores`, `ml_intervention_effects`.
2. The .NET endpoints simply query these results tables.
3. Model metadata is read from the JSON files already in `/models/` (e.g., `reintegration-readiness-metadata.json`, `reintegration-readiness-metrics.json`).

**Option B -- Real-time inference via Python microservice:**
1. Create a lightweight FastAPI service (`ml-service/`) that loads `.pkl` models and exposes prediction endpoints.
2. The .NET backend proxies requests to the Python service.
3. More complex to deploy but enables real-time scoring.

**Recommendation:** Start with Option A. The models are small (60 training rows for reintegration-readiness), scoring is fast, and pre-computed results avoid deployment complexity. Add a `/api/admin/ml/refresh` POST endpoint that triggers re-scoring. Model metadata endpoints read directly from the JSON files on disk.

#### 1.7 Dashboard KPI Endpoint

| Endpoint | Method | Query Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/dashboard/kpis` | GET | `startDate`, `endDate` | `{ activeResidents, reintegratedThisYear, reintegrationSuccessRate, totalDonationsThisPeriod, donationsPreviousPeriod, donationPctChange, activeSupporters, avgEmotionalImprovement }` | US-1 |

This consolidates the KPI card data into a single request optimized for the dashboard landing view. Each field includes current value and comparison delta.

#### 1.8 Export Endpoints

| Endpoint | Method | Body/Params | Returns | User Stories |
|----------|--------|-------------|---------|--------------|
| `/api/reports/export/csv` | POST | `{ endpoint, filters }` | CSV file (Content-Type: text/csv) | US-21 |
| `/api/reports/export/dswd-pdf` | POST | `{ fiscalYear, safehouseId?, narrative? }` | PDF file | US-13, US-20 |

**Implementation notes:**
- CSV export: The POST body specifies which report endpoint to query and which filters to apply. The backend runs the query internally and formats as CSV using `StringBuilder` or a library like `CsvHelper`.
- PDF export: Use `QuestPDF` (free, .NET native) to generate PDFs server-side with Beacon of Hope branding, charts rendered as static images, and tables. Alternatively, generate PDF client-side (see Section 6).

---

### 2. Frontend Components

All components live under `frontend/src/pages/reports/` and `frontend/src/components/reports/`. The page uses a tabbed layout with lazy-loaded tab content.

#### 2.1 Component Tree

```
pages/
  ReportsPage.tsx              -- Main route, tab navigation, global filters
  ReportsPage.module.css

components/reports/
  ReportsDashboard.tsx         -- US-1, US-2: KPI cards + safehouse summary cards
  DonationAnalytics.tsx        -- US-3, US-4, US-5, US-6: donation charts + tables
  ResidentOutcomes.tsx         -- US-7, US-8, US-9, US-10, US-27, US-28: outcome charts
  SafehouseComparison.tsx      -- US-11, US-12: comparison matrix + history chart
  DSWDReport.tsx               -- US-13, US-14: DSWD formatted report + services breakdown
  MLInsights.tsx               -- US-26: ML model outputs dashboard
  ComplianceReport.tsx         -- US-17, US-18: documentation compliance + overdue alerts
  ExportButton.tsx             -- US-19, US-20, US-21: PNG/PDF/CSV export
  DateRangeFilter.tsx          -- US-22: global date range picker with presets
  SafehouseFilter.tsx          -- US-23: safehouse dropdown
  KpiCard.tsx                  -- Reusable KPI card with value, delta, trend arrow
  ChartCard.tsx                -- Wrapper: title, info tooltip, export button, loading skeleton
  ReportTable.tsx              -- Reusable sortable data table with CSV export
  ModelMetadataTooltip.tsx     -- Shared ML: shows training date, metrics, features
```

#### 2.2 ReportsPage.tsx (Main Route)

```tsx
// Tab-based layout
const TABS = [
  { key: 'overview',    label: 'Overview',           component: ReportsDashboard },
  { key: 'donations',   label: 'Donations',          component: DonationAnalytics },
  { key: 'outcomes',    label: 'Resident Outcomes',   component: ResidentOutcomes },
  { key: 'safehouses',  label: 'Safehouse Comparison', component: SafehouseComparison },
  { key: 'dswd',        label: 'DSWD Report',         component: DSWDReport },
  { key: 'ml',          label: 'ML Insights',          component: MLInsights },
  { key: 'compliance',  label: 'Compliance',           component: ComplianceReport },
];
```

- Active tab stored in URL search param (`?tab=donations`) for bookmarking.
- `DateRangeFilter` and `SafehouseFilter` sit above the tabs; their state is passed to all tab components via props or context.
- Each tab component renders lazily (only fetches data when selected).

#### 2.3 Component Specifications

**ReportsDashboard** (US-1, US-2):
- Top row: 6 `KpiCard` components (active residents, reintegrated, success rate, donations, supporters, emotional improvement). Each shows value, delta vs. previous period, and a trend arrow.
- Bottom section: grid of safehouse summary cards. Each card shows name, city, capacity progress bar (color-coded), admission/reintegration counts. Clickable to navigate to SafehouseComparison tab filtered to that safehouse.

**DonationAnalytics** (US-3 through US-6):
- Sub-tabs or scrollable sections: Trends, By Source, Campaigns, Allocations.
- Trends section: Recharts `LineChart` for monthly totals, with toggle buttons for total/count/avgGift. "Compare to last year" checkbox overlays previous year data as a dashed line.
- By Source section: Recharts `PieChart` (donut variant) for payment method. Second `PieChart` for donation type. `ReportTable` below with exact figures.
- Campaigns section: `ReportTable` with progress bars. `BarChart` of top 5 campaigns.
- Allocations section: `StackedBarChart` by safehouse over time. `PieChart` by program area.

**ResidentOutcomes** (US-7 through US-10, US-27, US-28):
- Reintegration: `FunnelChart` (custom Recharts component or stacked horizontal bars) + `LineChart` of success rate over time + breakdown `BarChart` by placement type.
- Emotional trends: `LineChart` with two lines (avgStart, avgEnd), gap between them shaded. Benchmark line as a dashed horizontal.
- Case categories: `StackedBarChart` with safehouses on X-axis.
- Length of stay: `BarChart` as histogram with bucket labels.
- Education progress: `LineChart` with lines for avgProgress, attendanceRate, completionRate.
- Health trends: `LineChart` with lines for health, nutrition, sleep, energy. "Intake vs. Current" comparison as a grouped `BarChart`.

**SafehouseComparison** (US-11, US-12):
- Comparison matrix rendered as a styled HTML table (not a chart) with color-coded cells (green/yellow/red based on configurable benchmarks). Rows = metrics, columns = safehouses.
- Monthly history: `LineChart` with toggleable series (occupancy, admissions, reintegrations, incidents). `ReportTable` below with exact values.

**DSWDReport** (US-13, US-14):
- Three-panel layout for Caring / Healing / Teaching, each showing a headline metric, sub-metrics, and trend vs. previous year.
- Full report view below: structured sections matching DSWD format (organizational profile, services by category, beneficiary demographics table, targets vs. actuals table, narrative text areas for admin to enter problems/recommendations).
- Fiscal year selector at the top.
- "Export as PDF" button triggers server-side PDF generation (`/api/reports/export/dswd-pdf`).

**MLInsights** (US-26):
- Three cards/panels:
  1. **Reintegration Readiness:** `BarChart` distribution of risk buckets (low/medium/high). Top 10 at-risk residents table (admin only). `ModelMetadataTooltip` showing training date, AUC, accuracy.
  2. **Donor Churn Risk:** `PieChart` of churn risk distribution. Top 20 at-risk donors table. Recommended actions text.
  3. **Intervention Effectiveness:** Horizontal `BarChart` of interventions ranked by effect size, with confidence interval error bars.
- All panels display a "ML-generated prediction" label.
- "Refresh Predictions" button (admin only) triggers `/api/admin/ml/refresh`.

**ComplianceReport** (US-17, US-18):
- Table of social workers with metrics (recordings/resident/month, visits completed, avg documentation lag, pct cosigned). Traffic light indicators.
- Overdue alerts section: grouped by social worker, with counts and resident codes.

**ExportButton** (US-19, US-20, US-21):
- Reusable component with dropdown: "Export as PNG", "Export as PDF", "Export as CSV".
- Props: `chartRef` (for PNG), `reportType` (for PDF), `dataEndpoint` + `filters` (for CSV).

---

### 3. Chart Library -- Recharts Specifications

Recharts is already installed. Every chart is wrapped in a `ResponsiveContainer` for fluid sizing.

| Metric | Chart Type | Recharts Component | Key Props |
|--------|-----------|-------------------|-----------|
| Donation monthly trend | Line chart | `LineChart` + `Line` | Two `Line` elements for current/previous year; `Tooltip`, `Legend`, `XAxis` (month), `YAxis` (amount) |
| Donation by source | Donut chart | `PieChart` + `Pie` | `innerRadius={60}`, `outerRadius={100}`, custom label showing percentage |
| Donation by type | Donut chart | `PieChart` + `Pie` | Same as above |
| Campaign top 5 | Bar chart | `BarChart` + `Bar` | Horizontal orientation via `layout="vertical"`, `fill` color-coded |
| Allocation by safehouse | Stacked bar | `BarChart` + `Bar` (multiple) | `stackId="a"`, each safehouse a different color |
| Allocation by program | Pie chart | `PieChart` + `Pie` | Standard pie with legend |
| Reintegration funnel | Funnel / horizontal bar | `BarChart` (horizontal) | `layout="vertical"`, bars shrinking in width to simulate funnel |
| Reintegration rate trend | Line chart | `LineChart` + `Line` | Single line with `dot` markers, percentage Y-axis |
| Reintegration by type | Grouped bar | `BarChart` + `Bar` (grouped) | Multiple `Bar` elements, grouped by placement type |
| Emotional state trends | Area chart | `AreaChart` + `Area` | Two areas (start/end), end area stacked on top with transparency to show gap |
| Case category distribution | Stacked bar | `BarChart` + `Bar` (stacked) | Safehouses on X-axis, categories as stacked segments |
| Length of stay histogram | Bar chart | `BarChart` + `Bar` | Bucket labels on X-axis, count on Y-axis |
| Education progress | Multi-line chart | `LineChart` + `Line` (3) | Lines for progress, attendance, completion; `Legend` toggle |
| Health trends | Multi-line chart | `LineChart` + `Line` (4) | Lines for health, nutrition, sleep, energy |
| Health intake vs current | Grouped bar | `BarChart` + `Bar` (2) | Paired bars per metric |
| Safehouse monthly metrics | Multi-line chart | `LineChart` + `Line` (toggleable) | Checkbox toggles for each metric series |
| ML readiness distribution | Bar chart | `BarChart` + `Bar` | 3 bars (low/medium/high risk), color-coded |
| ML churn distribution | Pie chart | `PieChart` + `Pie` | 3 segments (low/medium/high risk) |
| ML intervention effect | Horizontal bar | `BarChart` (horizontal) + `ErrorBar` | Bars with error bars for confidence intervals |
| Donation forecast overlay | Composed chart | `ComposedChart` + `Line` + `Area` | Solid line for actuals, dashed line for predicted, shaded `Area` for confidence band |
| DSWD services volume | Treemap | `Treemap` | Three top-level nodes (Caring/Healing/Teaching) with sub-metrics as children |

**Shared chart config:**
- Color palette: use 8-color palette derived from Beacon of Hope brand (define in `frontend/src/constants.ts` as `CHART_COLORS`).
- Custom tooltip: use existing `ChartTooltip` component (already in `frontend/src/components/ChartTooltip.tsx`).
- All charts include `ref` forwarding for PNG export.

---

### 4. DSWD Annual Accomplishment Report Format

The PDF report follows the standard Philippine DSWD Annual Accomplishment Report structure:

```
Page 1:   Cover Page
          - Organization: Beacon of Hope
          - Report Period: Fiscal Year [YYYY]
          - DSWD License/Registration Number
          - Date of Submission

Page 2:   Table of Contents

Page 3-4: I. Organizational Profile
          - Brief description, mission, vision
          - List of safehouses with addresses
          - Staff count by role

Page 5-7: II. Services and Programs
          A. Caring Services
             - Residential care: admissions, discharges, average occupancy
             - Basic needs provision: meals, clothing, hygiene
             - Home visitations: total visits, cooperation rate
             - Table: beneficiaries by age bracket, gender, case category
          B. Healing Services
             - Counseling/therapy: total sessions, unique residents served
             - Intervention types used (individual, group, family, art therapy)
             - Emotional state improvement: average start vs. end delta
             - Process recording compliance rate
          C. Teaching Services
             - Education enrollment: formal, non-formal, skills training
             - Average progress %, attendance rate, completion rate
             - Grade level distribution
             - Vocational training outcomes

Page 8:   III. Beneficiary Statistics
          - Total served (all-time and this year)
          - Demographic table: age brackets (0-5, 6-12, 13-17, 18+) x gender
          - Case category breakdown
          - Region of origin breakdown

Page 9:   IV. Accomplishments vs. Targets
          - Table: metric | annual target | actual | % achieved
          - Organized by Caring, Healing, Teaching categories
          - Color coding: green >= 90%, yellow 70-89%, red < 70%

Page 10:  V. Reintegration Outcomes
          - Reintegration count and success rate
          - Breakdown by placement type
          - Average time to reintegration
          - 12-month follow-up success rate

Page 11:  VI. Problems and Challenges
          - Admin-entered narrative text
          - System-generated: metrics below target flagged automatically

Page 12:  VII. Recommendations
          - Admin-entered narrative text

Page 13:  VIII. Financial Summary
          - Total donations received
          - Allocation by program area
          - Allocation by safehouse

Footer:   Page numbers, "Generated from Beacon of Hope Management System on [date]"
```

**Implementation:** The `/api/reports/export/dswd-pdf` endpoint compiles data from the services-summary, beneficiary-demographics, and targets-vs-actuals endpoints, combines with admin-entered narrative text (stored in a `dswd_report_narratives` table or passed in the request body), and renders using `QuestPDF`.

---

### 5. ML Integration Implementation

#### 5.1 Scoring Pipeline

Create `ml-scripts/score_all.py`:
1. Connects to PostgreSQL using `psycopg2` or `sqlalchemy`.
2. Loads each `.pkl` model from `/models/`.
3. Queries the relevant feature data from the database.
4. Runs predictions and writes results to ML results tables.

**New database tables:**

```sql
CREATE TABLE ml_reintegration_scores (
    id SERIAL PRIMARY KEY,
    resident_id INT REFERENCES residents(resident_id),
    probability FLOAT,
    risk_bucket VARCHAR(10),  -- 'Low', 'Medium', 'High'
    top_factors JSONB,        -- ['trauma_severity_score', 'health_trend', ...]
    scored_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ml_donor_churn_scores (
    id SERIAL PRIMARY KEY,
    supporter_id INT REFERENCES supporters(supporter_id),
    churn_probability FLOAT,
    risk_bucket VARCHAR(10),
    top_factors JSONB,
    scored_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ml_intervention_effects (
    id SERIAL PRIMARY KEY,
    intervention_name VARCHAR(100),
    effect_size FLOAT,
    confidence_lower FLOAT,
    confidence_upper FLOAT,
    p_value FLOAT,
    scored_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5.2 .NET Endpoints

The ML endpoints in Section 1.6 query these tables directly. Example for reintegration readiness:

```csharp
app.MapGet("/api/reports/ml/reintegration-readiness", async (AppDbContext db, int? safehouseId) =>
{
    var query = db.MlReintegrationScores
        .Join(db.Residents, s => s.ResidentId, r => r.ResidentId, (s, r) => new { s, r })
        .Where(x => x.r.CaseStatus == "Active");

    if (safehouseId.HasValue)
        query = query.Where(x => x.r.SafehouseId == safehouseId);

    var scores = await query
        .Select(x => new {
            residentCode = x.r.InternalCode,
            probability = x.s.Probability,
            riskBucket = x.s.RiskBucket,
            topFactors = x.s.TopFactors
        })
        .OrderBy(x => x.probability)
        .ToListAsync();

    var distribution = scores.GroupBy(s => s.riskBucket)
        .Select(g => new { bucket = g.Key, count = g.Count() })
        .ToList();

    // Read metadata from JSON file
    var metadata = System.Text.Json.JsonSerializer.Deserialize<object>(
        await File.ReadAllTextAsync("../models/reintegration-readiness-metadata.json"));
    var metrics = System.Text.Json.JsonSerializer.Deserialize<object>(
        await File.ReadAllTextAsync("../models/reintegration-readiness-metrics.json"));

    return new { residents = scores, distribution, avgReadiness = scores.Average(s => s.probability),
                 modelMetadata = new { metadata, metrics } };
});
```

#### 5.3 Model Metadata Endpoint

The `/api/reports/ml/model-metadata/{modelName}` endpoint reads the corresponding JSON files from `/models/` directory:

```csharp
app.MapGet("/api/reports/ml/model-metadata/{modelName}", async (string modelName) =>
{
    var basePath = "../models/";
    var metadataPath = Path.Combine(basePath, $"{modelName}-metadata.json");
    var metricsPath = Path.Combine(basePath, $"{modelName}-metrics.json");

    // Return combined metadata + metrics, or 404 if not found
});
```

#### 5.4 Refresh Trigger

```csharp
app.MapPost("/api/admin/ml/refresh", async () =>
{
    var process = Process.Start(new ProcessStartInfo
    {
        FileName = "python3",
        Arguments = "../ml-scripts/score_all.py",
        RedirectStandardOutput = true,
        RedirectStandardError = true
    });
    await process!.WaitForExitAsync();
    return process.ExitCode == 0
        ? Results.Ok(new { status = "success" })
        : Results.StatusCode(500);
});
```

---

### 6. Export Implementation

#### 6.1 PNG Export (Client-Side)

Use `html-to-image` library (lightweight, already works with React refs):

```bash
npm install html-to-image
```

```tsx
import { toPng } from 'html-to-image';

async function exportChartAsPng(chartRef: RefObject<HTMLDivElement>, title: string) {
  if (!chartRef.current) return;
  const dataUrl = await toPng(chartRef.current, {
    backgroundColor: '#ffffff',
    width: 1200,
    pixelRatio: 2,  // high-res for projection
  });
  const link = document.createElement('a');
  link.download = `${title}-${new Date().toISOString().slice(0, 10)}.png`;
  link.href = dataUrl;
  link.click();
}
```

Each `ChartCard` wraps its chart in a `div` with a `ref` and passes it to `ExportButton`.

#### 6.2 PDF Export

**Option A -- Server-side with QuestPDF (recommended for DSWD report):**

Install `QuestPDF` NuGet package. The `/api/reports/export/dswd-pdf` endpoint generates a structured PDF document. QuestPDF uses a fluent C# API -- no HTML rendering needed. The endpoint returns `Results.File(pdfBytes, "application/pdf", filename)`.

**Option B -- Client-side with `react-to-print` + `@react-pdf/renderer` (for general report pages):**

```bash
npm install @react-pdf/renderer
```

Create a `ReportPdfDocument` component that renders the currently active report tab as a PDF document. This works well for the "Export current page as PDF" use case (US-20).

**Recommendation:** Use server-side QuestPDF for the DSWD report (US-13) because it requires precise formatting, letterhead, and page numbers. Use client-side `@react-pdf/renderer` for ad-hoc page exports (US-20).

#### 6.3 CSV Export (Client-Side)

No library needed. Build CSV string from the data already fetched by the component:

```tsx
function exportCsv(data: Record<string, unknown>[], filename: string) {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(','),
    ...data.map(row => headers.map(h => {
      const val = row[h];
      return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.download = `${filename}-${new Date().toISOString().slice(0, 10)}.csv`;
  link.href = URL.createObjectURL(blob);
  link.click();
}
```

Each `ReportTable` component has a built-in CSV export button.

---

### 7. Files to Create/Modify

#### New Files -- Backend

| File | Purpose |
|------|---------|
| `backend/Models/MlReintegrationScore.cs` | EF Core model for ML reintegration scores table |
| `backend/Models/MlDonorChurnScore.cs` | EF Core model for ML donor churn scores table |
| `backend/Models/MlInterventionEffect.cs` | EF Core model for ML intervention effects table |
| `backend/Models/DswdTarget.cs` | EF Core model for DSWD annual targets (optional) |

#### Modified Files -- Backend

| File | Changes |
|------|---------|
| `backend/Program.cs` | Add all `/api/reports/*` endpoints (Sections 1.1-1.7), ML endpoints (1.6), export endpoints (1.8) |
| `backend/Data/AppDbContext.cs` | Add `DbSet` properties for new ML tables and DswdTargets |
| `backend/backend.csproj` | Add `QuestPDF` NuGet package |

#### New Files -- Frontend

| File | Purpose |
|------|---------|
| `frontend/src/pages/ReportsPage.tsx` | Main reports route with tab navigation and global filters |
| `frontend/src/pages/ReportsPage.module.css` | Styles for reports page layout, tabs, filter bar |
| `frontend/src/components/reports/ReportsDashboard.tsx` | KPI cards + safehouse summary cards |
| `frontend/src/components/reports/DonationAnalytics.tsx` | Donation trend, source, campaign, allocation charts |
| `frontend/src/components/reports/ResidentOutcomes.tsx` | Reintegration, emotional, education, health charts |
| `frontend/src/components/reports/SafehouseComparison.tsx` | Comparison matrix + monthly history |
| `frontend/src/components/reports/DSWDReport.tsx` | DSWD formatted report with Caring/Healing/Teaching |
| `frontend/src/components/reports/MLInsights.tsx` | ML model outputs dashboard |
| `frontend/src/components/reports/ComplianceReport.tsx` | Documentation compliance + overdue alerts |
| `frontend/src/components/reports/ExportButton.tsx` | Reusable PNG/PDF/CSV export dropdown |
| `frontend/src/components/reports/DateRangeFilter.tsx` | Global date range picker with presets |
| `frontend/src/components/reports/SafehouseFilter.tsx` | Safehouse dropdown filter |
| `frontend/src/components/reports/KpiCard.tsx` | Reusable KPI card component |
| `frontend/src/components/reports/ChartCard.tsx` | Chart wrapper with title, skeleton, export |
| `frontend/src/components/reports/ReportTable.tsx` | Sortable table with built-in CSV export |
| `frontend/src/components/reports/ModelMetadataTooltip.tsx` | ML model info tooltip |
| `frontend/src/hooks/useReportData.ts` | Custom hook for fetching report data with date/safehouse filters |

#### Modified Files -- Frontend

| File | Changes |
|------|---------|
| `frontend/src/App.tsx` | Add `/reports` route pointing to `ReportsPage` |
| `frontend/src/components/Header.tsx` | Add "Reports" nav link (visible to admin/staff only) |
| `frontend/src/constants.ts` | Add `CHART_COLORS` palette array |

#### New Files -- ML Scripts

| File | Purpose |
|------|---------|
| `ml-scripts/score_all.py` | Batch scoring script: loads models, queries DB, writes scores to ML tables |
| `ml-scripts/requirements.txt` | Python dependencies: `scikit-learn`, `psycopg2-binary`, `pandas`, `joblib` |

#### New Files -- Database

| File | Purpose |
|------|---------|
| `supabase/migrations/YYYYMMDD_add_ml_scores_tables.sql` | SQL migration for `ml_reintegration_scores`, `ml_donor_churn_scores`, `ml_intervention_effects` |
| `supabase/migrations/YYYYMMDD_add_dswd_targets.sql` | SQL migration for `dswd_targets` table (optional) |

---

### 8. Suggested Implementation Order

Each phase builds on the previous. Estimated effort assumes a team of 2-3 developers.

#### Phase 1: Foundation (Days 1-2)

1. **Database migrations** -- Create ML scores tables and run migrations.
2. **ReportsPage shell** -- Create `ReportsPage.tsx` with tab layout, `DateRangeFilter`, `SafehouseFilter`. Wire up route in `App.tsx` and nav link in `Header.tsx`.
3. **Reusable components** -- Build `KpiCard`, `ChartCard`, `ReportTable`, `ExportButton` (PNG + CSV only).
4. **`useReportData` hook** -- Generic data-fetching hook that takes an endpoint path and filter params, returns `{ data, loading, error }`.
5. **`CHART_COLORS` constant** -- Add to `constants.ts`.

#### Phase 2: Dashboard + Donations (Days 3-4)

1. **Backend:** `/api/reports/dashboard/kpis`, `/api/reports/donations/monthly`, `/api/reports/donations/by-source`, `/api/reports/donations/by-type`, `/api/reports/donations/yoy`.
2. **Frontend:** `ReportsDashboard` (KPI cards + safehouse summary cards), `DonationAnalytics` (trend line chart, donut charts, campaign table).
3. Test with real data from Supabase.

#### Phase 3: Resident Outcomes (Days 5-6)

1. **Backend:** `/api/reports/residents/reintegration`, `/api/reports/residents/reintegration-funnel`, `/api/reports/residents/emotional-trends`, `/api/reports/residents/case-categories`, `/api/reports/residents/length-of-stay`, `/api/reports/residents/education-progress`, `/api/reports/residents/health-trends`.
2. **Frontend:** `ResidentOutcomes` with all chart sub-sections.

#### Phase 4: Safehouse Comparison (Day 7)

1. **Backend:** `/api/reports/safehouses/comparison`, `/api/reports/safehouses/monthly-metrics`.
2. **Frontend:** `SafehouseComparison` with matrix table and multi-line chart.

#### Phase 5: ML Integration (Days 8-9)

1. **Python:** Write `ml-scripts/score_all.py`. Test locally.
2. **Backend:** Add EF Core models for ML tables. Add ML endpoints and model metadata endpoint. Add `/api/admin/ml/refresh`.
3. **Frontend:** `MLInsights` with readiness distribution, churn risk, intervention effectiveness charts. `ModelMetadataTooltip`.
4. Run scoring script to populate tables. Verify end-to-end.

#### Phase 6: DSWD Report (Days 10-11)

1. **Backend:** `/api/reports/dswd/services-summary`, `/api/reports/dswd/beneficiary-demographics`, `/api/reports/dswd/targets-vs-actuals`. Add QuestPDF and `/api/reports/export/dswd-pdf`.
2. **Frontend:** `DSWDReport` with three-panel services view, demographic tables, targets-vs-actuals table, narrative text areas, and "Export as PDF" button.

#### Phase 7: Compliance + Polish (Day 12)

1. **Backend:** `/api/reports/compliance/documentation`, `/api/reports/compliance/overdue`.
2. **Frontend:** `ComplianceReport` with traffic-light table and overdue alerts.
3. **Polish:** Loading skeletons, error states, responsive layout for mobile/tablet, print CSS.
4. **PDF export:** Wire up `@react-pdf/renderer` for general page export (US-20).

#### Phase 8: Testing + RBAC (Day 13)

1. Enforce RBAC on all endpoints (admin vs. staff vs. donor).
2. Verify staff users see only their safehouse data by default.
3. Verify donors are blocked from all `/api/reports/*` endpoints (they use `/api/impact/*`).
4. Performance testing: ensure dashboard loads within 2-3 seconds.
5. Cross-browser testing: Chrome, Safari (mobile), Firefox.
6. Chart rendering on large projected displays.

#### Stretch Goals (if time permits)

- **Custom Report Builder** (US-24): metric catalog + dimension selector + saved reports. This is the most complex feature and should only be attempted after all core reports are solid.
- **Board Packet Generator** (US-29): multi-section PDF assembly.
- **Donation Forecast Overlay** (Above-and-beyond #3): time-series prediction on the donation trend chart.
- **Anomaly Detection Alerts** (Above-and-beyond #2): z-score based flagging.
- **Natural Language Summaries** (Above-and-beyond #1): LLM-generated executive summaries.
