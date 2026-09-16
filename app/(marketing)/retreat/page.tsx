import { CTA, Scribble } from "@/components/editorial/primitives";
import { Reveal } from "@/components/editorial/reveal";
import Image from "next/image";
import { RetreatInterest } from "@/components/retreat/retreat-interest";
import { getPublicRetreatProducts } from "@/lib/supabase/retreats";

export const metadata = { title: "The Retreat", description: "The Retreat." };

export default async function RetreatPage() {
  const products = await getPublicRetreatProducts();

  return (
    <main className="bg-(--fp-black) text-(--fp-dirty-white)">
      <section className="relative overflow-hidden bg-(--fp-black)">
        <div className="relative h-[78svh] w-full sm:h-screen">
          <Image src="/10moonPrincessWide.png" alt="A princess silhouette beneath an enormous moon" fill sizes="100vw" priority className="object-contain object-left sm:object-cover sm:object-left" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(12,11,12,.9)_0%,rgba(12,11,12,.4)_45%,transparent_75%)]" />
        </div>
        <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col items-end justify-end px-5 pb-14 text-right sm:justify-center sm:px-8 sm:pb-0">
          <Reveal>
            <h1 className="display max-w-md text-5xl leading-[0.95] sm:max-w-xl sm:text-8xl">RUN AWAY<br />WITH ME.</h1>
            <p className="display mt-6 max-w-xs text-2xl leading-tight text-(--fp-blush) sm:ml-auto sm:max-w-sm sm:text-4xl">Three nights.<br />Somewhere beautiful.<br />And absolutely nowhere else you need to be.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-dirty-white) px-5 py-24 text-(--fp-black) sm:px-8 sm:py-36">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-center sm:gap-16">
          <Reveal className="sm:w-[46%]">
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">FIRST, I&rsquo;M<br />GOING TO<br />SPOIL YOU.</h2>
            <p className="mt-8 max-w-md text-lg leading-8 text-(--fp-black)/75 sm:text-xl sm:leading-9">Somewhere beautiful to disappear into.<br /><br />Good food. Slow mornings. Fresh sheets. Firelight. Little things waiting when you least expect them.<br /><br />For three nights, you don&rsquo;t have to organise a damn thing.</p>
          </Reveal>
          <div className="relative aspect-4/3 w-full overflow-hidden sm:w-[54%]">
            <Image src="/silkSanctuary.png" alt="A candlelit escape, silk and firelight" fill sizes="(max-width: 640px) 92vw, 54vw" className="object-cover object-center" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-charcoal) px-5 py-24 text-(--fp-dirty-white) sm:px-8 sm:py-36">
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">THREE NIGHTS.</h2>
            <p className="mt-6 max-w-lg text-xl leading-8 text-(--fp-blush) sm:text-2xl">Long enough to forget what time it is.<br />Not nearly long enough to behave ourselves.</p>
            <p className="mt-8 max-w-lg text-lg leading-8 text-(--fp-dirty-white)/75 sm:text-xl sm:leading-9">We don&rsquo;t do itineraries very well.<br /><br />There&rsquo;ll be things I&rsquo;ve planned.<br />There&rsquo;ll be things I absolutely haven&rsquo;t.<br /><br />Good food. Beautiful places. Dressing up. Staying in. Going out. Talking until stupid o&rsquo;clock.<br /><br />And probably at least one idea that seemed much more sensible the night before.</p>
          </Reveal>
          <div className="relative mt-10 w-24 rotate-[-7deg] bg-(--fp-dirty-white) p-1.5 pb-3 shadow-[8px_10px_0_rgba(0,0,0,.35)] sm:absolute sm:-right-8 sm:top-6 sm:mt-0 sm:w-32">
            <div className="relative aspect-square overflow-hidden bg-(--fp-black)"><Image src="/touchMe.png" alt="A note that says touch me" fill sizes="128px" className="object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-black) px-5 py-24 sm:px-8 sm:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">AND YOU GET ME.</h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-(--fp-dirty-white)/75 sm:text-xl sm:leading-9">Not Cally appearing for an hour.<br /><br />Three days of me being there &mdash; talking, laughing, noticing, plotting, disappearing to put something together and coming back looking far too pleased with myself.<br /><br />The Cally Experience doesn&rsquo;t stop because dinner arrived.</p>
          </Reveal>
          <Reveal delay={150} className="mt-14">
            <p className="text-lg leading-8 text-(--fp-dirty-white)/60">Some things I&rsquo;ll tell you about.<br />Some things I won&rsquo;t.</p>
            <p className="display mt-3 -rotate-1 text-2xl italic text-(--fp-blush) sm:text-3xl">I need a few secrets.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/10 bg-(--fp-charcoal) px-5 py-24 text-(--fp-dirty-white) sm:px-8 sm:py-36">
        <RetreatInterest products={products.data} />
      </section>

      <section className="relative overflow-hidden bg-(--fp-pink) px-5 py-24 text-(--fp-black) sm:px-8 sm:py-36">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="display text-4xl leading-[0.95] sm:text-6xl">I CHOOSE WHO I<br />RUN AWAY WITH.</h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-(--fp-black)/75 sm:text-xl sm:leading-9">Filthy Princess Retreats are private invitations for members of my Inner Sanctum.<br /><br />Sometimes I meet someone in there who makes me curious.<br />Sometimes three days sounds much more interesting than a message.<br />And sometimes I send an invitation.</p>
          </Reveal>
          <Reveal delay={150} className="mt-12 max-w-lg border-t border-(--fp-black)/15 pt-8">
            <p className="loud text-lg tracking-[0.06em] sm:text-xl">BECOMING A MEMBER DOESN&rsquo;T BUY AN INVITATION.</p>
            <p className="mt-4 text-lg leading-8 text-(--fp-black)/75 sm:text-xl sm:leading-9">It gives us the chance to find out whether I want to send you one.</p>
          </Reveal>
          <Reveal delay={250} className="mt-14">
            <p className="display text-2xl italic sm:text-3xl"><Scribble className="mr-2 align-middle text-xl sm:text-2xl" />Still curious?</p>
            <div className="mt-8"><CTA href="/store">Come inside</CTA></div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
