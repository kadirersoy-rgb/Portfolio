"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import styles from "./Hero.module.css";
import BlurText from "./BlurText";

export const Hero = () => {

  const heroRef = useRef(null);

  /* Indique si l'animation du nom est terminée */
  const [nameAnimationDone, setNameAnimationDone] = useState(false);


  /* Scroll du Hero */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });


  /* Remontée du contenu au scroll */
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "-100%"]
  );


  return (
    <section
      id="home"
      ref={heroRef}
      className={styles.hero}
    >

      <div className={styles.heroContent}>

        <motion.div
          className={styles.heroInner}
          style={{
            y: contentY,
          }}
        >

          {/* Identité */}
          <div className={styles.identity}>

            <p>Hello, I'm</p>

            <BlurText
              as="h1"
              text="Kadir Ersoy"
              animateBy="words"
              direction="top"
              delay={150}
              className={styles.identityTitle}

              /* Une fois Kadir Ersoy affiché */
              onAnimationComplete={() =>
                setNameAnimationDone(true)
              }
            />

          </div>


          {/* Photo */}
          <div className={styles.heroImage}>

            <div className={styles.imageFloat}>
              <img
                src="/images/test.png"
                alt="Kadir"
              />
            </div>

          </div>


          {/* Hero right content */}
          <div className={styles.rightContent}>

            {/* Affichage après BlurText */}
            {nameAnimationDone && (
              <>
                {/* Formation */}
                <div
                  className={`${styles.education} ${styles.heroAnimate} ${styles.heroDelay1}`}
                >
                  <h2>
                    Computer Engineering Student
                  </h2>

                  <span>
                    at ESIEE Paris
                  </span>
                </div>


                {/* Poste */}
                <div
                  className={`${styles.job} ${styles.heroAnimate} ${styles.heroDelay2}`}
                >
                  <h2>
                    Software Engineer
                  </h2>

                  <span>
                    at Brasserie Champigneulles
                  </span>
                </div>
              </>
            )}

          </div>

        </motion.div>

      </div>

    </section>
  );
};