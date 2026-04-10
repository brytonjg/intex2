-- ============================================================
-- Vanna Chatbot: Read-Only Database Role Setup
-- ============================================================
-- Run this script as the database admin (superuser) against
-- the intex2 PostgreSQL database.
--
-- This creates a vanna_readonly role with SELECT access ONLY
-- on safe, non-sensitive tables. Identity tables, PII tables,
-- and configuration tables are excluded.
-- ============================================================

-- 1. Create the read-only role
-- Change the password before running in production!
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'vanna_readonly') THEN
        CREATE ROLE vanna_readonly LOGIN PASSWORD 'CHANGE_ME_IN_PRODUCTION' NOINHERIT;
    END IF;
END
$$;

-- 2. Grant basic connection and schema access
GRANT CONNECT ON DATABASE "intex2" TO vanna_readonly;
GRANT USAGE ON SCHEMA public TO vanna_readonly;

-- 3. Grant SELECT on safe operational tables only
-- (NOT using GRANT ALL or GRANT SELECT ON ALL TABLES)

-- Core safehouse & resident data
GRANT SELECT ON TABLE residents TO vanna_readonly;
GRANT SELECT ON TABLE safehouses TO vanna_readonly;
GRANT SELECT ON TABLE incident_reports TO vanna_readonly;
GRANT SELECT ON TABLE safehouse_monthly_metrics TO vanna_readonly;

-- Resident-related records
GRANT SELECT ON TABLE education_records TO vanna_readonly;
GRANT SELECT ON TABLE health_wellbeing_records TO vanna_readonly;
GRANT SELECT ON TABLE home_visitations TO vanna_readonly;
GRANT SELECT ON TABLE intervention_plans TO vanna_readonly;
GRANT SELECT ON TABLE process_recordings TO vanna_readonly;

-- Case management
GRANT SELECT ON TABLE case_conferences TO vanna_readonly;
GRANT SELECT ON TABLE case_conference_residents TO vanna_readonly;
GRANT SELECT ON TABLE staff_tasks TO vanna_readonly;
GRANT SELECT ON TABLE calendar_events TO vanna_readonly;

-- Donations (amounts, not donor PII)
GRANT SELECT ON TABLE donations TO vanna_readonly;
GRANT SELECT ON TABLE donation_allocations TO vanna_readonly;

-- ML predictions
GRANT SELECT ON TABLE ml_predictions TO vanna_readonly;
GRANT SELECT ON TABLE ml_prediction_history TO vanna_readonly;

-- Social media (public content)
GRANT SELECT ON TABLE social_media_posts TO vanna_readonly;

-- ============================================================
-- The following tables are intentionally NOT granted:
-- ============================================================
-- Identity / Auth:
--   AspNetUsers, AspNetUserTokens, AspNetRoles, AspNetUserClaims,
--   AspNetUserLogins, AspNetRoleClaims
--
-- Staff-to-safehouse mapping (leaks identity):
--   user_safehouses
--
-- PII tables:
--   supporters (email, phone)
--   newsletter_subscribers (email, unsubscribe tokens)
--   donor_outreaches (staff email, staff name)
--   partners (contact name, email, phone)
--
-- Configuration / secrets:
--   app_settings
--
-- Social media config (not useful for data queries):
--   awareness_dates, cta_configs, graphic_templates,
--   media_library, content_facts, content_fact_candidates,
--   content_talking_points, voice_guide, hashtag_sets,
--   social_media_settings, generated_graphics, milestone_rules,
--   automated_posts, newsletters
--
-- Other:
--   public_impact_snapshots, in_kind_donation_items
-- ============================================================
