# Beacon of Hope

A web application for **Beacon of Hope**, a nonprofit organization supporting survivors of abuse and trafficking. Built for BYU IS 401/413/414/455 INTEX.

## Tech Stack

| Layer    | Technology              | Hosting  |
|----------|-------------------------|----------|
| Frontend | React + TypeScript (Vite) | Vercel |
| Backend  | .NET 10 / C# Web API   | Azure    |
| Database | PostgreSQL              | Azure    |

## Local Development

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
### First-time setup

Create a `.env` file in `backend/` with your connection string (see `.env.example`).

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

Runs on `http://localhost:5000` by default.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` by default.

## Default Login Credentials (Development)

The database seeder creates three test accounts for local development:

| Role  | Email                      | Password       |
|-------|----------------------------|----------------|
| Admin | `admin@beaconofhope.org`   | `Test1234!@#$` |
| Staff | `staff@beaconofhope.org`   | `Test1234!@#$` |
| Donor | `donor@beaconofhope.org`   | `Test1234!@#$` |

These accounts are created automatically when the backend seeds the database on first run.

## Deployment

- **Frontend** — Auto-deploys to Vercel from the `main` branch
- **Backend** — Deployed to Microsoft Azure
- **Database** — Azure Database for PostgreSQL Flexible Server

## Team Workflow

- Never push directly to `main` — use feature branches and open PRs
- Keep commits small and frequent
- Secrets go in `.env` files (never committed to the repo)

## Database Migrations

The production database is Azure Database for PostgreSQL Flexible Server (`intex-db.postgres.database.azure.com`).

### Workflow

1. **Create a migration:**
   ```bash
   dotnet ef migrations add YourMigrationName --project backend
   ```

2. **Apply to production:**
   ```bash
   dotnet ef database update --project backend --connection "Host=intex-db.postgres.database.azure.com;Port=5432;Database=postgres;Username=postgres;Password=<password>;SslMode=Require;TrustServerCertificate=true"
   ```

3. **Commit and push** the migration files.

### Important notes

- Developers must have their IP added to the Azure PostgreSQL **firewall rules** (Azure Portal → PostgreSQL server → Networking)
- Use camelCase connection string keys for Npgsql 10.x: `SslMode`, `TrustServerCertificate`, `Username`

## ML Artifacts

- Persist ML model bundles in `models/` using the `.sav` extension.
- Do not commit `.pkl` model files; they are ignored by repo policy.
