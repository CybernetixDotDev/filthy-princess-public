import {
  CTA,
  LipstickKiss,
} from "@/components/editorial/primitives";
import { Reveal } from "@/components/editorial/reveal";
import { OpeningRealm } from "@/components/cinematic/opening-realm";
import Image from "next/image";

export const metadata = { title: "You found something" };

export default function HomePage() {
  return (
    <main className="bg-(--fp-black) text-(--fp-dirty-white)">
      <OpeningRealm />

      <section className="relative overflow-hidden bg-(--fp-dirty-white) px-5 py-20 text-(--fp-black) sm:px-8 sm:py-32">
        <div className="relative mx-auto max-w-6xl">
          <div className="relative z-10 max-w-xl">
            <Reveal>
              <h2 className="display text-6xl leading-[0.9] sm:text-8xl">YOU LOOKED.</h2>
              <p className="display mt-4 text-2xl italic text-(--fp-cherry) sm:text-4xl">Of course you did.</p>
              <p className="mt-10 max-w-md text-lg leading-8 text-(--fp-black)/80 sm:text-xl sm:leading-9">There&rsquo;s something delicious about being curious. About wondering what might happen if you stopped behaving for a minute.</p>
            </Reveal>
          </div>
          <div className="relative mt-14 flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:w-[36%] sm:-translate-y-1/2 sm:justify-end">
            <div className="relative w-[58vw] max-w-xs -rotate-6 bg-(--fp-dirty-white) p-2 pb-6 shadow-[10px_16px_0_rgba(12,11,12,.16)] sm:w-full sm:max-w-sm">
              <div className="relative aspect-square overflow-hidden bg-(--fp-charcoal)"><Image src="/strawberry2.png" alt="A juicy strawberry" fill sizes="(max-width: 640px) 58vw, 380px" className="object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-black) px-5 py-24 text-(--fp-dirty-white) sm:px-8 sm:py-36">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display text-4xl leading-[1.15] sm:text-6xl">Maybe you&rsquo;d show me something.</p>
            <p className="display mt-4 text-4xl leading-[1.15] text-(--fp-blush) sm:text-6xl">Maybe I&rsquo;d show you something first.</p>
          </Reveal>
          <Reveal delay={150} className="mt-20 sm:mt-28">
            <p className="loud text-2xl tracking-[0.08em] text-(--fp-hot-pink) sm:text-3xl">STILL CURIOUS?</p>
            <p className="display mt-3 -rotate-2 text-3xl italic leading-none text-(--fp-dirty-white) sm:text-5xl">Good.</p>
          </Reveal>
        </div>
        <LipstickKiss className="pointer-events-none absolute -right-8 bottom-0 w-40 rotate-10 opacity-80 mix-blend-screen sm:w-56" />
      </section>

      <section className="relative overflow-hidden bg-(--fp-charcoal) px-5 py-20 text-(--fp-dirty-white) sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col sm:min-h-[92vh] sm:flex-row sm:items-stretch">
          <div className="relative min-h-[62svh] w-full sm:min-h-0 sm:w-[56%]">
            <Image src="/callyreveal.png" alt="Cally, the Filthy Princess" fill sizes="(max-width: 1024px) 100vw, 56vw" className="object-cover object-top" priority />
          </div>
          <div className="relative z-10 flex w-full flex-col justify-center py-12 sm:w-[44%] sm:px-12 sm:py-0">
            <Reveal>
              <h2 className="display text-5xl leading-[0.9] sm:text-7xl">AND THEN THERE&apos;S CALLY.</h2>
              <p className="display mt-6 text-2xl leading-tight text-(--fp-blush) sm:text-4xl">Wanna play?</p>
              <div className="mt-10"><CTA href="/cally">Meet Cally</CTA></div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
