import Image from "next/image";
import Link from "next/link";
import { DropScene } from "./drop-scene";
import styles from "./experience.module.css";

export const metadata = { title: "The Cally Experience", description: "The Cally Experience." };

export default function ExperiencePage() {
  return (
    <main className={styles.experience}>
      <DropScene>
        <div className={styles.viewport} data-viewport>
          <div className={styles.world} aria-hidden="true">
            <div className={`${styles.plane} ${styles.companion}`}><Image src="/assets/CompanionToWavesOfSatin.png" alt="" fill sizes="100vw" loading="eager" /></div>
            <div className={`${styles.plane} ${styles.satin}`}><Image src="/assets/wavesOfSatin.png" alt="" fill sizes="100vw" loading="eager" /></div>
            <div className={`${styles.plane} ${styles.hero}`}><Image src="/8ExperienceHero.png" alt="" fill sizes="(max-width: 640px) 180vw, 100vw" loading="eager" fetchPriority="high" /></div>
            <div className={`${styles.plane} ${styles.returning}`}><Image src="/honeyGlazedCally5.jpeg" alt="" fill sizes="(max-width: 640px) 180vw, 100vw" loading="eager" /></div>
            <div className={`${styles.plane} ${styles.dust}`}><Image src="/assets/dustParticleOverlay.png" alt="" fill unoptimized loading="eager" /></div>
          </div>
          <div className={styles.attention}><h1>NOW I HAVE YOUR ATTENTION.</h1></div>
          <div className={styles.reassurance}><p>I&apos;m here.</p></div>
          <div className={styles.returnMoment}>
            {/* Static narrative only: the enhanced scene reuses its original planes. */}
            <div className={styles.staticReturn} aria-hidden="true">
              <Image src="/honeyGlazedCally5.jpeg" alt="" fill sizes="(max-width: 640px) 180vw, 100vw" />
            </div>
            <h2>WHAT IF YOU ASKED A PRINCESS TO BE NAUGHTY?</h2>
          </div>
          <section className={styles.tease} aria-label="An invitation">
            <p>what if she said yes?</p>
            <p>There is a place.</p>
            <p>Where you can feel me close.</p>
            <p>Where you can touch me.</p>
            <p className={styles.thinking}>I know what you&apos;re thinking.</p>
            <p className={styles.correction}>No. Not there.</p>
            <p className={styles.notYet}>Not yet.</p>
            <p className={styles.realPlace}>There really is a place.</p>
            <div className={styles.handoff}><Link href="/retreat">come with me.</Link></div>
          </section>
        </div>
      </DropScene>
    </main>
  );
}
