# Architecture

## Structure du monorepo

```
qa-prep/
├── frontend/                  ← React + Vite
│   ├── src/
│   │   ├── components/        ← composants métier
│   │   │   └── ui/            ← primitives shadcn (ne pas modifier)
│   │   ├── pages/             ← pages React Router
│   │   ├── hooks/             ← hooks custom
│   │   ├── lib/               ← logique partagée, utils
│   │   │   └── validations/   ← schémas Zod
│   │   ├── services/          ← appels API (fetch wrappers)
│   │   ├── store/             ← stores Zustand
│   │   └── types/             ← types TypeScript partagés
│   └── cypress/
│       ├── e2e/               ← scénarios Cypress
│       └── fixtures/          ← données de test
│
├── backend/                   ← NestJS
│   ├── src/
│   │   ├── modules/           ← un dossier par domaine métier
│   │   │   └── users/
│   │   │       ├── users.controller.ts
│   │   │       ├── users.service.ts
│   │   │       ├── users.module.ts
│   │   │       ├── dto/
│   │   │       └── *.spec.ts
│   │   ├── auth/              ← JWT, guards, strategies
│   │   ├── common/            ← guards, pipes, interceptors partagés
│   │   ├── generated/prisma/  ← client Prisma généré
│   │   └── prisma/            ← PrismaService
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   └── test/                  ← tests e2e Supertest
│
└── doc/                       ← documentation projet
```

## Décisions techniques

### Pourquoi SQLite ?
Base locale simple, zéro configuration, facile à resetter entre les tests. Suffisant pour un projet de formation. Migrable vers PostgreSQL sans changer le code NestJS.

### Pourquoi un monorepo sans Turborepo ?
Le projet est développé par une seule personne. Turborepo/Nx ajoutent de la complexité sans gain réel à cette échelle. Un `package.json` racine avec `concurrently` suffit.

### Pourquoi TanStack Query côté frontend ?
Gère le cache, les états de chargement et les mutations sans boilerplate. Évite les `useEffect` pour les appels API.

### Pourquoi class-validator côté NestJS ?
Intégré nativement avec les pipes NestJS (`ValidationPipe`). Pas besoin d'ajouter Zod côté backend si class-validator est déjà en place — ne pas mixer les deux.

## Ports en développement

| App | Port |
|-----|------|
| Frontend (Vite) | 5173 |
| Backend (NestJS) | 3000 |

Le frontend appelle le backend via `http://localhost:3000`. Configurer le proxy Vite ou une variable d'environnement `VITE_API_URL`.
