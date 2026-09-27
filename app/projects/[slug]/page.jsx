import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectContexts } from "../../../components/Projects/projectsData";
import ProjectMedia from "../../../components/Projects/ProjectMedia";
import styles from "../../../components/Projects/Projects.module.css";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  return { title: project ? `${project.title} — Kadir Ersoy` : "Projet introuvable", description: project?.summary };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find(project => project.slug === slug);
  if (!project) notFound();
  return <main className={styles.detail}><div className={styles.container}>
    {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- Native navigation avoids the duplicated hash observed on client-side return. */}
    <nav className={styles.detailNav} aria-label="Navigation du projet"><Link href="/">Kadir.</Link><a href="/#projects">← Tous les projets</a></nav>
    <header className={styles.detailIntro}><div className={styles.meta}><span>{projectContexts[project.context]}</span>{project.company && <span>{project.company}</span>}{project.confidential && <span className={styles.confidential}>Confidentiel</span>}</div><h1>{project.title}</h1>{project.subtitle && <p>{project.subtitle}</p>}<p>{project.summary}</p><ul className={styles.stack} aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul></header>
    <ProjectMedia project={project} priority />
    <div className={styles.detailSections}>{project.sections.map((section, index) => <section key={section.title}><h2><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</h2><p>{section.text}</p></section>)}</div>
  </div></main>;
}
