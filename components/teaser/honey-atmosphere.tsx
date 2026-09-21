"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import styles from "./teaser.module.css";

export function HoneyAtmosphere() {
  const layer = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [geometry, setGeometry] = useState({ peaks: [] as number[], viewport: 1 });

  useEffect(() => {
    const scene = layer.current?.closest("main");
    if (!scene) return;
    const measure = () => setGeometry({
      viewport: window.innerHeight,
      peaks: Array.from(scene.querySelectorAll("[data-honey-moment]"), (moment) => {
        const bounds = moment.getBoundingClientRect();
        return bounds.top + window.scrollY + bounds.height / 2 - window.innerHeight / 2;
      }),
    });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Motion values update styles directly. React only updates when geometry changes.
  const intensity = useTransform(scrollY, (position) => {
    const swell = geometry.peaks.reduce((strongest, peak) => Math.max(strongest,
      Math.exp(-Math.pow((position - peak) / (geometry.viewport * .48), 2))), 0);
    return .018 + .19 * swell;
  });

  return <motion.div ref={layer} className={styles.honey} aria-hidden="true"
    style={{ opacity: reducedMotion ? .025 : intensity }}>
    <div className={styles.honeyTexture} />
  </motion.div>;
}
