"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Generic scene-object model. `type` is deliberately extensible: the renderer
 * below only knows how to draw "photo" and "note" today, but selection/focus/
 * dim logic never assumes a specific type, so future object types (a charm, a
 * ribbon, a gummy bear...) can be added by extending `SceneObjectType` and
 * adding a case to `renderObjectVisual` — nothing else in this file changes.
 */
type SceneObjectType = "photo" | "note";

type SceneObject = {
  id: string;
  type: SceneObjectType;
  asset: string;
  alt: string;
  /** width / height of the source image, used to render without distortion. */
  aspect: number;
  /** normalized 0-1 position, x relative to canvas width, y relative to canvas height. */
  x: number;
  y: number;
  /** normalized 0-1 width, relative to canvas width. */
  width: number;
  /** authored rest rotation, degrees. */
  rotation: number;
  /** stacking order at rest — higher sits on top. Authored per-object, not by array order. */
  depth: number;
  interactive?: boolean;
};

type OoohSpot = { x: number; y: number; width: number; rotate: number };

type SceneLayout = { objects: SceneObject[]; ooohSpot: OoohSpot };

// Three loose clusters (upper anchors, a middle strawberry/note pocket, a lower
// candid cluster) with a genuinely empty pocket on the right for the reveal line.
const mobileScene: SceneLayout = {
  objects: [
    { id: "awakening", type: "photo", asset: "/awakening.png", alt: "A dim portrait print from Cally's evidence", aspect: 2 / 3, x: -0.06, y: -0.02, width: 0.34, rotation: -6, depth: 20 },
    { id: "temptation", type: "photo", asset: "/temptation.png", alt: "A tall portrait print from Cally's evidence", aspect: 2 / 3, x: 0.24, y: 0.02, width: 0.32, rotation: 6, depth: 24 },
    { id: "moonPrincess", type: "photo", asset: "/moonPrincess.png", alt: "A mysterious night-time photograph from Cally's evidence", aspect: 1, x: 0.62, y: -0.04, width: 0.22, rotation: -7, depth: 18 },
    { id: "tornNote", type: "note", asset: "/tornNote.png", alt: "A torn handwritten note among the evidence", aspect: 1, x: 0.06, y: 0.26, width: 0.14, rotation: -11, depth: 22 },
    { id: "strawberryBowl", type: "photo", asset: "/strawberryBowl.png", alt: "A photograph of a bowl of strawberries from Cally's evidence", aspect: 1, x: 0.36, y: 0.34, width: 0.22, rotation: -4, depth: 16 },
    { id: "reminderNote", type: "note", asset: "/reminderNote.png", alt: "A casually torn reminder note among the evidence", aspect: 1, x: 0.58, y: 0.3, width: 0.13, rotation: 13, depth: 26 },
    { id: "strawberry2", type: "photo", asset: "/strawberry2.png", alt: "A small, punchy square print from Cally's evidence", aspect: 1, x: 0.16, y: 0.46, width: 0.17, rotation: 9, depth: 24 },
    { id: "bonniePrincess", type: "photo", asset: "/bonniePrincess.png", alt: "A warm firelit photograph from Cally's evidence", aspect: 1, x: 0.66, y: 0.46, width: 0.26, rotation: 4, depth: 18 },
    { id: "touchMe", type: "note", asset: "/touchMe.png", alt: "A small note tucked beneath a photograph", aspect: 1, x: 0.82, y: 0.62, width: 0.14, rotation: -9, depth: 12 },
    { id: "princessPartyAftermath", type: "photo", asset: "/princessPartyAftermath.png", alt: "A large candid party print from Cally's evidence", aspect: 4 / 5, x: 0.06, y: 0.62, width: 0.66, rotation: -3, depth: 14 },
    { id: "vanityMirror", type: "photo", asset: "/vanityMirror.png", alt: "A photograph of a vanity mirror from Cally's evidence", aspect: 1, x: 0.5, y: 0.7, width: 0.24, rotation: -3, depth: 17 },
    { id: "afterPartDresser", type: "photo", asset: "/afterPartDresser.png", alt: "A private print tucked beneath the others", aspect: 4 / 5, x: 0.4, y: 0.82, width: 0.3, rotation: -9, depth: 10 },
  ],
  ooohSpot: { x: 0.74, y: 0.2, width: 0.26, rotate: -2 },
};

