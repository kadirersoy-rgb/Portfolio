"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { StarBackground } from "../StarBackground";
import { timelineData } from "./timelineData";
import styles from "./JourneySection.module.css";

function Logo({ item }) {
  return <span className={`${styles.logo} ${item.darkLogo ? styles.darkLogo : ""}`}><Image src={item.logo} alt={`Logo ${item.organization}`} width={112} height={52} /></span>;
}

function Experience({ item, reveal }) {
  return (
    <motion.li {...reveal} className={styles.experience}>
      <Logo item={item} />
      <div>
        <div className={styles.meta}><span>{item.type}</span><span>{item.period}</span></div>
        <h4>{item.organization}</h4>
        <p className={styles.role}>{item.role}</p>
        {item.description && <p className={styles.description}>{item.description}</p>}
      </div>
    </motion.li>
  );
}

export default function JourneySection() {
  const trackRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start center", "end center"] });
  const reveal = { initial: reducedMotion ? false : { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .15 }, transition: { duration: .45 } };

  return (
    <section id="journey" className={styles.section} aria-labelledby="journey-title">
      <div className={styles.background} aria-hidden="true"><StarBackground variant="quiet" smallCount={48} bigCount={3} sparkleCount={2} /></div>
      <div className={styles.container}>
        <motion.header {...reveal} className={styles.header}>
          <p className={styles.eyebrow}>Parcours académique & professionnel</p>
          <h2 id="journey-title">Mon parcours<span>.</span></h2>
          <p>De mes premières formations au cycle ingénieur,<br className={styles.desktopBreak} /> des expériences qui donnent du sens à chaque étape.</p>
        </motion.header>

        <div ref={trackRef} className={styles.track}>
          <div className={styles.rail} aria-hidden="true"><motion.div className={styles.progress} style={{ scaleY: reducedMotion ? 1 : scrollYProgress }} /></div>
          {timelineData.map((period, index) => (
            <article key={period.id} className={styles.period} aria-labelledby={`journey-${period.id}`} data-period={period.id}>
              <span className={styles.node} aria-hidden="true"><span /></span>
              <div className={styles.educationColumn}>
                <motion.div {...reveal} className={styles.education}>
                  <div className={styles.chapter}><span>0{index + 1}</span>{period.chapter}</div>
                  <div className={styles.schoolTop}><Logo item={period} />{period.current && <span className={styles.current}>En cours</span>}</div>
                  <p className={styles.date}>{period.period}</p>
                  <h3 id={`journey-${period.id}`}>{period.organization}</h3>
                  <p className={styles.degree}>{period.title}</p>
                  <p className={styles.description}>{period.description}</p>
                  {period.experiences.some(item => item.parallel) && <div className={styles.parallel}><p className={styles.groupLabel}>En parallèle de la formation</p><ul>{period.experiences.filter(item => item.parallel).map(item => <Experience key={item.id} item={item} reveal={reveal} />)}</ul></div>}
                </motion.div>
              </div>
              {period.experiences.some(item => !item.parallel) && <div className={styles.branches}>
                <p className={styles.groupLabel}>{period.current ? "L’entreprise au cœur du cursus" : "Les expériences de cette période"}</p>
                <ul>{period.experiences.filter(item => !item.parallel).map(item => <Experience key={item.id} item={item} reveal={reveal} />)}</ul>
              </div>}
            </article>
          ))}
          <div className={styles.today}><span aria-hidden="true" />Aujourd’hui</div>
        </div>
        <div className={styles.outro}><p>Un parcours, des expériences, des compétences concrètes.</p><a href="#skills" onClick={event => { if (reducedMotion) { event.preventDefault(); document.getElementById("skills")?.scrollIntoView({ behavior: "instant" }); } }}>Explorer mes compétences <span aria-hidden="true">↓</span></a></div>
      </div>
    </section>
  );
}
