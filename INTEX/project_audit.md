# Project Audit — Beacon of Hope

**Date:** 2026-04-06
**Branch:** db-schema-fix-and-seed

Status key: DONE / PARTIAL / NOT STARTED

---

## IS 401 — Project Management & Systems Design (20 pts)

This is mostly non-code deliverables on the FigJam board.

| Item | Status | Notes |
|------|--------|-------|
| Scrum Master & Product Owner assigned | NOT STARTED | FigJam |
| 2 Customer Personas | NOT STARTED | FigJam |
| Journey Map | NOT STARTED | FigJam |
| Problem Statement | NOT STARTED | FigJam |
| MoSCoW Table (all reqs + 5 nice-to-haves) | NOT STARTED | FigJam |
| Product Backlog (12+ cards) | NOT STARTED | FigJam |
| Sprint backlogs (Mon–Thu, 8+ cards each) | NOT STARTED | FigJam — screenshot before starting each day |
| Burndown Chart | NOT STARTED | FigJam — update daily |
| Figma Wireframes (3 screens, desktop) | NOT STARTED | FigJam |
| AI-generated UI options (3 designs × 3 screenshots) | NOT STARTED | FigJam |
| Design decision paragraph + 3 changes made | NOT STARTED | FigJam |
| Tech stack diagram | NOT STARTED | FigJam |
| Current state screenshots (5 pages, desktop + mobile) | NOT STARTED | FigJam |
| One working deployed page with DB persistence | NOT STARTED | Needs deployment first |
| User feedback (5 specific changes) | NOT STARTED | FigJam |
| OKR metric tracked in app | NOT STARTED | Pick a key metric, display it |
| Lighthouse accessibility ≥ 90% on every page | NOT STARTED | Run Lighthouse on each page |
| Responsiveness on all pages | PARTIAL | Home, Impact, Admin Dashboard are responsive; remaining pages don't exist yet |
| Retrospective | NOT STARTED | FigJam — end of week |

---

## IS 413 — Enterprise Application Development

### Public Pages

| Page | Status | What's Missing |
|------|--------|----------------|
| Home / Landing Page | DONE | Fully built with hero, impact counters, CTAs, testimonials |
| Impact / Donor Dashboard | DONE | Charts, stats, donation trends all wired to API |
| Login Page | NOT STARTED | Need page + form + validation + error handling |
| Privacy Policy Page | NOT STARTED | Need a dedicated page with GDPR-compliant content |
| Cookie Consent | DONE | Component exists and renders; needs to be verified as fully functional (not just cosmetic) |

### Admin Pages (Authenticated)

| Page | Status | What's Missing |
|------|--------|----------------|
| Admin Dashboard | DONE | Metrics cards, residents table, donations list, charts all wired to API |
| Caseload Inventory | NOT STARTED | List/filter/search residents, create/edit resident forms, pagination |
| Process Recordings | NOT STARTED | List recordings per resident, create form, chronological view |
| Home Visitations & Case Conferences | NOT STARTED | Log visits, track outcomes/safety concerns, case conference view |
| Donors & Contributions | NOT STARTED | Supporter profiles, donation history, allocation tracking |
| Reports & Analytics | NOT STARTED | Aggregated trends, safehouse comparisons, reintegration rates |

### Backend API Endpoints

| Category | Status | What's Missing |
|----------|--------|----------------|
| Public read endpoints (impact, health, etc.) | DONE | 8 endpoints exist |
| Admin read endpoints (metrics, residents, donations) | DONE | 6 endpoints exist |
| POST endpoints (create residents, donations, recordings, etc.) | NOT STARTED | All CUD operations |
| PUT/PATCH endpoints (update records) | NOT STARTED | All update operations |
| DELETE endpoints (with confirmation) | NOT STARTED | All delete operations |
| Input validation on write endpoints | NOT STARTED | |
| Error handling / status codes | PARTIAL | Read endpoints return data; no structured error responses |

### Frontend Infrastructure

