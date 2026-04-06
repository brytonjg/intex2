# Plan 01 — Step Zero: Bare Minimum Working Website

## Goal

Get the absolute simplest end-to-end app running: a React frontend talking to a .NET backend talking to a database, with one page that reads real data. No auth, no styling polish, no ML — just proof that the full stack works.

## Why this matters

Everything else in the project (auth, RBAC, CRUD, dashboards, ML deployment) builds on top of a working full-stack scaffold. Getting this right first means the team can parallelize work on features without stepping on each other.

---

## Steps

### 1. Initialize the backend (.NET 10 Web API)

- [ ] Create a new .NET 10 Web API project in a `backend/` folder
- [ ] Add a single `GET /api/health` endpoint that returns `{ "status": "ok" }`
- [ ] Configure CORS to allow requests from `http://localhost:5173` (Vite default)
- [ ] Verify it runs locally on `http://localhost:5000`

### 2. Initialize the frontend (React + TypeScript + Vite)

- [ ] Scaffold a Vite + React + TypeScript project in a `frontend/` folder
- [ ] Create a single page that fetches `/api/health` and displays the response
- [ ] Verify it runs locally on `http://localhost:5173`

### 3. Set up the database

- [ ] Choose database: PostgreSQL (works locally and on Azure)
- [ ] Create a local database (e.g., `intex2_dev`)
- [ ] Install Entity Framework Core + Npgsql provider in the backend
- [ ] Create a `DbContext` with a single entity — `Safehouse` (the simplest table in the dataset)
- [ ] Run an EF Core migration to create the `Safehouses` table
- [ ] Seed it with the data from `data/safehouses.csv`

### 4. Wire it all together

- [ ] Add a `GET /api/safehouses` endpoint that returns all safehouses from the DB
- [ ] Create a simple `<SafehouseList />` React component that fetches and displays them in a table
- [ ] Verify the full loop: React → .NET API → PostgreSQL → response rendered in browser

### 5. Project structure & config

- [ ] Add a `.gitignore` covering .NET, Node, and environment files
- [ ] Add a `.env.example` in the backend for connection string (no real secrets committed)
- [ ] Add a root `README.md` with setup instructions (how to run backend + frontend locally)

---

## What this does NOT include (intentionally)

- Authentication / authorization (plan 02)
- Styling / design system (plan 03)
- Additional CRUD operations (plan 04+)
- ML pipelines (later)
- Deployment to Azure (later)
- Privacy policy, cookie consent, CSP headers (later)

---

## Tech stack (per requirements)

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Frontend  | React + TypeScript (Vite)         |
| Backend   | .NET 10 / C# Web API             |
| Database  | PostgreSQL (EF Core + Npgsql)     |
| Dev tools | Git, branches + PRs, .env files   |

---

## Definition of done

You can open `http://localhost:5173` in a browser and see a list of safehouses pulled from a real PostgreSQL database through the .NET API. Nothing else needs to work yet.
