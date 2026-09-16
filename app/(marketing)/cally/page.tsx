import Image from "next/image";
import Link from "next/link";
import { ScrollScene } from "./scroll-scene";
import styles from "./cally.module.css";

export const metadata = { title: "Come closer" };

const photographs = [
  { src: "/hotCally1.jpeg", alt: "Cally seated, one hand resting in her hair." },
  { src: "/hotCally2.jpeg", alt: "Cally seated, looking directly at the camera." },
  { src: "/hotCally3.jpeg", alt: "Another seated portrait of Cally in black lace." },
  { src: "/hotCally4.jpeg", alt: "Cally in a seated side-profile portrait." },
  { src: "/hotCally5.jpeg", alt: "Cally in the final seated portrait." },
];

export default function CallyPage() {
  return (
    <main className={styles.cally}>
      <section className={styles.arrival} aria-labelledby="arrival-title">
        <div className={styles.fireField}>
          <Image src="/4bonnieHero.png" alt="Cally waiting beside a bonfire at night." width={1672} height={941} sizes="100vw" loading="eager" fetchPriority="high" />
        </div>
        <div className={styles.arrivalCopy}>
          <h1 id="arrival-title" className={styles.display}>SO. YOU CAME<br />TO MEET ME.</h1>
        </div>
      </section>
      <div className={styles.closeBridge}><p className={styles.whisper}>come closer.</p></div>

      <section className={styles.biography} aria-labelledby="cally-name">
        <h2 id="cally-name" className={styles.name}>Cally.</h2>
        <div className={styles.correction}>
          <p>Princess, apparently.</p>
          <p>Futanari Princess, really.</p>
        </div>
        <figure className={styles.everydayPhoto}>
          <Image src="/5everydayCally.png" alt="Cally at home, relaxed and looking back." width={1024} height={1536} sizes="(max-width: 767px) 78vw, 42vw" />
        </figure>
        <p className={styles.pretty}>I like pretty things.</p>
        <p className={styles.mess}>I make a delicious mess.</p>
        <p className={styles.laugh}>I laugh a lot.</p>
        <p className={styles.distracted}>I get distracted.</p>
        <p className={styles.sincere}><span>Actually—</span><br />I go out of my way to spoil you.</p>
        <p className={styles.curious}>Far too curious for my own good.</p>
      </section>

      <div className={styles.changeOfEnergy}><p>Oh. There&apos;s also this Cally.</p></div>
      <ScrollScene kind="photographs" className={styles.gift}>
        <div className={styles.giftStage} data-stage>
          <div className={styles.photographs} data-photographs>
            {photographs.map((photo, index) => (
              <figure className={styles.giftPhoto} data-photo key={photo.src}>
                <Image src={photo.src} alt={photo.alt} width={1664} height={2496} sizes="(max-width: 767px) 100vw, 67vh" data-sequence={index + 1} />
              </figure>
            ))}
          </div>
          <div className={styles.darkSweep} data-sweep aria-hidden="true" />
          <div className={styles.blackRise} data-rise aria-hidden="true" />
          <div className={styles.dressedWords} data-words>
            <h2 className={styles.display}>I DO LIKE GETTING<br /><span className={styles.dressedLine}><span className={styles.scribbledUn}>un</span>DRESSED UP.</span></h2>
          </div>
        </div>
      </ScrollScene>

      <section className={styles.attentionScene} aria-labelledby="attention-title">
        <figure className={styles.dressedPhoto}>
          <Image src="/7everydayHeroCally.png" alt="Cally dressed up and looking directly at you beside the fire." width={1672} height={941} sizes="100vw" />
        </figure>
        <div className={styles.attention}>
          <h2 id="attention-title" className={styles.display}>IMAGINE HAVING<br />MY ATTENTION.</h2>
        </div>
      </section>

      <section className={styles.invitationScene} aria-label="An invitation">
        <ScrollScene kind="silence" className={styles.silence}>
          <div className={styles.undressingHold} data-stage>
            <p className={styles.whisper} data-words>imagine undressing me.</p>
          </div>
        </ScrollScene>
        <div className={styles.lastSilence} aria-hidden="true" />
        <Link className={styles.invitation} href="/experience">come with me.</Link>
      </section>
    </main>
  );
}
