# Portfolio Chatbot sécurisé

Ce projet ajoute un backend Node.js + Express pour sécuriser le chatbot du portfolio. La clé API xAI n'est plus exposée dans le navigateur et n'est pas stockée dans le dépôt.

## Structure du projet

- `server/index.js` - backend Express exposant la route `POST /api/chat`
- `assets/js/chatbot.js` - frontend du chatbot qui appelle le backend
- `.env.example` - exemple de variables d'environnement
- `.gitignore` - exclusions de fichiers sensibles et temporaires

## Installation

1. Copier l'exemple de variables d'environnement :

   ```bash
   cp .env.example .env
   ```

2. Remplir `.env` avec votre clé `XAI_API_KEY` et votre domaine GitHub Pages :

   - `XAI_API_KEY` : clé secrète xAI/Grok
   - `FRONTEND_ORIGIN` : domaine autorisé pour le CORS, par exemple `https://votre-utilisateur.github.io`

3. Installer les dépendances :

   ```bash
   npm install
   ```

4. Lancer le serveur en local :

   ```bash
   npm run dev
   ```

5. Ouvrir le navigateur :

   - `http://localhost:3000/chat.html`

## Déploiement

### Backend

- Déployer le backend sur un service Node.js de votre choix (Render, Vercel, Railway, etc.).
- Définir la variable d'environnement `XAI_API_KEY` uniquement sur le serveur.
- Définir `FRONTEND_ORIGIN` sur votre domaine GitHub Pages.

### Frontend

- Le frontend peut rester hébergé sur GitHub Pages.
- Si la page statique est servie depuis un domaine différent du backend, mettez à jour la variable `BACKEND_BASE_URL` dans `assets/js/chatbot.js` pour pointer vers l'URL du backend.

## Sécurité

- La clé `XAI_API_KEY` est uniquement lue côté serveur.
- Le backend ne renvoie jamais la clé API dans les réponses.
- Les conversations ne sont pas enregistrées sur le serveur.
- Le backend applique un rate limiter de 100 requêtes par heure par IP.
- Le backend valide les messages avant de les envoyer à l'API xAI.

## Remarques

- Conservez `.env` dans votre machine locale uniquement.
- Ne committez jamais les clés ou les secrets dans le dépôt GitHub.
- Si vous voulez héberger le backend et le frontend ensemble, le serveur Express sert également les fichiers statiques existants du projet.
