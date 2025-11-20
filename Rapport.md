# Spécification fonctionnelle et technique — API REST de la plateforme de musculation collaborative

### 1. Présentation générale

Cette API vise à fournir la base technique d’une plateforme de musculation moderne et collaborative. Elle permet aux utilisateurs de créer, gérer et partager leurs exercices et leurs séances d’entraînement tout en favorisant les interactions sociales, le suivi de progression et la motivation collective.
L’objectif du projet est de combiner **performance, personnalisation et esprit communautaire**, en proposant un espace où chacun peut progresser, apprendre et s’entraîner avec d’autres passionnés.

La plateforme repose sur un système d’utilisateurs connectés, d’exercices et de séances d’entraînement. Chaque membre peut choisir de garder ses contenus privés, de les partager avec ses amis ou de les rendre publics à la communauté.
Des fonctionnalités collaboratives telles que les **séances en groupe**, les **défis sportifs** ou le **suivi par un coach** viennent enrichir l’expérience utilisateur.

---

### 2. Utilisateurs et authentification

Chaque utilisateur possède un profil personnel comprenant un identifiant unique, un nom d’utilisateur, une adresse e-mail, un mot de passe sécurisé, et des informations optionnelles telles qu’une biographie ou une photo de profil.
L’accès à l’API repose sur un système d’authentification sécurisé utilisant des **tokens JWT**, garantissant la confidentialité et l’intégrité des requêtes.

Les utilisateurs peuvent également définir leur **niveau de visibilité par défaut**, influençant la manière dont leurs créations (exercices et séances) sont partagées :

* **Public** : accessible à tous les membres,
* **Amis uniquement** : visible seulement pour les utilisateurs liés par une relation d’amitié,
* **Privé** : restreint à l’auteur lui-même.

Chaque utilisateur peut gérer ses amis, envoyer ou accepter des demandes, et bloquer des membres indésirables. Ces relations sociales sont la base du partage collaboratif et de la visibilité sélective des contenus.

---

### 3. Gestion des exercices

Les **exercices** constituent le fondement du système. Chaque exercice correspond à un mouvement spécifique, accompagné d’informations précises pour assurer une bonne exécution et un suivi efficace.

Chaque exercice est défini par :

* un **nom** et une **description détaillée**,
* une **vidéo** explicative optionnelle,
* les **groupes musculaires travaillés**,
* les **consignes de réalisation**,
* le **matériel nécessaire**,
* et un **type** : soit basé sur la **charge** (avec poids et répétitions), soit sur la **durée** (temps d’exécution).

Lors de la création, l’utilisateur peut décider de la visibilité de l’exercice (public, amis ou privé).
Les autres membres peuvent consulter, commenter ou s’inspirer des exercices publics, tandis que ceux réservés aux amis ou privés restent confidentiels selon les règles définies.

L’API permet la création, la modification, la suppression et la consultation d’exercices.
Un moteur de recherche intégré offre la possibilité de filtrer les exercices par groupe musculaire, type, niveau ou créateur.

---

### 4. Gestion des séances d’entraînement

Une **séance** regroupe plusieurs exercices autour d’un objectif commun. Elle constitue un programme complet, paramétrable et réutilisable.

Chaque séance comprend :

* un **nom**,
* une **description**,
* un **niveau de difficulté** (débutant, intermédiaire, avancé),
* un **objectif principal** (force, endurance, hypertrophie, perte de poids, etc.),
* et une **liste d’exercices associés**.

Pour chaque exercice inclus, l’utilisateur peut définir le **nombre de séries**, le **nombre de répétitions** et la **charge utilisée** (pour les exercices de type charge), ou la **durée totale** de l’effort (pour les exercices de type durée).
Des temps de repos peuvent également être ajoutés pour mieux structurer la séance.

Comme les exercices, les séances peuvent être privées, réservées aux amis, ou rendues publiques.
L’API garantit la cohérence entre le type d’exercice et les paramètres fournis, évitant par exemple l’association d’un temps à un exercice de type charge.

---

### 5. Entraînements de groupe

La plateforme introduit la possibilité de **s’entraîner à plusieurs** grâce à des séances collaboratives.
Un utilisateur peut créer une **séance de groupe** à laquelle ses amis peuvent être invités ou qu’ils peuvent rejoindre librement selon les paramètres de visibilité.

Chaque participant dispose de sa propre fiche de performance dans la séance commune, lui permettant d’enregistrer ses charges, ses répétitions ou ses temps de manière individuelle.
Un espace de discussion intégré permet d’échanger pendant ou après la séance, favorisant l’entraide et la motivation collective.

Des statistiques globales peuvent être calculées, comme le **volume total soulevé par le groupe**, le **temps d’entraînement cumulé**, ou la **moyenne de progression**.

---

### 6. Défis et compétitions amicales

Pour renforcer la dimension ludique, l’API propose la création de **défis sportifs** entre utilisateurs.
Un défi peut consister à réaliser un certain nombre de répétitions, à atteindre un volume d’entraînement, ou à maintenir une régularité sur plusieurs jours.

Chaque défi comporte :

* un **nom** et une **description**,
* un **objectif mesurable** (nombre de séances, répétitions, temps cumulé, etc.),
* une **durée** (date de début et de fin),
* une **liste de participants**,
* et un **classement** mis à jour automatiquement selon les performances.

