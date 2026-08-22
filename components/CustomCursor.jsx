"use client";

import { useEffect, useRef } from "react";

import {
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import styles from "./CustomCursor.module.css";


export const CustomCursor = () => {

  /* Position réelle de la souris */
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);


  /* Position du cercle avec inertie */
  const ringX = useSpring(cursorX, {
    stiffness: 120,
    damping: 18,
    mass: 0.35,
  });

  const ringY = useSpring(cursorY, {
    stiffness: 120,
    damping: 18,
    mass: 0.35,
  });


  /* Référence vers le cercle */
  const ringRef = useRef(null);


  useEffect(() => {

    /* Déplacement de la souris */
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };


    /* Entrée sur un élément */
    const handleMouseOver = (e) => {

      /* Zone où seul le point est affiché */
      const dotOnly = e.target.closest(
        "[data-cursor='dot-only']"
      );

      if (dotOnly && ringRef.current) {
        ringRef.current.classList.remove(styles.hover);
        ringRef.current.classList.add(styles.hidden);

        return;
      }


      /* Éléments interactifs */
      const interactive = e.target.closest(
        "a, button, input, textarea, select, [data-cursor='hover']"
      );

      if (interactive && ringRef.current) {
        ringRef.current.classList.add(styles.hover);
      }
    };


    /* Sortie d'un élément */
    const handleMouseOut = (e) => {

      /* Vérifie si on était dans une zone dot-only */
      const dotOnly = e.target.closest(
        "[data-cursor='dot-only']"
      );

      if (dotOnly && ringRef.current) {

        const nextElement = e.relatedTarget;

        /* Vérifie si la souris quitte réellement la zone */
        const stillInside =
          nextElement &&
          nextElement.closest?.(
            "[data-cursor='dot-only']"
          );

        if (!stillInside) {
          ringRef.current.classList.remove(
            styles.hidden
          );
        }

        return;
      }


      /* Vérifie si on quitte un élément interactif */
      const interactive = e.target.closest(
        "a, button, input, textarea, select, [data-cursor='hover']"
      );

      if (interactive && ringRef.current) {
        ringRef.current.classList.remove(
          styles.hover
        );
      }
    };


    /* Events */
    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    document.addEventListener(
      "mouseout",
      handleMouseOut
    );


    /* Nettoyage */
    return () => {

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      document.removeEventListener(
        "mouseout",
        handleMouseOut
      );
    };

  }, [cursorX, cursorY]);


  return (
    <>

      {/* Point central */}
      <motion.div
        className={styles.dot}
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />


      {/* Cercle avec inertie */}
      <motion.div
        ref={ringRef}
        className={styles.ring}
        style={{
          x: ringX,
          y: ringY,
        }}
      />

    </>
  );
};