"use client";

import { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import styles from "./About.module.css";
import { DecorativeImage } from "./DecorativeImage";
import { StarBackground } from "./StarBackground";
import { FaGraduationCap } from "react-icons/fa";
import { FiBriefcase, FiZap, FiCompass, FiUsers, FiSettings, FiBookOpen, FiBarChart2, FiCpu, FiActivity, FiGlobe } from "react-icons/fi";


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
    cards: [
      { title: "ESIEE Paris", text: "Étudiant en informatique", icon: FaGraduationCap },
      { title: "Software Engineer", text: "Brasserie Champigneulles", icon: FiBriefcase },
      { title: "Curieux & motivé", text: "Toujours en quête de défis", icon: FiZap },
    ],
  },

  {
    id: "languages",
    label: "Langues",

    title: "Langues",

    cards: [
      {
        title: "Français",
        text: "Langue maternelle",
        flag: "fr",
      },

      {
        title: "Anglais",
        text: "Niveau professionnel",
        flag: "gb",
      },
      {
        title: "Turc",
        text: "Bilingue",
        flag: "tr",
      },
    ],
  },

  {
    id: "softskills",
    label: "Soft skills",

    title: "Ma façon de travailler.",
    intro: "Comprendre, collaborer et structurer des solutions concrètes.",

    cards: [
      {
        title: "Curiosité",
        text: "J’aime comprendre le pourquoi, explorer de nouvelles approches et apprendre en continu.",
        icon: FiCompass,
        footer: "Veille & apprentissage",
        footerIcon: FiBookOpen,
      },

      {
        title: "Esprit d’équipe",
        text: "J’apprécie travailler en projet, confronter les idées et construire des solutions avec les autres.",
        icon: FiUsers,
        footer: "Collaboration en projet",
        footerIcon: FiUsers,
      },

      {
        title: "Esprit d’analyse",
        text: "Analyser une situation, identifier les contraintes et transformer un besoin en solution concrète.",
        icon: FiSettings,
        footer: "Structuration & résolution",
        footerIcon: FiBarChart2,
      },
    ],
  },

  {
    id: "interests",
    label: "Intérêts",

    title: "Ce qui m’inspire.",
    intro: "Ce qui nourrit ma curiosité au-delà de l’informatique.",

    cards: [
      {
        title: "Technologie",
        text: "Explorer l’IA, les outils numériques et les innovations qui façonnent demain.",
        visual: "technology", subtitle: "Imaginer le futur", footer: "Curiosité & innovation",
        icon: FiCpu,
      },

      {
        title: "Football",
        text: "Le sport m’apporte discipline, régularité et sens du collectif.",
        visual: "football", subtitle: "Esprit de compétition", footer: "Discipline & équipe",
        icon: FiActivity,
      },

      {
        title: "Voyage",
        text: "Explorer de nouveaux lieux et de nouvelles cultures pour élargir ma vision du monde.",
        visual: "travel", subtitle: "Découvrir autrement", footer: "Ouverture & perspective",
        icon: FiGlobe,
      },
    ],
  },
];


function InterestVisual({ kind }) {
  return <div className={`${styles.interestVisual} ${styles[kind]}`} aria-hidden="true">
    <svg viewBox="0 0 300 150" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1">{kind !== "travel" && <ellipse className={styles.interestOrbit} cx="150" cy="90" rx="130" ry="38" transform="rotate(-15 150 90)" />}<path opacity=".35" d="M25 32h3m50-12h3m172 18h3M40 125h3m210-13h3" /></g>
      {kind === "technology" && <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path fill="#100d29" d="m98 27 110 12-15 76-110-12z" /><path fill="#27204c" d="m83 103 110 12 39 17-134-8-40-16z" /><path fill="none" d="m120 60-13 9 10 12m49-19 13 12-17 8m-20-29-10 36" /><path opacity=".4" d="M47 52h26M43 60h25M221 78h28M218 86h24" /></g>}
      {kind === "football" && <g stroke="currentColor" strokeWidth="2"><path fill="none" opacity=".3" d="m40 140 35-90h150l35 90M150 50v90M55 104h190" /><circle cx="150" cy="72" r="48" fill="#18132e" /><path fill="#483176" d="m150 48 24 17-9 28h-30l-9-28z" /><path fill="none" d="m150 48-4-23m28 40 23-4m-32 32 15 17m-45-17-16 17m7-45-22-7" /><path opacity=".6" d="M25 25 75 45m200-20-50 20" /></g>}
      {kind === "travel" && <g stroke="currentColor" strokeLinejoin="round"><circle cx="216" cy="40" r="25" fill="#392051" /><path fill="#15102a" d="m0 137 64-80 43 50 43-75 79 105z" /><path fill="#2d2044" d="m0 150 68-53 28 30 66-60 55 63 36-43 47 63z" /><path fill="none" opacity=".7" d="m127 150 37-30-13-9 19-17M45 81l19-24 20 23-20-9z" /></g>}
      {kind === "travel" && <ellipse className={styles.interestOrbit} fill="none" stroke="currentColor" strokeWidth="1" cx="150" cy="90" rx="130" ry="38" transform="rotate(-15 150 90)" />}
    </svg>
  </div>;
}

