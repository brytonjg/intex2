-- Fix column mismatches between init_schema and CSV data files

begin;

-- 1. Fix education_records
alter table public.education_records
  drop column if exists program_name,
  drop column if exists course_name,
  drop column if exists attendance_status,
  drop column if exists gpa_like_score,
  add column if not exists school_name text,
  add column if not exists enrollment_status text;

-- 2. Fix health_wellbeing_records
alter table public.health_wellbeing_records
  rename column sleep_score to sleep_quality_score;
alter table public.health_wellbeing_records
  rename column energy_score to energy_level_score;
alter table public.health_wellbeing_records
  rename column medical_notes_restricted to notes;

-- 3. Fix donations
alter table public.donations
  drop column if exists created_by_partner_id;

commit;
