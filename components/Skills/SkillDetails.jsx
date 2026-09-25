import { motion } from "motion/react";
import { contexts } from "./skillsData";
import styles from "./SkillRow.module.css";

export default function SkillDetails({ skill, experiences, activeContexts, reducedMotion }) {
  return <div className={styles.details}>
    {activeContexts.map((context, index) => <motion.section
      className={styles.experienceGroup} key={context}
      initial={reducedMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : .25, delay: reducedMotion ? 0 : index * .045 }}
      aria-label={`${skill.name} — ${contexts[context].label}`}>
      <h3 data-context={context}>{contexts[context].label}{context === "enterprise" && <span>Brasserie Champigneulles</span>}</h3>
      {experiences.filter((experience) => experience.context === context).map((experience) => <article key={experience.id}>
        <h4>{experience.project}</h4><p>{experience.description}</p>
        {experience.note && <span className={styles.note}>{experience.note}</span>}
      </article>)}
    </motion.section>)}
  </div>;
}
