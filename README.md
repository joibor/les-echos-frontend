# Les Echos — Newsletter Frontend

Interface de gestion des abonnements aux newsletters des Echos, Investir, Le Parisien et LVMH.

## Prérequis

- **Node.js 22 ou supérieur** — requis pour la compatibilité avec les dépendances du projet

## Stack technique

| Outil                                               | Version | Rôle                  |
| --------------------------------------------------- | ------- | --------------------- |
| [React](https://react.dev/)                         | 19      | UI                    |
| [TypeScript](https://www.typescriptlang.org/)       | 5.7     | Typage statique       |
| [Vite](https://vite.dev/)                           | 6       | Bundler & dev server  |
| [Material UI](https://mui.com/)                     | 6       | Composants UI         |
| [Styled Components](https://styled-components.com/) | 6       | Styles des composants |
| [React Router](https://reactrouter.com/)            | 7       | Routing               |
| [Vitest](https://vitest.dev/)                       | 3       | Tests unitaires       |
| [Testing Library](https://testing-library.com/)     | 16      | Utilitaires de test   |

## Architecture

### Structure des dossiers

Les fichiers sont organisés par responsabilité. `components` contient les composants réutilisables, `pages` les vues associées aux routes, `context` le state global, `types` les interfaces TypeScript partagées, et `utils` les fonctions pures sans dépendance React.

### Choix des contexts

Le state global est séparé en deux contexts : `UserContext` pour le profil courant, et `SubscriptionContext` pour les abonnements aux newsletters. Ce découpage évite qu'un changement d'abonnement ne re-rende des composants qui n'utilisent que le profil utilisateur, et inversement.

`SubscriptionContext` est lui-même divisé en deux providers distincts — un pour le state, un pour le dispatch. Le dispatch de `useReducer` étant une référence stable, les composants qui n'ont besoin que d'écrire (comme `Header` au reset) ne re-rendent pas quand l'état des abonnements change.

### Flux de données

`Home` est le seul composant qui lit les deux contexts. Il calcule `hasAccess` et `isSubscribed` pour chaque newsletter et transmet ces valeurs en props aux cartes. Les `NewsletterCard` sont ainsi isolées des contexts et enveloppées dans `React.memo` — elles ne re-rendent que si leurs props ont réellement changé.

## Installation

```bash
npm install
```

## Commandes

```bash
# Lancer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Lancer les tests
npm run test

# Lancer les tests avec couverture de code
npm run test:coverage

# Linter
npm run lint

# Formatter le code
npm run format
```
