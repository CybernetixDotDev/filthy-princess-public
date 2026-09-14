import { CTA, Scribble } from "@/components/editorial/primitives";
import { Reveal } from "@/components/editorial/reveal";
import Image from "next/image";

export const metadata = { title: "Meet Cally", description: "Meet Cally." };

export default function CallyPage() {
  return (
    <main className="bg-(--fp-black) text-(--fp-dirty-white)">
      <section className="relative overflow-hidden bg-(--fp-black)">
        <div className="relative h-[78svh] w-full sm:h-screen">
          <Image src="/bonnieHero.png" alt="Cally by an enormous bonfire at night" fill sizes="100vw" priority className="object-contain object-right sm:object-cover sm:object-right" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,12,.88)_0%,rgba(12,11,12,.4)_42%,transparent_72%)]" />
        </div>
        <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-14 sm:justify-center sm:px-8 sm:pb-0">
          <Reveal>
            <h1 className="display max-w-md text-5xl leading-[0.95] text-(--fp-dirty-white) sm:max-w-xl sm:text-8xl">SO. YOU CAME<br />TO MEET ME.</h1>
            <p className="display mt-6 text-2xl italic text-(--fp-blush) sm:text-4xl">Hi. I&rsquo;m Cally.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-dirty-white) px-5 py-20 text-(--fp-black) sm:px-8 sm:py-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-center sm:gap-16">
          <div className="relative aspect-3/4 w-full overflow-hidden sm:w-[56%]">
            <Image src="/everydayPortraitCally.png" alt="Cally on an ordinary day, unposed" fill sizes="(max-width: 640px) 92vw, 56vw" className="object-cover object-top" />
            <Scribble className="absolute -bottom-4 -right-4 text-4xl sm:-bottom-5 sm:-right-5 sm:text-5xl" />
          </div>
          <div className="sm:w-[40%]">
            <Reveal>
              <h2 className="display text-5xl leading-[0.95] sm:text-7xl">I&apos;M NOT<br />ALWAYS A<br />PRINCESS.</h2>
              <p className="mt-6 max-w-sm text-lg leading-8 text-(--fp-black)/75 sm:text-xl sm:leading-9">Most days I&rsquo;m just Cally.<br />Curious. Playful. A little messy.<br />Probably thinking about something I shouldn&rsquo;t be.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-charcoal)">
        <div className="relative h-[78svh] w-full sm:h-screen">
          <Image src="/everydayHeroCally.png" alt="Cally dressed up, direct and mischievous" fill sizes="100vw" className="object-contain object-left sm:object-cover sm:object-left" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent_25%,rgba(12,11,12,.45)_58%,rgba(12,11,12,.88)_100%)]" />
        </div>
        <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col items-end justify-end px-5 pb-14 text-right sm:justify-center sm:px-8 sm:pb-0">
          <Reveal>
            <h2 className="display max-w-md text-5xl leading-[0.95] sm:max-w-xl sm:text-7xl">BUT I DO LIKE<br />GETTING DRESSED UP.</h2>
            <p className="display mt-6 max-w-sm -rotate-1 text-2xl italic leading-snug text-(--fp-blush) sm:ml-auto sm:text-3xl">Especially when I know someone&rsquo;s looking.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-black) px-5 py-28 text-(--fp-dirty-white) sm:px-8 sm:py-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">YOU&apos;VE MET ME.</h2>
            <p className="display mt-8 max-w-lg text-3xl leading-tight text-(--fp-blush) sm:text-5xl">Now imagine having my attention.</p>
            <div className="mt-12"><CTA href="/experience">Come play with me</CTA></div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
