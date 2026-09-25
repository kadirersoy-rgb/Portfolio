"use client";

import { useEffect, useRef } from "react";
import styles from "./StarBackground.module.css";

// Stable, decorrelated coordinates also keep server/client rendering identical.
const spread = (index, seed) => {
  const value = Math.sin((index + 1) * seed) * 43758.5453;
  return (value - Math.floor(value)) * 100;
};

export const StarBackground = ({
  smallCount = 260,
  bigCount = 22,
  sparkleCount = 12,
  sceneProgress = 0,
  className = "",
}) => {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const root = backgroundRef.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const stars = Array.from(root.querySelectorAll("[data-star-depth]"), (node) => ({
      node,
      x: parseFloat(node.style.left) / 100,
      y: parseFloat(node.style.top) / 100,
      depth: Number(node.dataset.starDepth),
      offsetX: 0,
      offsetY: 0,
    }));
    let frame = 0;
    let visible = false;
    let active = false;
    let mouseX = 0;
    let mouseY = 0;
    let lastTime = 0;

    const animate = (time) => {
      frame = 0;
      const smoothing = 1 - Math.exp(-Math.min(time - lastTime || 16, 50) / 85);
      lastTime = time;
      const bounds = root.getBoundingClientRect();
      const x = mouseX - bounds.left;
      const y = mouseY - bounds.top;
      const inside = active && x >= 0 && y >= 0 && x <= bounds.width && y <= bounds.height;
      let moving = false;
      stars.forEach((star) => {
        const dx = star.x * bounds.width - x;
        const dy = star.y * bounds.height - y;
        const distance = Math.hypot(dx, dy);
        const force = inside ? Math.pow(Math.max(0, 1 - distance / 180), 2) * 62 * star.depth : 0;
        const targetX = inside ? (dx / (distance || 1)) * force : 0;
        const targetY = inside ? (dy / (distance || 1)) * force : 0;
        star.offsetX += (targetX - star.offsetX) * smoothing;
        star.offsetY += (targetY - star.offsetY) * smoothing;
        moving ||= Math.abs(targetX - star.offsetX) + Math.abs(targetY - star.offsetY) > 0.05;
        star.node.style.translate = `${star.offsetX.toFixed(2)}px ${star.offsetY.toFixed(2)}px`;
      });
      if (moving) frame = requestAnimationFrame(animate);
    };
    const schedule = () => {
      if (!frame && visible && !document.hidden && !motion.matches && pointer.matches) {
        lastTime = 0;
        frame = requestAnimationFrame(animate);
      }
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      active = true;
      schedule();
    };
    const leave = () => { active = false; schedule(); };
    // Freeze interaction during scroll; only a real mouse movement restarts it.
    const stopInteraction = () => {
      active = false;
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      root.dataset.paused = String(!visible || document.hidden);
      if (motion.matches || !pointer.matches) {
        active = false;
        stars.forEach((star) => {
          star.offsetX = star.offsetY = 0;
          star.node.style.translate = "0px 0px";
        });
      } else if (active) schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(root);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", stopInteraction, { passive: true, capture: true });
    window.addEventListener("resize", stopInteraction);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    pointer.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", stopInteraction, true);
      window.removeEventListener("resize", stopInteraction);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      pointer.removeEventListener("change", sync);
    };
  }, [smallCount, bigCount, sparkleCount]);

  /*
   * Génération déterministe :
   * pas de Math.random() pour éviter les soucis d'hydratation.
   */

  const smallStars = Array.from(
    { length: smallCount },
    (_, index) => {
      // Jitter within spaced cells instead of clustering random points.
      const columns = 18;
      const rows = Math.ceil(smallCount / columns);
      const x = ((index % columns) + 0.25 + spread(index, 12.9898) / 200) / columns * 100;
      const y = (Math.floor(index / columns) + 0.25 + spread(index, 78.233) / 200) / rows * 100;

      const size = 1.4 + ((index * 17) % 4) * 0.6;

      const opacity =
        0.25 + (((index * 13) % 55) / 100);

      const delay = -((index * 0.31) % 6);
      const duration = 2.4 + ((index * 19) % 5) * 0.65;

      return {
        id: `small-${index}`,
        x,
        y,
        size,
        opacity,
        delay,
        duration,
      };
    }
  );

  const bigStars = Array.from(
    { length: bigCount },
    (_, index) => {
      const x = 6 + ((index * 19) % 88);
      const y = 8 + ((index * 23) % 82);

      const size = 3.2 + ((index * 7) % 4) * 0.8;

      const delay = -((index * 0.43) % 7);
      const duration = 4 + ((index * 11) % 5);

      return {
        id: `big-${index}`,
        x,
        y,
        size,
        delay,
        duration,
      };
    }
  );

  const sparkles = Array.from(
    { length: sparkleCount },
    (_, index) => {
      const x = 10 + ((index * 29) % 80);
      const y = 12 + ((index * 41) % 74);

      const size = 16 + ((index * 9) % 16);

      const delay = -((index * 0.57) % 8);
      const duration = 4 + ((index * 7) % 5);

      return {
        id: `sparkle-${index}`,
        x,
        y,
        size,
        delay,
        duration,
      };
    }
  );

  return (
    <div className={styles.skyViewport} aria-hidden="true">
    <div
      ref={backgroundRef}
      className={`${styles.starsWrap} ${className}`}
      style={{ "--sky-offset": `${-Math.min(1, Math.max(0, sceneProgress)) * (80 / 180) * 100}%` }}
      aria-hidden="true"
    >

      <span className={styles.galaxyBand} />
      {/* Nebula / halos d'ambiance */}
      <span className={`${styles.nebula} ${styles.nebulaOne}`} />
      <span className={`${styles.nebula} ${styles.nebulaTwo}`} />
      <span className={`${styles.nebula} ${styles.nebulaThree}`} />

      {/* Petites étoiles */}
      <div className={styles.smallLayer}>
        {smallStars.map((star) => (
          <span
            key={star.id}
            className={styles.smallStar}
            data-star-depth={0.4 + (star.size / 3)}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Grosses étoiles glow */}
      <div className={styles.bigLayer}>
        {bigStars.map((star) => (
          <span
            key={star.id}
            className={styles.bigStar}
            data-star-depth="1.2"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Sparkles / étoiles en croix */}
      <div className={styles.sparkleLayer}>
        {sparkles.map((star) => (
          <span
            key={star.id}
            className={styles.sparkle}
            data-star-depth="1.6"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Staggered meteor trails across the star field. */}
      {[0, 1, 2, 3].map((index) => (
        <span
          key={`meteor-${index}`}
          className={styles.shootingStar}
          style={{
            top: `${14 + index * 20}%`,
            left: `${-8 + (index % 3) * 23}%`,
            animationDelay: `${-index * 2.5}s`,
          }}
        />
      ))}
    </div>
    </div>
  );
};
