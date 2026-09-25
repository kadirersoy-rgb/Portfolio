"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import styles from "./About.module.css";
import { DecorativeImage } from "./DecorativeImage";
import { StarBackground } from "./StarBackground";


/* ==========================================================
   CONTENU DES ONGLETS
========================================================== */

const tabs = [
  {
    id: "presentation",
    label: "Présentation",

    title: "Qui suis-je ?",

    paragraphs: [
      "Étudiant en informatique à l’ESIEE Paris et Software Engineer à la Brasserie Champigneulles, je construis mon parcours entre formation d’ingénieur et expérience en entreprise.",

      "J’aime comprendre, résoudre des problèmes et créer des solutions concrètes. Curieux et motivé, je cherche continuellement à découvrir de nouvelles technologies et à relever de nouveaux défis.",
    ],
  },

  {
    id: "languages",
    label: "Langues",

    title: "Langues",

    paragraphs: [
      "Les langues me permettent d’échanger, de découvrir et d’évoluer dans des environnements différents.",
    ],

    cards: [
      {
        title: "Français",
        text: "Langue maternelle",
      },

      {
        title: "Anglais",
        text: "Niveau professionnel",
      },
    ],
  },

  {
    id: "softskills",
    label: "Soft skills",

    title: "Ma façon de travailler.",

    paragraphs: [
      "Au-delà du développement, j’accorde beaucoup d’importance à la curiosité, à l’échange et à la recherche de solutions.",
    ],

    cards: [
      {
        title: "Curiosité",
        text: "Comprendre, explorer et apprendre en continu.",
      },

      {
        title: "Esprit d’équipe",
        text: "Partager, collaborer et avancer ensemble.",
      },

      {
        title: "Résolution de problèmes",
        text: "Analyser pour construire une réponse concrète.",
      },
    ],
  },

  {
    id: "interests",
    label: "Intérêts",

    title: "Ce qui m’inspire.",

    paragraphs: [
      "Ma curiosité continue aussi en dehors de l’informatique.",
    ],

    cards: [
      {
        title: "Technologie",
        text: "Découvrir de nouvelles possibilités.",
      },

      {
        title: "Sport",
        text: "Me dépasser et garder un équilibre.",
      },

      {
        title: "Voyages",
        text: "Explorer et changer de perspective.",
      },
    ],
  },
];


export const About = () => {

  /* ==========================================================
     REFERENCES
  ========================================================== */

  const aboutRef = useRef(null);

  const viewportRef = useRef(null);

  const scrollTriggerRef = useRef(null);

  const isTabClickScrolling = useRef(false);


  /* ==========================================================
     ONGLET ACTIF
  ========================================================== */

  const [activeIndex, setActiveIndex] = useState(0);

  const activeTab = tabs[activeIndex];


  /* ==========================================================
     STORYTELLING GSAP
  ========================================================== */

  useEffect(() => {

    const section = aboutRef.current;

    const viewport = viewportRef.current;


    if (!section || !viewport) {
      return;
    }


    gsap.registerPlugin(
      ScrollTrigger,
      ScrollToPlugin
    );


    const total = tabs.length;

    const stepSize =
      total > 1
        ? 1 / (total - 1)
        : 1;


    const ctx = gsap.context(() => {

      scrollTriggerRef.current =
        ScrollTrigger.create({

          trigger: section,


          /* Navbar = environ 80px */

          start: "top top+=80",


          /* Durée du storytelling */

          end: () =>
            `+=${(window.innerHeight - 80) * 3}`,


          /* Bloque visuellement la section */

          pin: viewport,

          pinSpacing: true,

          scrub: 0.9,

          anticipatePin: 1,

          invalidateOnRefresh: true,


          /* Snap vers chaque onglet */

          snap: {

            snapTo: (value) =>
              Math.round(
                value / stepSize
              ) * stepSize,

            delay: 0.06,

            duration: {
              min: 0.22,
              max: 0.44,
            },

            ease: "power2.inOut",
          },


          /* Scroll → onglet */

          onUpdate: (self) => {

            if (
              isTabClickScrolling.current
            ) {
              return;
            }


            const index =
              Math.round(
                self.progress *
                (total - 1)
              );


            setActiveIndex(index);
          },

        });

    }, section);


    ScrollTrigger.refresh();


    return () => {

      scrollTriggerRef.current = null;

      ctx.revert();

    };

  }, []);


  /* ==========================================================
     CLIC SUR UN ONGLET
  ========================================================== */

  const handleTabClick = (index) => {

    const trigger =
      scrollTriggerRef.current;


    if (!trigger) {
      return;
    }


    isTabClickScrolling.current = true;


    /*
     * On change immédiatement
     * le contenu affiché.
     */

    setActiveIndex(index);


    /*
     * Conversion de l'index
     * en progression de scroll.
     */

    const progress =
      index / (tabs.length - 1);


    const targetScroll =
      trigger.start +
      progress *
      (trigger.end - trigger.start);


    gsap.killTweensOf(window);


    gsap.to(window, {

      duration: 0.75,

      scrollTo: {
        y: targetScroll,
        autoKill: false,
      },

      ease: "power2.inOut",

      overwrite: true,


      onComplete: () => {

        isTabClickScrolling.current = false;

        setActiveIndex(index);

      },

    });

  };


  return (

    <section
      id="about"
      ref={aboutRef}
      className={styles.about}
    >

      <div
        ref={viewportRef}
        className={styles.aboutViewport}
      >

        <StarBackground sceneProgress={activeIndex / (tabs.length - 1)} />

        <div className={styles.aboutContent}>


          {/* ==================================================
              PHOTO
          ================================================== */}

          <div className={styles.aboutImage}>

            <DecorativeImage
              src="/images/test.png"
              alt="Kadir Ersoy"
            />

          </div>


          {/* ==================================================
              CONTENU DROIT
          ================================================== */}

          <div className={styles.aboutInfo}>


            {/* TITRE */}

            <h2 className={styles.aboutTitle}>

              About <span>me.</span>

            </h2>


            {/* ONGLETS */}

            <div className={styles.aboutTabs}>

              {tabs.map((tab, index) => (

                <button
                  key={tab.id}
                  type="button"
                  className={
                    activeIndex === index
                      ? styles.activeTab
                      : ""
                  }
                  onClick={() =>
                    handleTabClick(index)
                  }
                >

                  {tab.label}

                </button>

              ))}

            </div>


            {/* ==================================================
                CARTE PRINCIPALE
            ================================================== */}

            <div
              key={activeTab.id}
              className={styles.aboutTabContent}
            >

              <h3>
                {activeTab.title}
              </h3>


              <div
                className={
                  styles.aboutDescription
                }
              >

                {activeTab.paragraphs?.map(
                  (paragraph) => (

                    <p key={paragraph}>
                      {paragraph}
                    </p>

                  )
                )}

              </div>


              {/* CARTES INTERNES */}

              {activeTab.cards && (

                <div
                  className={
                    styles.infoCards
                  }
                >

                  {activeTab.cards.map(
                    (card) => (

                      <div
                        key={card.title}
                        className={
                          styles.infoCard
                        }
                      >

                        <h4>
                          {card.title}
                        </h4>

                        <p>
                          {card.text}
                        </p>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </section>

  );
};
