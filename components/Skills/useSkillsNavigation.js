import { useEffect } from "react";

// Measure both controls so anchors stay below the real navbar at every size.
export default function useSkillsNavigation(sectionRef, controlsRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const controls = controlsRef.current;
    const header = document.querySelector("[data-site-header]");
    const measure = () => {
      section.style.setProperty("--header-height", `${header?.getBoundingClientRect().height || 80}px`);
      section.style.setProperty("--controls-height", `${controls.getBoundingClientRect().height}px`);
    };
    const observer = new ResizeObserver(measure);
    if (header) observer.observe(header, { box: "border-box" });
    observer.observe(controls, { box: "border-box" });
    measure();
    return () => observer.disconnect();
  }, [sectionRef, controlsRef]);
}

