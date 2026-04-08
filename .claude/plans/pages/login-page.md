# Login Page Plan

## Purpose

The Login Page is the authentication gateway for the Beacon of Hope web application. It allows users to sign in with a username/email and password, validates credentials against ASP.NET Identity on the .NET 10 backend, and redirects users to the appropriate landing page based on their RBAC role (Admin -> admin dashboard, Staff -> caseload inventory, Donor -> donor portal).

### IS413 Requirement
"Allows users to authenticate using a username and password, with proper validation and error handling."

### IS414 Requirement
ASP.NET Identity integration, enhanced password policy (12+ chars, uppercase, lowercase, digit, special character), RBAC enforcement (admin/donor/staff roles), session management with secure cookies.

---

## Personas

### 1. Maria Chen (Recurring Donor)
- **Age:** 42
- **Location:** San Francisco, CA
- **Device:** iPhone 14 Pro, Safari mobile
- **Role:** Donor
- **Background:** Filipino-American marketing executive who donates monthly to Beacon of Hope. Frequently checks her donation history on her phone during commutes.
- **Goals:** Log in quickly to check donation receipts, see where her money went, update payment info.
- **Frustrations:** Forgot her password last quarter and the reset process was confusing. Hates typing long passwords on mobile. Worries about security because the org handles sensitive data about minors.
- **Key Question:** "Can I get in fast on my phone and trust that my account and the children's data are safe?"

### 2. Elena Reyes (Social Worker)
- **Age:** 34
- **Location:** Cebu City, Philippines
- **Device:** Office desktop (Windows, Chrome) and personal Android phone
- **Role:** Staff/Employee
- **Background:** Licensed social worker assigned to Safehouse 2. Logs in multiple times daily to update case notes and resident records. Sometimes works from her phone when doing field visits.
- **Goals:** Fast, reliable login so she can document sessions immediately. Needs to stay logged in during a workday without re-authenticating constantly.
- **Frustrations:** Internet connectivity in the field is spotty. Getting locked out mid-shift because of session timeouts wastes precious time. The password policy at her last org was so strict she had to write passwords down (defeating the purpose).
- **Key Question:** "Will the login work reliably even on slow connections, and will I stay logged in long enough to finish my documentation?"

### 3. Director Reyes (Co-Founder / Admin)
- **Age:** 52
- **Location:** Portland, OR (remote from US)
- **Device:** MacBook Pro, Chrome; occasionally iPad
- **Role:** Admin
- **Background:** Co-founded Beacon of Hope 15 years ago. Manages operations remotely from the US. Needs full admin access to oversee all safehouses, staff assignments, and financial data.
- **Goals:** Log in and land on the admin dashboard immediately. Needs to manage user accounts, reset staff passwords, and review audit logs.
- **Frustrations:** Time zone difference means she sometimes logs in at odd hours; worried about unauthorized access to admin functions. Wants clear confirmation she is in the admin view.
- **Key Question:** "How do I know only authorized people can access admin functions, and can I manage user access efficiently?"

### 4. David Kim (First-Time Visitor)
- **Age:** 28
- **Location:** Austin, TX
- **Device:** MacBook Air, Firefox
- **Role:** Unauthenticated / Prospective Donor
- **Background:** Saw a social media post about Beacon of Hope and clicked through. Interested in donating but wants to learn more first. May or may not create an account.
- **Goals:** Understand what the login is for, decide whether to create an account, feel confident the org is legitimate and secure.
- **Frustrations:** Doesn't want to create an account just to browse. Suspicious of nonprofits that ask for personal data before explaining their mission. Dislikes unclear sign-up flows.
- **Key Question:** "Do I need an account to learn about this org, and if I sign up, what will I be able to do?"

---

## User Stories

### Authentication Core

**US-1: Basic email/password login**
As a registered user, I want to enter my email and password to log in, so that I can access my role-appropriate features.
- **Acceptance Criteria:**
  - Login form has email and password fields
  - Form submits to ASP.NET Identity authentication endpoint
  - Successful login returns a JWT or session cookie
  - User is redirected based on role (admin -> /admin/dashboard, staff -> /caseload, donor -> /donor/portal)
  - Failed login shows a generic error ("Invalid email or password") without revealing which field is wrong

**US-2: Client-side validation**
As a user, I want immediate feedback if I leave fields empty or enter an invalid email format, so that I don't waste time submitting a bad form.
- **Acceptance Criteria:**
  - Email field validates format (contains @ and domain)
  - Password field validates minimum length (12 characters)
  - Validation messages appear inline below the relevant field
  - Submit button is disabled until both fields pass basic validation
  - Validation runs on blur and on submit attempt

**US-3: Server-side error handling**
As a user, I want clear error messages when authentication fails, so that I know what went wrong without exposing security details.
- **Acceptance Criteria:**
  - Invalid credentials show "Invalid email or password" (no distinction between wrong email vs wrong password)
  - Account locked out shows "Account temporarily locked. Try again in X minutes."
  - Server error (500) shows "Something went wrong. Please try again later."
  - Network error shows "Unable to connect. Check your internet connection."
  - Errors display in an alert component above the form

**US-4: Password visibility toggle**
As a mobile user (Maria), I want to toggle password visibility so I can verify what I typed on my small keyboard.
- **Acceptance Criteria:**
  - Eye icon button in the password field toggles between masked and plain text
  - Default state is masked (type="password")
  - Toggle is accessible via keyboard (Enter/Space)
  - Icon changes to indicate current state (eye vs eye-slash)

**US-5: Account lockout after failed attempts**
As an admin (Director Reyes), I want accounts to lock after 5 failed login attempts, so that brute-force attacks are mitigated.
- **Acceptance Criteria:**
  - After 5 consecutive failed attempts, account is locked for 15 minutes
  - Lockout counter resets on successful login
  - Locked user sees a message with remaining lockout time
  - Admin can manually unlock accounts from the user management panel
  - Lockout events are logged for audit

### Password Policy

**US-6: Password requirements display**
As a new user, I want to see the password requirements clearly, so that I create a compliant password on my first try.
- **Acceptance Criteria:**
  - Password requirements listed below the password field on registration/reset
  - Requirements: minimum 12 characters, 1 uppercase, 1 lowercase, 1 digit, 1 special character
  - Each requirement shows a check/x icon as user types
  - Requirements are always visible (not hidden behind a tooltip)

**US-7: Enforce enhanced password policy**
As the system, I want to enforce IS414 password requirements, so that all accounts meet security standards.
- **Acceptance Criteria:**
  - ASP.NET Identity configured with: RequiredLength=12, RequireUppercase=true, RequireLowercase=true, RequireDigit=true, RequireNonAlphanumeric=true
  - Password is validated both client-side (for UX) and server-side (for security)
  - Rejection message specifies which requirements are not met

### Role-Based Access Control

**US-8: Role-based redirect after login**
As a user, I want to be redirected to the correct landing page for my role after login, so that I see relevant content immediately.
- **Acceptance Criteria:**
  - Admin role redirects to /admin/dashboard
  - Staff role redirects to /caseload
  - Donor role redirects to /donor/portal
  - If user has multiple roles, highest privilege role determines redirect
  - Redirect happens automatically within 1 second of successful auth

**US-9: Protected route enforcement**
As the system, I want to prevent unauthorized access to role-restricted pages, so that data is only visible to appropriate users.
- **Acceptance Criteria:**
  - Unauthenticated users accessing any protected route are redirected to /login
  - Authenticated users accessing a route above their role see a 403 "Access Denied" page
  - The return URL is preserved so users land on their intended page after login
  - API endpoints return 401/403 appropriately

**US-10: Session persistence**
As Elena (staff), I want my session to persist for a reasonable time during my workday, so that I don't get logged out while documenting cases.
- **Acceptance Criteria:**
  - Session/token lasts 8 hours for staff and admin roles
  - Session lasts 1 hour for donor role (less sensitive operations)
  - A "Remember me" checkbox extends session to 30 days
  - Session refreshes on activity (sliding expiration)
  - Expired session redirects to login with a "Session expired" message

### Password Recovery