// Several loose areas rather than symmetrical columns: left cluster, a central
// strawberry/note pocket, a warm-toned right-of-centre cluster, and a right anchor.
const desktopScene: SceneLayout = {
  objects: [
    { id: "princessPartyAftermath", type: "photo", asset: "/princessPartyAftermath.png", alt: "A large candid party print from Cally's evidence", aspect: 4 / 5, x: -0.02, y: 0.55, width: 0.2, rotation: -4, depth: 14 },
    { id: "tornNote", type: "note", asset: "/tornNote.png", alt: "A torn handwritten note among the evidence", aspect: 1, x: 0.15, y: 0.52, width: 0.06, rotation: -12, depth: 22 },
    { id: "awakening", type: "photo", asset: "/awakening.png", alt: "A dim portrait print from Cally's evidence", aspect: 2 / 3, x: 0.04, y: 0.08, width: 0.17, rotation: -6, depth: 20 },
    { id: "moonPrincess", type: "photo", asset: "/moonPrincess.png", alt: "A mysterious night-time photograph from Cally's evidence", aspect: 1, x: 0.24, y: 0.16, width: 0.11, rotation: 5, depth: 18 },
    { id: "strawberryBowl", type: "photo", asset: "/strawberryBowl.png", alt: "A photograph of a bowl of strawberries from Cally's evidence", aspect: 1, x: 0.38, y: 0.5, width: 0.1, rotation: -5, depth: 16 },
    { id: "reminderNote", type: "note", asset: "/reminderNote.png", alt: "A casually torn reminder note among the evidence", aspect: 1, x: 0.47, y: 0.32, width: 0.06, rotation: 14, depth: 26 },
    { id: "strawberry2", type: "photo", asset: "/strawberry2.png", alt: "A small, punchy square print from Cally's evidence", aspect: 1, x: 0.34, y: 0.68, width: 0.075, rotation: 9, depth: 24 },
    { id: "bonniePrincess", type: "photo", asset: "/bonniePrincess.png", alt: "A warm firelit photograph from Cally's evidence", aspect: 1, x: 0.58, y: 0.5, width: 0.13, rotation: 4, depth: 18 },
    { id: "touchMe", type: "note", asset: "/touchMe.png", alt: "A small note tucked beneath a photograph", aspect: 1, x: 0.685, y: 0.6, width: 0.07, rotation: -8, depth: 12 },
    { id: "temptation", type: "photo", asset: "/temptation.png", alt: "A tall portrait print from Cally's evidence", aspect: 2 / 3, x: 0.66, y: 0.1, width: 0.16, rotation: 6, depth: 20 },
    { id: "vanityMirror", type: "photo", asset: "/vanityMirror.png", alt: "A photograph of a vanity mirror from Cally's evidence", aspect: 1, x: 0.79, y: 0.32, width: 0.11, rotation: -3, depth: 17 },
    { id: "afterPartDresser", type: "photo", asset: "/afterPartDresser.png", alt: "A private print tucked beneath the others", aspect: 4 / 5, x: 0.9, y: 0.55, width: 0.12, rotation: -9, depth: 10 },
  ],
  ooohSpot: { x: 0.36, y: 0, width: 0.28, rotate: -2 },
};

const MOBILE_BREAKPOINT = 640;
const PHOTO_FOCUS_SCALE = 1.12;
// Notes start small enough that a flat scale multiplier would leave the handwriting
// unreadable, so focused notes target a fraction of canvas width instead, clamped to
// a comfortable reading size that never dwarfs the large photo anchors.
const NOTE_FOCUS_WIDTH_FRACTION = 0.4;
const NOTE_FOCUS_MIN_PX = 200;
const NOTE_FOCUS_MAX_PX = 300;
const HOVER_SCALE = 1.03;
const FOCUS_MARGIN = 20;

function renderObjectVisual(object: SceneObject, boxShadow: string) {
  switch (object.type) {
    case "note":
      return (
        <span style={{ aspectRatio: object.aspect, boxShadow }} className="relative block overflow-hidden bg-(--fp-charcoal)">
          <Image src={object.asset} alt="" fill sizes="(max-width: 640px) 40vw, 200px" className="object-cover" />
        </span>
      );
    case "photo":
    default:
      return (
        <span className="block bg-(--fp-dirty-white) p-2 pb-4" style={{ boxShadow }}>
          <span style={{ aspectRatio: object.aspect }} className="relative block overflow-hidden bg-(--fp-charcoal)">
            <Image src={object.asset} alt="" fill sizes="(max-width: 640px) 55vw, 260px" className="object-cover" />
          </span>
        </span>
      );
  }
}

