# qa-prep

Application full-stack construite pour pratiquer le QA Engineering — tests unitaires, d'intégration, API et E2E — sur une stack React + NestJS.

Le projet sert de plateforme d'entraînement : chaque fonctionnalité de l'app est accompagnée de tests réels qui illustrent les techniques QA.

## Stack

**Frontend** — React 19 · Vite · TypeScript · MUI · TanStack Query · React Hook Form · Zod  
**Backend** — NestJS · Prisma · SQLite · JWT  
**Tests** — Jest · React Testing Library · Supertest · Playwright

## Installation

```bash
# 1. Cloner le repo
git clone https://github.com/jgvalence/qa-prep.git
cd qa-prep

# 2. Installer les dépendances (racine + frontend + backend)
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 3. Configurer les variables d'environnement du backend
cd backend
cp .env.example .env        # ou créer backend/.env manuellement (voir ci-dessous)
cd ..

# 4. Créer la base de données et appliquer les migrations
cd backend
npx prisma migrate dev
npm run seed                # crée l'utilisateur de test
cd ..
```

### Contenu de `backend/.env`

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="dev-secret-change-in-production"
```

## Lancer le projet

```bash
npm run dev         # frontend (5173) + backend (3000) en parallèle
npm run dev:front   # frontend seul
npm run dev:back    # backend seul
```

**Compte de test :** `user@test.com` / `password123`

## Tests

```bash
# Unitaires frontend (Jest + RTL)
cd frontend && npm test

# Unitaires backend (Jest)
cd backend && npm test

# API / intégration (Supertest)
cd backend && npm run test:e2e

# E2E navigateur (Playwright)
npx playwright test
npx playwright test --ui      # interface graphique
npx playwright show-report    # rapport HTML
```

## Structure

```
frontend/       — React + Vite
backend/        — NestJS + Prisma + SQLite
tests/          — scénarios Playwright E2E
doc/recettes/   — artefacts QA (stratégie, plans de test, checklists)
```

## Artefacts QA

| Fichier | Description |
|---------|-------------|
| [strategie-de-test.md](doc/recettes/strategie-de-test.md) | Stratégie de test globale |
| [plan-de-test-login.md](doc/recettes/plan-de-test-login.md) | Plan de test — connexion |
| [checklist-regression.md](doc/recettes/checklist-regression.md) | Checklist de régression avant déploiement |