**US-11: Forgot password flow**
As Maria (donor), I want to reset my password via email, so that I can regain access when I forget my credentials.
- **Acceptance Criteria:**
  - "Forgot password?" link below the login form
  - Clicking it opens a form that asks for email only
  - Submitting sends a password reset email with a time-limited token (1 hour)
  - Reset page enforces the same password policy as registration
  - Success message: "If an account exists with that email, a reset link has been sent" (no account enumeration)

**US-12: Password reset token security**
As the system, I want password reset tokens to be single-use and time-limited, so that reset links cannot be reused or exploited.
- **Acceptance Criteria:**
  - Token expires after 1 hour
  - Token is invalidated after successful password change
  - Using an expired/invalid token shows "This reset link has expired. Please request a new one."
  - Tokens are generated using ASP.NET Identity's built-in token provider

### UX & Accessibility

**US-13: Mobile-responsive login form**
As Maria (phone user), I want the login page to work well on my iPhone, so that I can log in during my commute.
- **Acceptance Criteria:**
  - Form is centered and readable on screens 320px and up
  - Input fields are large enough for touch (min 44px tap target)
  - Keyboard type is "email" for email field
  - No horizontal scrolling on any mobile viewport
  - Form is usable in both portrait and landscape

**US-14: Keyboard accessibility**
As any user, I want to navigate the login form entirely by keyboard, so that the page meets WCAG 2.1 AA standards.
- **Acceptance Criteria:**
  - Tab order: email -> password -> remember me -> login button -> forgot password -> register link
  - All interactive elements have visible focus indicators
  - Enter key submits the form from any input field
  - Error messages are announced by screen readers (aria-live="polite")
  - Form labels are properly associated with inputs (htmlFor)

**US-15: Loading state during authentication**
As a user on a slow connection (Elena in the field), I want to see a loading indicator after clicking login, so that I know the system is processing.
- **Acceptance Criteria:**
  - Submit button shows a spinner and "Signing in..." text after click
  - Button is disabled during the request to prevent double-submit
  - If the request takes more than 10 seconds, show "Still working..." message
  - Loading state clears on success or error response

**US-16: Branding and trust indicators**
As David (first-time visitor), I want the login page to look professional and show trust indicators, so that I feel confident this is a legitimate organization.
- **Acceptance Criteria:**
  - Beacon of Hope logo displayed prominently
  - "501(c)(3) Nonprofit Organization" text visible
  - Brief tagline about the mission ("Safe homes for girls in the Philippines")
  - Link to the public homepage for users who want to learn more before logging in
  - HTTPS padlock is visible (enforced by deployment, not code)

**US-17: Registration link for new donors**
As David (prospective donor), I want a clear path to create an account from the login page, so that I can sign up if I decide to support the org.
- **Acceptance Criteria:**
  - "Don't have an account? Register" link below the login form
  - Link navigates to /register
  - Registration is limited to donor role (staff/admin accounts created by admin only)
  - Registration form collects: name, email, password, confirm password

### Security & Audit

**US-18: CSRF protection**
As the system, I want login requests protected against CSRF attacks, so that credentials cannot be submitted from malicious sites.
- **Acceptance Criteria:**
  - Anti-forgery tokens are included in login requests
  - Server rejects requests without valid anti-forgery tokens
  - SameSite cookie attribute is set to "Strict" or "Lax"

**US-19: Login audit logging**
As Director Reyes (admin), I want all login attempts logged, so that I can review access patterns and detect suspicious activity.
- **Acceptance Criteria:**
  - Successful logins log: user ID, timestamp, IP address, user agent
  - Failed logins log: attempted email, timestamp, IP address, user agent
  - Lockout events are logged with the same detail
  - Logs are accessible to admin role only
  - Logs are retained for 90 days minimum

**US-20: Secure cookie configuration**
As the system, I want authentication cookies configured securely, so that session hijacking is prevented.
- **Acceptance Criteria:**
  - HttpOnly flag set (not accessible via JavaScript)
  - Secure flag set (HTTPS only)
  - SameSite attribute set to "Lax" minimum
  - Cookie expiration matches session duration configuration

**US-21: HTTPS enforcement on login page**
As the system, I want all login page traffic served over HTTPS with HTTP-to-HTTPS redirection, so that credentials are never transmitted in plaintext.
- **Acceptance Criteria:**
  - Login page is only accessible via HTTPS
  - HTTP requests to /login are 301-redirected to HTTPS
  - HSTS header is sent (Strict-Transport-Security) if pursuing additional security points
  - No mixed content warnings on the login page

**US-22: Content Security Policy header**
As the system, I want a properly configured CSP header on the login page, so that XSS and injection attacks are mitigated (IS414 rubric: 2 points).
- **Acceptance Criteria:**
  - CSP header (not meta tag) is set in HTTP response headers
  - `default-src`, `script-src`, `style-src`, `img-src` directives are defined restrictively
  - No `unsafe-inline` or `unsafe-eval` unless absolutely necessary (and documented)
  - CSP header is verifiable in browser developer tools (Network tab)
  - CSP violations are reported (report-uri or report-to directive)

**US-23: Input sanitization on login fields**
As the system, I want all login form inputs sanitized server-side, so that SQL injection and XSS attacks via the login form are prevented.
- **Acceptance Criteria:**
  - Email and password inputs are sanitized/parameterized before any database query
  - ASP.NET Identity's built-in parameterized queries are used (no raw SQL)
  - HTML entities in input are encoded before any error message rendering
  - No user-supplied input is ever rendered unescaped in error messages

**US-24: Third-party authentication (additional security feature)**
As a user, I want the option to log in with a third-party provider (e.g., Google), so that I have a convenient and secure alternative to username/password (IS414 additional security: up to 2 points).
- **Acceptance Criteria:**
  - At least one OAuth2/OpenID Connect provider button on the login page (e.g., "Sign in with Google")
  - Provider callback correctly creates or links an ASP.NET Identity account
  - Third-party login users are assigned the Donor role by default
  - Third-party auth does not bypass RBAC or session policies
  - Clear visual separation between password login and third-party login (divider: "or")

**US-25: Credential storage safety**
As the system, I want credentials and API keys stored securely outside the codebase, so that secrets are not exposed in the public repository (IS414 rubric: 1 point).
- **Acceptance Criteria:**
  - No passwords, connection strings, or API keys appear in source code or git history
  - Secrets are loaded from environment variables, .env file (gitignored), or a secrets manager
  - .env and similar files are listed in .gitignore
  - ASP.NET Identity password hashing uses the default bcrypt/PBKDF2 (no custom hashing)

**US-26: Logout functionality**
As any authenticated user, I want a clear way to log out, so that my session is terminated and cannot be reused.
- **Acceptance Criteria:**
  - Logout button/link is accessible from every authenticated page (in header/nav)
  - Clicking logout invalidates the session/token server-side
  - After logout, the user is redirected to /login or the public homepage
  - Back button after logout does not restore an authenticated state (cache-control headers)
  - "Remember me" cookie is cleared on explicit logout

**US-27: Concurrent session handling**
As Director Reyes (admin), I want to ensure that admin sessions cannot be hijacked through concurrent logins, so that sensitive operations are protected.
- **Acceptance Criteria:**
  - When an admin logs in from a new device, previous sessions are optionally invalidated
  - Session tokens are bound to a security stamp that changes on password change
  - Password change forces re-authentication on all other sessions

---

## Definition of Done

- [ ] Login form renders on /login with email and password fields
- [ ] Client-side validation provides immediate feedback for empty/invalid inputs
- [ ] Server-side authentication uses ASP.NET Identity with enhanced password policy (12+ chars, upper, lower, digit, special)
- [ ] Failed login shows generic error without revealing which credential is wrong
- [ ] Account locks after 5 failed attempts for 15 minutes
- [ ] Successful login redirects to role-appropriate landing page (admin/staff/donor)
- [ ] Protected routes redirect unauthenticated users to /login with return URL
- [ ] "Forgot password" flow sends a time-limited reset email
- [ ] "Remember me" option extends session duration
- [ ] Form is fully responsive (320px+) and keyboard accessible (WCAG 2.1 AA)
- [ ] Loading state shown during authentication request
- [ ] CSRF protection and secure cookie flags configured
- [ ] Login attempts (success/failure/lockout) are audit logged
- [ ] HTTPS enforced with HTTP-to-HTTPS redirect (IS414: 1.5 pts)
- [ ] CSP header configured and verifiable in browser dev tools (IS414: 2 pts)
- [ ] Login inputs sanitized server-side to prevent injection (IS414 additional security)
- [ ] No credentials/secrets in source code or git history (IS414: 1 pt)
- [ ] Logout clears session server-side and client-side, prevents back-button reuse
- [ ] Third-party OAuth login option available (IS414 additional security)
- [ ] All user stories pass acceptance criteria
- [ ] Tested on Chrome, Safari (mobile), Firefox
- [ ] Video documentation clearly demonstrates each security feature (IS414 grading requirement)

