# Project Audit — Beacon of Hope

**Date:** 2026-04-07 (re-audited)
**Auditor:** Claude (strict mode — only DONE if 100% grade-ready)

Status key: **DONE** = production-ready, no issues | **PARTIAL** = started but has gaps or bugs | **NOT STARTED** = doesn't exist

---

## IS 413 — Enterprise Application Development

### Public Pages

| Page | Status | Details |
|------|--------|---------|
| Home / Landing Page | **DONE** | Hero, counters, CTAs, testimonials, mission section. "Give Today" button links to PayPal donation page (`https://www.paypal.com/donate`), opens in new tab. |
| Impact / Donor Dashboard | **DONE** | Charts, stats, donation trends all wired to real API. "Donate Now" CTA links to PayPal donation page. Stats banner fixed (reveal animation race condition resolved). |
| Login Page | **DONE** | Full login form with email/password, regex email validation, 12-char password minimum, error handling, password visibility toggle, "Remember Me" checkbox, role-based redirect (admin → /admin, donor → /donor), returnUrl support. |
| Privacy Policy Page | **DONE** | 12-section GDPR-compliant policy, customized for Beacon of Hope, covers minors' data, Philippine DPA, third-party services (Azure, Vercel). Linked from footer. Print button. Cookie preferences button. |
| Cookie Consent | **DONE** | Three-option banner (Reject / Manage / Accept All), preference modal with per-category toggles (necessary, analytics, functional). Google Analytics conditionally loaded only after analytics consent given, removed if revoked. |

### Admin Pages (Authenticated)

| Page | Status | Details |
|------|--------|---------|
| Admin Dashboard | **DONE** | KPI cards, charts, recent donations, active residents trend. Quick-action buttons wired: "Add Resident" → `/admin/caseload/new`, "Log Donation" → `/admin/donations/new`, "New Recording" → `/admin/recordings/new`. |
| Caseload Inventory | **DONE** | List with debounced search, filters (status, safehouse, category, risk level), sorting, pagination. Create/edit forms with 40+ fields. Detail page with collapsible sections. Delete with confirmation dialog. Full CRUD via API. |
| Process Recordings | **DONE** | List with resident filter, sorting, pagination (15/page). Create/edit forms capturing session type, emotional state, narrative, interventions, follow-up. Detail page. Delete with confirmation. Full CRUD via API. |
| Home Visitations & Case Conferences | **DONE** | Visitation list with visit-type filter, safety concerns toggle, pagination. Full CRUD for visitations. Case conferences shown in tabs (upcoming/past) with card format. |
| Donors & Contributions | **DONE** | Tabbed view: Supporters (search, type/status filters, CRUD), Donations (type filter, CRUD), Allocations (by program area and by safehouse tables showing counts and totals). Full CRUD for supporters and donations. |
| Reports & Analytics | **DONE** | Tabbed reports: overview KPIs, donations by source/campaign, resident outcomes (education/health), safehouse comparison with reintegration rates. All wired to real API data. |

### Admin Layout & Navigation

| Item | Status | Details |
|------|--------|---------|
| AdminLayout sidebar | **DONE** | All navigation links point to valid routes (Dashboard, Residents, Recordings, Visitations, Donors, Reports). Settings link removed. Edit Profile button navigates to `/admin`. Logout button wired. |

### Backend API

| Category | Status | Details |
|----------|--------|---------|
| Public read endpoints | **DONE** | 8 public endpoints: 7 impact endpoints + health check + auth/login. All return real DB data from Azure PostgreSQL. |
| Admin read endpoints | **DONE** | 25 admin GET endpoints: metrics, residents (list/detail/filter-options), donations, trends, visitations, conferences, reports (by-source, by-campaign, outcomes, safehouse-comparison, reintegration-rates), recordings, supporters, allocations (by-program, by-safehouse). |
| CRUD endpoints (POST/PUT/DELETE) | **DONE** | Full CUD for all 5 entities: residents, supporters, donations, visitations, recordings. All protected with appropriate auth (AdminOnly policy). |
| Input validation | **PARTIAL** | Login validates email/password presence. Endpoint-level null checks and entity existence checks. **Missing:** No DataAnnotations or FluentValidation on models/DTOs — empty strings, negative amounts, invalid dates accepted without error. |
| Error handling | **PARTIAL** | Structured JSON error responses (`{ error: "message" }`) for 400, 404, 423. 401/403 handled correctly. **Missing:** No global exception handler, limited error types. |
| Pagination | **DONE** | Consistent pattern: `page` (default 1), `pageSize` (default 20, max 100). Response: `{ items, totalCount, page, pageSize }`. Applied to residents, visitations, recordings, supporters, donations. |

### Frontend Infrastructure

