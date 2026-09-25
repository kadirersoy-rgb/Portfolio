export const contexts = {
  personal: { label: "Personnel" },
  academic: { label: "Académique" },
  enterprise: { label: "Entreprise" },
};

// A single source for project descriptions and technology associations.
export const experiences = [
  { id: "portfolio", context: "personal", project: "Portfolio personnel", description: "Conception et développement de ce portfolio avec React, Next.js, JavaScript, CSS Modules, Bootstrap, Motion et GSAP.", skills: ["react", "nextjs", "javascript", "cssmodules", "bootstrap", "motion", "gsap"] },
  { id: "koragence", context: "personal", project: "Koragence", description: "Participation au développement d’un site vitrine B2B et d’une plateforme métier.", note: "Plateforme confidentielle", skills: ["react"] },
  { id: "evalbot", context: "academic", project: "EvalBot", description: "Projet académique réalisé en assembleur.", skills: ["assembly"] },
  { id: "schooding-c", context: "academic", project: "Schooding — C", description: "Apprentissage du langage C et mise en pratique à travers des exercices.", skills: ["c"] },
  { id: "schooding-cpp", context: "academic", project: "Schooding — C++", description: "Apprentissage du C++ actuellement poursuivi sur Schooding.", skills: ["cpp"] },
  { id: "unity", context: "academic", project: "Projet Unity", description: "Développement avec Unity et C#.", skills: ["unity", "csharp"] },
  { id: "invaders", context: "academic", project: "Space Invaders", description: "Développement d’un jeu en C#.", skills: ["csharp"] },
  { id: "witch", context: "academic", project: "Witch or Ghost — Game Jam", description: "Jeu 2D développé en équipe avec Python et Pygame : gameplay, collisions, gestion des états et niveau 2D.", skills: ["python", "pygame"] },
  { id: "traffic", context: "academic", project: "Simulation de trafic quotidien", description: "Simulation basée sur des machines à états pour modéliser différents comportements dans un trafic quotidien.", skills: ["python"] },
  { id: "data", context: "academic", project: "Projet Data", description: "Projet académique utilisant Python pour la data.", skills: ["python"] },
  { id: "bcapi", context: "enterprise", project: "BCApi", description: "Développement d’API ASP.NET et d’applications internes en C#. Communication HTTP avec différents services, collecte et traitement de données industrielles.", skills: ["csharp", "aspnet", "api"] },
  { id: "bcprod", context: "enterprise", project: "Infrastructure de données BC_PROD", description: "Architecture et exploitation de données industrielles : requêtes, création et modification de vues SQL, agrégations et connexion avec Power BI et les applications internes.", skills: ["sql", "sqlserver"] },
  { id: "iso", context: "enterprise", project: "ISO 50001 / collecte énergétique", description: "Collecte de données depuis plusieurs serveurs OPC UA et automates industriels, intégration à une API C#, exploitation avec SQL Server et Power BI. Automatisation des appels API et des remontées de données avec n8n.", skills: ["csharp", "sqlserver", "opcua", "powerbi", "n8n"] },
  { id: "freinte", context: "enterprise", project: "Rapport Freinte", description: "Rapport Power BI connecté à SQL Server : visualisation, mesures et analyse de données industrielles.", skills: ["powerbi", "sqlserver"] },
  { id: "reporting", context: "enterprise", project: "KPI et reporting industriel", description: "Création de rapports, de mesures et de visualisations pour l’analyse de données industrielles avec Power BI.", skills: ["powerbi"] },
  { id: "kpi", context: "enterprise", project: "Infrastructure KPI interne", description: "Conteneurisation de services avec Docker, sécurisation des communications internes en HTTPS via un reverse proxy et gestion des certificats avec Step-CA.", skills: ["docker", "proxy", "stepca", "https"] },
  { id: "cicd", context: "enterprise", project: "Environnement de développement / CI-CD", description: "Versionnement avec Git, hébergement de dépôts internes sur Gitea et conception d’un environnement Docker permettant de tester et déployer les applications.", skills: ["docker", "git", "gitea", "cicd"] },
];

