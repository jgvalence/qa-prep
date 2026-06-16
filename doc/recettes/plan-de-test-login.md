# Plan de test — Connexion

**Fonctionnalité** : Connexion utilisateur (`/login`)  
**Version** : à renseigner  
**Environnement** : local / test  
**Données** : `user@test.com` / `password123`

---

## Cas de test

| ID | Cas | Données | Résultat attendu | Statut |
|----|-----|---------|-----------------|--------|
| TC-001 | Connexion valide | email + mdp corrects | Redirection vers /dashboard | |
| TC-002 | Email invalide (format) | `pasunemail` | Message d'erreur sur le champ email | |
| TC-003 | Mot de passe incorrect | email correct + mdp faux | Message "Identifiants incorrects" | |
| TC-004 | Email inconnu | email inexistant | Message "Identifiants incorrects" | |
| TC-005 | Champs vides | rien | Messages de validation sur les deux champs | |
| TC-006 | Email vide seul | mdp renseigné | Message de validation sur email | |
| TC-007 | Mot de passe vide seul | email renseigné | Message de validation sur mdp | |
| TC-008 | Accès /login connecté | session active | Redirection vers /dashboard | |
| TC-009 | Déconnexion puis retour arrière | — | Redirection vers /login | |

---

## Tests automatisés correspondants

- `tests/e2e/login.spec.ts` — TC-001, TC-002, TC-003, TC-005
- `frontend/src/components/LoginForm.test.tsx` — TC-004, TC-006, TC-007
- `backend/test/auth.e2e-spec.ts` — TC-001, TC-003, TC-004

---

## Risques identifiés

- Le message d'erreur ne doit pas distinguer "email inconnu" de "mdp incorrect" (sécurité)
- La session doit être invalidée après déconnexion
