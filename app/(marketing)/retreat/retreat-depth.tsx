"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./retreat.module.css";

const ease = (value: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

export function RetreatDepth({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const scenes = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]"));
    const visible = new Set(scenes);
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      if (media.matches) return;
      for (const scene of visible) {
        const rect = scene.getBoundingClientRect();
        const kind = scene.dataset.depth;
        const sticky = kind === "drop" || kind === "thoughts";
        const viewport = scene.firstElementChild as HTMLElement;
        const p = sticky
          ? Math.max(0, Math.min(1, -rect.top / Math.max(1, scene.offsetHeight - viewport.offsetHeight)))
          : ease(innerHeight - rect.top, 0, innerHeight + rect.height);
        if (kind === "drop") {
          scene.style.setProperty("--portrait", String(1 - ease(p, .24, .54)));
          scene.style.setProperty("--rain", String(.48 * ease(p, .2, .43) * (1 - ease(p, .62, .88))));
          scene.style.setProperty("--rain-y", `${p * 5}%`);
        } else if (kind === "thoughts") {
          scene.querySelectorAll<HTMLElement>("[data-thought]").forEach((thought, i) => {
            const start = .03 + i * .105;
            thought.style.opacity = String(ease(p, start, start + .025) * (1 - ease(p, start + .065, start + .09)));
          });
        } else {
          scene.style.setProperty("--depth-opacity", String(kind === "door" ? ease(p, .04, .36) : .65 + .35 * ease(p, 0, .35)));
          scene.style.setProperty("--depth-y", `${(1 - p) * (kind === "door" ? 3 : 2)}%`);
          scene.style.setProperty("--depth-scale", String(1.025 - .025 * p));
        }
      }
    };
    const schedule = () => { if (!frame && !media.matches) frame = requestAnimationFrame(paint); };
    const reset = () => {
      cancelAnimationFrame(frame); frame = 0;
      delete root.dataset.motion;
      scenes.forEach(scene => {
        scene.removeAttribute("style");
        scene.querySelectorAll<HTMLElement>("[data-thought]").forEach(thought => thought.style.removeProperty("opacity"));
      });
      if (!media.matches) { root.dataset.motion = "true"; paint(); }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) visible.add(entry.target as HTMLElement); else visible.delete(entry.target as HTMLElement); });
      schedule();
    }, { rootMargin: "100% 0px" });
    scenes.forEach(scene => observer.observe(scene));
    const resize = new ResizeObserver(schedule);
    scenes.forEach(scene => resize.observe(scene));
    reset();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    media.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      media.removeEventListener("change", reset);
      delete root.dataset.motion;
      scenes.forEach(scene => { scene.removeAttribute("style"); scene.querySelectorAll<HTMLElement>("[data-thought]").forEach(thought => thought.style.removeProperty("opacity")); });
    };
  }, []);
  return <div ref={ref} className={styles.composition}>{children}</div>;
}
