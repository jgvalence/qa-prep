# Stratégie de test — qa-prep

## Pourquoi teste-t-on ?

Garantir qu'un utilisateur peut apprendre le QA sur cette plateforme sans être bloqué par un bug.

## Que teste-t-on ?

- L'authentification (connexion, déconnexion, accès protégés)
- La navigation et l'accès aux modules
- La progression (marquer une leçon terminée)
- Les formulaires et leur validation

## Que ne teste-t-on pas ?

- Les composants MUI (testés upstream)
- Les styles et le rendu visuel
- Les performances sous charge (hors périmètre)

## Principaux risques

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Connexion cassée | Bloquant — rien ne fonctionne | Smoke test sur chaque déploiement |
| Progression non enregistrée | Majeur — perte de données utilisateur | Test Supertest sur POST /progress |
| Page de module inaccessible | Majeur — expérience dégradée | Test Playwright sur navigation |
| Validation formulaire absente | Mineur — saisie incorrecte acceptée | Tests Jest sur les composants |

## Types de tests utilisés

| Type | Outil | Ratio cible |
|------|-------|-------------|
| Unitaires | Jest | 70% |
| Intégration API | Supertest | 20% |
| E2E | Playwright | 10% |

## Environnements

| Env | Usage |
|-----|-------|
| Local | Développement, tests unitaires |
| Test | Base SQLite dédiée, tests Supertest et Playwright |

## Données de test

- Compte utilisateur : `user@test.com` / `password123`
- Compte admin : `admin@test.com` / `admin123`
- Base réinitialisée avant chaque suite e2e

## Critères de sortie

- 0 test Jest en échec
- 0 test Supertest en échec
- 0 smoke test Playwright en échec
- Pas de bug bloquant ou critique ouvert

## Décision GO / NO-GO

GO si tous les critères de sortie sont satisfaits.
NO-GO si un smoke test échoue ou si un bug bloquant est ouvert.