const definitions = [
  ["csharp", "C#", "Langage", ["ASP.NET", "Unity", "API HTTP"]],
  ["python", "Python", "Langage", ["Pygame", "Machines à états", "Data"]],
  ["javascript", "JavaScript", "Langage", ["React", "Next.js"]],
  ["c", "C", "Langage", ["Schooding"]],
  ["cpp", "C++", "Langage", ["Schooding"], "En apprentissage"],
  ["assembly", "Assembleur", "Langage", ["EvalBot"]],
  ["sql", "SQL", "Langage", ["SQL Server", "Vues", "Agrégations"]],
  ["react", "React", "Front-end", ["Next.js", "JavaScript"]],
  ["nextjs", "Next.js", "Framework", ["React", "CSS Modules"]],
  ["cssmodules", "CSS Modules", "Front-end", ["React", "Next.js"]],
  ["bootstrap", "Bootstrap", "Front-end", ["React Bootstrap"]],
  ["aspnet", "ASP.NET", "Back-end", ["C#", "API HTTP"]],
  ["api", "API REST / HTTP", "Back-end", ["ASP.NET", "Services internes"]],
  ["sqlserver", "SQL Server", "Data / BI", ["SQL", "Power BI"]],
  ["powerbi", "Power BI", "Data / BI", ["SQL Server", "Reporting", "Mesures"]],
  ["opcua", "OPC UA", "Industriel", ["Automates", "C#"]],
  ["n8n", "n8n", "Automatisation", ["Flux", "API HTTP"]],
  ["docker", "Docker", "DevOps", ["Services", "CI/CD"]],
  ["git", "Git", "DevOps", ["Gitea", "CI/CD"]],
  ["gitea", "Gitea", "DevOps", ["Git", "Dépôts internes"]],
  ["cicd", "CI/CD", "DevOps", ["Docker", "Git", "Gitea"]],
  ["stepca", "Step-CA", "Infrastructure", ["Certificats", "HTTPS"]],
  ["proxy", "Reverse Proxy", "Infrastructure", ["Docker", "HTTPS"]],
  ["https", "HTTPS", "Infrastructure", ["Step-CA", "Reverse Proxy"]],
  ["unity", "Unity", "Game dev", ["C#"]],
  ["pygame", "Pygame", "Game dev", ["Python", "Jeu 2D"]],
  ["motion", "Motion", "Front-end", ["React", "Animations"]],
  ["gsap", "GSAP", "Front-end", ["ScrollTrigger", "Animations"]],
];

export const skills = definitions.map(([id, name, type, technologies, status]) => {
  const linked = experiences.filter((experience) => experience.skills.includes(id));
  return { id, name, type, technologies, status, experiences: linked, contexts: [...new Set(linked.map((experience) => experience.context))] };
});

export const getExperiences = (skill, filter) => skill.experiences.filter((experience) => filter === "all" || experience.context === filter);
export const getSkills = (filter) => skills.filter((skill) => filter === "all" || skill.contexts.includes(filter));

export const categories = [
  { id: "languages", label: "Langages", types: ["Langage"] },
  { id: "web", label: "Web & Frameworks", types: ["Front-end", "Framework", "Back-end"] },
  { id: "data", label: "Data & BI", types: ["Data / BI"] },
  { id: "devops", label: "DevOps & Infrastructure", types: ["DevOps", "Infrastructure"] },
  { id: "industry", label: "Industriel & Automatisation", types: ["Industriel", "Automatisation"] },
  { id: "games", label: "Game Development", types: ["Game dev"] },
];

export const getSkillGroups = (filter) => categories
  .map((category) => ({ ...category, skills: getSkills(filter).filter((skill) => category.types.includes(skill.type)) }))
  .filter((category) => category.skills.length > 0);
