# qa-prep

Application full-stack construite pour pratiquer le QA Engineering sur une stack React + NestJS.

## Stack

**Frontend** — React 19 · Vite · TypeScript · MUI · TanStack Query · React Hook Form · Zod  
**Backend** — NestJS · Prisma · SQLite · JWT  
**Tests** — Jest · React Testing Library · Supertest · Playwright

## Structure

```
frontend/   — React + Vite
backend/    — NestJS + Prisma
tests/      — scénarios Playwright E2E
doc/recettes/ — artefacts QA (stratégie, plans de test, checklists)
```

## Lancer le projet

```bash
npm run dev         # frontend (5173) + backend (3000) en parallèle
npm run dev:front   # frontend seul
npm run dev:back    # backend seul
```

## Tests

```bash
# Unitaires et intégration
cd frontend && npm run test
cd backend && npm run test

# API (Supertest)
cd backend && npm run test:e2e

# E2E (Playwright)
npx playwright test
npx playwright test --ui
```

## Artefacts QA

| Fichier | Description |
|---------|-------------|
| [strategie-de-test.md](doc/recettes/strategie-de-test.md) | Stratégie de test globale |
| [plan-de-test-login.md](doc/recettes/plan-de-test-login.md) | Plan de test — connexion |
| [checklist-regression.md](doc/recettes/checklist-regression.md) | Checklist de régression avant déploiement |