| Item | Status | Details |
|------|--------|---------|
| API utility (`apiFetch`) | **DONE** | Centralized in `api.ts`, includes credentials, handles 401 events, JSON parsing. |
| Routing | **DONE** | All pages routed. Admin routes lazy-loaded with `React.lazy()` + `Suspense`. Protected routes with role checks via `ProtectedRoute`. |
| Loading states | **DONE** | All data-fetching pages show loading indicators. |
| Confirmation dialogs | **DONE** | `DeleteConfirmDialog` component used before all delete operations with loading state. |
| Pagination component | **DONE** | Reusable `Pagination` component with page numbers, used across all list pages. |
| Search / filter components | **DONE** | Debounced search (300ms), dropdown filters, URL-persisted filter state. |

### Donor Role Portal

| Item | Status | Details |
|------|--------|---------|
| Donor-specific authenticated view | **DONE** | `/donor` route protected for Donor role. Shows: personalized welcome, summary cards (total contributed, donation count, programs supported), "Where Your Donations Go" allocation breakdown, donation history table (date, type, amount, campaign, recurring status). Loading and error states handled. |

---

## IS 414 — Security (20 pts)

| Requirement | Points | Status | Details |
|-------------|--------|--------|---------|
| HTTPS/TLS | 1 | **DONE** | `app.UseHttpsRedirection()` in code. Vercel and Azure both serve over HTTPS. Both sites live and serving TLS. |
| HTTP → HTTPS redirect | 0.5 | **DONE** | `UseHttpsRedirection()` enabled. Vercel auto-redirects. Azure enforces HTTPS. |
| Authentication (username/password) | 3 | **DONE** | ASP.NET Identity with login endpoint, session cookies (HttpOnly, Secure, SameSite=None for prod cross-origin, SameSite=Lax for dev), 8hr expiry with sliding. |
| Better password policy | 1 | **DONE** | MinLength=12, RequireDigit, RequireNonAlphanumeric. Lockout after 5 failed attempts (15 min). |
| Pages/APIs require auth | 1 | **DONE** | All `/api/admin/*` require authorization. Public endpoints (impact, login, health) correctly open. Frontend uses ProtectedRoute with role checks. 401 responses trigger logout. |
| RBAC — admin can CUD | 1.5 | **DONE** | AdminOnly policy on all POST/PUT/DELETE endpoints. Staff allowed for recording creation. Donor role has read-only portal. |
| Confirmation to delete | 1 | **DONE** | DeleteConfirmDialog used on all detail pages before DELETE API calls. |
| Credentials stored securely | 1 | **DONE** | `.env` files gitignored. `appsettings.Development.json` gitignored. Production connection string set via Azure environment variables. No secrets in committed files. |
| Privacy policy | 1 | **DONE** | Full GDPR-compliant privacy policy page, customized for Beacon of Hope, linked from footer. |
| Cookie consent (fully functional) | 1 | **DONE** | Functional consent with per-category toggles. Analytics cookies blocked until consent given. Not cosmetic. |
| CSP header | 2 | **DONE** | Content-Security-Policy header with: default-src, script-src, style-src, img-src, connect-src, font-src, frame-ancestors, form-action, base-uri. Plus X-Content-Type-Options, X-Frame-Options, Referrer-Policy. |
| Deployed publicly | 4 | **DONE** | Frontend: https://intex2-1.vercel.app. Backend: https://intex-backend-hehbb8gwb2e3b8b6.westus2-01.azurewebsites.net. Database: Azure PostgreSQL. All live and connected. |
| Additional security features | 2 | **PARTIAL** | Have: HttpOnly cookies, Account lockout, Cache-Control on auth, SameSite cookie policy, real PostgreSQL. **Missing:** No HSTS header, no third-party auth (Google), no 2FA/MFA. |

### Security Summary

| Category | Points Available | Points Estimated |
|----------|-----------------|-----------------|
| Confidentiality (HTTPS + redirect) | 1.5 | 1.5 |
| Authentication | 5 | 5 |
| RBAC | 1.5 | 1.5 |
| Integrity | 1 | 1 |
| Credentials | 1 | 1 |
| Privacy | 2 | 2 |
| CSP | 2 | 2 |
| Deployed | 4 | 4 |
| Additional | 2 | 1 (lockout + real DB + SameSite) |
| **Total** | **20** | **~19** |

---

## IS 455 — Machine Learning (20 pts)

### Pipeline Status

