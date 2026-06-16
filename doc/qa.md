# QA Automation Engineer Roadmap

Objectif : devenir autonome sur les responsabilités d'un QA Automation Engineer moderne dans un environnement React / NestJS.

---

# Module 1 - Fondamentaux QA

## Comprendre les différents types de tests

* Tests unitaires
* Tests d'intégration
* Tests fonctionnels
* Tests E2E
* Tests manuels
* Tests de régression

### Objectifs

* Comprendre le rôle de chaque type de test
* Savoir choisir le bon niveau de test
* Comprendre la pyramide des tests

---

## Cycle de vie d'un bug

* Détection
* Reproduction
* Qualification
* Priorisation
* Correction
* Validation
* Fermeture

### Objectifs

* Rédiger un ticket exploitable
* Reproduire un bug efficacement
* Identifier les informations manquantes

---

## Criticité et priorisation

* Bloquant
* Critique
* Majeur
* Mineur
* Cosmétique

### Objectifs

* Prioriser les anomalies
* Comprendre les impacts métier
* Participer à une décision de mise en production

---

# Module 2 - Tests manuels

## Construction d'un plan de test

### Contenu

* Cas nominal
* Cas limites
* Cas d'erreur
* Cas métier
* Cas de sécurité

### Exercices

Construire un plan de test complet pour :

* Connexion utilisateur
* Création d'un projet
* Inscription utilisateur
* Upload de document

---

## Documentation QA

### Contenu

* Cas de test
* Rapport d'exécution
* Ticket de bug
* Rapport de recette

### Exercices

Rédiger :

* 10 tickets de bug
* 5 plans de test
* 3 rapports de recette

---

## Tests de régression

### Contenu

* Définition
* Stratégies
* Régression manuelle
* Régression automatisée

### Exercices

Construire une checklist de régression pour :

* Application React
* API NestJS

---

# Module 3 - Jest

## Bases Jest

### Contenu

* describe
* test
* expect

### Exercices

Tester :

* fonctions utilitaires
* helpers
* validation métier

---

## Mocks

### Contenu

* jest.fn
* spies
* mocks

### Exercices

Mocker :

* API
* repository
* Prisma
* services NestJS

---

## Tests React

### Contenu

* React Testing Library
* render
* screen
* userEvent

### Exercices

Tester :

* formulaire
* modal
* tableau
* pagination

---

## Tests NestJS

### Contenu

* services
* controllers
* providers

### Exercices

Tester :

* création utilisateur
* permissions
* validation métier

---

# Module 4 - Cypress

## Bases Cypress

### Contenu

* cy.visit
* cy.get
* cy.contains
* cy.click
* cy.type

### Exercices

Automatiser :

* connexion
* déconnexion
* inscription

---

## Assertions Cypress

### Contenu

* should
* contains
* url
* visible

### Exercices

Vérifier :

* messages d'erreur
* redirections
* validations

---

## Scénarios E2E

### Exercices

Automatiser :

* Connexion utilisateur
* Création de projet
* Modification de projet
* Suppression de projet

---

## Gestion des données de test

### Contenu

* fixtures
* seed
* nettoyage

### Exercices

Créer un environnement reproductible

---

## Interception réseau

### Contenu

* cy.intercept

### Exercices

Mocker :

* API REST
* erreurs serveur
* timeout

---

# Module 5 - API Testing

## Tests HTTP

### Contenu

* GET
* POST
* PUT
* DELETE

### Exercices

Tester :

* statut HTTP
* payload
* erreurs

---

## Authentification

### Contenu

* JWT
* permissions
* rôles

### Exercices

Tester :

* admin
* utilisateur
* invité

---

# Module 6 - Qualité de mise en production

## Validation avant déploiement

### Contenu

* checklist QA
* smoke tests
* go / no-go

### Exercices

Construire un processus de validation de release

---

## Analyse d'impact

### Contenu

* risque métier
* risque utilisateur
* risque technique

### Exercices

Décider :

* déployer
* repousser
* bloquer

---

# Module 7 - React + NestJS QA Engineer

## Front React

Tester :

* formulaires
* hooks
* routing
* permissions
* états d'erreur

---

## Backend NestJS

Tester :

* controllers
* services
* guards
* DTO
* validation

---

## Parcours complets

Automatiser :

* login
* CRUD complet
* gestion utilisateurs
* workflow métier

---

# Simulation entretien QA

## Questions fréquentes

* Qu'est-ce qu'une régression ?
* Différence entre test unitaire et E2E ?
* Comment prioriser un bug ?
* Comment rédiger un ticket ?
* Comment construire un plan de test ?
* Quand bloquer une mise en production ?
* Comment tester une API NestJS ?
* Comment tester une application React ?

---

# Niveau attendu pour Abelio

À la fin du parcours :

* Être capable de rédiger un plan de test
* Exécuter une recette complète
* Identifier et qualifier un bug
* Prioriser une anomalie
* Écrire des tests Jest
* Écrire des scénarios Cypress
* Tester une API NestJS
* Participer à une décision de mise en production
* Être autonome sur la qualité d'une application React / NestJS