---

## Review Notes

*Reviewed 2026-04-06. Compared against IS413 requirements, IS414 security rubric, and intex_requirements.md.*

### What Was Already Strong

- Personas are well-developed with realistic device/context details and map cleanly to all three roles (donor, staff, admin) plus an unauthenticated visitor.
- US-1 through US-5 cover the authentication core solidly with specific, testable acceptance criteria.
- Password policy stories (US-6, US-7) correctly cite the IS414 requirement for 12+ chars with complexity rules.
- RBAC redirect (US-8) and protected routes (US-9) are well-specified.
- Accessibility and mobile UX stories (US-13, US-14) are thorough.

### Gaps Identified and Addressed

#### 1. Missing IS414 Rubric Items (High Priority -- Direct Points)

The original plan covered authentication and RBAC well but missed several IS414 rubric line items that directly affect the login page or are most naturally implemented alongside it:

| Rubric Item | Points | Original Coverage | Added |
|---|---|---|---|
| HTTPS/TLS + HTTP redirect | 1.5 pts | Not mentioned | US-21 |
| CSP header (must be HTTP header, not meta tag) | 2 pts | Not mentioned | US-22 |
| Credentials not in repo | 1 pt | Not mentioned | US-25 |
| Additional security features | 2 pts | Not mentioned | US-24 (third-party auth), US-23 (input sanitization) |

These represent 6.5 points on the IS414 rubric that had zero coverage in the original plan. CSP alone is worth 2 points and is explicitly graded by checking the browser developer tools -- this must be a response header, not a meta tag.

#### 2. Missing Logout Story (Critical Functional Gap)

The original plan had no user story for logging out. You cannot have a login page plan without a logout story -- session termination is a core security requirement. US-26 was added to cover:
- Server-side session invalidation
- Cache-control headers to prevent back-button session reuse
- "Remember me" cookie cleanup on explicit logout

#### 3. Concurrent Session / Security Stamp Handling

US-27 was added because ASP.NET Identity's security stamp feature is a built-in mechanism that should be leveraged. When an admin changes their password, all other sessions should be invalidated. This is low-effort to implement but important for the security rubric's "additional features" category.

#### 4. Password Policy Warning

The requirements document contains a critical warning: "This will be STRICTLY graded according to how you were taught in class and how you were instructed to implement password policies in your lab. AI or other code/documentation suggesting policies that conflict with how you were taught in class will NOT be considered a reason to grant points."

US-7 currently specifies RequiredLength=12 with all complexity flags. **The team MUST verify these exact values match what was taught in class.** If the class taught RequiredLength=10 or RequiredLength=14, for example, the rubric values must be used regardless of what this plan says. This is a "strictly graded" item -- do not deviate from class instruction.

#### 5. Video Documentation Requirement

The IS414 requirements state: "features that are not documented (especially security features) don't exist." Every security feature on the login page must be visibly demonstrated in the video. This includes:
- Showing the CSP header in browser dev tools
- Demonstrating the password policy rejection
- Showing RBAC redirects for each role
- Showing account lockout behavior
- Demonstrating HTTPS and the redirect

A DoD item was added for this. Failing to document a feature in the video means zero points regardless of implementation quality.

#### 6. RBAC Nuance from Requirements

The requirements state: "You may choose whether or not to have a staff (or employee) role that differs from the admin user." The current plan assumes three distinct roles (admin, staff, donor). The team should confirm this design decision is intentional and document it. If staff and admin are merged, US-8 redirect logic and US-10 session durations simplify significantly.

Also note: "Only an authenticated user with an admin role should be able to add, modify, or in rare cases delete data." This means staff role (if it exists as separate from admin) should be read-only for CUD operations on most data, or the team needs to carefully define which CUD operations staff can perform. US-9 should be reviewed once this decision is finalized.

#### 7. Minor Gaps Not Worth Separate Stories

- **Rate limiting on the login endpoint**: US-5 covers account lockout, but IP-based rate limiting (to prevent distributed brute force across many accounts) is not covered. Consider adding this as an implementation detail under US-5 or as an "additional security feature."
- **Password breach checking**: Not required by rubric, but checking passwords against known breach databases (e.g., HaveIBeenPwned API) would be a strong "additional security feature" for the 2-point category.
- **Email confirmation before first login**: Not required by rubric, but common in production. Omitting is fine for this project scope.

### Stories Added in This Review

| Story | Title | Rationale |
|---|---|---|
| US-21 | HTTPS enforcement | IS414 rubric: 1.5 pts for HTTPS + redirect |
| US-22 | CSP header | IS414 rubric: 2 pts, must be HTTP header |
| US-23 | Input sanitization | IS414 additional security features |
| US-24 | Third-party auth | IS414 additional security features |
| US-25 | Credential storage | IS414 rubric: 1 pt |
| US-26 | Logout | Critical functional gap -- no login plan is complete without logout |
| US-27 | Concurrent sessions | Leverages ASP.NET Identity security stamps, good for additional security points |

---

## Requirements Coverage Matrix

Cross-reference of every IS414 rubric line item against login page user stories. Items owned by other pages are noted but tracked here for awareness.

### Fully Covered by User Stories

| Rubric Item | Points | Covering Stories | Implementation Notes |
|---|---|---|---|
| Auth - Authentication using username/password | 3 | US-1, US-2, US-3, US-4, US-15 | ASP.NET Identity `SignInManager.PasswordSignInAsync()`. React form posts to `/api/auth/login`. Returns JWT or cookie. **Package:** `Microsoft.AspNetCore.Identity.EntityFrameworkCore`. **React:** controlled form with `useState`, `fetch` to auth endpoint. |
| Auth - Require better passwords | 1 | US-6, US-7 | `builder.Services.Configure<IdentityOptions>(opts => { opts.Password.RequiredLength = 12; ... })` in `Program.cs`. **WARNING:** Values MUST match class instruction exactly -- verify before implementing. Client-side mirror validation for UX only; server is authoritative. |
| Auth - Pages and API endpoints require auth where needed | 1 | US-9 | `[Authorize]` on all CUD controllers. React `<ProtectedRoute>` wrapper checks auth state and redirects to `/login?returnUrl=`. `/api/auth/login` and `/api/auth/me` must NOT have `[Authorize]`. **Tricky part:** deciding which read endpoints need auth (impact dashboard is public, caseload is not). |
| Auth - RBAC - Only admin can CUD (including endpoints) | 1.5 | US-8, US-9 | `[Authorize(Roles = "Admin")]` on POST/PUT/DELETE endpoints. React hides CUD buttons for non-admin roles. **Tricky part:** If staff role exists separately from admin, need to define exactly which operations staff can perform -- requirements say "only admin" for CUD, so staff may be read-only for most data. |
| Confidentiality - Use HTTPS/TLS | 1 | US-21 | Azure App Service or Vercel provides cert automatically. `app.UseHttpsRedirection()` in `Program.cs`. |
| Confidentiality - Redirect HTTP to HTTPS | 0.5 | US-21 | `app.UseHttpsRedirection()` handles this. On Azure, also configure "HTTPS Only" in App Service settings. |
| Credentials - Stored securely | 1 | US-25 | `.env` file (gitignored) for local dev. Azure App Service Configuration for prod. Connection strings, JWT secret, OAuth client secrets all via env vars. `builder.Configuration["JwtSecret"]` pattern. **Verify:** run `git log --all -p -- "*.env" "appsettings.*.json"` to confirm no secrets in git history. |
| Attack Mitigations - CSP header | 2 | US-22 | Middleware in `Program.cs`: `app.Use(async (context, next) => { context.Response.Headers.Append("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://accounts.google.com"); ... })`. **MUST be HTTP header, NOT meta tag.** Graders check Network tab in dev tools. **Tricky part:** React dev server (Vite) needs its own CSP config for local dev; Google OAuth requires `connect-src` and `frame-src` for `accounts.google.com`. |

