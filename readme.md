## Table des matières

* [Technologies](#technologies)
* [Installation](#installation)
* [Configuration](#configuration)
* [Démarrage du serveur](#d%C3%A9marrage-du-serveur)
* [Architecture](#architecture)
* [Routes](#routes)
* [Exemples de requêtes](#exemples-de-requ%C3%AAtes)
* [Contribuer](#contribuer)
* [Licence](#licence)

---

## Technologies

* Node.js v22.19.0
* Express.js
* OpenAPI 3.1 pour la documentation

---

## Installation

```bash
# Cloner le dépôt
git clone git@github.com:thomas26215/Serveur-Rest-muscu.git
cd Serveur-Rest-muscu


# Installer les dépendances
npm install
```

---

## Configuration

Créer un fichier `.env` à la racine si nécessaire :

```env
PORT=3000
DATABASE_URL=url_de_votre_bdd
FIREBASE_CREDENTIALS=chemin/vers/credentials.json
```

* `PORT` : port d’écoute du serveur (par défaut 3000).
* `DATABASE_URL` : URL de la base de données (MongoDB, PostgreSQL, etc.).
* `FIREBASE_CREDENTIALS` : si Firebase est utilisé pour stockage/authentification.

---

## Démarrage du serveur

```bash
# Pour lancer le serveur
npm start

# Pour développement avec reload automatique
npm run dev
```

Le serveur est accessible par défaut sur : `http://localhost:3000`.

---

## Architecture

```
/controllers    -> logiques métier pour chaque route
/routes         -> définition des endpoints
/models         -> schémas de données (si MongoDB ou ORM)
/middleware     -> middlewares éventuels (erreurs, validations)
/server.js      -> point d’entrée du serveur
```

---

## Routes

Toutes les routes et endpoints sont spécifiées dans le fichier OpenAPI (`openapi.yaml`).
La spécification contient les informations sur les modules suivants :

* Users
* Exercises
* Workouts
* GroupWorkouts
* Challenges
* Coaching
* Feed
* Statistics
* Badges

Pour consulter et tester les routes, utiliser un outil comme **Swagger UI** ou **Postman** avec le fichier OpenAPI.

---

## Exemples de requêtes cURL

Voici quelques exemples simples pour tester le serveur :

```bash
# Récupérer la liste des utilisateurs
curl -X GET http://localhost:3000/users

# Créer un utilisateur
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"username":"thomas","email":"thomas@email.com"}'

# Récupérer un exercice
curl -X GET http://localhost:3000/exercises/123

# Créer un exercice
curl -X POST http://localhost:3000/exercises -H "Content-Type: application/json" -d '{"creatorId":"1","name":"Pompes","description":"Faire des pompes","type":"load","visibility":"public"}'
```

*(Toutes les autres routes sont disponibles et documentées dans le fichier OpenAPI.)*

---

## Contribuer

1. Fork le projet.
2. Créer une branche : `git checkout -b feature/ma-fonctionnalite`.
3. Commit tes changements : `git commit -m "Ajout d'une fonctionnalité"`.
4. Pusher sur ta branche : `git push origin feature/ma-fonctionnalite`.
5. Ouvrir une Pull Request.

---

## Licence

MIT License © 2025 Thomas
