"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import CosmicBackground from "../Cosmic/CosmicBackground";
import SkillGroup from "./SkillGroup";
import useSkillsNavigation from "./useSkillsNavigation";
import { categories, contexts, getSkillGroups } from "./skillsData";
import styles from "./Skills.module.css";

const shortNames = { languages: "Langages", web: "Web", data: "Data", devops: "DevOps", industry: "Industrie", games: "Game Dev" };

export const Skills = () => {
  const sectionRef = useRef(null);
  const controlsRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(new Set());
  const reducedMotion = useReducedMotion();
  useSkillsNavigation(sectionRef, controlsRef);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const groups = getSkillGroups(filter);
  const count = groups.reduce((total, group) => total + group.skills.length, 0);
  const toggle = (id) => setExpanded((previous) => {
    const next = new Set(previous);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
  const changeFilter = (value) => {
    if (filter === value) return;
    const belowIntro = sectionRef.current.querySelector("header").getBoundingClientRect().bottom < 0;
    setFilter(value);
    setExpanded(new Set());
    if (belowIntro) requestAnimationFrame(() => controlsRef.current?.scrollIntoView({ behavior: "instant", block: "start" }));
  };
  const enter = { initial: reducedMotion ? false : { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .1 } };

  return (
    <section ref={sectionRef} id="skills" className={styles.section} aria-labelledby="skills-title">
      <CosmicBackground />
      <div className={styles.container}>
        <header className={styles.header}>
          <motion.p {...enter} transition={{ duration: .25 }} className={styles.eyebrow}>TECHNOLOGIES & EXPÉRIENCES</motion.p>
          <motion.h2 {...enter} transition={{ duration: .3, delay: reducedMotion ? 0 : .04 }} id="skills-title">Compétences<span>.</span></motion.h2>
          <motion.p {...enter} transition={{ duration: .3, delay: reducedMotion ? 0 : .08 }}>Des technologies mises en pratique.<br />Des projets concrets pour en témoigner.</motion.p>
        </header>
        <div ref={controlsRef} className={styles.controls}>
          <div className={styles.toolbar}>
            <div className={styles.filters} role="group" aria-label="Filtrer les compétences par contexte">
              {[["all", "Tout"], ...Object.entries(contexts).map(([key, value]) => [key, value.label])].map(([key, label]) => (
                <button key={key} type="button" aria-pressed={filter === key} onClick={() => changeFilter(key)}>{label}</button>
              ))}
            </div>
            <p className={styles.count} role="status">{count} technologies & outils</p>
          </div>
          <nav className={styles.categoryNav} aria-label="Catégories de compétences">
            {groups.map((group) => <a key={group.id} href={`#skills-category-${group.id}`} onClick={(event) => {
              if (reducedMotion) { event.preventDefault(); document.getElementById(`skills-category-${group.id}`)?.scrollIntoView({ behavior: "instant" }); }
            }}>{shortNames[group.id]}</a>)}
          </nav>
          <motion.div className={styles.progress} style={{ scaleX: scrollYProgress }} aria-hidden="true" />
        </div>
        <p className={styles.hint}>Ouvrez une technologie pour découvrir ses projets et ses contextes d’utilisation.</p>
        <motion.div key={filter} className={styles.tableWrap} initial={reducedMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .3 }}>
          <table className={styles.table} role="table">
            <caption className={styles.srOnly}>Compétences par catégorie — {filter === "all" ? "Tous les contextes" : contexts[filter].label}</caption>
            <colgroup><col className={styles.technologyColumn} /><col className={styles.ecosystemColumn} /><col className={styles.contextColumn} /><col className={styles.projectsColumn} /></colgroup>
            <thead role="rowgroup"><tr role="row">
              <th scope="col" role="columnheader">Technologie</th><th scope="col" role="columnheader">Écosystème / outils associés</th><th scope="col" role="columnheader">Contexte</th><th scope="col" role="columnheader">Expériences</th>
            </tr></thead>
            {groups.map((group) => <SkillGroup key={group.id} group={group} number={categories.findIndex((category) => category.id === group.id) + 1} filter={filter} expanded={expanded} onToggle={toggle} reducedMotion={reducedMotion} />)}
          </table>
        </motion.div>
      </div>
    </section>
  );
};


