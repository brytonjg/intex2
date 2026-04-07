# CLAUDE.md

## Test-Driven Development

All development must follow test-driven development (TDD):

1. **Plan tests first.** Before implementing any new feature or change, write out the tests that define the expected behavior. Tests go in `backend.Tests/` (xUnit) for backend and `frontend/src/__tests__/` (Vitest) for frontend.
2. **Implement to pass.** Write the minimum code needed to make all planned tests pass.
3. **Verify.** Run `dotnet test` (backend) and `npm test` (frontend) to confirm all tests pass before considering the work complete.

### When modifying existing code

Before changing any existing code, check what tests cover that code. Update or add tests to reflect the new behavior *before* making the code change. After the code change, run the full test suite to ensure nothing is broken.

### Commands

- **Backend tests:** `cd backend.Tests && dotnet test`
- **Frontend tests:** `cd frontend && npm test`