| Pipeline | Domain | Type | Notebook | Model File | Inference Script | Web Integration | Status |
|----------|--------|------|----------|-----------|-----------------|----------------|--------|
| Reintegration Readiness | Case Mgmt | Predictive | ✅ Complete | ✅ `.sav` trained | ✅ `infer.py` | ❌ No API endpoint, no UI | **PARTIAL** |
| Reintegration Drivers | Case Mgmt | Explanatory | ✅ Complete | ✅ `.sav` trained | ✅ `infer.py` | ❌ No API endpoint, no UI | **PARTIAL** |
| Donor Churn | Donor | Predictive | ✅ Complete | ✅ `.sav` trained | ✅ `infer.py` | ❌ No API endpoint, no UI | **PARTIAL** |
| Social Media Content | Outreach | Explanatory | ✅ Complete | ✅ `.sav` trained | ✅ `infer.py` | ❌ No API endpoint, no UI | **PARTIAL** |
| Social Media Timing | Outreach | Predictive | ✅ Complete | ✅ `.sav` trained | ✅ `infer.py` | ❌ No API endpoint, no UI | **PARTIAL** |
| Incident Early Warning | Case Mgmt | Predictive | ✅ Complete | ✅ `.sav` trained | ✅ `infer.py` | ❌ No API endpoint, no UI | **PARTIAL** |

### What Exists

- **All 6 training notebooks** complete with feature engineering, model training, evaluation
- **All 6 inference scripts** write predictions to `ml_predictions` and `ml_prediction_history` tables
- **Database tables** created in Azure PostgreSQL via EF Core migrations (with proper indexes)
- **`run_predictions.py`** entry point for nightly batch scoring
- **Config** (`config.py`) defines all table names, model paths, thresholds
- **`utils_db.py`** migrated from Supabase to SQLAlchemy + psycopg2 for direct Azure PostgreSQL access

### What's Missing for All Pipelines to be DONE

- No backend API endpoint serves ML predictions to the frontend
- No frontend page/widget displays predictions or driver insights
- No scheduled job (GitHub Actions cron) to run nightly predictions
- Rubric requires "deployed and accessible" and "integrated with the web application in a meaningful way"

---

## Deployment

| Component | Target | Status | Details |
|-----------|--------|--------|---------|
| Frontend | Vercel | **DONE** | Live at https://intex2-1.vercel.app. SPA routing configured. |
| Backend | Azure | **DONE** | Live at https://intex-backend-hehbb8gwb2e3b8b6.westus2-01.azurewebsites.net. Health check returns `status: ok, database: connected`. Auto-deploys from main. |
| Database | Azure PostgreSQL | **DONE** | `intex-db.postgres.database.azure.com`. All tables created via EF Core migrations. Data seeded. ML prediction tables added. |
| Production env vars | All platforms | **DONE** | Connection string configured in Azure App Service. `VITE_API_URL` configured in Vercel. |

---

## Known Bugs & Issues

| # | Severity | Location | Issue |
|---|----------|----------|-------|
| 1 | **LOW** | Backend DTOs | No field-level input validation — empty strings, negative amounts, bad dates accepted |
| 2 | **LOW** | Backend `Program.cs` | No HSTS header — worth points under "additional security features" |
| 3 | **MEDIUM** | ML pipelines | All 6 pipelines trained but no web integration (no API endpoints serving predictions, no frontend display) |

---

## Summary — What's Grade-Ready vs. What's Not

### Grade-Ready (DONE)

- ✅ Home / Landing page with working PayPal donation links
- ✅ Impact page with live charts and stats
- ✅ Login page with validation and error handling
- ✅ Privacy policy page (GDPR-compliant, customized)
- ✅ Cookie consent (fully functional, not cosmetic)
- ✅ ASP.NET Identity auth with strong password policy + lockout
- ✅ RBAC (Admin/Staff/Donor roles, AdminOnly on CUD endpoints)
- ✅ Delete confirmation dialogs on all entities
- ✅ CSP header + X-Frame-Options + X-Content-Type-Options + Referrer-Policy
- ✅ Caseload Inventory — full CRUD, search, filter, pagination
- ✅ Process Recordings — full CRUD with all required fields
- ✅ Home Visitations & Case Conferences — full CRUD + conference view
- ✅ Donors & Contributions — full CRUD + allocation view (by program and safehouse)
- ✅ Reports & Analytics — donations, outcomes, safehouse comparison, reintegration
- ✅ Donor Portal — authenticated donors see their history and impact
- ✅ Admin sidebar — all links valid, no dead routes
- ✅ 33+ backend API endpoints (8 public, 25+ admin-protected)
- ✅ Full deployment: Frontend (Vercel), Backend (Azure), Database (Azure PostgreSQL)
- ✅ Credentials stored securely — no secrets in committed files
- ✅ Cross-origin auth cookies working (SameSite=None for production)

### Needs Work (PARTIAL)

- ⚠️ Input validation — no DataAnnotations on models/DTOs (low risk for grading)
- ⚠️ Additional security — no HSTS, no third-party auth, no 2FA
- ⚠️ ML web integration — all 6 pipelines trained but predictions not surfaced in the app

### Priority Order

1. **Integrate ML predictions into the web app** — API endpoints to serve predictions + frontend widgets/dashboard
2. **Add HSTS header** — easy additional security points
3. **Consider additional security** — third-party auth, 2FA for extra points
4. **Input validation** — add DataAnnotations to models if time permits
