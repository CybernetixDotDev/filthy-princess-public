import Image from "next/image";
import { FilthyPrincessLogo } from "@/components/editorial/primitives";

export function OpeningRealm() {
  return (
    <section className="relative flex min-h-screen overflow-hidden bg-(--fp-black) px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[57%] sm:h-[62%]"><Image src="/diamond.png" alt="" width={1248} height={832} priority sizes="100vw" className="absolute bottom-0 left-1/2 h-auto w-full max-w-none -translate-x-1/2 sm:w-screen" /></div>
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col">
        <div className="ml-auto w-[68vw] max-w-[680px] sm:w-[38vw]"><FilthyPrincessLogo /></div>
        <div className="mt-auto max-w-[88%] pb-[8vh] sm:max-w-2xl sm:pb-[9vh]"><h1 className="display text-6xl leading-[0.87] text-(--fp-dirty-white) sm:text-8xl">YOU FOUND<br /><i>SOMETHING.</i></h1><p className="display mt-7 max-w-sm text-2xl leading-tight text-(--fp-blush) sm:text-4xl">I might have left it where you&apos;d find it.</p></div>
      </div>
    </section>
  );
}