### Partially Covered (Login page contributes but other pages also needed)

| Rubric Item | Points | Covering Stories | What Login Page Provides | What's Still Needed Elsewhere |
|---|---|---|---|---|
| Integrity - Confirmation to delete data | 1 | (none in login plan) | Login page does not delete data. | Admin pages (Caseload, Donors, etc.) must implement confirmation dialogs before DELETE API calls. This is NOT the login page's responsibility, but the plan should note it as a dependency. |
| Privacy - Privacy policy | 1 | (none in login plan) | Login page can link to privacy policy in footer. | Dedicated privacy policy page must be created and populated with GDPR-compliant content. |
| Privacy - Cookie consent | 1 | (none in login plan) | Login page must render the existing CookieConsent component. | CookieConsent component needs to be verified as fully functional (actually blocking cookies until consent), not just cosmetic. Per the audit, component exists but functionality is unverified. |
| Availability - Deployed publicly | 4 | (none in login plan) | Login page must work when deployed. | Deployment of frontend (Vercel), backend (Azure), and DB (Azure PostgreSQL) is a separate workstream. |
| Additional security features | 2 | US-23, US-24, US-27 | Third-party auth (Google OAuth), input sanitization, concurrent session handling. | These three features from the login page alone could earn the full 2 points, but the team may also contribute features from other pages (HSTS, browser-accessible cookie for user preferences, Docker deployment, 2FA). See "Above and Beyond Ideas" below. |

### NOT Covered by Login Page Plan (Owned by Other Pages/Workstreams)

| Rubric Item | Points | Owner | Notes |
|---|---|---|---|
| Integrity - Confirmation to delete data | 1 | Admin pages (Caseload, Donors, Recordings, Visitations) | Login page has no delete operations. Must be implemented on every page with delete functionality. React pattern: `<ConfirmDialog>` component triggered before `fetch(url, { method: 'DELETE' })`. |
| Privacy - Privacy policy | 1 | Privacy Policy page | Separate page plan needed. Login page should link to it. |
| Privacy - Cookie consent | 1 | CookieConsent component (global) | Already exists per audit; needs functional verification. Must actually prevent non-essential cookies until user consents -- not just a banner. |
| Availability - Deployed publicly | 4 | DevOps/Deployment workstream | Largest single point item on the rubric. Independent of login page code. |

### IS413 Rubric Coverage (Login Page Specifically)

| Rubric Item | Status | Covering Stories |
|---|---|---|
| Login page: authenticate with username/password | FULLY COVERED | US-1, US-2, US-3 |
| Login page: proper validation | FULLY COVERED | US-2 (client-side), US-3 (server-side), US-7 (password policy) |
| Login page: error handling | FULLY COVERED | US-3 (generic errors, lockout messages, network errors) |

### Points Summary

| Category | Points Possible | Points Covered by Login Plan | Points Requiring Other Pages |
|---|---|---|---|
| Confidentiality (HTTPS) | 1.5 | 1.5 (US-21) | 0 |
| Authentication | 3 | 3 (US-1 through US-5) | 0 |
| Better passwords | 1 | 1 (US-6, US-7) | 0 |
| Auth on pages/APIs | 1 | 1 (US-9) | 0 (but must be applied on every protected endpoint) |
| RBAC | 1.5 | 1.5 (US-8, US-9) | 0 (but enforcement needed on all CUD endpoints) |
| Integrity (delete confirm) | 1 | 0 | 1 |
| Credentials | 1 | 1 (US-25) | 0 |
| Privacy policy | 1 | 0 | 1 |
| Cookie consent | 1 | 0 | 1 |
| CSP header | 2 | 2 (US-22) | 0 |
| Deployed publicly | 4 | 0 | 4 |
| Additional security | 2 | 2 (US-23, US-24, US-27) | 0 |
| **TOTAL** | **20** | **13** | **7** |

The login page plan directly addresses **13 of 20 IS414 points**. The remaining 7 points (deployment, privacy policy, cookie consent, delete confirmation) belong to other workstreams but should be tracked as dependencies.

---

## Above and Beyond Ideas

The IS414 rubric allocates **2 points for "Additional security features"** beyond the minimum requirements. The current plan already includes US-23 (input sanitization), US-24 (third-party auth), and US-27 (concurrent sessions). To maximize the 2 points and create margin for partial credit, here are additional ideas the login page can contribute:

### High-Value Ideas (Strong candidates for full/partial credit)

**1. Third-Party Authentication via Google OAuth (US-24 -- already planned)**
- **Effort:** Medium
- **Packages:** `Microsoft.AspNetCore.Authentication.Google`
- **Implementation:** Add `builder.Services.AddAuthentication().AddGoogle(opts => { opts.ClientId = ...; opts.ClientSecret = ...; })` in `Program.cs`. React renders a "Sign in with Google" button that redirects to `/api/auth/google-login`. Callback creates or links an ASP.NET Identity user with Donor role.
- **Tricky parts:** Google OAuth credentials must be in env vars (not code). Callback URL must match exactly between Google Console and server config. Cookie SameSite policy may need to be "Lax" (not "Strict") for the OAuth redirect flow to work.
- **Video demo:** Show clicking Google button, Google consent screen, redirect back to app as authenticated donor.

**2. HSTS (HTTP Strict Transport Security)**
- **Effort:** Low (potentially 1 line of code, but can be tricky with some cloud providers)
- **Implementation:** `app.UseHsts()` in `Program.cs` (production only). Set `Strict-Transport-Security: max-age=31536000; includeSubDomains` header. Azure App Service supports this natively.
- **Tricky parts:** If using a reverse proxy or CDN, HSTS may need to be configured at that layer instead. Test in staging first -- an incorrect HSTS policy can lock users out of your site.
- **Video demo:** Show the `Strict-Transport-Security` header in browser dev tools Network tab.

**3. Browser-Accessible Cookie for User Preferences (e.g., Dark Mode)**
- **Effort:** Low-Medium
- **Implementation:** Set a non-HttpOnly cookie (`document.cookie = "theme=dark; path=/; SameSite=Lax"`) when user toggles dark/light mode. React reads this cookie on load to apply the theme. This is explicitly called out in the rubric as an example.
- **Where it fits:** The login page could include a theme toggle in the corner. The cookie persists the preference across sessions even for unauthenticated users.
- **Video demo:** Toggle theme, show cookie in dev tools Application tab, refresh page to show persistence.
- **Why it's strategic:** This is one of the easiest "additional security features" because it's really a UX feature that happens to use cookies in a way the rubric rewards.

**4. Data Sanitization / Input Encoding (US-23 -- already planned)**
- **Effort:** Low
- **Implementation:** ASP.NET Identity already uses parameterized queries (no raw SQL). For extra credit, add `HtmlEncoder.Default.Encode()` to any user input rendered in error messages. On the React side, React's JSX already escapes by default -- just avoid `dangerouslySetInnerHTML`.
- **Video demo:** Show attempting to submit `<script>alert('xss')</script>` as an email and demonstrate it's safely handled (no alert, encoded output).

**5. Rate Limiting on Login Endpoint (IP-based)**
- **Effort:** Low-Medium
- **Packages:** `Microsoft.AspNetCore.RateLimiting` (built into .NET 8+)
- **Implementation:** `builder.Services.AddRateLimiter(opts => { opts.AddFixedWindowLimiter("login", policy => { policy.Window = TimeSpan.FromMinutes(5); policy.PermitLimit = 20; }); })`. Apply to login endpoint with `[EnableRateLimiting("login")]`.
- **Why it matters:** US-5 covers per-account lockout, but IP-based rate limiting prevents distributed brute force across many accounts. This is a genuine security improvement.
- **Video demo:** Use a tool like `curl` in a loop to show the 429 response after exceeding the limit.

### Medium-Value Ideas (Worth considering if time allows)

