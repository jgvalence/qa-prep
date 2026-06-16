# CLAUDE.md

@doc/bonnes-pratiques.md
@doc/testing.md
@doc/architecture.md

---

## Référence complète

- `doc/qa.md` — roadmap complète : 7 modules QA + simulation entretien + niveau cible Abelio
- `doc/todo.md` — avancement du projet
- `doc/architecture.md` — décisions techniques
- `doc/testing.md` — stratégie et conventions de test

> **Règle** : dès qu'une tâche de `doc/todo.md` est terminée, la cocher immédiatement (`- [ ]` → `- [x]`).

---

## Commandes

```bash
# Racine — lancer les deux apps
npm run dev               # frontend (5173) + backend (3000) en parallèle
npm run dev:front         # frontend seul
npm run dev:back          # backend seul

# Frontend
cd frontend
npm run dev               # dev server Vite
npm run build             # build production
npm run test              # Jest + RTL
npm run test:watch        # Jest en mode watch
npm run lint              # ESLint

# Backend
cd backend
npm run start:dev         # dev server NestJS avec hot reload
npm run build             # build production
npm run test              # tests unitaires Jest
npm run test:e2e          # tests e2e Supertest
npm run test:cov          # couverture de tests

# Prisma (depuis backend/)
npx prisma migrate dev --name <nom>   # créer et appliquer une migration
npx prisma generate                    # régénérer le client après un changement de schema
npx prisma studio                      # GUI Prisma
npx prisma db seed                     # seeder la base

# Cypress (depuis frontend/)
npx cypress open          # ouvrir l'UI Cypress
npx cypress run           # lancer les tests en headless
```

---

## Stack

### Frontend — `frontend/`
- **React 19 + Vite + TypeScript**
- **React Router v7** — routing client-side
- **TanStack Query v5** — state serveur, cache, mutations
- **Zustand** — state UI partagé entre composants
- **React Hook Form + Zod** — formulaires validés
- **shadcn/ui + Tailwind CSS** — composants UI
- **Lucide React** — icônes uniquement

### Backend — `backend/`
- **NestJS + TypeScript**
- **Prisma 7** — ORM, client dans `src/generated/prisma/`
- **SQLite via libsql** — base locale, simple à resetter
- **class-validator + class-transformer** — validation des DTOs
- **@nestjs/jwt + @nestjs/passport** — authentification JWT

### Tests
- **Jest + React Testing Library** — tests unitaires et d'intégration frontend
- **Jest** — tests unitaires backend (NestJS built-in)
- **Supertest** — tests e2e API NestJS
- **Cypress** — tests E2E navigateur

---

## Architecture — Contraintes de versions

- **Prisma 7** — générateur TypeScript-first `prisma-client`. Client généré dans `backend/src/generated/prisma/`. Toujours importer depuis `@/generated/prisma/client`. Requiert un driver adapter.
- **TanStack Query v5** — `useQuery` prend obligatoirement un objet `{ queryKey, queryFn }`.
- **Zod v4** — quelques APIs diffèrent de Zod v3, notamment `z.string().min()` et les unions.
- **NestJS v11** — utiliser les décorateurs standards : `@Controller`, `@Get`, `@Post`, `@Body`, `@Param`, `@UseGuards`.

---

## Data flow

```
Browser
  → React (composants)
  → TanStack Query (useQuery / useMutation)
  → API REST NestJS (fetch vers localhost:3000)
  → NestJS Controller → Service → Prisma → SQLite
```

Les composants React ne contactent jamais Prisma directement. Toute donnée passe par l'API NestJS.

---

## Auth

- JWT côté NestJS (`@nestjs/jwt`).
- Token stocké en `httpOnly cookie` ou `localStorage` selon le choix final.
- Protéger un endpoint : `@UseGuards(JwtAuthGuard)`.
- Côté React : intercepteur Axios ou fetch wrapper pour attacher le token.

---

## Modules QA du projet

Le contenu du cours suit `doc/qa.md` :

| Module | Thème |
|--------|-------|
| 1 | Fondamentaux QA |
| 2 | Tests manuels |
| 3 | Jest |
| 4 | Cypress |
| 5 | API Testing |
| 6 | Qualité de mise en production |
| 7 | React + NestJS QA Engineer |
| — | Simulation entretien |
