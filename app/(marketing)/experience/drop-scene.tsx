"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./experience.module.css";

const ramp = (p: number, start: number, end: number) => {
  const t = Math.max(0, Math.min(1, (p - start) / (end - start)));
  return t * t * (3 - 2 * t);
};

// Active ranges retain the original 3,400svh-per-progress-unit rate.
// Only static holds are compressed; positions below are cumulative svh / travel.
const scrollRanges = [
  [0, 0],
  [84 / 2417.1, .13],          // Opening hold.
  [1172 / 2417.1, .45],        // Pull: 1,088svh, then abrupt Break.
  [1245.5 / 2417.1, .555],     // Pure Void: 73.5svh.
  [1313.5 / 2417.1, .575],     // Reassurance fade in: 68svh.
  [1398 / 2417.1, .64],        // Reassurance hold: 84.5svh.
  [1466 / 2417.1, .66],        // Reassurance fade out: 68svh.
  [2248 / 2417.1, .89],        // Reconstruction including Cally: 782svh.
  [2321.5 / 2417.1, .965],     // Resolved Cally hold: 73.5svh.
  [2379.3 / 2417.1, .982],     // Question fade in: 57.8svh.
  [1, 1],                     // Question hold: 37.8svh.
] as const;

export function dropState(progress: number): Record<string, string> {
  // Append the closing movement in physical svh; the original scene keeps its rate.
  const distance = Math.max(0, Math.min(1, progress)) * 3286.5;
  const scroll = Math.min(1, distance / 2417.1);
  const index = scrollRanges.findIndex(([end]) => end >= scroll);
  const [start, from] = scrollRanges[Math.max(0, index - 1)];
  const [end, to] = scrollRanges[index];
  const p = end === start ? from : from + (to - from) * (scroll - start) / (end - start);
  const pull = .62 * ramp(p, .13, .35) + .38 * ramp(p, .35, .445);
  // Reserve thinning and extreme separation for the final third of the Pull.
  const deep = ramp(p, .34, .45);
  const restoring = p >= .66;
  const broken = p >= .45 && !restoring;
  const body = ramp(p, .735, .825);
  const cally = ramp(p, .825, .89);
  const closing = distance - 2321.5;
  const windows = [
    [130, 155, 195.25, 225.25], // yes: 15% longer hold
    [235, 255, 289.5, 309.5], // a place: 15% longer hold
    [315, 340, 380.25, 400.25], // close: 15% longer hold
    [405, 425, 485, 505], // touch: 20% longer hold, then deliberate black
    [540, 550, 584.5, 599.5], // conversational: 15% longer hold
    [605, 612, 644.2, 659.2], // interruption: 15% longer hold
    [670, 695, 761, 791], // Not yet: 20% longer hold, then silence
    [825, 845, 881, 901], // grounded invitation: 20% longer hold
  ];
  const closingStyles: Record<string, string> = {};
  windows.forEach(([enter, settled, release, gone], i) => {
    const opacity = ramp(closing, enter, settled) * (1 - ramp(closing, release, gone));
    closingStyles[`--line-${i + 1}`] = String(opacity);
    closingStyles[`--line-${i + 1}-visibility`] = opacity > 0 ? "visible" : "hidden";
  });
  return {
    ...closingStyles,
    "--world-opacity": String(1 - ramp(closing, 130, 220)),
    "--close-scale": String(.985 + .015 * ramp(closing, 315, 375)),
    "--handoff": String(ramp(closing, 910, 935)),
    "--handoff-visibility": closing > 910 ? "visible" : "hidden",
    "--world": broken ? "hidden" : "visible",
    "--edge": `${restoring ? (1 - cally) * 16 : pull * 18}%`,
    "--hero-opacity": String(restoring ? 0 : 1 - .66 * pull),
    "--hero-transform": `translate3d(${deep * 7}%, ${-pull * 9}%, ${-pull * 1150}px) rotateY(${deep * -12}deg) scaleX(${1 - .35 * deep}) scaleY(${1 + .28 * deep})`,
    "--return-opacity": String(p > .825 ? cally : 0),
    "--return-visibility": p > .825 && cally > 0 ? "visible" : "hidden",
    "--return-transform": `translate3d(0, ${(1 - cally) * 3}%, 0) scale(${1.035 - .035 * cally})`,
    "--satin-opacity": String(restoring ? body * (1 - .82 * cally) : .7 * ramp(p, .145, .255)),
    "--satin-transform": restoring
      ? `translate3d(0, ${(1 - body) * 7}%, 0) scale(${1.08 - body * .08})`
      : `translate3d(${-pull * 4}%, ${pull * 3}%, 0) scaleX(${1.12 - deep * .025}) scaleY(${1.12 + deep * .65})`,
    "--companion-opacity": String(restoring ? .55 * ramp(p, .72, .81) * (1 - .7 * cally) : .6 * ramp(p, .205, .32)),
    "--companion-transform": restoring
      ? `translate3d(0, ${(1 - body) * -3}%, 0) scale(1.04)`
      : `translate3d(${pull * 5}%, ${pull * -3}%, 0) scaleX(${1.15 - deep * .035}) scaleY(${1.12 + deep * 1.2})`,
    "--dust-opacity": String(restoring ? .32 * ramp(p, .695, .755) : .08 + .3 * ramp(p, .145, .31)),
    "--dust-transform": restoring
      ? `translate3d(0, ${(1 - body) * 2}%, 0) scale(1.02)`
      : `translate3d(${-pull * 8}%, ${-pull * 21}%, ${-pull * 230}px) scaleX(${1 - deep * .3}) scaleY(${1 + deep * .9})`,
    "--warmth": String(restoring ? .5 * ramp(p, .66, .73) * (1 - .6 * cally) : 0),
    "--attention": String(1 - ramp(p, .205, .34)),
    "--tracking": `${pull * .055}em`,
    "--here": String(ramp(p, .555, .575) * (1 - ramp(p, .64, .66))),
    "--question": String(ramp(p, .965, .982) * (1 - ramp(closing, 101.27, 125.67))),
  };
}

export function DropScene({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    const viewport = root?.querySelector<HTMLElement>("[data-viewport]");
    if (!root || !viewport) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let nearby = true;
    let last = -1;
    const paint = () => {
      frame = 0;
      if (preference.matches) return;
      const rect = root.getBoundingClientRect();
      const travel = Math.max(1, root.offsetHeight - viewport.offsetHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      if (progress === last) return;
      last = progress;
      for (const [name, value] of Object.entries(dropState(progress))) root.style.setProperty(name, value);
    };
    const schedule = () => {
      if (!frame && nearby && !preference.matches) frame = requestAnimationFrame(paint);
    };
    const configure = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = -1;
      if (preference.matches) {
        delete root.dataset.enhanced;
        for (const name of Object.keys(dropState(0))) root.style.removeProperty(name);
      } else {
        root.dataset.enhanced = "true";
        paint();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) schedule();
    }, { rootMargin: "100% 0px" });
    const resize = new ResizeObserver(schedule);
    configure();
    observer.observe(root);
    resize.observe(root);
    resize.observe(viewport);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    preference.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", configure);
      delete root.dataset.enhanced;
      for (const name of Object.keys(dropState(0))) root.style.removeProperty(name);
    };
  }, []);
  return <div ref={rootRef} className={styles.scene}>{children}</div>;
}
