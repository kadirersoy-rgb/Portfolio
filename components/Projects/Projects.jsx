"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import { getProjects, projectContexts } from "./projectsData";
import ProjectMedia from "./ProjectMedia";
import styles from "./Projects.module.css";

function ProjectCard({ project, reduced }) {
  const featured = project.tier === "featured";
  return <motion.article layout={!reduced} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .28 }} className={`${styles.card} ${featured ? styles.featured : ""}`}>
    <Link href={`/projects/${project.slug}`} className={styles.cardLink} data-cursor="hover" aria-label={`Découvrir ${project.title}`}>
      <ProjectMedia project={project} />
      <div className={styles.cardBody}>
        <div className={styles.meta}><span>{projectContexts[project.context]}</span>{project.confidential && <span className={styles.confidential}>Confidentiel</span>}{featured && <span>Projet à la une</span>}</div>
        {project.company && <p className={styles.company}>{project.company}</p>}
        <h3>{project.title}</h3><p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.summary}>{project.summary}</p>
        {featured && <p className={styles.role}><strong>Mon rôle</strong>{project.role}</p>}
        <ul className={styles.stack} aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <span className={styles.cta}>{featured ? "Découvrir le projet" : "Voir le projet"}<FiArrowUpRight aria-hidden="true" /></span>
      </div>
    </Link>
  </motion.article>;
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const reduced = useReducedMotion();
  const matching = getProjects(filter);
  const selection = matching.filter(project => project.tier !== "archive");
  const archive = matching.filter(project => project.tier === "archive");
  return <section id="projects" aria-labelledby="projects-title" className={styles.section}>
    <div className={styles.container}>
      <header className={styles.header}><p className={styles.eyebrow}>Projets & réalisations</p><h2 id="projects-title">Projets<span>.</span></h2><p>Des problématiques concrètes transformées en solutions techniques.</p></header>
      <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label="Filtrer les projets">{[["all", "Tous"], ...Object.entries(projectContexts)].map(([key, label]) => <button key={key} type="button" aria-pressed={filter === key} onClick={() => { setFilter(key); setArchiveOpen(false); }}>{label}</button>)}</div><span className={styles.count} role="status">{matching.length} projets</span></div>
      <div className={styles.grid}><AnimatePresence initial={false}>{selection.map(project => <ProjectCard key={project.id} project={project} reduced={reduced} />)}</AnimatePresence></div>
      {archive.length > 0 && <div className={styles.archive}>
        <button type="button" className={styles.archiveToggle} aria-expanded={archiveOpen} aria-controls="projects-archive" onClick={() => setArchiveOpen(open => !open)}>{archiveOpen ? "Masquer les autres projets" : `Voir tous les projets · ${archive.length} autres réalisations`}<span aria-hidden="true">{archiveOpen ? "−" : "+"}</span></button>
        <div id="projects-archive" hidden={!archiveOpen}>{archive.map(project => <Link key={project.id} href={`/projects/${project.slug}`} className={styles.archiveRow}><span><small>{projectContexts[project.context]}</small><strong>{project.title}</strong></span><span>{project.technologies.join(" · ")}</span><FiArrowUpRight aria-hidden="true" /></Link>)}</div>
      </div>}
    </div>
  </section>;
}
