import { useRef, useState } from "react";
import { useInView } from "motion/react";
import SkillRow from "./SkillRow";
import styles from "./Skills.module.css";

export default function SkillGroup({ group, number, filter, expanded, onToggle, reducedMotion }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 60px 0px" });
  const [focused, setFocused] = useState(false);
  return (
    <tbody ref={ref} className={styles.skillGroup} data-revealed={inView || focused || reducedMotion} onFocusCapture={() => setFocused(true)} role="rowgroup" aria-labelledby={`skills-category-${group.id}`}>
      <tr className={styles.category} role="row">
        <th colSpan={4} scope="rowgroup" role="rowheader" id={`skills-category-${group.id}`}>
          <div className={styles.categoryHeading}>
            <span className={styles.categoryIdentity}>
              <span className={styles.categoryNumber}>{String(number).padStart(2, "0")}</span>
              <span className={styles.categoryLabel}>{group.label}</span>
            </span>
            <span className={styles.categoryCount}>{group.skills.length} technologies</span>
          </div>
        </th>
      </tr>
      {group.skills.map((skill, index) => <SkillRow key={skill.id} skill={skill} filter={filter} expanded={expanded.has(skill.id)} onToggle={() => onToggle(skill.id)} reducedMotion={reducedMotion} entranceDelay={Math.min(index * 35, 175)} />)}
    </tbody>
  );
}
