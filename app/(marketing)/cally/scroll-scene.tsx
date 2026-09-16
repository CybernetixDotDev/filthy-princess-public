"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const soften = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
// 1200svh of sticky travel: preserve the first four 108svh holds,
// extend each transition from 54 to 96svh, then hold Image 5 for 216svh.
// The final rise occupies 120svh before the closing words settle.
const transitions = [[.09, .17], [.26, .34], [.43, .51], [.60, .68]] as const;

export function ScrollScene({ kind, className, children }: {
  kind: "photographs" | "silence";
  className: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stage = node.querySelector<HTMLElement>("[data-stage]");
    const words = node.querySelector<HTMLElement>("[data-words]");
    const photos = Array.from(node.querySelectorAll<HTMLElement>("[data-photo]"));
    const field = node.querySelector<HTMLElement>("[data-photographs]");
    const sweep = node.querySelector<HTMLElement>("[data-sweep]");
    const rise = node.querySelector<HTMLElement>("[data-rise]");
    if (!stage || !words) return;
    let frame = 0;

    function render() {
      frame = 0;
      if (media.matches || !stage || !words) return;
      // Batch geometry reads before the visual writes; no React scroll state.
      const bounds = node!.getBoundingClientRect();
      const stageHeight = stage.offsetHeight;
      const viewport = window.innerHeight;
      const progress = clamp(-bounds.top / Math.max(1, bounds.height - stageHeight));
      if (kind === "silence") {
        // Hold, release over 132svh, then leave 72svh of fully black travel.
        words.style.opacity = String(1 - soften((progress - .15) / .55));
        return;
      }
      let current = 0;
      let sweepProgress = -1;
      transitions.forEach(([start, end], index) => {
        if (progress >= end) current = index + 1;
        else if (progress >= start) {
          sweepProgress = (progress - start) / (end - start);
          current = index;
        }
      });
      photos.forEach((photo, index) => {
        const arriving = sweepProgress >= 0 && index === current + 1;
        const departing = index === current;
        photo.style.visibility = departing || arriving ? "visible" : "hidden";
        photo.style.zIndex = departing ? "1" : "0";
        // Two staggered releases through the moving black field, rather than
        // a midpoint image swap or a continuously dissolving slideshow.
        photo.style.opacity = String(arriving
          ? soften((sweepProgress - .36) / .64)
          : departing && sweepProgress >= 0
            ? 1 - soften((sweepProgress - .12) / .56)
            : 1);
        // Request the next photograph before its transition, not all five at arrival.
        if (bounds.top < viewport * 1.5 && index <= current + 1) {
          const image = photo.querySelector("img");
          if (image) image.loading = "eager";
        }
      });
      if (field) field.style.opacity = String(clamp(1 - bounds.top / viewport));
      if (sweep) {
        sweep.style.visibility = sweepProgress < 0 ? "hidden" : "visible";
        sweep.style.transform = `translateY(${sweepProgress < 0 ? 100 : 100 - soften(sweepProgress) * 200}%)`;
      }
      if (rise) rise.style.transform = `translateY(${(1 - soften((progress - .86) / .10)) * 130 - 20}%)`;
      words.style.opacity = String(soften((progress - .94) / .045));
    }

    function schedule() {
      if (!frame && !media.matches) frame = window.requestAnimationFrame(render);
    }
    function configure() {
      if (media.matches) {
        delete node!.dataset.choreographed;
        [words, field, sweep, rise, ...photos].forEach((element) => element?.removeAttribute("style"));
      } else {
        node!.dataset.choreographed = "true";
        schedule();
      }
    }
    configure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    media.addEventListener("change", configure);
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      media.removeEventListener("change", configure);
      observer.disconnect();
      delete node.dataset.choreographed;
      [words, field, sweep, rise, ...photos].forEach((element) => element?.removeAttribute("style"));
    };
  }, [kind]);

  return <div ref={root} className={className}>{children}</div>;
}
