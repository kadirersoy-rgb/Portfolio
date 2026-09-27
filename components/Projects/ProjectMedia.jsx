import Image from "next/image";
import { FiImage } from "react-icons/fi";
import styles from "./Projects.module.css";

export default function ProjectMedia({ project, priority = false }) {
  return <div className={styles.media}>
    {project.images.cover ? <Image src={project.images.cover} alt={project.images.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 720px" priority={priority} /> :
      <div className={styles.placeholder} data-missing-asset={project.images.expectedPath}>
        <FiImage aria-hidden="true" /><span>Capture à venir</span><small>{project.title} · {project.confidential ? "Site public uniquement" : "Visuel réel du projet"}</small>
      </div>}
  </div>;
}
