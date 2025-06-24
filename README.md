# 📦 DropIn – File Sharing & Storage Platform

**Plateforme web fullstack pour la gestion, le partage et l'organisation sécurisée de fichiers.**  
Développée avec **Next.js 15**, **React 19**, **TypeScript**, **Appwrite** et **TailwindCSS**, cette application propose une expérience moderne, responsive et optimisée grâce à **Docker** et **Vercel**.

---

## 🚀 Fonctionnalités clés

- 🔐 Authentification utilisateur (inscription, connexion, déconnexion) via Appwrite  
- 📁 Upload de fichiers (images, vidéos, documents, audio) avec prévisualisation  
- 🗂️ Gestion des fichiers : visualiser, renommer, supprimer, trier  
- 📤 Partage de fichiers via lien unique  
- 📊 Tableau de bord dynamique : stockage total/utilisé, type de fichiers, dernières actions  
- 🔎 Recherche globale + tri par date, nom ou taille  
- 💾 Téléchargement des fichiers en un clic  
- ⚙️ Déploiement sur Vercel et conteneurisation avec Docker  

---

## 🛠️ Stack technique

| Technologie   | Description                                      |
|--------------|--------------------------------------------------|
| Next.js 15   | Framework React moderne et performant            |
| React 19     | UI réactive avec les dernières features          |
| Appwrite     | Authentification, base de données, stockage      |
| TailwindCSS  | Design responsive et moderne                     |
| TypeScript   | Sécurité de typage et lisibilité du code         |
| Docker       | Conteneurisation et déploiement simplifié        |
| Vercel       | Déploiement serverless rapide et fiable          |

---

## 🧪 Lancer le projet en local

1. Cloner le dépôt
git clone https://github.com/dogukankzk/drop-in.git
cd drop-in

2. Installer les dépendances
npm install

3. Lancer le serveur de développement
npm run dev

⚠️ Tu dois avoir une instance Appwrite configurée. Renseigne les variables d’environnement via un fichier .env.local.

---

## 🐳 Docker

Build
docker build -t drop-in .

Run
docker run -p 3000:3000 drop-in

---

## ✅ À propos

Ce projet a été réalisé dans le cadre d’une préparation à l’alternance CDA (Concepteur Développeur d’Applications). Il met en pratique :

Le développement fullstack moderne avec React/Next.js

La gestion sécurisée de fichiers et d'utilisateurs

L’intégration d’un backend-as-a-service (Appwrite)

Le déploiement via Docker et Vercel

---

## 📫 Contact
GitHub : https://github.com/dogukankzk
Email : dogukan.kazkondu.dev@gmail.com
