export type Course = {
  id: number
  title: string
  description: string
}

export const COURSES: Course[] = [
  {
    id: 1,
    title: 'Les bases du QA',
    description: 'Types de tests, pyramide des tests, cycle de vie d\'un bug, tickets et rapports.',
  },
  {
    id: 2,
    title: 'Tests manuels',
    description: 'Plan de test, cas de test, tests exploratoires et checklists de régression.',
  },
  {
    id: 3,
    title: 'Jest',
    description: 'Tests unitaires et de composants avec Jest et React Testing Library.',
  },
  {
    id: 4,
    title: 'Playwright',
    description: 'Tests E2E dans le navigateur : locators, assertions, scénarios utilisateur.',
  },
  {
    id: 5,
    title: 'API Testing',
    description: 'Tester les endpoints REST avec Supertest. Statuts HTTP, contrats d\'API.',
  },
  {
    id: 6,
    title: 'Mise en production',
    description: 'CI/CD, couverture de code, qualité du build et stratégie de déploiement.',
  },
]
