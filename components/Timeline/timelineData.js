// null dates are deliberately omitted from the UI, never inferred from a school year.
const monthYear = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });
export function formatPeriod(item) {
  const precise = /^\d{4}-(0[1-9]|1[0-2])$/;
  if (!precise.test(item.startDate ?? "") || (!item.ongoing && !precise.test(item.endDate ?? ""))) return item.period;
  const format = value => monthYear.format(new Date(`${value}-01T00:00:00Z`));
  return `${format(item.startDate)} — ${item.ongoing ? "aujourd’hui" : format(item.endDate)}`;
}

export const timelineData = [
  {
    id: "loritz", organization: "Lycée Henri Loritz", title: "Les premières étapes",
    startDate: "2019-09", endDate: "2022-06", period: "2019 — 2022", location: "Nancy, France",
    logo: "/images/logos/schools/henri-loritz.png", chapter: "Les fondations",
    description: "Le début de mon parcours de formation, avant de rejoindre l’IUT Nancy-Brabois.",
    experiences: [],
  },
  {
    id: "iut", organization: "IUT Nancy-Brabois", title: "BUT GEII",
    startDate: "2022-09", endDate: "2025-06", period: "Trois années de BUT", location: "France",
    logo: "/images/logos/schools/iut-nancy-brabois.png", chapter: "De la formation au terrain",
    description: "Génie électrique et informatique industrielle. Un cursus enrichi par l’industrie, la transmission et un semestre à l’international.",
    experiences: [
      { id: "tutorat", organization: "Université de Lorraine", role: "Tutorat en mathématiques", type: "Contrat étudiant", period: "Pendant le BUT", startDate: "2023-10", endDate: "2024-04", logo: "/images/logos/schools/universite-lorraine.png", description: "Accompagnement académique en mathématiques." },
      { id: "brasserie-stage", organization: "Brasserie Champigneulles", role: "Automaticien en bureau d’études", type: "Stage · 2e année", period: "Avril — juin", startDate: "2024-04", endDate: "2024-06", logo: "/images/logos/companies/brasserie-champigneulles.png", description: "Première expérience industrielle au sein de la Brasserie Champigneulles TCB Beverages." },
      { id: "brasserie-cdd-1", organization: "Brasserie Champigneulles", role: "Poursuite du projet de stage", type: "CDD", period: "Juillet — août · À la suite du stage", startDate: "2024-07", endDate: "2024-08", logo: "/images/logos/companies/brasserie-champigneulles.png", description: "Prolongement et approfondissement du projet mené pendant le stage." },
      { id: "hamk", organization: "HAMK", role: "Un semestre en Finlande", type: "Erasmus", period: "Un semestre", startDate: "2024-08", endDate: "2024-12", logo: "/images/logos/schools/hamk.svg", darkLogo: true, description: "Häme University of Applied Sciences, campus de Valkeakoski : immersion internationale, pratique de l’anglais et découverte d’un autre système éducatif." },
      { id: "dalkia", organization: "Dalkia", role: "Automaticien en bureau d’études", type: "Stage · 3e année", period: "Mars — juin", startDate: "2025-03", endDate: "2025-06", logo: "/images/logos/companies/dalkia.svg", description: "Direction Régionale Est, Systèmes Connectés. Migration de la GTC d’un bâtiment vers une application de contrôle-commande." },
      { id: "brasserie-cdd-2", organization: "Brasserie Champigneulles", role: "Deuxième CDD d’été", type: "CDD", period: "Juillet — août 2025", startDate: "2025-07", endDate: "2025-08", logo: "/images/logos/companies/brasserie-champigneulles.png", description: null },
    ],
  },
  {
    id: "esiee", organization: "ESIEE Paris", title: "Cycle ingénieur", current: true,
    startDate: "2025-07", endDate: "2028-09", period: "2025 — 2028", location: "France",
    logo: "/images/logos/schools/esiee-paris.svg", chapter: "Construire la suite",
    description: "Informatique et Applications. Trois années en apprentissage pour approfondir ma formation et développer mon expérience en entreprise.",
    experiences: [
      { id: "apprentissage", organization: "Brasserie Champigneulles", role: "Software Engineer", type: "Apprentissage", period: "Pendant le cycle ingénieur · 3 ans", startDate: "2025-09", endDate: null, ongoing: true, logo: "/images/logos/companies/brasserie-champigneulles.png", description: "Développement informatique dans un environnement industriel, en parallèle de ma formation à l’ESIEE Paris." },
    ],
  },
];