Ces défis encouragent la participation active et la compétition saine entre amis ou membres de la communauté.
Un **tableau des scores** permet de visualiser les meilleures performances et de suivre sa progression.

---

### 7. Coaching et accompagnement personnalisé

L’API offre la possibilité à certains utilisateurs de devenir **coachs**.
Un coach peut accompagner plusieurs élèves, leur créer des programmes personnalisés, suivre leurs progrès et leur envoyer des retours après chaque séance.

Les utilisateurs peuvent :

* envoyer une **demande de coaching** à un membre reconnu,
* accepter ou refuser cette demande,
* consulter les séances créées par leur coach,
* recevoir des conseils ou des ajustements personnalisés.

Les coachs disposent d’un accès privilégié aux statistiques de leurs élèves (progression, régularité, poids, performances), tout en respectant les paramètres de confidentialité définis par ceux-ci.

Ce système encourage la transmission de savoir, la motivation et la progression encadrée.

---

### 8. Mur d’activités et interactions sociales

L’aspect social est central dans cette plateforme.
Chaque action significative — comme la création d’un exercice, la publication d’une séance ou la réussite d’un défi — peut apparaître sur le **mur d’activités**.
Les utilisateurs peuvent ainsi suivre en temps réel les réalisations de leurs amis, commenter, réagir ou féliciter.

Ce fil d’actualité favorise la communauté et met en valeur les efforts de chacun.
Les publications peuvent être accompagnées d’images, de statistiques d’entraînement ou de messages d’encouragement.

L’API gère la publication, la suppression et la récupération de ces activités selon les relations entre utilisateurs et leurs paramètres de visibilité.

---

### 9. Statistiques, historique et progression

L’un des piliers du système est le **suivi de progression**.
Chaque utilisateur dispose d’un historique complet de ses entraînements et de ses performances, lui permettant de visualiser son évolution sur le long terme.

L’API permet de :

* consulter l’évolution du poids utilisé sur un exercice donné,
* visualiser la fréquence d’entraînement,
* calculer le volume total soulevé sur une période,
* mesurer la durée moyenne des séances,
* ou encore suivre la progression des objectifs personnels.

Des **graphiques et analyses statistiques** peuvent être générés côté client à partir des données agrégées par l’API.

Cette dimension analytique aide les utilisateurs à identifier leurs points forts, leurs faiblesses et à ajuster leurs entraînements en conséquence.

---

### 10. Récompenses et gamification

Pour encourager la régularité et la motivation, un système de **badges** et de **récompenses virtuelles** est intégré à la plateforme.
Les utilisateurs peuvent débloquer des succès en atteignant certains jalons :

* première séance terminée,
* dix jours d’entraînement consécutifs,
* objectif de poids atteint,
* participation à un défi collectif, etc.

Ces récompenses apparaissent sur le profil de l’utilisateur et sur son mur d’activités, valorisant sa progression au sein de la communauté.

---

### 11. Recherche et recommandations

Afin de faciliter la découverte de nouveaux contenus, l’API inclut un moteur de recherche et de recommandation.
Les utilisateurs peuvent rechercher des exercices, des séances ou des membres selon différents critères : objectif, groupe musculaire, niveau de difficulté, ou type d’équipement.

Des recommandations automatiques peuvent être proposées en fonction du profil de l’utilisateur :

* suggestions de séances adaptées à son niveau et à ses objectifs,
* exercices complémentaires pour équilibrer les groupes musculaires,
* ou propositions d’amis partageant des intérêts similaires.

---

### 12. Confidentialité, sécurité et modération

La confidentialité est au cœur du système.
Chaque action est soumise à des vérifications de droits d’accès en fonction du niveau de visibilité défini par l’auteur.
Les utilisateurs ont la possibilité de :

* gérer leurs paramètres de confidentialité,
* bloquer d’autres membres,
* signaler du contenu inapproprié.

L’API prévoit également un mécanisme de **modération** pour traiter les signalements, supprimer les contenus litigieux et protéger la communauté.

Les communications entre le client et le serveur sont chiffrées, et les données sensibles (mots de passe, tokens, etc.) sont sécurisées selon les meilleures pratiques actuelles.

---

### 13. Architecture et principes REST

L’API est conçue selon les principes REST, avec des routes clairement identifiées pour chaque ressource :

* `/auth` pour la gestion de l’inscription et de la connexion,
* `/users` pour les profils et les relations,
* `/exercises` pour la gestion des exercices,
* `/workouts` pour les séances,
* `/group-workouts` pour les entraînements collaboratifs,
* `/challenges` pour les défis,
* `/feed` pour le mur d’activités,
* `/stats` pour les analyses et la progression.

Les requêtes utilisent les méthodes HTTP standards (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), et les données sont échangées au format **JSON**.
Les erreurs sont renvoyées sous forme structurée, accompagnées d’un code HTTP clair (`400`, `401`, `403`, `404`, `500`, etc.).

---

### 14. Évolutions futures

La plateforme a été pensée pour évoluer facilement.
Parmi les extensions envisagées :

* ajout d’un **système de commentaires** sur les exercices et séances,
* intégration d’**événements communautaires** (séances collectives, challenges par équipe),
* ajout de **rapports d’analyse avancés** (progression par muscle ou par semaine),
* support d’**API tierces** (montres connectées, applications de nutrition),
* et ouverture d’une **API publique** pour développeurs tiers.