**6. Two-Factor Authentication (TOTP)**
- **Effort:** High
- **Packages:** ASP.NET Identity has built-in TOTP support via `UserManager.GenerateNewTwoFactorRecoveryCodesAsync()` and QR code generation.
- **Implementation:** After password auth succeeds, check if 2FA is enabled for the user. If yes, redirect to a TOTP entry page. User scans QR code with Google Authenticator during setup.
- **Tricky parts:** Must have at least one admin and one non-admin account WITHOUT 2FA for grading (rubric requirement). QR code generation needs a library like `QRCoder`.
- **Video demo:** Show 2FA setup flow, entering TOTP code, successful login.
- **Why it's high effort:** Requires a separate setup page, recovery codes UI, and the login flow becomes multi-step.

**7. Login Anomaly Detection (Stretch)**
- **Effort:** Medium-High
- **Implementation:** Log login location/IP and flag when a user logs in from a new IP or unusual time. Send an email notification: "New login from [location]." Store known IPs per user in a `UserLoginHistory` table.
- **Why it's creative:** Goes beyond standard security features and shows security awareness. Could tie into the audit logging (US-19).

### Recommended Strategy for Maximum Points

Pick **3-4 low-effort features** rather than 1 high-effort feature. The rubric says "most will be worth partial points depending on complexity... you may choose to implement multiple." Recommended combination:

1. **Google OAuth** (US-24) -- already planned, high visibility, ~1 point
2. **HSTS** -- one line of code in most cases, easy to demo, ~0.5 points
3. **Browser-accessible theme cookie** -- easy, explicitly listed in rubric, ~0.5 points
4. **Rate limiting on login** -- built-in .NET package, genuine security value, ~0.5 points
5. **Input sanitization demo** (US-23) -- mostly free since ASP.NET Identity handles it, ~0.25 points

This combination gives 5 demonstrable features for the 2-point category, providing margin even if graders award partial credit on each. Every feature must be clearly shown and explained in the video.

---

## Implementation Plan

This plan is written for the existing stack: .NET 10 minimal APIs in `Program.cs` (no controllers), React + Vite + TypeScript frontend, Azure PostgreSQL via EF Core, deployed to Azure (backend) and Vercel (frontend).

---

### 1. Backend Work

#### 1.1 NuGet Packages to Add

Add to `backend.csproj`:

```xml
<PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="10.0.5" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.Google" Version="10.0.5" />
<PackageReference Include="Microsoft.AspNetCore.RateLimiting" Version="10.0.5" />
```

Version numbers should match the existing `Microsoft.EntityFrameworkCore.Design` version (10.0.5) to avoid assembly conflicts.

#### 1.2 Identity DbContext Decision: Shared

Use the **shared DbContext** approach. `AppDbContext` will inherit from `IdentityDbContext<ApplicationUser>` instead of plain `DbContext`. This avoids managing two separate contexts and connection pools against the same database.

Changes to `AppDbContext`:
- Change base class: `public partial class AppDbContext : IdentityDbContext<ApplicationUser>`
- Add `using Microsoft.AspNetCore.Identity.EntityFrameworkCore;`
- The `ApplicationUser` class extends `IdentityUser` (see 1.3)

**Why shared:** The app has one database (Azure PostgreSQL). A second DbContext would require a second connection string to the same database, complicating the connection pooler that already causes issues (see the health endpoint comment in `Program.cs`).

#### 1.3 ApplicationUser Model

Create `backend/Models/ApplicationUser.cs`:

```csharp
using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}
```

Extending `IdentityUser` allows adding `FirstName` and `LastName` fields for display purposes and to match the registration form requirement (US-17).

#### 1.4 Identity Configuration in Program.cs

Add to the service registration section (before `var app = builder.Build();`):

```csharp
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
{
    // Password policy -- US-7 (WARNING: verify these match class instruction exactly)
    opts.Password.RequiredLength = 12;
    opts.Password.RequireUppercase = true;
    opts.Password.RequireLowercase = true;
    opts.Password.RequireDigit = true;
    opts.Password.RequireNonAlphanumeric = true;

    // Lockout policy -- US-5
    opts.Lockout.MaxFailedAccessAttempts = 5;
    opts.Lockout.DefaultLockoutEndDate = DateTimeOffset.UtcNow.AddMinutes(15);
    opts.Lockout.AllowedForNewUsers = true;

    // User settings
    opts.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();
```

#### 1.5 Cookie Authentication Configuration

**Decision: Cookie auth, not JWT.** Rationale:
- The frontend is a single SPA served from one domain (Vercel) talking to one API (Azure). No need for JWT's cross-service portability.
- Cookie auth is simpler with ASP.NET Identity -- `SignInManager` handles it natively.
- HttpOnly + Secure + SameSite cookies satisfy US-18 (CSRF), US-20 (secure cookies), and US-25 (no tokens in localStorage).
- JWT would require storing the token in localStorage (XSS risk) or a cookie anyway (negating any JWT benefit).

```csharp
builder.Services.ConfigureApplicationCookie(opts =>
{
    opts.Cookie.HttpOnly = true;                    // US-20
    opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;  // US-20
    opts.Cookie.SameSite = SameSiteMode.Lax;        // US-18, US-20 (Lax needed for Google OAuth redirect)
    opts.Cookie.Name = "BeaconAuth";
    opts.ExpireTimeSpan = TimeSpan.FromHours(8);    // US-10 (default for staff/admin)
    opts.SlidingExpiration = true;                   // US-10 (sliding expiration)
    opts.LoginPath = "/api/auth/unauthorized";       // Return 401 JSON, not redirect
    opts.AccessDeniedPath = "/api/auth/forbidden";   // Return 403 JSON, not redirect

    opts.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = 401;
        return Task.CompletedTask;
    };
    opts.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = 403;
        return Task.CompletedTask;
    };
});
```

The `OnRedirectToLogin` and `OnRedirectToAccessDenied` overrides are critical. Without them, ASP.NET Identity will return 302 redirects to HTML login pages that don't exist in a minimal API setup, and the React frontend will get HTML instead of JSON error responses.

#### 1.6 Google OAuth Configuration

```csharp
builder.Services.AddAuthentication()
    .AddGoogle(opts =>
    {
        opts.ClientId = builder.Configuration["Authentication:Google:ClientId"]!;
        opts.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"]!;
    });
```

#### 1.7 Rate Limiting Middleware

```csharp
builder.Services.AddRateLimiter(opts =>
{
    opts.AddFixedWindowLimiter("login", policy =>
    {
        policy.Window = TimeSpan.FromMinutes(5);
        policy.PermitLimit = 20;
        policy.QueueLimit = 0;
    });
    opts.RejectionStatusCode = 429;
});
```

#### 1.8 Middleware Pipeline Order in Program.cs

The middleware order matters. The complete pipeline should be:

```csharp
var app = builder.Build();

app.UseHttpsRedirection();          // US-21
app.UseHsts();                      // HSTS (above-and-beyond)
app.UseCors("AllowFrontend");
app.UseRateLimiter();               // Rate limiting
app.UseAuthentication();            // Must come before UseAuthorization
app.UseAuthorization();

// CSP header middleware -- US-22
app.Use(async (context, next) =>
{
    context.Response.Headers.Append("Content-Security-Policy",
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: https:; " +
        "font-src 'self'; " +
        "connect-src 'self' https://accounts.google.com; " +
        "frame-src https://accounts.google.com; " +
        "base-uri 'self'; " +
        "form-action 'self'");
    context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Append("X-Frame-Options", "DENY");
    context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");
    await next();
});

// Cache-control for auth pages -- US-26 (prevent back-button reuse)
app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/api/auth"))
    {
        context.Response.Headers.Append("Cache-Control", "no-store, no-cache, must-revalidate");
        context.Response.Headers.Append("Pragma", "no-cache");
    }
    await next();
});
```

#### 1.9 CORS Update for Cookie Auth

The existing CORS policy must be updated to support credentials (cookies):

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://intex2-1.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();   // REQUIRED for cookie auth cross-origin
    });
});
```

**Important:** `.AllowCredentials()` cannot be used with `.AllowAnyOrigin()`. The current setup already uses `.WithOrigins(...)` so this is compatible. The Azure backend URL should be removed from the origins list (the backend does not make requests to itself).

#### 1.10 User and Role Seeding

Create `backend/Data/IdentitySeeder.cs`:

```csharp
using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Data;

