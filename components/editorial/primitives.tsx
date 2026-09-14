import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/navigation/site-nav";
import { Reveal } from "@/components/editorial/reveal";

type PlaceholderProps = {
  title: string;
  description: string;
  aspectRatio?: string;
  motionHint?: string;
  mobileCrop?: string;
  minimal?: boolean;
  tone?: "rose" | "gold" | "charcoal" | "ivory";
};

const tones = {
  rose: "from-(--fp-cherry) via-(--fp-charcoal) to-(--fp-black)",
  gold: "from-(--fp-silver) via-(--fp-charcoal) to-(--fp-black)",
  charcoal: "from-[#353036] via-(--fp-charcoal) to-(--fp-black)",
  ivory: "from-(--fp-blush) via-[#443a42] to-(--fp-black)",
};

const isDev = process.env.NODE_ENV !== "production";

export function CinematicPlaceholder({ title, description, aspectRatio = "aspect-4/5", motionHint, mobileCrop, minimal = false, tone = "rose" }: PlaceholderProps) {
  return (
    <figure className={`noise relative overflow-hidden bg-linear-to-br ${tones[tone]} ${aspectRatio}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(245,210,187,.34),transparent_22%),linear-gradient(145deg,transparent_35%,rgba(0,0,0,.5))]" />
      {/* Dev-only scaffolding labels; production keeps the placeholder purely visual so it doesn't read as unfinished. */}
      {isDev && (
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
          {minimal ? <figcaption className="loud text-xs leading-6 text-white/85">{title} / {description}</figcaption> : <><span className="eyebrow">Cinematic placeholder</span><figcaption className="mt-2 max-w-sm text-sm leading-6 text-white/85">{description}</figcaption><div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.62rem] uppercase tracking-[0.14em] text-white/50"><span>Scene: {title}</span>{mobileCrop && <span>Crop: {mobileCrop}</span>}{motionHint && <span>Motion: {motionHint}</span>}</div></>}
        </div>
      )}
    </figure>
  );
}

export function EditorialSection({ eyebrow, title, children, className = "", edgeFade = false }: { eyebrow?: string; title?: string; children: React.ReactNode; className?: string; edgeFade?: boolean }) {
  return (
    <section className={`relative px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      {edgeFade && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-black/25 to-transparent sm:h-24" />}
      <div className="mx-auto max-w-7xl">{eyebrow && <p className="eyebrow">{eyebrow}</p>}{title && <h2 className="display mt-4 max-w-3xl text-4xl leading-[0.98] sm:text-6xl">{title}</h2>}{children}</div>
      {edgeFade && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/25 to-transparent sm:h-24" />}
    </section>
  );
}

export function CTA({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return <Link href={href} className={`group inline-flex min-h-11 items-center gap-3 border-b pb-2 text-sm uppercase tracking-[0.16em] transition ${secondary ? "border-white/25 text-white/65 hover:border-white hover:text-white" : "border-(--fp-hot-pink) text-(--fp-dirty-white) hover:border-(--fp-chrome)"}`}>{children}<ArrowUpRight size={16} strokeWidth={1.2} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>;
}

export function CallyNote({ children = "[CALLY NOTE]" }: { children?: React.ReactNode }) {
  return <span className="handwritten inline-block -rotate-3">{children}</span>;
}

export function Scribble({ children = "✶", className = "" }: { children?: React.ReactNode; className?: string }) {
  return <span aria-hidden="true" className={`loud inline-block rotate-6 text-(--fp-hot-pink) ${className}`}>{children}</span>;
}

export function LipstickKiss({ className = "" }: { className?: string }) {
  return <Image src="/lipstickKiss.png" alt="" width={1536} height={1024} className={`pointer-events-none object-contain ${className}`} />;
}

export function FilthyPrincessLogo({ className = "" }: { className?: string }) {
  return <Image src="/FilthyPrincessLogo.png" alt="Filthy Princess" width={1536} height={1024} priority className={`h-auto w-full object-contain ${className}`} />;
}
export function TapedPhoto({ src, alt, caption, className = "" }: { src: string; alt: string; caption: string; className?: string }) {
  return <figure className={`relative bg-(--fp-dirty-white) p-2 pb-5 text-(--fp-black) shadow-[8px_10px_0_rgba(12,11,12,.16)] ${className}`}><span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-7 w-16 -translate-x-1/2 -rotate-2 bg-(--fp-blush)/80" /><div className="relative aspect-2/3 overflow-hidden bg-(--fp-charcoal)"><Image src={src} alt={alt} fill sizes="(max-width: 640px) 78vw, 360px" className="object-cover" /></div><figcaption className="loud px-2 pt-3 text-[0.58rem] tracking-[0.12em]">{caption}</figcaption></figure>;
}

export function ScatteredPhoto({ src, alt, className = "", aspect = "aspect-2/3", sizes = "(max-width: 640px) 42vw, 300px" }: { src: string; alt: string; className?: string; aspect?: string; sizes?: string }) {
  return <figure className={`relative ${aspect} overflow-hidden bg-(--fp-charcoal) ${className}`}><Image src={src} alt={alt} fill sizes={sizes} className="object-cover" /></figure>;
}

// Bespoke display-object frame: near-black surround, thin chrome edge, translucent
// pink acrylic rim — no paint/splatter/interaction yet, this is the static reveal pass.
export function BombStage() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-(--fp-black) px-5 py-28 sm:px-8 sm:py-40">
      <Reveal className="relative mx-auto w-[92vw] max-w-[1500px] sm:w-[88vw]">
        <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,63,145,.16),transparent_70%)] blur-2xl sm:-inset-10" />
        <div className="rounded-[22px] bg-[linear-gradient(155deg,#221d20_0%,#0c0b0c_55%,#1a1719_100%)] p-[10px] shadow-[0_30px_60px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.05)] sm:rounded-[28px] sm:p-4">
          <div className="rounded-[16px] bg-[linear-gradient(135deg,#e7e8ec_0%,#9a9da6_28%,#4b4d54_52%,#c9cbd1_75%,#e7e8ec_100%)] p-[2px] sm:rounded-[20px]">
            <div className="relative rounded-[14px] bg-[linear-gradient(160deg,rgba(255,63,145,.35),rgba(232,165,187,.18)_60%,rgba(255,63,145,.3)_100%)] p-[6px] sm:rounded-[18px] sm:p-2">
              <div aria-hidden="true" className="pointer-events-none absolute -top-px left-8 right-24 h-px bg-[linear-gradient(90deg,transparent,rgba(199,222,241,.65),transparent)]" />
              <div className="relative aspect-1672/941 w-full overflow-hidden rounded-[10px] bg-(--fp-black) sm:rounded-[14px]">
                <Image src="/moodBoard.png" alt="The Filthy Princess mood board" fill sizes="(max-width: 1024px) 92vw, 1320px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFrame({ children, showEvents }: { children: React.ReactNode; showEvents: boolean }) {
  return <div className="min-h-screen overflow-hidden bg-[#100e0d] text-[#f5eee7]"><SiteNav showEvents={showEvents} />{children}<footer className="border-t border-white/10 px-5 py-8 text-xs text-white/45 sm:px-8"><div className="mx-auto flex max-w-7xl justify-between"><span>Filthy Princess</span><span>For the beautifully curious.</span></div></footer></div>;
}

export function EditorialHero({ kicker, title, intro, children, tone = "rose" }: { kicker: string; title: React.ReactNode; intro?: string; children?: React.ReactNode; tone?: PlaceholderProps["tone"] }) {
  return <section className="relative flex min-h-[88svh] items-end overflow-hidden px-5 pb-14 pt-32 sm:min-h-[82vh] sm:px-8 sm:pb-20"><div className={`absolute inset-0 bg-linear-to-br ${tones[tone ?? "rose"]}`} /><div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(225,173,155,.3),transparent_23%),linear-gradient(180deg,rgba(15,12,11,.1),#100e0d_92%)]" /><div className="relative z-10 mx-auto w-full max-w-7xl">{children}<p className="eyebrow">{kicker}</p><h1 className="display mt-4 max-w-4xl text-6xl leading-[0.87] sm:text-8xl">{title}</h1>{intro && <p className="mt-7 max-w-md text-base leading-7 text-white/70 sm:text-lg">{intro}</p>}</div></section>;
}
