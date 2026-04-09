# Chart & Graph Audit

Audit of every chart across all pages. For each: title, axis labels, data source, and whether labels accurately represent the data.

---

## ImpactPage (2 charts)

### 1. Monthly Donations Over Time

- **Type:** BarChart
- **Title:** "Monthly donations over time"
- **X-axis:** Month (formatted as "January 2026")
- **Y-axis:** Dollar amounts ("$15k")
- **Tooltip prefix:** "$"
- **API endpoint:** `/api/impact/donations-by-month`
- **Actual data:** Sum of `Donations.Amount` grouped by month
- **Accuracy:** ACCURATE -- title, axes, and tooltip all correctly represent monetary donation totals per month. Reference line at $15k monthly goal is also accurate.

### 2. Where Your Donations Go

- **Type:** BarChart
- **Title:** "Where your donations go"
- **X-axis:** Program area names (e.g., "Education", "Healthcare")
- **Y-axis:** Dollar amounts ("$50k")
- **Tooltip prefix:** "$"
- **API endpoint:** `/api/impact/allocations-by-program`
- **Actual data:** Sum of `DonationAllocations.AmountAllocated` grouped by `ProgramArea`
- **Accuracy:** ACCURATE -- labels correctly represent allocation dollar amounts per program area.

---

## AdminDashboard (3 charts)

### 3. Active Residents

- **Type:** AreaChart
- **Title:** "Active Residents"
- **X-axis:** Month (formatted as "Feb 2025")
- **Y-axis:** Count (numeric, no explicit label)
- **API endpoint:** `/api/admin/active-residents-trend`
- **Actual data:** Sum of `SafehouseMonthlyMetrics.ActiveResidents` grouped by month
- **Accuracy:** ACCURATE -- chart shows total active residents over time.
- **Note:** Callout text "+3 admitted this month" is hardcoded, not data-driven.

### 4. Cases Flagged for Review

- **Type:** AreaChart
- **Title:** "Cases Flagged for Review"
- **X-axis:** Month
- **Y-axis:** Count (numeric, no explicit label)
- **API endpoint:** `/api/admin/flagged-cases-trend`
- **Actual data:** Sum of `SafehouseMonthlyMetrics.IncidentCount` grouped by month
- **Accuracy:** MISMATCH -- Title says "Cases Flagged for Review" but data is total incident counts per month. There is no flagging mechanism in the system. The callout "7 currently flagged" is also hardcoded.

### 5. By Channel

- **Type:** Horizontal BarChart
- **Title:** "By Channel" (subtitle: "Acquisition source")
- **X-axis:** Count (numeric)
- **Y-axis:** Channel names (e.g., "Social Media", "Email")
- **Tooltip prefix:** "$"
- **API endpoint:** `/api/admin/donations-by-channel`
- **Actual data:** COUNT of `Supporters` grouped by `AcquisitionChannel` (i.e., number of supporters per channel)
- **Accuracy:** MISMATCH -- The tooltip uses a "$" prefix suggesting dollar amounts, but the data is a count of supporters, not donation amounts. The frontend field is named `amount` which is also misleading. Users will think they are seeing donation dollars per channel when they are actually seeing supporter counts.

---

## ReportsPage -- Donations Tab (3 charts)

### 6. Monthly Donation Trends

- **Type:** LineChart
- **Title:** "Monthly Donation Trends"
- **X-axis:** Month (formatted as "Jan 2024")
- **Y-axis:** Dollar amounts ("$XXXk")
- **Tooltip prefix:** "$"
- **API endpoint:** `/api/impact/donations-by-month`
- **Actual data:** Sum of `Donations.Amount` grouped by month
- **Accuracy:** ACCURATE

### 7. Donations by Source

- **Type:** Horizontal BarChart
- **Title:** "Donations by Source"
- **X-axis:** Dollar amounts ("$XXXk")
- **Y-axis:** Source names (formatted via `formatEnumLabel()`)
- **Tooltip prefix:** "$"
- **API endpoint:** `/api/admin/reports/donations-by-source`
- **Actual data:** Sum of `Donations.Amount` grouped by `ChannelSource`
- **Accuracy:** ACCURATE

### 8. Donations by Campaign

