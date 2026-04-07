# Agent Instructions

Read this entire file before starting any task.

## Self-Correcting Rules Engine

This file contains a growing ruleset that improves over time. **At session start, read the entire "Learned Rules" section before doing anything.**

### How it works

1. When the user corrects you or you make a mistake, **immediately append a new rule** to the "Learned Rules" section at the bottom of this file.
2. Rules are numbered sequentially and written as clear, imperative instructions.
3. Format: `N. [CATEGORY] Never/Always do X — because Y.`
4. Categories: `[STYLE]`, `[CODE]`, `[ARCH]`, `[TOOL]`, `[PROCESS]`, `[DATA]`, `[UX]`, `[OTHER]`
5. Before starting any task, scan all rules below for relevant constraints.
6. If two rules conflict, the higher-numbered (newer) rule wins.
7. Never delete rules. If a rule becomes obsolete, append a new rule that supersedes it.

### When to add a rule

- User explicitly corrects your output ("no, do it this way")
- User rejects a file, approach, or pattern
- You hit a bug caused by a wrong assumption about this codebase
- User states a preference ("always use X", "never do Y")

### Rule format example

```
15. [STYLE] Never add emojis to commit messages — project convention.

```

---

## Learned Rules

<!-- New rules are appended below this line. Do not edit above this section. -->

1. [PROCESS] Always rephrase user-provided rules into precise, unambiguous language optimized for LLM instruction-following before appending them — because the user's phrasing may be conversational, and rules are most effective when written as clear, direct imperatives with explicit scope and rationale.

2. [PROCESS] Commit and push to remote frequently (after each meaningful change or logical unit of work). Never push directly to main — always push to appropriately named branches and open PRs for review. Each commit should not be a separate PR. Create the PR when Dawson asks for one.

3. [UX] Prioritize user experience above all else. Every UI decision must favor clean, intuitive design that serves real functionality and utility — never add visual clutter, unnecessary complexity, or decorative elements that don't help the user accomplish their goals.

4. [PROCESS] Always follow test-driven development (TDD). Before implementing any new feature or change, plan and write the tests first that define expected behavior. Then implement the minimum code to make all tests pass. Backend tests go in `backend.Tests/` (xUnit), frontend tests go in `frontend/src/__tests__/` (Vitest). Run `cd backend.Tests && dotnet test` and `cd frontend && npm test` to verify all tests pass before considering work complete.

5. [PROCESS] Before modifying any existing code, check what tests cover that code. Update or add tests to reflect the new behavior before making the code change. After the change, run the full test suite to ensure nothing is broken.

6. [DATA] Never run EF Core migrations at app startup (no `MigrateAsync()` or `Database.Migrate()` in Program.cs) — the Supabase transaction pooler (PgBouncer) does not support migration operations and will throw `ObjectDisposedException`. Migrations must be applied manually from a developer's local machine using the direct IPv6 connection.

7. [DATA] To apply EF Core migrations to the production Supabase database, use the direct IPv6 connection (port 5432), never the transaction pooler (port 6543). Command: `dotnet ef database update --project backend --connection "Host=2600:1f18:2e13:9d56:3f45:a9b1:dd9c:21a4;Port=5432;Database=postgres;User Id=postgres;Password=<password>;SSL Mode=Require;Trust Server Certificate=true"`. The IPv6 address is for `db.eetsyddzvjcqdihgvvew.supabase.co` which lacks an IPv4 record.

8. [DATA] Never register Supabase-owned schemas (auth, realtime, storage, net, vault, graphql, extensions) in AppDbContext via `HasPostgresEnum` or `HasPostgresExtension` — EF Core will try to create them in migrations and fail with permission errors. Only manage your own tables (AspNet*, domain tables) in the DbContext.

9. [DATA] The Azure App Service runtime connection uses the Supabase transaction pooler (`Host=aws-1-us-east-1.pooler.supabase.com;Port=6543`) which works for normal queries. The direct connection is only needed for running migrations locally.