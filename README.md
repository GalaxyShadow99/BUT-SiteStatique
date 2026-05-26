# SAE Transition Écologique & Énergétique - Communauté de Communes de Lisieux

Ce projet a été réalisé dans le cadre d’une **SAE (Situation d'Apprentissage et d'Évaluation)** au cours de la première année de **BUT Informatique à l'IUT d'Ifs (Université de Caen Normandie)**. 

L'objectif principal est de concevoir un site web statique pour accompagner les différents acteurs de la **Communauté de Communes de Lisieux Normandie** (administrés, communes et agglomération) dans la compréhension, la mise en œuvre et le recensement des besoins liés à la transition écologique, avec un focus particulier sur la mobilité durable.

---

## Objectifs du Projet

- **Sensibiliser** aux enjeux de la transition écologique et présenter le **Plan Local de Déplacements (PLD)** du territoire.
- **Recenser les habitants** et collecter leurs habitudes de transport via des questionnaires ciblés.
- **Proposer une interface multi-rôles** (Administrés, Communes, Agglomération) pour consulter des ressources ou des résultats spécifiques.
- **Garantir une navigation fluide et ergonomique**, en s'adaptant aux contraintes techniques d'un déploiement purement statique.

---

## Technologies Utilisées

- **Frontend :** HTML5, CSS3 (architecture moderne avec variables de couleur OKLCH) et Bootstrap 5.3+ (via CDN).
- **Logique Applicative :** JavaScript (ES5 pour une compatibilité maximale, fonctionnement 100% local `file://` sans dépendance serveur).
- **Intégration de données :** Formulaires et tableurs Google Forms / Sheets intégrés de manière dynamique (avec option de visualisation en plein écran).

---

## Système de Connexion et Gestion des Rôles (Simulé en JS)

En l'absence de base de données, le site intègre un **module de connexion complet géré entièrement en JavaScript**. Il s'appuie sur le `localStorage` (avec un système de fallback robuste) pour mémoriser le rôle de l'utilisateur et adapter dynamiquement les éléments de la barre de navigation.

### Identifiants de test disponibles :

* **Rôle Administré (`adm`) :**
    * `Identifiant :` Administré | `Mot de passe :` Administré
    * `Identifiant :` Jfanne | `Mot de passe :` Jfanne45
* **Rôle Représentant de Commune (`com`) :**
    * `Identifiant :` Maire | `Mot de passe :` Maire
* **Rôle Représentant de l'Agglomération (`agg`) :**
    * `Identifiant :` agglo | `Mot de passe :` agglo
    * `Identifiant :` Jort | `Mot de passe :` Jort95

⚠️ **Note importante sur la navigation :** Une fois connecté sur la page dédiée, vous êtes automatiquement redirigé vers l'accueil (`index.html`) où la barre de navigation se met à jour pour afficher vos accès exclusifs (Questionnaires ou Résultats). *Évitez de cliquer sur un autre lien immédiatement pendant le processus afin de ne pas vider les paramètres d'URL ou le Session/Local Storage avant l'initialisation du rôle.*

---

## Structure 

- **`index.html` :** Page d'accueil présentant les objectifs de l'étude, un carrousel sur le réseau AstroBus et la commune, et un accès rapide aux ressources.
- **`pages/infrastructure.html` :** Horaires et fréquences des lignes de transports de la communauté de communes (données de transport simulées).
- **`pages/PLD_Crise_eco.html` / `transition-eco-1.html` / `transition-eco-2.html` :** Articles documentés sur les enjeux climatiques, les chiffres clés des transports en France et les solutions à l'échelle globale.
- **`pages/recensement.html` :** Formulaire de recensement des habitants de la commune (Nom, âge, foyer, etc.) avec validation par fenêtre modale Bootstrap.
- **`pages/questionnaireadministre.html` & `questionnairecommune.html` :** Questionnaires intégrés (iframes) réservés aux rôles respectifs.
- **`pages/resultat_questionnaire.html` :** Visualisation des résultats sous forme de graphiques et tableaux Google Sheets (réservé à l'agglomération).
- **`pages/foire_aux_questions.html` :** FAQ interactive répondant aux questions courantes.
- **`pages/mentionLegales.html` :** Mentions légales, politique de confidentialité (garantie sans cookies) et sources du projet.

---

## Équipe 

Ce site a été réalisé en collaboration par :
- **COSSÉ Damien**
- **ANGER--RENAULT Victor**
- **DUMENIL Gaëlig**
- **BROUILLARD Léopold**
- **CONSTANTIN Thomas**

