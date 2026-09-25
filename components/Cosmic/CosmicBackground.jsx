"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { StarBackground } from "../StarBackground";
import styles from "./CosmicBackground.module.css";

// Confined to the section introduction: the table never sits over this scene.
export default function CosmicBackground() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const starY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const planetY = useTransform(scrollYProgress, [0, 1], [16, -16]);
  return <div ref={ref} className={styles.scene} aria-hidden="true">
    <div className={styles.nebula} />
    <motion.div className={styles.stars} style={{ y: reduced ? 0 : starY }}>
      <StarBackground smallCount={64} bigCount={4} sparkleCount={2} variant="quiet" />
    </motion.div>
    <span className={styles.orbit} />
    <motion.div className={styles.planet} style={{ y: reduced ? 0 : planetY }} />
    <div className={styles.fade} />
  </div>;
}
