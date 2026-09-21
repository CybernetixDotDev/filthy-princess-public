import Image from "next/image";
import Link from "next/link";
import { HoneyAtmosphere } from "./honey-atmosphere";
import styles from "./teaser.module.css";

type Props = {
  eyebrow: string | null;
  title: string;
  body: string | null;
  graffiti: string[];
  images: { url: string; slot: number }[];
  enterHref: string | null;
};

function HangingThread() {
  return <svg className={styles.thread} viewBox="0 0 360 110" fill="none" aria-hidden="true">
    <path d="M8 18C64 1 81 62 154 40S260 14 345 78M9 21C70 6 80 65 155 43S261 18 345 81" stroke="currentColor" strokeWidth="1" />
    <path d="M78 40C66 23 56 42 78 54C103 40 86 27 78 40Z" stroke="currentColor" />
    <g transform="translate(338 77)" stroke="currentColor">
      <ellipse ry="13" rx="4" cy="-8" />
      <ellipse ry="13" rx="4" cy="-8" transform="rotate(60)" />
      <ellipse ry="13" rx="4" cy="-8" transform="rotate(120)" />
      <ellipse ry="13" rx="4" cy="-8" transform="rotate(180)" />
      <ellipse ry="13" rx="4" cy="-8" transform="rotate(240)" />
      <ellipse ry="13" rx="4" cy="-8" transform="rotate(300)" />
      <circle r="4" fill="#d3ae69" />
    </g>
  </svg>;
}

export function TeaserExperience({ eyebrow, title, body, graffiti, images, enterHref }: Props) {
  // Distribute ordered phrases before each photograph and before the finale.
  const groups = Array.from({ length: images.length + 1 }, (_, group) => {
    const start = Math.floor(group * graffiti.length / (images.length + 1));
    const end = Math.floor((group + 1) * graffiti.length / (images.length + 1));
    return graffiti.slice(start, end).map((text, index) => ({ text, index: start + index }));
  });

  return <main className={styles.experience}>
    <div className={styles.anchor} aria-hidden="true">
      <Image src="/fullAttentionCally4K.jpeg" alt="" fill sizes="100vw" preload className={styles.cally} />
      <div className={styles.shade} />
    </div>
    <HoneyAtmosphere />
    <div className={styles.content}>
      <header className={styles.masthead}>
        <Link href="/home" className={styles.wordmark}>Filthy Princess<span>A private invitation</span></Link>
        {enterHref && <a href="#enter" className={styles.skip}>Go to ENTER</a>}
      </header>
      <section className={styles.hero} aria-labelledby="teaser-title">
        <div className={styles.invitation}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 id="teaser-title">{title}</h1>
          {body && <p className={styles.body}>{body}</p>}
          <p className={styles.scrollHint} aria-hidden="true">A little closer <span>↓</span></p>
        </div>
      </section>
      <div className={styles.journey}>
        {groups.map((phrases, group) => <div key={group}>
          {phrases.map(({ text, index }) => <div key={index} className={styles.phraseMoment}>
            <p className={`${styles.graffiti} ${styles[`placement${index % 4}`]} ${styles[`reveal${(index * 7 + Math.floor(index / 3)) % 4}`]}`}>{text}</p>
          </div>)}
          {images[group] && <div data-honey-moment className={`${styles.photoMoment} ${styles[`slot${images[group].slot}`]}`}>
            <figure className={styles.polaroid}>
              <HangingThread />
              <span className={styles.peg} aria-hidden="true" />
              <div className={styles.photo}>
                <Image src={images[group].url} alt={`${title} — teaser photograph ${images[group].slot + 1}`} fill sizes="(max-width: 640px) 72vw, 360px" unoptimized />
              </div>
              <span className={styles.heart} aria-hidden="true">♡</span>
            </figure>
          </div>}
        </div>)}
      </div>
      <section id="enter" className={styles.finale} aria-label="Enter the private world" tabIndex={-1}>
        <div className={styles.strawberries} aria-hidden="true">
          <Image src="/goldenStrawberryRain.png" alt="" fill sizes="100vw" />
        </div>
        <div className={styles.enter}>
          {enterHref
            ? <a href={enterHref} className={styles.enterButton}>ENTER</a>
            : <p className={styles.unavailable}>This invitation is resting.</p>}
        </div>
      </section>
    </div>
  </main>;
}
