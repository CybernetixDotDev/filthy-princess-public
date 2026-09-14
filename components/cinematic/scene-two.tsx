"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function SceneTwo() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = document.querySelector<HTMLElement>("[data-scene-two]");
    if (!scene || motionQuery.matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  const visible = entered;

  return (
    <section data-scene-two className="relative flex min-h-screen overflow-hidden bg-(--fp-black) px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
      <div aria-hidden="true" className={`pointer-events-none absolute bottom-[12%] left-[2%] z-10 w-[60vw] transition-[opacity,transform] duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-90 motion-reduce:transition-none sm:bottom-[10%] sm:left-[16%] sm:w-[44vw] ${visible ? "translate-y-0 scale-100 opacity-90" : "translate-y-4 scale-[0.97] opacity-0"}`}><Image src="/LaceyHeart.png" alt="" width={1536} height={1024} sizes="(max-width: 640px) 60vw, 44vw" className="h-auto w-full object-contain mask-[radial-gradient(ellipse_at_center,black_38%,transparent_84%)] mix-blend-screen" /></div>
      <div className={`relative z-20 mx-auto flex w-full max-w-7xl items-end transition-[opacity,transform] delay-180 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none sm:delay-220 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}><div className="ml-auto max-w-[52%] pb-[25vh] text-right sm:max-w-lg sm:pb-[26vh]"><h2 className="display text-5xl leading-[0.9] text-(--fp-dirty-white) sm:text-7xl">COME<br /><i>CLOSER.</i></h2><p className="display mt-7 max-w-sm text-3xl leading-tight text-(--fp-blush) sm:ml-auto sm:text-5xl">I want to show you something.</p></div></div>
    </section>
  );
}
