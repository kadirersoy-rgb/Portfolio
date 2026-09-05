"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./About.module.css";
import { DecorativeImage } from "./DecorativeImage";


export const About = () => {

  /* Références */
  const aboutRef = useRef(null);
  const viewportRef = useRef(null);


  /* Onglet actuellement affiché */
  const [activeTab, setActiveTab] = useState("presentation");


  /* Onglets */
  const tabs = [
    "presentation",
    "languages",
    "softskills",
    "interests",
  ];


  useEffect(() => {

    const section = aboutRef.current;
    const viewport = viewportRef.current;

    if (!section || !viewport) return;


    /* Enregistrement du plugin GSAP */
    gsap.registerPlugin(ScrollTrigger);


    const total = tabs.length;

    /* Distance entre chaque étape */
    const stepSize = 1 / (total - 1);


    const ctx = gsap.context(() => {

      ScrollTrigger.create({

        /* Section qui déclenche l'animation */
        trigger: section,

        /* Début juste sous le header */
        start: "top top+=80",

        /* Distance totale du storytelling */
        end: () =>
          `+=${(window.innerHeight - 80) * 3}`,

        /* Bloque réellement le About */
        pin: viewport,

        /* Conserve l'espace nécessaire dans la page */
        pinSpacing: true,

        /* Lie l'animation au scroll */
        scrub: 0.9,

        /* Rend le pin plus fluide */
        anticipatePin: 1,

        /* Recalcul lors d'un resize */
        invalidateOnRefresh: true,


        /* Calage automatique sur les 4 étapes */
        snap: {
          snapTo: (value) =>
            Math.round(value / stepSize) * stepSize,

          delay: 0.06,

          duration: {
            min: 0.22,
            max: 0.44,
          },

          ease: "power2.inOut",
        },


        /* Changement d'onglet selon le scroll */
        onUpdate: (self) => {

          const index = Math.round(
            self.progress * (total - 1)
          );

          setActiveTab(tabs[index]);

        },

      });

    }, section);


    /* Nettoyage GSAP */
    return () => ctx.revert();

  }, []);


  return (
    <section
      id="about"
      ref={aboutRef}
      className={styles.about}
    >

      {/* Zone réellement bloquée */}
      <div
        ref={viewportRef}
        className={styles.aboutViewport}
      >

        <div className={styles.aboutContent}>

          {/* Photo */}
          <div className={styles.aboutImage}>

            <DecorativeImage
              src="/images/test.png"
              alt="Kadir Ersoy"
            />

          </div>


          {/* Informations */}
          <div className={styles.aboutInfo}>

            {/* Titre */}
            <h2 className={styles.aboutTitle}>
              About <span>me.</span>
            </h2>


            {/* Onglets */}
            <div className={styles.aboutTabs}>

              <button
                className={
                  activeTab === "presentation"
                    ? styles.activeTab
                    : ""
                }
              >
                Présentation
              </button>


              <button
                className={
                  activeTab === "languages"
                    ? styles.activeTab
                    : ""
                }
              >
                Langues
              </button>


              <button
                className={
                  activeTab === "softskills"
                    ? styles.activeTab
                    : ""
                }
              >
                Soft skills
              </button>


              <button
                className={
                  activeTab === "interests"
                    ? styles.activeTab
                    : ""
                }
              >
                Intérêts
              </button>

            </div>


            {/* Contenu */}
            <div className={styles.aboutTabContent}>

              {activeTab === "presentation" && (
                <>
                  <h3>Qui suis-je ?</h3>

                  <p>
                    Contenu de présentation...
                  </p>
                </>
              )}


              {activeTab === "languages" && (
                <>
                  <h3>Langues</h3>

                  <p>
                    Français — langue maternelle
                  </p>

                  <p>
                    Anglais — niveau professionnel
                  </p>
                </>
              )}


              {activeTab === "softskills" && (
                <>
                  <h3>Soft skills</h3>

                  <p>
                    Curiosité, esprit d'équipe,
                    résolution de problèmes...
                  </p>
                </>
              )}


              {activeTab === "interests" && (
                <>
                  <h3>Intérêts</h3>

                  <p>
                    Technologie, sport, voyage...
                  </p>
                </>
              )}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};