public static class IdentitySeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();

        string[] roles = { "Admin", "Staff", "Donor" };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        // Seed test accounts (passwords from environment variables in production)
        await CreateUserIfNotExists(userManager, "admin@beaconofhope.org", "Admin",
            "Director", "Reyes", "TestAdmin123!");
        await CreateUserIfNotExists(userManager, "elena@beaconofhope.org", "Staff",
            "Elena", "Reyes", "TestStaff123!");
        await CreateUserIfNotExists(userManager, "maria@beaconofhope.org", "Donor",
            "Maria", "Chen", "TestDonor123!");
    }

    private static async Task CreateUserIfNotExists(
        UserManager<ApplicationUser> userManager,
        string email, string role, string firstName, string lastName, string password)
    {
        if (await userManager.FindByEmailAsync(email) == null)
        {
            var user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(user, password);
            if (result.Succeeded)
                await userManager.AddToRoleAsync(user, role);
        }
    }
}
```

Call the seeder in `Program.cs` after building the app:

```csharp
using (var scope = app.Services.CreateScope())
{
    await IdentitySeeder.SeedAsync(scope.ServiceProvider);
}
```

**Note on seed passwords:** The seed passwords above (`TestAdmin123!`, etc.) meet the 12-character minimum with uppercase, lowercase, digit, and special character. In production, these should be loaded from environment variables or the accounts should be created through the admin panel instead.

#### 1.11 API Endpoints

All auth endpoints are defined as minimal API `MapPost`/`MapGet` calls in `Program.cs` (matching the existing pattern -- no controllers).

See Section 6 below for the complete endpoint specification.

#### 1.12 Audit Logging (US-19)

Create `backend/Models/LoginAuditEntry.cs` and add a `DbSet<LoginAuditEntry>` to `AppDbContext`. Each login attempt (success, failure, lockout) writes a row with userId, email, timestamp, IP, user agent, and result. Admin-only endpoint to query logs.

---

### 2. Frontend Work

#### 2.1 React Components to Create

| Component | File Path | Purpose |
|---|---|---|
| `AuthProvider` | `frontend/src/context/AuthContext.tsx` | React context + provider that holds user state, exposes `login()`, `logout()`, `register()`, `user`, `isAuthenticated`, `role`, `isLoading` |
| `LoginPage` | `frontend/src/pages/LoginPage.tsx` | Login form with email/password fields, validation, error display, Google OAuth button, forgot password link, register link |
| `LoginPage.module.css` | `frontend/src/pages/LoginPage.module.css` | Scoped styles for login page |
| `RegisterPage` | `frontend/src/pages/RegisterPage.tsx` | Registration form (donor-only self-registration) with password requirements checklist |
| `RegisterPage.module.css` | `frontend/src/pages/RegisterPage.module.css` | Scoped styles for register page |
| `ForgotPasswordPage` | `frontend/src/pages/ForgotPasswordPage.tsx` | Email-only form to request password reset |
| `ResetPasswordPage` | `frontend/src/pages/ResetPasswordPage.tsx` | New password form (reached via emailed link with token) |
| `ProtectedRoute` | `frontend/src/components/ProtectedRoute.tsx` | Wrapper component that checks auth state and role, redirects to `/login?returnUrl=` if unauthenticated, shows 403 page if wrong role |
| `AccessDenied` | `frontend/src/pages/AccessDenied.tsx` | Simple 403 page for role violations |
| `useAuth` | `frontend/src/hooks/useAuth.ts` | Convenience hook: `const { user, login, logout } = useAuth()` (wraps `useContext(AuthContext)`) |

#### 2.2 AuthContext Implementation

The `AuthProvider` wraps the entire app in `App.tsx`. On mount, it calls `GET /api/auth/me` (with `credentials: 'include'`) to check if the user has an existing session cookie. This handles page refresh without losing auth state.

```typescript
interface AuthState {
  user: { email: string; firstName: string; lastName: string; roles: string[] } | null;
  isAuthenticated: boolean;
  isLoading: boolean;   // true during initial /me check and during login/logout
  role: string | null;  // highest-privilege role for redirect logic
}
```

Key design decisions:
- **No token storage in localStorage.** The cookie is HttpOnly so JavaScript cannot access it. Auth state is derived from the `/api/auth/me` response.
- **`isLoading` prevents flash of login page.** On initial load, `isLoading` is `true` until `/api/auth/me` resolves. `ProtectedRoute` shows a spinner during this time instead of redirecting to `/login`.
- **Role priority:** Admin > Staff > Donor. If a user has multiple roles, the highest is used for redirect.

#### 2.3 Updating `apiFetch` for Cookie Auth

The existing `apiFetch` in `frontend/src/api.ts` does not include credentials. It must be updated:

```typescript
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    credentials: 'include',  // REQUIRED: send auth cookie
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      // Trigger auth context to clear user state
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
```

#### 2.4 Form Validation (LoginPage)

Client-side validation runs on blur and on submit:
- **Email:** Must contain `@` and a domain (basic regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Password:** Must be at least 12 characters (client-side only checks length; server enforces full policy)
- **Submit button:** Disabled until both fields pass basic validation
- **Error display:** Inline validation messages below each field (red text, `aria-live="polite"`)
- **Server errors:** Displayed in an alert banner above the form

#### 2.5 Role-Based Redirect Logic

After successful login, the `login()` function in `AuthContext` reads the user's roles from the `/api/auth/me` response and redirects:

```typescript
function getRedirectPath(roles: string[], returnUrl?: string): string {
  if (returnUrl && !returnUrl.startsWith('/login')) return returnUrl;
  if (roles.includes('Admin')) return '/admin';
  if (roles.includes('Staff')) return '/caseload';
  if (roles.includes('Donor')) return '/donor/portal';
  return '/';
}
```

The `returnUrl` is read from the query string (`/login?returnUrl=/admin/residents`) and takes priority over role-based default.

#### 2.6 ProtectedRoute Component

```typescript
interface ProtectedRouteProps {
  allowedRoles?: string[];  // e.g., ['Admin'] or ['Admin', 'Staff']
  children: React.ReactNode;
}

