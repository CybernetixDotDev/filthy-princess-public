import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/editorial/reveal";

export const metadata = { title: "Inner Sanctum", description: "There is another door." };

function Door() {
  return (
    <section className="relative flex min-h-[78svh] items-end overflow-hidden border-b border-white/10 px-5 pb-20 pt-36 sm:min-h-[82vh] sm:px-8 sm:pb-28">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(209,154,139,.11),transparent_24%),linear-gradient(135deg,#151112_0%,#0d0c0d_58%,#080808_100%)]" />
      <div aria-hidden="true" className="absolute -right-28 top-1/2 h-[72%] w-52 -translate-y-1/2 border border-white/8 bg-black/20 shadow-[-24px_0_80px_rgba(0,0,0,.65)] sm:right-[8%] sm:w-72">
        <div className="absolute inset-y-8 left-5 w-px bg-linear-to-b from-transparent via-white/15 to-transparent" />
        <span className="absolute left-3 top-1/2 size-2 rounded-full border border-[#d9a49b]/60 bg-black shadow-[0_0_20px_rgba(217,164,155,.35)]" />
      </div>
      <Reveal className="relative z-10 mx-auto w-full max-w-7xl">
        <p className="loud text-xs tracking-[0.2em] text-(--fp-hot-pink)">THE INNER SANCTUM.</p>
        <h1 className="display mt-6 max-w-4xl text-5xl leading-[0.94] sm:text-8xl">This is where I keep the good stuff.</h1>
        <p className="mt-8 max-w-md text-lg leading-8 text-white/55">You weren&rsquo;t really supposed to see this yet.</p>
      </Reveal>
    </section>
  );
}

function Glimpse() {
  return (
    <section className="relative overflow-hidden bg-[#171211] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <Reveal>
          <p className="loud text-xs tracking-[0.2em] text-(--fp-hot-pink)">COME A LITTLE CLOSER.</p>
          <h2 className="display mt-6 max-w-xl text-4xl leading-none sm:text-6xl">It gets more personal in here.</h2>
          <div className="mt-8 max-w-md space-y-1 text-lg leading-8 text-white/65">
            <p>Things I don&rsquo;t leave lying around outside.</p>
            <p>Little games.</p>
            <p>Private pictures.</p>
            <p>Messages.</p>
            <p>Things to find.</p>
            <p>Things to earn.</p>
            <p>And occasionally&hellip;</p>
            <p className="pt-4 text-white/85">something I decide you&rsquo;re ready for.</p>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto h-124 w-full max-w-xl sm:h-160">
          <div className="absolute left-0 top-4 w-[77%] -rotate-2 overflow-hidden border border-white/10 bg-black p-2 shadow-[18px_24px_50px_rgba(0,0,0,.45)] sm:w-[72%]">
            <div className="relative aspect-4/3 overflow-hidden">
              <Image src="/reservedSeat.png" alt="" fill sizes="(max-width: 640px) 70vw, 480px" className="object-cover object-[72%_center] brightness-75 saturate-75" />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            </div>
          </div>
          <div className="absolute -right-6 top-[38%] w-[52%] rotate-6 overflow-hidden border-[6px] border-[#d8cbc2] bg-[#d8cbc2] shadow-[-12px_18px_40px_rgba(0,0,0,.55)] sm:right-0 sm:w-[48%]">
            <div className="relative aspect-square overflow-hidden">
              <Image src="/tornNote.png" alt="" fill sizes="(max-width: 640px) 48vw, 300px" className="scale-125 object-cover object-[22%_48%] sepia-[.25]" />
              <div className="absolute inset-y-0 right-0 w-2/5 bg-linear-to-l from-[#d8cbc2] via-[#d8cbc2]/80 to-transparent" />
            </div>
          </div>
          <div aria-hidden="true" className="absolute bottom-8 left-[8%] h-44 w-28 -rotate-12 overflow-hidden opacity-80 sm:h-60 sm:w-36">
            <Image src="/RoseGoldKey.png" alt="" fill sizes="144px" className="object-cover object-[44%_68%] mix-blend-screen" />
          </div>
          <Image aria-hidden="true" src="/lipstickKiss.png" alt="" width={1536} height={1024} className="absolute -bottom-5 -right-16 w-48 rotate-12 opacity-30 mix-blend-screen sm:w-64" />
          <div className="handwritten absolute bottom-1 right-3 z-10 -rotate-3 border-b border-[#ff3f91]/60 px-2 pb-2 text-xl text-[#f0b1c5] sm:bottom-5 sm:right-10 sm:text-2xl">
            I&rsquo;m not telling you everything.
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Decision() {
  return (
    <section className="bg-(--fp-dirty-white) px-5 py-24 text-(--fp-black) sm:px-8 sm:py-32">
      <Reveal className="mx-auto max-w-7xl">
        <p className="loud text-xs tracking-[0.2em] text-[#8e274d]">YOU CAN KEEP LOOKING FROM OUT THERE.</p>
        <div className="mt-7 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="display max-w-3xl text-5xl leading-[0.96] sm:text-7xl">Or you can come inside.</h2>
          <Link href="/store" className="group inline-flex w-fit items-center gap-4 border-b border-[#8e274d] pb-3 text-sm uppercase tracking-[0.16em] transition-colors hover:border-black">
            Become a member <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function InnerSanctumPage() {
  return <main><Door /><Glimpse /><Decision /></main>;
}
