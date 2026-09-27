# Captures réelles des projets

Aucune interface ni donnée de démonstration n’a été générée. Les couvertures nulles affichent explicitement « Capture à venir ».

## Image disponible

portfolio/cover.png est une capture réelle du site local (1440 × 900), prise dans Edge et déjà branchée sur la fiche Portfolio. Aucun visuel de projet existant ne figurait dans public avant cette intervention.

## Captures à fournir

| Projet | Fichier attendu (dans public) | Capture exacte |
| --- | --- | --- |
| ISO 50001 | `/images/projects/iso50001/cover.png` | Vue d’ensemble anonymisée du tableau de bord énergétique ISO 50001. |
| Environnement CI/CD | `/images/projects/cicd/cover.png` | Schéma réel anonymisé de l’environnement : Gitea, BCApi, conteneurs et base de test, sans adresses ni noms de serveurs. |
| Applications KPI | `/images/projects/kpi/cover.png` | Schéma réel anonymisé des services KPI, du reverse proxy et de Step-CA, sans IP, domaines internes ni secrets. |
| Koragence | `/images/projects/koragence/cover.png` | Capture de la page d’accueil publique du site vitrine Koragence, sans interface de la plateforme confidentielle. |
| Witch or Ghost | `/images/projects/witch-or-ghost/cover.png` | Capture en jeu montrant un labyrinthe et le personnage, idéalement avec la mécanique fantôme visible. |
| Rapport Freinte | `/images/projects/freinte/cover.png` | Capture anonymisée du rapport Power BI Freinte avec ses visualisations et filtres temporels. |
| Simulation de trafic quotidien | `/images/projects/traffic-simulation/cover.png` | Capture de la simulation en fonctionnement avec les véhicules et leurs états visibles. |
| Space Invaders | `/images/projects/space-invaders/cover.png` | Capture réelle d’une partie de Space Invaders. |
| Projet Unity | `/images/projects/unity/cover.png` | Capture de la vue Game du projet Unity, distinct du projet Space Invaders. |
| EvalBot | `/images/projects/evalbot/cover.png` | Photo réelle de l’EvalBot utilisé pour le projet ou capture de son environnement de développement. |
| Projet Data | `/images/projects/data/cover.png` | Capture réelle d’un notebook ou d’une visualisation du projet Data ; sujet et jeu de données à préciser. |

Pour les projets d’entreprise, fournir une version autorisée et anonymisée : retirer les données de production sensibles, identifiants, IP, domaines internes et secrets. Koragence : uniquement la vitrine publique.

ISO 50001 : des captures supplémentaires du rapport Power BI et du schéma réel d’architecture peuvent être fournies sous iso50001/powerbi.png et iso50001/architecture.png. Elles ne sont pas encore affichées.

## Ajouter une image

Déposer le fichier au chemin indiqué, puis remplacer images.cover: null dans projectsData.js par le chemin public correspondant. Mettre à jour images.alt avec une description factuelle. expectedPath est une consigne de livraison, pas une URL chargée par le navigateur. Les images sont affichées avec Next/Image, sans teinte artificielle et sans recadrage du contenu.

## Structure et ajout d’un projet

projectsData.js contient id, slug, title, subtitle, context, tier (featured / selection / archive), summary, technologies, images et sections. Les champs role, company et confidential sont facultatifs. Ajouter un objet à cette liste crée automatiquement sa fiche et sa route /projects/[slug] à la prochaine compilation. Les rubriques non documentées restent absentes ; aucune date, aucun résultat ni lien externe ne sont déduits.

## Fichiers

Créés : components/Projects/projectsData.js, Projects.jsx, ProjectMedia.jsx, Projects.module.css ; app/projects/[slug]/page.jsx ; ce guide et les emplacements d’assets. Modifié : app/page.tsx (transition cosmique puis Projets après Compétences).

## Comportement

Carte vedette horizontale puis six projets sélectionnés et cinq archives. Filtres Tous / Entreprise / Académique / Personnel ; animations Motion de 280 ms ; cartes cliquables avec de vrais liens ; archive accessible au clavier. Trois colonnes sur grand écran, deux sur tablette, une sur mobile. Reduced motion désactive déplacements et zooms. Le décor est limité à la transition et à un halo d’introduction. Les pages dédiées sont pré-rendues, les images secondaires chargées à la demande.

La section Expérience n’existe pas encore dans la page actuelle : aucun contenu ni lien de transition supplémentaire n’a été inventé pour elle.

## Vérifications effectuées

- Build Next.js et ESLint : OK ; douze fiches pré-rendues.
- Largeurs 1440, 1280, 1024, 991, 768, 430, 390, 375 et 320 px : aucun débordement de page ; filtres défilants à 320 px.
- Filtres Entreprise / Académique / Personnel / Tous : résultats attendus.
- Archive ouverte avec Entrée ; liens de fiche et retour clavier vérifiés.
- Douze fiches à 320 px, image réelle du portfolio et route inconnue 404 : OK.
- Mouvement réduit : déplacements désactivés ; capture optimisée à la livraison via Next/Image.
- Retour vers /#projects natif : corrige une duplication de hash observée avec la navigation client ; exception ESLint documentée localement.
- Aucun asset industriel reçu ou publié ; aucune URL interne, adresse IP ni donnée de production ajoutée.
