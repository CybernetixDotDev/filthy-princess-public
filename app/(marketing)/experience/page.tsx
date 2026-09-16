import { CTA, LipstickKiss, Scribble } from "@/components/editorial/primitives";
import { Reveal } from "@/components/editorial/reveal";
import Image from "next/image";

export const metadata = { title: "The Cally Experience", description: "The Cally Experience." };

export default function ExperiencePage() {
  return (
    <main className="bg-(--fp-black) text-(--fp-dirty-white)">
      <section className="relative overflow-hidden bg-(--fp-black)">
        <div className="relative h-[80svh] w-full sm:h-screen">
          <Image src="/8ExperienceHero.png" alt="The Cally Experience" fill sizes="100vw" priority className="object-contain object-right sm:object-cover sm:object-right" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,12,.88)_0%,rgba(12,11,12,.4)_42%,transparent_72%)]" />
        </div>
        <div className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-14 sm:justify-center sm:px-8 sm:pb-0">
          <Reveal>
            <h1 className="display max-w-md text-5xl leading-[0.95] sm:max-w-xl sm:text-8xl">THIS IS THE<br />CALLY EXPERIENCE.</h1>
            <p className="display mt-6 max-w-sm text-2xl leading-tight text-(--fp-blush) sm:text-4xl">You bring the curiosity.<br />I&rsquo;ll take care of the rest.</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-dirty-white) px-5 py-24 text-(--fp-black) sm:px-8 sm:py-36">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-12 sm:flex-row sm:items-center sm:justify-between sm:gap-16">
          <Reveal className="max-w-xl">
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">IT STARTS WITH<br />CURIOSITY.</h2>
            <p className="mt-8 max-w-md text-lg leading-8 text-(--fp-black)/75 sm:text-xl sm:leading-9">Yours. Mine. Usually both.<br /><br />Sometimes you want to know something about yourself.<br />Sometimes you already know exactly what caught your attention.<br /><br />Either way, I&rsquo;m going to be curious too.</p>
          </Reveal>
          <div className="relative w-[46vw] max-w-[220px] shrink-0 -rotate-3 overflow-hidden opacity-90 sm:w-full sm:max-w-[260px]">
            <div className="relative aspect-square overflow-hidden"><Image src="/moonPrincess.png" alt="A quiet, moonlit reflection" fill sizes="(max-width: 640px) 46vw, 260px" className="object-cover" /></div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-cherry) px-5 py-24 text-(--fp-dirty-white) sm:px-8 sm:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="relative z-10 max-w-xl">
            <Reveal>
              <h2 className="display text-5xl leading-[0.95] sm:text-7xl">EXPECT TO<br />MISBEHAVE.</h2>
              <p className="mt-8 max-w-md text-lg leading-8 text-(--fp-dirty-white)/85 sm:text-xl sm:leading-9">We might dress up. Make a mess. Eat something delicious. Talk about things you don&rsquo;t normally say out loud. Laugh until the fantasy falls apart &mdash; and discover that what replaces it is even better.</p>
              <p className="display mt-8 text-2xl italic leading-tight sm:text-3xl">I don&rsquo;t need you to arrive interesting.<br />Just curious.</p>
            </Reveal>
          </div>
          <div className="relative mt-14 flex justify-center sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:w-[38%] sm:-translate-y-1/2 sm:justify-end">
            <div className="relative w-[64vw] max-w-sm rotate-[5deg] bg-(--fp-dirty-white) p-2 pb-6 shadow-[12px_18px_0_rgba(12,11,12,.2)] sm:w-full">
              <div className="relative aspect-square overflow-hidden bg-(--fp-charcoal)"><Image src="/strawberryBowl.png" alt="A bowl of strawberries, dressed up and a little messy" fill sizes="(max-width: 640px) 64vw, 380px" className="object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-charcoal) px-5 py-24 text-(--fp-dirty-white) sm:px-8 sm:py-36">
        <div className="relative mx-auto max-w-2xl">
          <Reveal>
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">I LIKE<br />SURPRISES.</h2>
            <p className="display mt-4 text-2xl italic text-(--fp-blush) sm:text-4xl">The good kind.</p>
            <p className="mt-8 max-w-lg text-lg leading-8 text-(--fp-dirty-white)/75 sm:text-xl sm:leading-9">Little things you weren&rsquo;t expecting. A question at exactly the wrong moment. Something left for you to find. A ridiculous idea that suddenly doesn&rsquo;t feel ridiculous at all.<br /><br />Filthy Princess isn&rsquo;t about following a fantasy perfectly.<br />It&rsquo;s about finding out where ours goes.</p>
          </Reveal>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-6 sm:inset-y-0 sm:-right-16 sm:flex sm:items-center">
          <LipstickKiss className="fp-drift w-[60vw] opacity-90 mix-blend-screen sm:w-[32vw]" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-black) px-5 py-24 sm:px-8 sm:py-36">
        <Reveal>
          <h2 className="display max-w-4xl text-4xl leading-[0.95] text-(--fp-dirty-white) sm:text-7xl">WHO GETS TO BE THE CENTRE OF ATTENTION?</h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-16 sm:mt-24 sm:grid-cols-2 sm:gap-12">
          <Reveal>
            <p className="loud text-2xl tracking-[0.08em] text-(--fp-blush) sm:text-3xl">YOU DO.</p>
            <h3 className="display mt-3 text-3xl leading-[0.95] sm:text-5xl">Sexual Awakening<br />&amp; Self-Discovery</h3>
            <p className="mt-7 max-w-md text-lg leading-8 text-(--fp-dirty-white)/75 sm:text-xl sm:leading-9">You are the centre of the experience.<br />The object of Cally&rsquo;s affection, attention and curiosity.<br /><br />This one begins with you &mdash; the things that intrigue you, the things you haven&rsquo;t quite found words for, and the parts of yourself you might be ready to understand a little better.<br /><br />You don&rsquo;t need to know exactly what you&rsquo;re looking for.<br />That&rsquo;s rather the point.</p>
            <div className="mt-9"><CTA href="mailto:hello@filthyprincesss.com?subject=Sexual%20Awakening%20%26%20Self-Discovery" secondary>Explore yourself with Cally</CTA></div>
          </Reveal>

          <Reveal delay={150}>
            <p className="loud text-2xl tracking-[0.08em] text-(--fp-hot-pink) sm:text-3xl">I DO.</p>
            <h3 className="display mt-3 text-3xl leading-[0.95] sm:text-5xl">Just Plain Filthy</h3>
            <p className="mt-7 max-w-md text-lg leading-8 text-(--fp-dirty-white)/75 sm:text-xl sm:leading-9">You probably have a pretty good idea what you want.<br />This time, Cally is the centre of attention.<br /><br />Your plaything. Your temptation. Your very willing excuse to follow that curiosity a little further.<br /><br />But I&rsquo;m still going to wonder why.<br />Because sometimes the most interesting thing about wanting something is discovering what made you want it in the first place.</p>
            <div className="mt-9"><CTA href="mailto:hello@filthyprincesss.com?subject=Just%20Plain%20Filthy">Come play with Cally</CTA></div>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 max-w-6xl sm:mt-28">
          <p className="loud text-sm tracking-widest text-(--fp-dirty-white)/60">STILL THINKING ABOUT IT?</p>
          <p className="display -rotate-2 text-2xl italic text-(--fp-blush) sm:text-3xl"><Scribble className="mr-2 align-middle text-xl sm:text-2xl" />Good.</p>
          <p className="mt-2 text-sm text-(--fp-dirty-white)/60">That&rsquo;s usually where the fun starts.</p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-(--fp-black) px-5 py-28 text-(--fp-dirty-white) sm:px-8 sm:py-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="display text-5xl leading-[0.95] sm:text-7xl">WHAT IF WE HAD<br />THREE DAYS?</h2>
            <p className="mt-8 max-w-xl text-lg leading-8 text-(--fp-dirty-white)/75 sm:text-xl sm:leading-9">No rushing home.<br />No squeezing this into an afternoon.<br /><br />Just somewhere beautiful, good food, ridiculous ideas, late nights &mdash; and enough time to see what happens when neither of us has to hurry.</p>
            <div className="mt-12"><CTA href="/retreat">Run away with me</CTA></div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