function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to={`/login?returnUrl=${location.pathname}`} />;
  if (allowedRoles && role && !allowedRoles.includes(role)) return <Navigate to="/access-denied" />;
  return <>{children}</>;
}
```

#### 2.7 App.tsx Route Updates

```typescript
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/impact" element={<PublicLayout><ImpactPage /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
          <Route path="/forgot-password" element={<PublicLayout><ForgotPasswordPage /></PublicLayout>} />
          <Route path="/reset-password" element={<PublicLayout><ResetPasswordPage /></PublicLayout>} />
          <Route path="/access-denied" element={<PublicLayout><AccessDenied /></PublicLayout>} />

          {/* Admin portal -- Admin only */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Staff portal -- Admin + Staff */}
          <Route path="/caseload" element={
            <ProtectedRoute allowedRoles={['Admin', 'Staff']}>
              {/* StaffLayout / CaseloadPage */}
            </ProtectedRoute>
          } />

          {/* Donor portal -- All authenticated */}
          <Route path="/donor/portal" element={
            <ProtectedRoute allowedRoles={['Admin', 'Staff', 'Donor']}>
              {/* DonorLayout / DonorPortalPage */}
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

#### 2.8 LoginPage Component Structure

```
LoginPage
├── Logo + tagline ("Safe homes for girls in the Philippines")
├── "501(c)(3) Nonprofit Organization" text
├── Error alert banner (server errors)
├── Form
│   ├── Email input + inline validation message
│   ├── Password input + eye toggle + inline validation message
│   ├── Remember me checkbox
│   ├── Submit button ("Sign In" / spinner "Signing in...")
│   └── "Forgot password?" link
├── Divider ("or")
├── "Sign in with Google" button
├── "Don't have an account? Register" link
└── Link to public homepage
```

#### 2.9 Logout Integration

Add a "Sign Out" button to `Header.tsx` (conditionally rendered when `isAuthenticated` is true). The button calls `logout()` from `AuthContext`, which:
1. Calls `POST /api/auth/logout` (with `credentials: 'include'`)
2. Clears auth state in context
3. Navigates to `/login`

---

### 3. Security Work

#### 3.1 CSP Header Middleware

Implemented as inline middleware in `Program.cs` (see Section 1.8). The CSP policy:
- `default-src 'self'` -- baseline restriction
- `script-src 'self'` -- no inline scripts (React/Vite builds to bundled JS files)
- `style-src 'self' 'unsafe-inline'` -- `unsafe-inline` needed because CSS Modules may inject inline styles; document this as a known tradeoff
- `img-src 'self' data: https:` -- allow data URIs for inline images and HTTPS external images
- `connect-src 'self' https://accounts.google.com` -- allow API calls and Google OAuth
- `frame-src https://accounts.google.com` -- Google OAuth popup/redirect

**Vite dev server:** Add CSP to `vite.config.ts` for local development:
```typescript
server: {
  headers: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; ..."
  }
}
```
Note: Vite HMR requires `unsafe-inline` for scripts in dev mode only. The production build served by Vercel does not.

#### 3.2 HTTPS Redirect

Already partially implemented: `app.UseHttpsRedirection()` is in `Program.cs`. For full compliance:
- Azure App Service: Enable "HTTPS Only" in Settings > General
- Vercel: HTTPS is enforced by default on all deployments

#### 3.3 HSTS

Add `app.UseHsts()` in `Program.cs` inside a production-only check:
```csharp
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
```
Do not enable HSTS in development -- it will cause issues with `localhost` HTTP.

#### 3.4 CORS Updates for Cookie Auth

See Section 1.9. The critical change is adding `.AllowCredentials()`.

#### 3.5 Google OAuth Setup Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Navigate to APIs & Services > Credentials
4. Create OAuth 2.0 Client ID (Web application type)
5. Set authorized redirect URI to: `https://<azure-backend-url>/signin-google` (the default callback path for `AddGoogle()`)
6. Also add `http://localhost:5000/signin-google` for local development
7. Copy Client ID and Client Secret
8. Add to environment variables:
   - Local: Add to `.env` file (gitignored): `Authentication__Google__ClientId=...` and `Authentication__Google__ClientSecret=...`
   - Azure: Add to App Service Configuration as application settings
9. **Never commit these values to git** (US-25)

#### 3.6 Anti-Forgery / CSRF (US-18)

For minimal APIs with cookie auth, configure anti-forgery:

```csharp
builder.Services.AddAntiforgery(opts =>
{
    opts.HeaderName = "X-XSRF-TOKEN";
    opts.Cookie.Name = "XSRF-TOKEN";
    opts.Cookie.HttpOnly = false;  // Must be readable by JavaScript to send in header
    opts.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    opts.Cookie.SameSite = SameSiteMode.Lax;
});
```

The frontend reads the `XSRF-TOKEN` cookie value and sends it in the `X-XSRF-TOKEN` header on POST/PUT/DELETE requests. The `SameSite=Lax` cookie attribute provides baseline CSRF protection on its own; the anti-forgery token provides defense-in-depth.

---

### 4. Database Work

#### 4.1 Identity Tables via EF Migrations

ASP.NET Identity requires the following tables (created automatically by EF migrations when `AppDbContext` inherits from `IdentityDbContext`):

| Table | Purpose |
|---|---|
| `AspNetUsers` | User accounts (email, password hash, lockout info, security stamp) |
| `AspNetRoles` | Role definitions (Admin, Staff, Donor) |
| `AspNetUserRoles` | User-to-role mapping |
| `AspNetUserClaims` | User claims (not used initially, but created by Identity) |
| `AspNetRoleClaims` | Role claims (not used initially) |
| `AspNetUserLogins` | External login providers (Google OAuth) |
| `AspNetUserTokens` | Password reset tokens, 2FA tokens |

Additionally, create:

| Table | Purpose |
|---|---|
| `LoginAuditLog` | Audit trail for login attempts (US-19) |

#### 4.2 Migration Commands

```bash
cd backend
dotnet ef migrations add AddIdentity
dotnet ef database update
```

**Note:** The Supabase-specific enums (`auth.aal_level`, etc.) and extensions that were previously in `AppDbContext.OnModelCreating` have been removed as part of the migration to Azure PostgreSQL. The migration should only manage application-owned tables (AspNet*, domain tables).

#### 4.3 Seed Test Accounts

Created by `IdentitySeeder.SeedAsync()` (see Section 1.10):

| Email | Password | Role | Persona |
|---|---|---|---|
| `admin@beaconofhope.org` | `TestAdmin123!` | Admin | Director Reyes |
| `elena@beaconofhope.org` | `TestStaff123!` | Staff | Elena Reyes |
| `maria@beaconofhope.org` | `TestDonor123!` | Donor | Maria Chen |

These accounts have `EmailConfirmed = true` so they can log in immediately without email verification.

---

### 5. Files to Create or Modify

#### 5.1 Files to Create (New)

| # | File | Purpose |
|---|---|---|
| 1 | `backend/Models/ApplicationUser.cs` | Custom Identity user model with FirstName, LastName |
| 2 | `backend/Models/LoginAuditEntry.cs` | Audit log entity for login attempts |
| 3 | `backend/Data/IdentitySeeder.cs` | Seeds roles and test user accounts |
| 4 | `frontend/src/context/AuthContext.tsx` | Auth state provider (user, login, logout, register) |
| 5 | `frontend/src/hooks/useAuth.ts` | Convenience hook wrapping AuthContext |
| 6 | `frontend/src/pages/LoginPage.tsx` | Login form page |
| 7 | `frontend/src/pages/LoginPage.module.css` | Login page styles |
| 8 | `frontend/src/pages/RegisterPage.tsx` | Donor self-registration page |
| 9 | `frontend/src/pages/RegisterPage.module.css` | Register page styles |
| 10 | `frontend/src/pages/ForgotPasswordPage.tsx` | Forgot password email form |
| 11 | `frontend/src/pages/ResetPasswordPage.tsx` | Password reset form (token from email) |
| 12 | `frontend/src/pages/AccessDenied.tsx` | 403 page for unauthorized role access |
| 13 | `frontend/src/components/ProtectedRoute.tsx` | Route guard checking auth + role |

#### 5.2 Files to Modify (Existing)

| # | File | Changes |
|---|---|---|
| 1 | `backend/backend.csproj` | Add Identity, Google Auth, and RateLimiting package references |
| 2 | `backend/Data/AppDbContext.cs` | Change base class to `IdentityDbContext<ApplicationUser>`, add `DbSet<LoginAuditEntry>` |
| 3 | `backend/Program.cs` | Add Identity services, cookie config, Google OAuth, rate limiter, CORS credentials, CSP middleware, HSTS, anti-forgery, auth middleware pipeline, all `/api/auth/*` endpoints, seed call |
| 4 | `backend/appsettings.json` | Add `Authentication:Google:ClientId` and `Authentication:Google:ClientSecret` placeholder keys (actual values in env vars) |
| 5 | `frontend/src/App.tsx` | Wrap in `AuthProvider`, add login/register/forgot-password/access-denied routes, wrap admin routes in `ProtectedRoute` |
| 6 | `frontend/src/api.ts` | Add `credentials: 'include'` to all fetch calls, add `options` parameter for POST support, add 401 event dispatch |
| 7 | `frontend/src/types.ts` | Add `AuthUser`, `LoginRequest`, `RegisterRequest`, `AuthResponse` interfaces |
| 8 | `frontend/src/components/Header.tsx` | Add conditional "Sign Out" button and user display name when authenticated |

---

### 6. API Endpoints

All endpoints are minimal API map calls in `Program.cs`. Group them under `/api/auth`.

#### 6.1 Authentication Endpoints

**POST /api/auth/login**
- Auth required: No
- Rate limited: Yes (20 requests per 5 minutes per IP)
- Request body:
  ```json
  { "email": "string", "password": "string", "rememberMe": false }
  ```
- Success response (200):
  ```json
  { "email": "string", "firstName": "string", "lastName": "string", "roles": ["Admin"] }
  ```
  Sets `BeaconAuth` cookie in response headers.
- Error responses:
  - 400: `{ "error": "Invalid email or password" }` (wrong credentials)
  - 423: `{ "error": "Account temporarily locked. Try again in X minutes.", "lockoutEnd": "ISO8601" }` (lockout)
  - 429: Rate limit exceeded (no body, handled by rate limiter middleware)
- Implementation: `SignInManager.PasswordSignInAsync(email, password, rememberMe, lockoutOnFailure: true)`

**POST /api/auth/register**
- Auth required: No
- Rate limited: Yes
- Request body:
  ```json
  { "email": "string", "password": "string", "confirmPassword": "string", "firstName": "string", "lastName": "string" }
  ```
- Success response (201):
  ```json
  { "email": "string", "firstName": "string", "lastName": "string", "roles": ["Donor"] }
  ```
  Automatically assigns Donor role. Optionally auto-signs-in after registration.
- Error responses:
  - 400: `{ "errors": ["Passwords must have at least one uppercase...", ...] }` (validation failures from Identity)

**POST /api/auth/logout**
- Auth required: Yes (any role)
- Request body: None
- Success response (200):
  ```json
  { "message": "Logged out" }
  ```
  Clears `BeaconAuth` cookie. Calls `SignInManager.SignOutAsync()`.

**GET /api/auth/me**
- Auth required: No (returns different responses based on auth state)
- Request body: None
- Authenticated response (200):
  ```json
  { "email": "string", "firstName": "string", "lastName": "string", "roles": ["Admin"] }
  ```
- Unauthenticated response (200):
  ```json
  { "isAuthenticated": false }
  ```
  Intentionally returns 200 (not 401) so the frontend can check auth state without triggering error handling.

#### 6.2 Password Recovery Endpoints

**POST /api/auth/forgot-password**
- Auth required: No
- Rate limited: Yes
- Request body:
  ```json
  { "email": "string" }
  ```
- Response (200, always -- no account enumeration):
  ```json
  { "message": "If an account exists with that email, a reset link has been sent." }
  ```
- Implementation: `UserManager.GeneratePasswordResetTokenAsync()`, send email with link containing token. If email service is not configured, log the token to console for development.

**POST /api/auth/reset-password**
- Auth required: No
- Request body:
  ```json
  { "email": "string", "token": "string", "newPassword": "string" }
  ```
- Success response (200):
  ```json
  { "message": "Password has been reset." }
  ```
- Error responses:
  - 400: `{ "error": "This reset link has expired. Please request a new one." }` (invalid/expired token)
  - 400: `{ "errors": ["Password requirements not met..."] }` (policy violation)

#### 6.3 Google OAuth Endpoints

**GET /api/auth/google-login**
- Auth required: No
- Response: 302 redirect to Google consent screen
- Implementation: `ChallengeAsync("Google", new AuthenticationProperties { RedirectUri = "/api/auth/google-callback" })`

**GET /api/auth/google-callback**
- Auth required: No (called by Google after consent)
- Response: 302 redirect to frontend (`/donor/portal` for new users, role-based redirect for existing)
- Implementation: Read Google claims, find or create `ApplicationUser`, assign Donor role if new, sign in with `SignInManager.SignInAsync()`

#### 6.4 Admin Endpoints (for user management)

**GET /api/auth/audit-log**
- Auth required: Admin only
- Query parameters: `?page=1&pageSize=50&email=&result=`
- Response (200):
  ```json
  {
    "items": [
      { "id": 1, "email": "string", "result": "Success|Failed|Lockout", "ipAddress": "string", "userAgent": "string", "timestamp": "ISO8601" }
    ],
    "totalCount": 100,
    "page": 1,
    "pageSize": 50
  }
  ```

---

### 7. Suggested Implementation Order

Build in this sequence. Each phase results in a testable, demonstrable milestone.

#### Phase 1: Identity Foundation (Backend) -- Do First

**Goal:** ASP.NET Identity is configured, database has Identity tables, test accounts exist, and login/logout endpoints work via Postman/curl.

1. Add NuGet packages to `backend.csproj`
2. Create `ApplicationUser.cs` model
3. Modify `AppDbContext.cs` to inherit from `IdentityDbContext<ApplicationUser>`
4. Add Identity services and cookie configuration to `Program.cs`
5. Run `dotnet ef migrations add AddIdentity` and `dotnet ef database update`
   - **Checkpoint:** Inspect database to confirm Identity tables were created without interfering with existing tables
6. Create `IdentitySeeder.cs` and add seeding call to `Program.cs`
7. Add `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` endpoints
8. Update CORS to include `.AllowCredentials()`
9. **Test:** Use curl or Postman to login with seed accounts, verify cookie is set, call `/api/auth/me` with cookie, call logout

**Estimated effort:** 4-6 hours

#### Phase 2: Frontend Auth Flow -- Do Second

**Goal:** Users can log in via the React UI, see role-based redirects, and log out.

1. Update `api.ts` with `credentials: 'include'` and POST support
2. Add auth types to `types.ts`
3. Create `AuthContext.tsx` and `useAuth.ts`
4. Create `LoginPage.tsx` with form, validation, error handling, and loading state
5. Create `ProtectedRoute.tsx`
6. Update `App.tsx` with new routes and `AuthProvider` wrapper
7. Add logout button to `Header.tsx`
8. Create `AccessDenied.tsx`
9. **Test:** Full login flow in browser -- login as each role, verify redirect, verify protected routes, verify logout

**Estimated effort:** 6-8 hours

#### Phase 3: Registration and Password Recovery -- Do Third

**Goal:** New donors can register, users can reset forgotten passwords.

1. Add `POST /api/auth/register` endpoint
2. Add `POST /api/auth/forgot-password` and `POST /api/auth/reset-password` endpoints
3. Create `RegisterPage.tsx` with password requirements checklist
4. Create `ForgotPasswordPage.tsx` and `ResetPasswordPage.tsx`
5. Add routes to `App.tsx`
6. **Test:** Register a new donor account, login with it, request password reset (check server logs for token in dev), reset password

**Estimated effort:** 4-6 hours

#### Phase 4: Security Hardening -- Do Fourth

**Goal:** All IS414 security rubric items are implemented and verifiable in browser dev tools.

1. Add CSP header middleware to `Program.cs`
2. Add HSTS (production only)
3. Add rate limiting on auth endpoints
4. Add anti-forgery token configuration
5. Update frontend to send XSRF token header on mutations
6. Create `LoginAuditEntry.cs` model and add audit logging to login/logout endpoints
7. Add `GET /api/auth/audit-log` admin endpoint
8. **Test:** Open browser dev tools Network tab, verify CSP header, verify Strict-Transport-Security header (on deployed version), test rate limiting with rapid requests, verify audit log records login attempts

**Estimated effort:** 3-4 hours

#### Phase 5: Google OAuth -- Do Fifth

**Goal:** Users can sign in with Google as an alternative to email/password.

1. Set up Google Cloud Console project and OAuth credentials (see Section 3.5)
2. Add Google OAuth services to `Program.cs`
3. Add `GET /api/auth/google-login` and `GET /api/auth/google-callback` endpoints
4. Add "Sign in with Google" button to `LoginPage.tsx`
5. Store Google client ID/secret in environment variables
6. **Test:** Click Google button, complete consent flow, verify redirect back to app as authenticated Donor

**Estimated effort:** 2-4 hours

#### Phase 6: Polish and Video Prep -- Do Last

**Goal:** Everything works end-to-end on the deployed version and is documented in the video.

1. Deploy backend to Azure with all environment variables configured
2. Deploy frontend to Vercel
3. Test all flows on deployed URLs (not localhost)
4. Verify CSP header, HTTPS redirect, HSTS in browser dev tools on deployed version
5. Prepare video demonstration script covering every security feature:
   - Show login form, attempt invalid credentials, show generic error
   - Show account lockout after 5 failed attempts
   - Show password policy rejection on registration
   - Login as Admin -> redirect to `/admin`
   - Login as Staff -> redirect to `/caseload`
   - Login as Donor -> redirect to `/donor/portal`
   - Attempt to access `/admin` as Donor -> show Access Denied
   - Show CSP header in Network tab
   - Show HTTPS enforcement
   - Show Google OAuth flow
   - Show logout, demonstrate back button does not restore session

**Estimated effort:** 2-3 hours

#### Total Estimated Effort: 21-31 hours

This can be parallelized across team members:
- **Backend developer:** Phases 1 and 4 (backend Identity + security hardening)
- **Frontend developer:** Phases 2 and 3 (React auth flow + registration)
- **Both together:** Phase 5 (Google OAuth spans both) and Phase 6 (testing + video)