const LanguageFlag = ({ country }) => (
  <svg className={styles.languageFlag} viewBox="0 0 60 40" aria-hidden="true" focusable="false">
    {country === "fr" && <>
      <path fill="#fff" d="M0 0h60v40H0z" />
      <path fill="#002395" d="M0 0h20v40H0z" />
      <path fill="#ed2939" d="M40 0h20v40H40z" />
    </>}
    {country === "gb" && <>
      <path fill="#012169" d="M0 0h60v40H0z" />
      <path stroke="#fff" strokeWidth="9" d="m0 0 60 40M60 0 0 40" />
      <path stroke="#c8102e" strokeWidth="3" d="m0 0 60 40M60 0 0 40" />
      <path stroke="#fff" strokeWidth="13" d="M30 0v40M0 20h60" />
      <path stroke="#c8102e" strokeWidth="7" d="M30 0v40M0 20h60" />
    </>}
    {country === "tr" && <>
      <path fill="#e30a17" d="M0 0h60v40H0z" />
      <circle cx="25" cy="20" r="10" fill="#fff" />
      <circle cx="28" cy="20" r="8" fill="#e30a17" />
      <path fill="#fff" d="m39 14 1.4 4.2h4.4l-3.6 2.6 1.4 4.2-3.6-2.6-3.6 2.6 1.4-4.2-3.6-2.6h4.4z" />
    </>}
  </svg>
);

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
      const desktop = gsap.matchMedia();
      desktop.add("(min-width: 769px)", () => {

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

      // Fade only after the existing pinned story finishes; no additional pin.
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(viewport.querySelector(`.${styles.aboutContent}`), {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => scrollTriggerRef.current.end,
            end: () => scrollTriggerRef.current.end + window.innerHeight * 0.7,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => { scrollTriggerRef.current = null; };
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
      setActiveIndex(index);
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
              className={`${styles.aboutTabContent} ${activeTab.id === "softskills" ? styles.methodPanel : activeTab.id === "interests" ? styles.interestPanel : ""}`}
            >

              <p className={styles.cardEyebrow}>
                {String(activeIndex + 1).padStart(2, "0")} — {activeTab.label}
              </p>

              <h3>
                {activeTab.id === "softskills" ? <>Ma façon de <span className={styles.methodAccent}>travailler.</span></> : activeTab.title}
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


              {activeTab.intro && <p className={styles.panelIntro}>{activeTab.intro}</p>}
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
                          `${styles.infoCard} ${activeTab.id === "presentation" ? styles.presentationCard : activeTab.id === "languages" ? styles.bubbleCard : styles.editorialCard}`
                        }
                      >

                        {card.visual && <InterestVisual kind={card.visual} />}
                        {card.flag && <LanguageFlag country={card.flag} />}
                        {card.icon && (
                          <span className={styles.cardIcon} aria-hidden="true">
                            <card.icon />
                          </span>
                        )}

                        <div>
                        <h4>
                          {card.title}
                        </h4>

                        <p>
                          {card.subtitle && <strong className={styles.cardSubtitle}>{card.subtitle}</strong>}
                          {card.text}
                        </p>
                        </div>

                        {card.footer && <span className={styles.cardFooter}>
                          {card.footerIcon && <card.footerIcon aria-hidden="true" />}
                          <span>{card.footer}</span>

                        </span>}

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
