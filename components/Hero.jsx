"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";

import styles from "./Hero.module.css";
import BlurText from "./BlurText";

export const Hero = ({ cvUrl = "", contactEmail = "kadir.ersoypro@gmail.com" }) => {

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

            <p>Hello, I&apos;m</p>

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

                  <div className={styles.heroActions}>
                    <a
                      className={styles.cvCta}
                      href={cvUrl || undefined}
                      download={cvUrl ? "CV-Kadir-Ersoy.pdf" : undefined}
                      role={!cvUrl ? "link" : undefined}
                      aria-disabled={!cvUrl || undefined}
                      tabIndex={!cvUrl ? 0 : undefined}
                      title={!cvUrl ? "CV à ajouter" : undefined}
                    >
                      Télécharger mon CV
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
                      </svg>
                    </a>
                    <a
                      className={styles.contactCta}
                      href={contactEmail ? `mailto:${contactEmail}` : undefined}
                      role={!contactEmail ? "link" : undefined}
                      aria-disabled={!contactEmail || undefined}
                      tabIndex={!contactEmail ? 0 : undefined}
                      title={!contactEmail ? "Adresse e-mail à renseigner" : undefined}
                    >
                      Me contacter
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 18 18 6M6 6h12v12" />
                      </svg>
                    </a>
                  </div>
                </div>
              </>
            )}

          </div>

        </motion.div>

      </div>

    </section>
  );
};
