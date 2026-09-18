import Image from "next/image";
import Link from "next/link";
import styles from "./overture.module.css";

export const metadata = { title: "You found something" };

export default function HomePage() {
  return (
    <main className={styles.overture}>
      <section className={styles.discovery} aria-labelledby="discovery-title">
        <div className={styles.discoveryCopy}>
          <div className={styles.firstBeat}>
            <h1 id="discovery-title" className={styles.statement}>YOU FOUND<br />SOMETHING.</h1>
          </div>
          <div className={styles.secondBeat}>
            <p className={styles.aside}>I might have left it<br />where you&apos;d find it.</p>
          </div>
        </div>
        <div className={styles.logoTrack}>
          {/* One object, carried only through the two discovery beats. */}
          <div className={styles.travellingLogo}>
            <Image src="/FilthyPrincessLogo.png" alt="Filthy Princess" width={1536} height={1024} sizes="(max-width: 767px) 62vw, 42vw" loading="eager" fetchPriority="high" />
          </div>
        </div>
      </section>

      <section className={styles.evidence} aria-label="Traces left behind">
        <div className={styles.evidenceStage}>
          <figure className={styles.dress}>
            <Image src="/1afterMidnightDress.png" alt="A dark embroidered dress left on the floor beside a bed." width={1024} height={1536} sizes="(max-width: 767px) 82vw, 42vw" />
          </figure>
          <figure className={styles.kiss}>
            <Image src="/lipstickKiss.png" alt="A lipstick kiss left behind." width={1536} height={1024} sizes="(max-width: 767px) 64vw, 38vw" />
          </figure>
        </div>
      </section>

      <section className={styles.staircase} aria-labelledby="looked-title">
        <div className={styles.staircaseView}>
          <Image className={styles.staircasePhoto} src="/2stairwayCally.png" alt="A woman on a dark staircase, looking back over her shoulder." width={1024} height={1536} sizes="(max-width: 767px) 100vw, 80vw" />
          <div className={styles.staircaseShade} aria-hidden="true" />
        </div>
        {/* Scroll distance, not a timer: the photograph gets the first movement. */}
        <div className={styles.lookingSpace} aria-hidden="true" />
        <div className={styles.caught}>
          <h2 id="looked-title" className={styles.statement}>YOU LOOKED.</h2>
        </div>
        <div className={styles.answer}>
          <p className={styles.aside}>Of course you did.</p>
        </div>
      </section>

      <section className={styles.release} aria-label="A moment of silence">
        <div className={styles.breathe}><p>Breathe.</p></div>
        <div className={styles.curious}><p className={styles.aside}>still curious?</p></div>
      </section>

      <section className={styles.revelation} aria-labelledby="found-title">
        <div className={styles.portraitField}>
          <figure className={styles.portraitFrame}>
            <div className={styles.portraitRebate}>
              <Image src="/3callyreveal.png" alt="Cally, holding a strawberry to her lips in a room lit with pink reflections." width={1024} height={1536} sizes="(max-width: 767px) 68vw, 460px" />
            </div>
            <span className={styles.frameMark} aria-hidden="true" />
          </figure>
        </div>
        <div className={styles.resolution}>
          <h2 id="found-title" className={styles.statement}>YOU FOUND ME.</h2>
          <Link className={styles.continuation} href="/cally">come say hello.</Link>
        </div>
      </section>
    </main>
  );
}
