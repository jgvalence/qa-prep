# Stratégie de test

## Pyramide des tests

```
         /\
        /E2E\         ← Cypress  (peu, lents, coûteux)
       /------\
      /  Intég. \     ← RTL + Supertest  (couverture des flux)
     /------------\
    /   Unitaires  \  ← Jest  (beaucoup, rapides, ciblés)
   /________________\
```

Ratio cible : **70% unitaires / 20% intégration / 10% E2E**.

---

## Tests unitaires frontend — Jest + RTL

### Conventions
- Fichier de test : `ComponentName.test.tsx` à côté du composant.
- Un `describe` par composant ou hook.
- Nommer les tests : `it("should <comportement> when <condition>")`.

### Ce qu'on teste
- Rendu conditionnel (états vide, chargement, erreur, succès).
- Interactions utilisateur (`userEvent.click`, `userEvent.type`).
- Hooks custom isolément.
- Fonctions utilitaires pures.

### Ce qu'on ne teste pas
- Les détails d'implémentation (état interne, noms de méthodes privées).
- Les composants shadcn/ui — ils sont déjà testés upstream.
- Le style CSS.

### Template
```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MyComponent } from "./MyComponent"

describe("MyComponent", () => {
  it("should display an error message when form is submitted empty", async () => {
    render(<MyComponent />)
    await userEvent.click(screen.getByRole("button", { name: /submit/i }))
    expect(screen.getByText(/champ requis/i)).toBeInTheDocument()
  })
})
```

### Mocks
- Mocker les appels API avec `jest.fn()` ou `msw`.
- Ne jamais mocker un composant React pour tester son parent — tester le rendu réel.
- Mocker `useNavigate` si le composant redirige.

---

## Tests unitaires backend — Jest (NestJS)

### Conventions
- Fichier de test : `*.spec.ts` à côté du fichier testé.
- Utiliser `Test.createTestingModule()` pour instancier les modules NestJS en isolation.
- Mocker les dépendances avec `jest.fn()`.

### Ce qu'on teste
- La logique métier des services.
- Les cas d'erreur (ressource introuvable, permission refusée, validation échouée).
- Les guards et interceptors.

### Template service
```ts
describe("UsersService", () => {
  let service: UsersService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: { user: { findUnique: jest.fn() } } },
      ],
    }).compile()

    service = module.get<UsersService>(UsersService)
  })

  it("should throw NotFoundException when user does not exist", async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException)
  })
})
```

---

## Tests d'intégration API — Supertest

- Fichiers dans `backend/test/*.e2e-spec.ts`.
- Tester les endpoints réels avec une base SQLite de test (`DATABASE_URL=file:./test.db`).
- Resetter la base avant chaque suite avec `prisma.$executeRaw` ou un seed dédié.
- Vérifier : statut HTTP, structure du payload, headers.

```ts
it("POST /auth/login should return 401 with wrong credentials", () => {
  return request(app.getHttpServer())
    .post("/auth/login")
    .send({ email: "x@x.com", password: "wrong" })
    .expect(401)
})
```

---

## Tests E2E — Cypress

- Fichiers dans `frontend/cypress/e2e/`.
- Tester les parcours utilisateur critiques uniquement (login, CRUD principal, erreurs bloquantes).
- Utiliser `cy.intercept()` pour contrôler les réponses API dans les tests de scénario UI.
- Utiliser les vraies données (backend de test) pour les tests de parcours complets.

### Conventions
```ts
describe("Login flow", () => {
  beforeEach(() => {
    cy.visit("/login")
  })

  it("should redirect to dashboard after successful login", () => {
    cy.get('[data-testid="email"]').type("user@test.com")
    cy.get('[data-testid="password"]').type("password123")
    cy.get('[data-testid="submit"]').click()
    cy.url().should("include", "/dashboard")
  })
})
```

### Sélecteurs
- Toujours utiliser `data-testid` pour les éléments interactifs dans les tests Cypress.
- Ne jamais sélectionner par classe CSS ou structure DOM — fragile.

---

## Variables d'environnement pour les tests

```bash
# backend/.env.test
DATABASE_URL=file:./test.db
JWT_SECRET=test-secret
```

Lancer les tests backend avec :
```bash
NODE_ENV=test npm run test:e2e
```

---

## Couverture cible

| Périmètre | Cible |
|-----------|-------|
| Services NestJS | > 80% |
| Composants React critiques | > 70% |
| E2E parcours principaux | 100% des happy paths |