- **Type:** Horizontal BarChart
- **Title:** "Donations by Campaign"
- **X-axis:** Dollar amounts ("$XXXk")
- **Y-axis:** Campaign names
- **Tooltip prefix:** "$"
- **API endpoint:** `/api/admin/reports/donations-by-campaign`
- **Actual data:** Sum of `Donations.Amount` grouped by `CampaignName` (top 8)
- **Accuracy:** ACCURATE

---

## ReportsPage -- Outcomes Tab (3 charts)

### 9. Reintegration by Type

- **Type:** PieChart (donut)
- **Title:** "Reintegration by Type"
- **Center display:** Success Rate %
- **API endpoint:** `/api/admin/reports/resident-outcomes`
- **Actual data:** Count of residents where `ReintegrationStatus == "Completed"`, grouped by `ReintegrationType`. Success rate = completed / total residents.
- **Accuracy:** ACCURATE

### 10. Education Progress Over Time

- **Type:** LineChart
- **Title:** "Education Progress Over Time"
- **X-axis:** Month
- **Y-axis:** Percentage (0%--100%)
- **API endpoint:** `/api/impact/education-trends`
- **Actual data:** Average of `EducationRecords.ProgressPercent` per month
- **Accuracy:** ACCURATE

### 11. Health Scores Over Time

- **Type:** Multi-line LineChart (4 lines: Health, Nutrition, Sleep, Energy)
- **Title:** "Health Scores Over Time"
- **X-axis:** Month
- **Y-axis:** Numeric (no unit label)
- **API endpoint:** `/api/impact/health-trends`
- **Actual data:** Monthly averages of `GeneralHealthScore`, `NutritionScore`, `SleepQualityScore`, `EnergyLevelScore` from `HealthWellbeingRecords`
- **Accuracy:** MINOR ISSUE -- Y-axis has no unit label. The scores are numeric but the chart doesn't indicate the scale (e.g., 0--10 or 0--100). Labels are otherwise accurate.

---

## ReportsPage -- Safehouses Tab (2 charts)

### 12. Occupancy by Safehouse

- **Type:** Vertical BarChart
- **Title:** "Occupancy by Safehouse"
- **X-axis:** Safehouse codes (e.g., "SH-001")
- **Y-axis:** Percentage (0%--100%)
- **API endpoint:** `/api/admin/reports/safehouse-comparison`
- **Actual data:** `(CurrentOccupancy / CapacityGirls) * 100` per safehouse
- **Accuracy:** ACCURATE

### 13. Incidents by Safehouse

- **Type:** Vertical BarChart
- **Title:** "Incidents by Safehouse"
- **X-axis:** Safehouse codes
- **Y-axis:** Count (no unit label)
- **API endpoint:** `/api/admin/reports/safehouse-comparison`
- **Actual data:** Count of `IncidentReports` grouped by `SafehouseId`
- **Accuracy:** ACCURATE

---

## ReportsPage -- Annual Report Tab (1 chart)

### 14. Service Delivery by Category

- **Type:** Grouped BarChart (2 bars per category)
- **Title:** "Service Delivery by Category"
- **X-axis:** Categories ("Caring", "Healing", "Teaching")
- **Y-axis:** Count (no unit label)
- **Bars:** Blue = "Services" (serviceCount), Green = "Beneficiaries" (beneficiaryCount)
- **API endpoint:** `/api/admin/reports/aar-summary`
- **Actual data:**
  - Caring: `HealthWellbeingRecords` count + `InterventionPlans` count
  - Healing: `ProcessRecordings` count
  - Teaching: `EducationRecords` count
  - Beneficiaries = distinct `ResidentId` count per category
- **Accuracy:** ACCURATE

---

## Summary of Issues

| # | Chart | Page | Issue |
|---|-------|------|-------|
| 4 | Cases Flagged for Review | AdminDashboard | **MISMATCH** -- Title says "flagged for review" but data is total incident counts. No flagging system exists. Hardcoded callout "7 currently flagged." |
| 5 | By Channel | AdminDashboard | **MISMATCH** -- Tooltip uses "$" prefix but data is supporter count, not dollar amounts. Frontend field named `amount` is misleading. |
| 11 | Health Scores Over Time | ReportsPage | **MINOR** -- Y-axis missing unit label (score scale unclear). |

All other 11 charts have accurate labels that correctly represent their underlying data.
