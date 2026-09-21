import { Reveal } from "@/components/editorial/reveal";
import Image from "next/image";
import { realmJoinHref } from "@/lib/realm-handoff";
import { RetreatInterest } from "@/components/retreat/retreat-interest";
import { getPublicRetreatProducts } from "@/lib/supabase/retreats";
import styles from "./retreat.module.css";
import { RetreatDepth } from "./retreat-depth";

export const metadata = { title: "The Retreat", description: "The Retreat." };

export default async function RetreatPage() {
  const products = await getPublicRetreatProducts();
  const joinHref = realmJoinHref();
  return (
    <main className={`${styles.retreat} bg-(--fp-black) text-(--fp-dirty-white)`}>
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

      <RetreatDepth>
        <section className={styles.care}>
          <div className={styles.careCopy}><h2>I&apos;LL TAKE CARE OF YOU.</h2><p>For three nights, you don&apos;t have to take care of everything.</p></div>
          <div className={styles.careImage} data-depth="drift"><Image src="/massageRoom.png" alt="A candlelit massage room prepared with silk and flowers" fill sizes="100vw" /></div>
          <div className={styles.careDetail}><Image src="/silkSanctuary.png" alt="Soft silk bedding beside a quiet garden" fill sizes="(max-width: 800px) 78vw, 40vw" /></div>
        </section>
        <section className={styles.food}>
          <h2>I&apos;LL FEED YOU.</h2>
          <div className={styles.foodImage}><Image src="/CallyHoney3.jpeg" alt="Cally sharing honey beside a sunset fire" fill sizes="100vw" /></div>
          <div className={styles.foodDetail}><Image src="/foodProp.png" alt="Honey and strawberries left on a candlelit plate" fill sizes="(max-width: 800px) 72vw, 40vw" /></div>
          <p className={styles.scribble}>maybe you&apos;ll feed me too.</p>
        </section>
        <section className={styles.play}>
          <h2>WE&apos;LL PLAY.</h2>
          <div className={styles.playWide}><Image src="/BeautifulOne2.jpeg" alt="Black silk, petals and abandoned shoes around a chair" fill sizes="(max-width: 800px) 100vw, 80vw" /><span className={`${styles.annotation} ${styles.dressNote}`}>Dress Up<span className={styles.underline} aria-hidden="true" /></span></div>
          <div className={styles.playDetail} data-depth="drift"><Image src="/ridiculousOne.png" alt="Cally disappearing through a doorway in a swirl of black silk" fill sizes="(max-width: 800px) 78vw, 42vw" /><span className={`${styles.annotation} ${styles.giggleNote}`}>Dance <span aria-hidden="true">♡</span></span></div>
          <div className={styles.blackTrace} data-depth="trace"><span>Giggle</span></div>
          <div className={styles.crown} data-depth="drift"><Image src="/StrawberryCrown.png" alt="A strawberry, a playing card and a tiny crown" fill sizes="(max-width: 800px) 86vw, 64vw" /><span className={`${styles.annotation} ${styles.decadenceNote}`}>Decadence<span className={styles.underline} aria-hidden="true" /></span></div>
          <div className={`${styles.blackTrace} ${styles.afterthought}`} data-depth="trace"><span>Again?</span></div>
        </section>
        <section className={styles.attention}>
          <div className={styles.attentionCopy}><h2>YOU&apos;LL HAVE MY ATTENTION.</h2><p>You don&apos;t have to imagine it.</p></div>
          <div className={styles.attentionDrop} data-depth="drop">
            <div className={styles.dropViewport}>
              <div className={styles.attentionPhoto}><Image src="/fullAttentionCally4K.jpeg" alt="Cally seated in a pink chair in the rain, looking directly towards you" fill sizes="(max-width: 800px) 150vw, 100vw" /></div>
              <div className={styles.rain} aria-hidden="true"><Image src="/RainOverlayZoomedout.png" alt="" fill unoptimized /></div>
              <div className={styles.showerNotes}><span>Filthy Showers<span className={styles.underline} aria-hidden="true" /></span><span>Thirsty <span aria-hidden="true">♡</span></span></div>
            </div>
          </div>
        </section>
        <section className={styles.decision}>
          <div className={styles.approach} data-depth="thoughts">
            <div className={styles.approachViewport}>
              <h2 className={styles.decisionTitle}>WANT TO DO THAT FOR REAL?</h2>
              <div className={styles.thoughts} aria-hidden="true">
                {['Care', 'Food', 'Play', 'Attention', 'Curiosity', 'Surprise', 'Delicious', 'hmmmmmmmm...'].map((thought, index) => <span key={thought} data-thought={index}>{thought}</span>)}
              </div>
            </div>
          </div>
          <div className={styles.selection}>
            <RetreatInterest products={products.data} continuation={
              <div key="retreat-continuation" className={styles.hesitation}>
                <p>Not ready to run away with me?</p>
                <p data-depth="drift">That&apos;s okay.<br />You don&apos;t have to leave.</p>
                <div className={styles.realmInvitation}>
                  <p className={styles.realmLead}>There is another door.</p>
                  <h3>Enter the Filthy Princess Realm.</h3>
                  <p>Create your account for free. Bring your ideas, your skills, your audience &mdash; or just come see what we&apos;re building.</p>
                  <a href={joinHref} className={styles.realmLink}>ENTER THE REALM <span aria-hidden="true">&rarr;</span></a>
                </div>
                <div className={styles.doorReveal} data-depth="door">
                  <a href={joinHref} className={styles.door} aria-label="Enter the Filthy Princess Realm ? create your account for free">
                    <Image src="/StoneDoorway.png" alt="A flower-covered stone doorway emerging from darkness" fill sizes="(max-width: 700px) 100vw, 900px" />
                  </a>
                </div>
              </div>
            } />
          </div>
        </section>
      </RetreatDepth>
    </main>
  );
}
