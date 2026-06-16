# Checklist de régression — qa-prep

À exécuter avant chaque déploiement.

---

## Authentification

- [ ] Connexion avec un compte valide → redirection /dashboard
- [ ] Connexion avec un mot de passe incorrect → message d'erreur
- [ ] Accès à /dashboard sans être connecté → redirection /login
- [ ] Déconnexion → retour sur /login
- [ ] Retour arrière après déconnexion → toujours sur /login

---

## Navigation

- [ ] Page d'accueil accessible
- [ ] Liste des modules affichée
- [ ] Accès à un module → liste des leçons visible
- [ ] Accès à une leçon → contenu affiché

---

## Progression

- [ ] Marquer une leçon comme terminée → état sauvegardé
- [ ] Recharger la page → progression conservée
- [ ] Progression visible sur la page du module

---

## Formulaires

- [ ] Soumission d'un formulaire vide → messages de validation
- [ ] Champs requis marqués comme tels
- [ ] Feedback visuel après soumission réussie

---

## API

- [ ] `GET /modules` → 200 + liste
- [ ] `POST /auth/login` → 200 + token
- [ ] `GET /users/me` sans token → 401
- [ ] `POST /progress` avec token → 201

---

## Version testée

Version :  
Date :  
Testeur :  
Environnement :  
Résultat global : [ ] GO  [ ] GO avec réserves  [ ] NO-GO  
Commentaires :