| Item | Status | What's Missing |
|------|--------|----------------|
| API utility (`apiFetch`) | DONE | |
| Routing (React Router v7) | PARTIAL | Public + admin dashboard routes exist; 5 admin pages not routed |
| AdminLayout (sidebar) | DONE | |
| Loading states | PARTIAL | Some pages have them |
| Toast notifications | NOT STARTED | |
| Confirmation dialogs (for deletes) | NOT STARTED | Required by IS 414 |
| Pagination | NOT STARTED | |
| Search / filter components | NOT STARTED | |

---

## IS 414 — Security (20 pts)

| Requirement | Points | Status | What's Missing |
|-------------|--------|--------|----------------|
| HTTPS/TLS | 1 | NOT STARTED | Needs deployment with valid cert |
| HTTP → HTTPS redirect | 0.5 | NOT STARTED | Needs deployment |
| Authentication (username/password) | 3 | NOT STARTED | ASP.NET Identity setup, login endpoint, login page |
| Better password policy | 1 | NOT STARTED | Configure PasswordOptions stricter than defaults (per class instruction) |
| Pages/APIs require auth where needed | 1 | NOT STARTED | `[Authorize]` attributes on endpoints, protected routes in React |
| RBAC — only admin can CUD | 1.5 | NOT STARTED | Roles (Admin, Donor, etc.), role checks on endpoints |
| Confirmation to delete data | 1 | NOT STARTED | Frontend confirmation dialogs before DELETE calls |
| Credentials stored securely | 1 | PARTIAL | `.env.example` exists, `.env` in `.gitignore`; verify no secrets in repo |
| Privacy policy (customized) | 1 | NOT STARTED | Dedicated page with GDPR content |
| Cookie consent (fully functional) | 1 | PARTIAL | Component exists; needs to actually block cookies until consent |
| CSP header | 2 | NOT STARTED | Configure Content-Security-Policy response header in backend |
| Deployed publicly | 4 | NOT STARTED | Frontend → Vercel, Backend → Azure, DB → Supabase |
| Additional security features | 2 | NOT STARTED | Options: third-party auth (Google), 2FA/MFA, HSTS, browser cookie for user setting, data sanitization, Docker deployment |

---

## IS 455 — Machine Learning (20 pts)

**Status: NOT STARTED**

Each pipeline needs: Problem Framing → Data Prep → Exploration → Modeling → Evaluation → Feature Selection → Deployment

| Pipeline Idea | Domain | Type | Status |
|---------------|--------|------|--------|
| Donor Retention / Churn Prediction | Donor | Predictive | NOT STARTED |
| Donor Upsell Opportunity | Donor | Predictive | NOT STARTED |
| Resident Reintegration Readiness | Case Mgmt | Predictive | NOT STARTED |
| Intervention Effectiveness | Case Mgmt | Explanatory | NOT STARTED |
| Social Media → Donation Conversion | Outreach | Explanatory | NOT STARTED |
| Social Media Engagement Drivers | Outreach | Explanatory | NOT STARTED |

Each pipeline requires:
- Jupyter notebook (.ipynb) with full documentation
- Both a causal and predictive model
- Feature importance analysis + business recommendations
- Deployed as API endpoint or dashboard widget integrated into the web app

---

## Deployment

| Component | Target | Status |
|-----------|--------|--------|
| Frontend | Vercel | NOT STARTED |
| Backend | Azure | NOT STARTED |
| Database | Supabase (cloud) | NOT STARTED — local only so far |
| Environment variables (production) | All platforms | NOT STARTED |
| CI/CD | GitHub → auto-deploy | NOT STARTED |

---

## Summary — What Exists Today

**Built:**
- Database schema (17 tables) + seed data
- 14 backend read-only API endpoints
- 17 C# entity models + EF Core DbContext
- 3 frontend pages: Home, Impact, Admin Dashboard
- Shared components: Header, Footer, CookieConsent, AdminLayout
- Local Supabase dev environment

**Not built:**
- Authentication & authorization (entire system)
- 5 admin pages (Caseload, Recordings, Visitations, Donors, Reports)
- All CRUD endpoints (create, update, delete)
- Login page, Privacy Policy page
- Security hardening (CSP, HSTS, RBAC, etc.)
- Machine learning pipelines (none started)
- Production deployment (nothing deployed)
- IS 401 FigJam deliverables
