# Bonnes pratiques

## Frontend React

- **Server state** (données API) → TanStack Query. Pas de `useEffect` + `useState` pour fetcher.
- **UI state partagé** entre composants distants → Zustand (`src/store/`).
- **UI state local** (modal, toggle) → `useState`.
- Un composant affiche. Un hook ou un service agit. Pas de logique métier dans les composants.
- Typer les props avec `type`, pas `interface`, sauf si extensible.
- Pas de `any`. Pas de `as unknown as X` sauf cas justifié.

### Formulaires
- React Hook Form + `zodResolver` pour tous les formulaires.
- Typer avec `z.infer<typeof schema>`.
- Ne jamais gérer chaque champ avec `useState`.

### UI
- Stack : **shadcn/ui + Tailwind CSS**. Pas de MUI, pas de Ant Design.
- Chercher dans shadcn avant de créer un composant.
- Tokens sémantiques uniquement (`bg-primary`, `text-muted-foreground`). Jamais de couleurs hardcodées.
- Icônes : **Lucide React** uniquement.
- `cn()` pour fusionner les classes Tailwind.

### Appels API
- Centraliser les appels dans `src/services/`. Les composants n'appellent pas `fetch` directement.
- Toujours gérer les états `isLoading`, `isError` dans l'UI.

---

## Backend NestJS

- Un module par domaine métier (`users`, `lessons`, `progress`...).
- Le controller reçoit la requête, délègue au service. Pas de logique dans le controller.
- Le service contient la logique métier. Pas d'accès Prisma direct dans le controller.
- Valider toutes les entrées avec des DTOs + `class-validator`. Activer `ValidationPipe` globalement.
- Protéger les routes sensibles avec `@UseGuards(JwtAuthGuard)`.

### DTOs
```ts
// Toujours décorer avec class-validator
export class CreateUserDto {
  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password: string
}
```

### Erreurs
- Utiliser les exceptions NestJS built-in : `NotFoundException`, `BadRequestException`, `ForbiddenException`.
- Ne jamais laisser une erreur Prisma remonter brute au client.

### Prisma
- Un seul `PrismaService` injectable dans toute l'app.
- Importer depuis `@/generated/prisma/client`, jamais depuis `@prisma/client`.
- Après tout changement de schema : `npx prisma generate`.

---

## TypeScript (frontend + backend)

- Pas de `any`.
- Typer les retours de fonctions asynchrones.
- `type` pour les shapes de données, `interface` pour les contrats extensibles.
- Partager les types communs (DTOs réponse) dans un dossier `shared/types/` si besoin.

---

## Code

- Pas de commentaires qui expliquent ce que le code fait — seulement pourquoi si non-évident.
- Pas d'abstractions prématurées. Trois lignes similaires avant d'extraire une fonction.
- Nommer les variables et fonctions pour qu'elles s'expliquent d'elles-mêmes.
