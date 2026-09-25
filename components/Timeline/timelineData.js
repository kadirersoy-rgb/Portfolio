// null dates are deliberately omitted from the UI, never inferred from a school year.
export const timelineData = [
  {
    id: "loritz", organization: "Lycée Henri Loritz", title: "Les premières étapes",
    startDate: "2019", endDate: "2022", period: "2019 — 2022", location: "Nancy, France",
    logo: "/images/logos/schools/henri-loritz.png", chapter: "Les fondations",
    description: "Le début de mon parcours de formation, avant de rejoindre l’IUT Nancy-Brabois.",
    experiences: [],
  },
  {
    id: "iut", organization: "IUT Nancy-Brabois", title: "BUT GEII",
    startDate: null, endDate: null, period: "Trois années de BUT", location: "France",
    logo: "/images/logos/schools/iut-nancy-brabois.png", chapter: "De la formation au terrain",
    description: "Génie électrique et informatique industrielle. Un cursus enrichi par l’industrie, la transmission et un semestre à l’international.",
    experiences: [
      { id: "tutorat", organization: "Université de Lorraine", role: "Tutorat en mathématiques", type: "Contrat étudiant", period: "Pendant le BUT", startDate: null, endDate: null, parallel: true, logo: "/images/logos/schools/universite-lorraine.png", description: "Accompagnement académique en mathématiques." },
      { id: "brasserie-stage", organization: "Brasserie Champigneulles", role: "Automaticien en bureau d’études", type: "Stage · 2e année", period: "Avril — juin", startDate: null, endDate: null, logo: "/images/logos/companies/brasserie-champigneulles.png", description: "Première expérience industrielle au sein de la Brasserie Champigneulles TCB Beverages." },
      { id: "brasserie-cdd-1", organization: "Brasserie Champigneulles", role: "Poursuite du projet de stage", type: "CDD", period: "Juillet — août · À la suite du stage", startDate: null, endDate: null, logo: "/images/logos/companies/brasserie-champigneulles.png", description: "Prolongement et approfondissement du projet mené pendant le stage." },
      { id: "hamk", organization: "HAMK", role: "Un semestre en Finlande", type: "Erasmus", period: "Un semestre", startDate: null, endDate: null, logo: "/images/logos/schools/hamk.svg", darkLogo: true, description: "Häme University of Applied Sciences, campus de Valkeakoski : immersion internationale, pratique de l’anglais et découverte d’un autre système éducatif." },
      { id: "dalkia", organization: "Dalkia", role: "Automaticien en bureau d’études", type: "Stage · 3e année", period: "Mars — juin", startDate: null, endDate: null, logo: "/images/logos/companies/dalkia.svg", description: "Direction Régionale Est, Systèmes Connectés. Migration de la GTC d’un bâtiment vers une application de contrôle-commande." },
      { id: "brasserie-cdd-2", organization: "Brasserie Champigneulles", role: "Deuxième CDD d’été", type: "CDD", period: "Juillet — août 2025", startDate: "2025-07", endDate: "2025-08", logo: "/images/logos/companies/brasserie-champigneulles.png", description: null },
    ],
  },
  {
    id: "esiee", organization: "ESIEE Paris", title: "Cycle ingénieur", current: true,
    startDate: "2025", endDate: "2028", period: "2025 — 2028", location: "France",
    logo: "/images/logos/schools/esiee-paris.svg", chapter: "Construire la suite",
    description: "Informatique et Applications. Trois années en apprentissage pour approfondir ma formation et développer mon expérience en entreprise.",
    experiences: [
      { id: "apprentissage", organization: "Brasserie Champigneulles", role: "Software Engineer", type: "Apprentissage", period: "Pendant le cycle ingénieur · 3 ans", startDate: null, endDate: null, logo: "/images/logos/companies/brasserie-champigneulles.png", description: "Développement informatique dans un environnement industriel, en parallèle de ma formation à l’ESIEE Paris." },
    ],
  },
];
