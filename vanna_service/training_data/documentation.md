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
- Risk assessment: `current_risk_level` and `initial_risk_level` ('Critical', 'High', 'Medium', 'Low')
- Dates: `date_of_admission`, `date_closed`, `date_of_birth`
- Reintegration: `reintegration_type`, `reintegration_status`
- Related records: education_records, health_wellbeing_records, home_visitations, intervention_plans, process_recordings

### Incident Reports
- Linked to a safehouse via `safehouse_id` and optionally to a resident via `resident_id`
- Primary key: `incident_id`
- `incident_type` categories include various safety and behavioral incidents
- `severity` levels: 'Critical', 'High', 'Medium', 'Low'
- Each incident has an `incident_date`
- `resolved` (boolean) and `resolution_date`

### Staff Tasks
- To-do items for staff, linked to a safehouse via `safehouse_id`
- Primary key: `staff_task_id`
- `status` values: 'Pending', 'Snoozed', 'Completed', 'Dismissed'
- Can be associated with a resident via `resident_id`

### Calendar Events
- Events for staff schedules, linked to a safehouse via `safehouse_id`
- Primary key: `calendar_event_id`
- Have `event_date`, `event_type`, and `status`

### Case Conferences
- Multi-disciplinary meetings about residents
- Primary key: `conference_id`
- Linked to a safehouse via `safehouse_id`
- Has `scheduled_date` and `status`

### Donations
- Financial and in-kind donations from supporters
- Primary key: `donation_id`
- `donation_date`, `amount`, `donation_type`
- Linked to `supporters` via `supporter_id`

### Donation Allocations
- Track how donations are allocated to specific safehouses
- Primary key: `allocation_id`
- `amount_allocated`, `program_area`, `allocation_date`
- Linked to `donations` via `donation_id` and `safehouses` via `safehouse_id`

### Safehouse Monthly Metrics
- Aggregated monthly statistics per safehouse
- Primary key: `metric_id`
- Fields: `active_residents`, `incident_count`
- `avg_education_progress`, `avg_health_score`
- `process_recording_count`, `home_visitation_count`
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
- Primary key: `post_id`
- `platform`: 'Instagram', 'Facebook', 'Twitter'
- Engagement metrics: `likes`, `shares`, `comments`, `saves`, `click_throughs`
- `engagement_rate`, `impressions`, `reach`
- `caption` is the post text content
- `content_topic`, `sentiment_tone`, `post_type`, `media_type`

### Supporters
- Donors and partners of the organization
- Primary key: `supporter_id`
- `supporter_type`, `display_name`, `organization_name`
- `relationship_type`, `status`, `acquisition_channel`
- `first_donation_date`

### Home Visitations
- Primary key: `visitation_id`
- Linked to a resident via `resident_id`
- `visit_date`, `social_worker`, `visit_type`
- `family_cooperation_level`, `safety_concerns_noted`

## Important Notes
- The application date is frozen to February 16, 2026. Use '2026-02-16' as "today" for any date-relative queries.
- All table and column names use snake_case in PostgreSQL.
- Use PostgreSQL syntax (not MySQL or SQL Server syntax).
