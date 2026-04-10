# Beacon of Hope Database Documentation

## Organization Overview
Beacon of Hope operates safehouses in Guam for girls who are survivors of sexual abuse and trafficking. The database tracks residents, case management, incidents, donations, and social media outreach.

## Key Concepts

### Safehouses
- Each safehouse has a unique `safehouse_id` and a `safehouse_code` (e.g., "SH01")
- Safehouses have capacity limits (`capacity_girls`, `capacity_staff`) and `current_occupancy`
- Most operational data is linked to a safehouse via `safehouse_id`

### Residents
- Residents are the children/young adults in care at a safehouse
- Each resident belongs to one safehouse (`safehouse_id` column)
- `case_status` values: 'Active', 'Closed', 'Reintegrated', 'Transferred', 'Discharged'
- `case_control_no` is the unique case reference number
- Risk assessment fields: `risk_level` ('Critical', 'High', 'Medium', 'Low')
- Dates: `admission_date`, `discharge_date`, `date_of_birth`
- Related records: education_records, health_wellbeing_records, home_visitations, intervention_plans, process_recordings

### Incident Reports
- Linked to a safehouse via `safehouse_id`
- `incident_type` categories include various safety and behavioral incidents
- `severity` levels indicate incident seriousness
- Each incident has an `incident_date` and `reported_date`

### Staff Tasks
- To-do items for staff, linked to a safehouse via `safehouse_id`
- `status` values: 'Pending', 'Snoozed', 'Completed', 'Dismissed'
- Can be associated with a resident via `resident_id`

### Calendar Events
- Events for staff schedules, linked to a safehouse via `safehouse_id`
- Have `event_date`, `event_type`, and `status`

### Case Conferences
- Multi-disciplinary meetings about residents
- Linked to a safehouse via `safehouse_id`
- Related residents tracked in `case_conference_residents` junction table

### Donations
- Financial and in-kind donations from supporters
- `donation_date`, `amount`, `donation_type`
- Linked to `supporters` via `supporter_id`
- `donation_allocations` track how donations are allocated to specific safehouses

### Safehouse Monthly Metrics
- Aggregated monthly statistics per safehouse
- Fields: `active_residents`, `new_admissions`, `discharges`, `incidents_count`
- `avg_education_progress`, `avg_health_score`
- `month_start` is the first day of the month

### ML Predictions
- Machine learning model predictions stored in `ml_predictions`
- `entity_type` can be 'supporter' or 'resident'
- `entity_id` references the supporter_id or resident_id
- `model_name` values: 'reintegration-readiness', 'donor-churn', 'incident-early-warning', etc.
- `score` is 0-100 scale
- `score_label` is a human-readable category like 'Ready', 'High Risk', 'Low Risk'

### Social Media Posts
- Content published on social platforms
- `platform`: 'Instagram', 'Facebook', 'Twitter'
- `status`: 'draft', 'scheduled', 'published', 'rejected'
- Engagement metrics: `engagement_likes`, `engagement_shares`, `engagement_comments`

## Important Notes
- The application date is frozen to February 16, 2026. Use '2026-02-16' as "today" for any date-relative queries.
- All table and column names use snake_case in PostgreSQL.
- Column names in queries should be quoted with double quotes if they contain uppercase letters.
- Use PostgreSQL syntax (not MySQL or SQL Server syntax).
