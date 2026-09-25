import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown, FiCode, FiDatabase, FiLayers, FiCpu, FiGitBranch, FiShield, FiZap } from "react-icons/fi";
import { FaReact, FaPython, FaDocker } from "react-icons/fa";
import { contexts, getExperiences } from "./skillsData";
import SkillDetails from "./SkillDetails";
import styles from "./SkillRow.module.css";

const typeIcons = { Langage: FiCode, "Front-end": FiLayers, Framework: FiLayers, "Back-end": FiCode, "Data / BI": FiDatabase, Industriel: FiCpu, Automatisation: FiZap, DevOps: FiGitBranch, Infrastructure: FiShield, "Game dev": FiCpu };
const logos = { react: FaReact, python: FaPython, docker: FaDocker };

export default function SkillRow({ skill, filter, expanded, onToggle, reducedMotion, entranceDelay = 0 }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const experiences = getExperiences(skill, filter);
  const activeContexts = ["enterprise", "academic", "personal"].filter((context) => experiences.some((experience) => experience.context === context));
  const buttonId = `skill-toggle-${skill.id}`;
  const panelId = `skill-panel-${skill.id}`;
  const Icon = logos[skill.id] || typeIcons[skill.type] || FiCode;
  const trackPointer = (event) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const row = event.currentTarget;
    const x = event.clientX;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      row.style.setProperty("--pointer-x", `${x - row.getBoundingClientRect().left}px`);
    });
  };

  return <>
    <tr role="row" style={{ "--entrance-delay": `${entranceDelay}ms` }} className={styles.row} data-expanded={expanded} data-skill={skill.id} onPointerMove={trackPointer} onClick={(event) => {
      if (!event.target.closest("button") && !window.getSelection()?.toString()) onToggle();
    }} data-cursor="hover">
      <th role="rowheader" scope="row" className={styles.nameCell}>
        <button id={buttonId} type="button" onClick={onToggle} aria-expanded={expanded} aria-controls={panelId}>
          <span className={styles.identity}><Icon className={styles.techIcon} aria-hidden="true" /><span>{skill.name}</span></span><FiChevronDown className={styles.chevron} aria-hidden="true" />
        </button>
        {skill.status && <span className={styles.status}>{skill.status}</span>}
      </th>
      <td role="cell" className={styles.ecosystem}>{skill.technologies.join(" · ")}</td>
      <td role="cell" className={styles.contextCell}><div className={styles.badges}>{activeContexts.map((context) => <span key={context} data-context={context}>{contexts[context].label}</span>)}</div></td>
      <td role="cell" className={styles.projects}><span className={styles.experienceCount}>{experiences.length}</span> expérience{experiences.length > 1 ? "s" : ""}</td>
    </tr>
    <tr role="row" className={styles.detailRow} aria-hidden={!expanded}>
      <td role="cell" colSpan={4}>
        <div id={panelId} aria-labelledby={buttonId}>
          <AnimatePresence initial={false}>
            {expanded && <motion.div key="details" className={styles.reveal} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .35, ease: [.22, 1, .36, 1] }}>
              <SkillDetails skill={skill} experiences={experiences} activeContexts={activeContexts} reducedMotion={reducedMotion} />
            </motion.div>}
          </AnimatePresence>
        </div>
      </td>
    </tr>
  </>;
}