export function EvidenceScene() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [focusTransform, setFocusTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const scene = isMobile ? mobileScene : desktopScene;

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setIsMobile(entry.contentRect.width < MOBILE_BREAKPOINT);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Recompute the focus target so the selected object always lands fully inside the canvas.
  function computeFocusTransform(object: SceneObject) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, scale: 1 };

    const canvasWidth = canvas.clientWidth;
    const canvasHeight = canvas.clientHeight;

    const baseWidth = object.width * canvasWidth;
    const baseHeight = baseWidth / object.aspect;
    const baseCenterX = object.x * canvasWidth + baseWidth / 2;
    const baseCenterY = object.y * canvasHeight + baseHeight / 2;

    const noteFocusWidth = Math.min(Math.max(NOTE_FOCUS_WIDTH_FRACTION * canvasWidth, NOTE_FOCUS_MIN_PX), NOTE_FOCUS_MAX_PX);
    const focusWidth = object.type === "note" ? noteFocusWidth : baseWidth * PHOTO_FOCUS_SCALE;
    const focusHeight = focusWidth / object.aspect;
    const scale = focusWidth / baseWidth;

    const minCenterX = FOCUS_MARGIN + focusWidth / 2;
    const maxCenterX = canvasWidth - FOCUS_MARGIN - focusWidth / 2;
    const minCenterY = FOCUS_MARGIN + focusHeight / 2;
    const maxCenterY = canvasHeight - FOCUS_MARGIN - focusHeight / 2;

    const targetCenterX = Math.min(Math.max(canvasWidth / 2, minCenterX), Math.max(maxCenterX, minCenterX));
    const targetCenterY = Math.min(Math.max(canvasHeight * 0.48, minCenterY), Math.max(maxCenterY, minCenterY));

    return { x: targetCenterX - baseCenterX, y: targetCenterY - baseCenterY, scale };
  }

  function selectObject(object: SceneObject) {
    setFocusTransform(computeFocusTransform(object));
    setFocusedId((current) => (current === object.id ? null : object.id));
    setRevealed(true);
  }

  useEffect(() => {
    if (!focusedId) return;
    function handleResize() {
      const object = scene.objects.find((item) => item.id === focusedId);
      if (object) setFocusTransform(computeFocusTransform(object));
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [focusedId, scene]);

  return (
    <section
      onClick={() => setFocusedId(null)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setFocusedId(null);
      }}
      className="relative h-[95svh] overflow-hidden bg-(--fp-charcoal) px-[4%] py-16 sm:h-[88vh] sm:py-20"
    >
      <div aria-hidden="true" className="noise pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(245,238,231,.08),transparent_45%),linear-gradient(180deg,rgba(0,0,0,.55),transparent_20%,transparent_78%,rgba(0,0,0,.6))]" />

      <div ref={canvasRef} className="relative mx-auto h-full max-w-[1400px]">
        {scene.objects.map((object) => {
          const isFocused = focusedId === object.id;
          const isHovered = focusedId === null && hoveredId === object.id;
          const isDimmed = focusedId !== null && !isFocused;

          const rotate = isFocused ? object.rotation * 0.12 : isHovered ? object.rotation * 0.5 : object.rotation;
          const scale = isFocused ? focusTransform.scale : isHovered ? HOVER_SCALE : 1;
          const translate = isFocused ? focusTransform : { x: 0, y: 0 };
          const shadow = isFocused
            ? "0 28px 44px rgba(0,0,0,.5)"
            : isHovered
              ? "0 14px 22px rgba(0,0,0,.32)"
              : "0 8px 14px rgba(0,0,0,.28)";

          return (
            <button
              key={object.id}
              type="button"
              aria-pressed={isFocused}
              aria-label={object.alt}
              onClick={(event) => {
                event.stopPropagation();
                selectObject(object);
              }}
              onMouseEnter={() => setHoveredId(object.id)}
              onMouseLeave={() => setHoveredId((current) => (current === object.id ? null : current))}
              onFocus={() => setHoveredId(object.id)}
              onBlur={() => setHoveredId((current) => (current === object.id ? null : current))}
              className="absolute cursor-pointer touch-manipulation transition-[transform,filter,opacity] duration-300 ease-out motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fp-dirty-white)/70"
              style={{
                top: `${object.y * 100}%`,
                left: `${object.x * 100}%`,
                width: `${object.width * 100}%`,
                zIndex: isFocused ? 50 : object.depth,
                transform: `translate(${translate.x}px, ${translate.y}px) rotate(${rotate}deg) scale(${scale})`,
                opacity: isDimmed ? 0.45 : 1,
                filter: isDimmed ? "blur(3px) saturate(0.85)" : "none",
              }}
            >
              {renderObjectVisual(object, shadow)}
            </button>
          );
        })}

        <p
          className={`display pointer-events-none absolute z-50 italic leading-tight text-(--fp-dirty-white) transition-opacity duration-700 ease-out ${revealed ? "opacity-100" : "opacity-0"}`}
          style={{
            left: `${scene.ooohSpot.x * 100}%`,
            top: `${scene.ooohSpot.y * 100}%`,
            width: `${scene.ooohSpot.width * 100}%`,
            transform: `rotate(${scene.ooohSpot.rotate}deg)`,
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
          }}
        >
          Oooh&hellip; I made you look.
        </p>
      </div>
    </section>
  );
}
