"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { StarBackground } from "../StarBackground";
import styles from "./CosmicTransition.module.css";

export default function CosmicTransition() {
  const ref = useRef(null);
  const visible = useInView(ref, { margin: "80px" });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const distant = useTransform(scrollYProgress, [0, 1], [14, -14]);
  return <div ref={ref} className={styles.transition} aria-hidden="true" data-active={visible}>
    <motion.div className={styles.stars} style={{ y: reduced ? 0 : distant }}>
      <StarBackground smallCount={48} bigCount={3} sparkleCount={2} variant="quiet" />
    </motion.div>
    <div className={styles.nebula} />
    <span className={styles.orbit} />
    <span className={styles.meteor} />
  </div>;
}
