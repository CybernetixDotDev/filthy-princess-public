import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/editorial/reveal";
import invitation from "../cally/cally.module.css";
import styles from "./sanctum.module.css";

export const metadata = { title: "Inner Sanctum", description: "There is another door." };

function Door() {
  return (
    <section className={styles.hero}>
      <Image src="/assets/sanctum/reservedSeat.png" alt="A rose-lit chair waiting beneath a crown." fill sizes="100vw" loading="eager" fetchPriority="high" className={styles.heroImage} />
      <div className={styles.shade} aria-hidden="true" />
      <Reveal className={styles.heroCopy}>
        <p className="loud text-xs tracking-[0.2em] text-(--fp-hot-pink)">THE INNER SANCTUM.</p>
        <h1 className={`display ${styles.heroTitle}`}>THIS IS WHERE I KEEP<br />THE GOOD STUFF.</h1>
        <p className={styles.aside}>You weren&rsquo;t really supposed to see this yet.</p>
      </Reveal>
    </section>
  );
}

function Glimpse() {
  return (
    <section className={styles.privateWorld}>
      <div className={styles.glimpse}>
        <div className={styles.story}>
          <Reveal>
            <p className="loud text-xs tracking-[0.2em] text-(--fp-hot-pink)">COME A LITTLE CLOSER.</p>
            <h2 className={`display ${styles.title}`}>IT GETS MORE PERSONAL IN HERE.</h2>
            <div className={styles.storyCopy}>
              <p>I write little stories.<br />You decide what happens next.</p>
              <p>Sometimes they stay on the screen.<br />Sometimes they give you something to do.<br />Something to find.<br />Something to keep.</p>
              <p>And sometimes&hellip;<br /><em>they involve me.</em></p>
            </div>
          </Reveal>
          <Reveal delay={250} className={styles.turn}>
            <p className={styles.thought}>your turn ♡</p>
            <Image src="/assets/sanctum/strawberryIcon.png" alt="" width={90} height={90} className={styles.strawberry} />
          </Reveal>
          <Reveal>
            <p className={styles.description}>Inner Sanctum is the private interactive side of Filthy Princess — stories, choices, challenges, collections, progression, surprises and little ways for our worlds to cross over.</p>
          </Reveal>
        </div>
        <div className={styles.cally}>
          <Reveal delay={150}>
            <Image src="/assets/sanctum/callyDress2.jpeg" alt="Cally holding out her denim dress in the rose-lit private world." width={3328} height={4992} sizes="(max-width: 767px) 88vw, 42vw" className={styles.portrait} />
          </Reveal>
          <Reveal delay={400} className={styles.caught}>
            <p className={styles.thought}>caught you.</p>
          </Reveal>
          <Image src="/assets/sanctum/bowIcon.png" alt="" width={100} height={100} className={styles.bow} />
        </div>
      </div>
    </section>
  );
}

function Decision() {
  return (
    <section className={styles.decision}>
      <Reveal delay={200} className={styles.keepsake}>
        <Image src="/assets/sanctum/RoseGoldKey.png" alt="" width={100} height={100} className={styles.key} />
        <p className={styles.thought}>keep this.</p>
      </Reveal>
      <Reveal className={styles.ending}>
        <p className="loud text-xs tracking-[0.2em] text-[#c88979]">YOU CAN KEEP LOOKING FROM OUT THERE.</p>
        <div className={styles.handoff}>
          <h2 className={`display ${styles.endingTitle}`}>OR YOU CAN<br />COME INSIDE.</h2>
          {/* Reuse Cally's actual ink paths and interactive invitation styles. */}
          <Link href="/store" className={`${invitation.invitation} ${styles.invitation}`}>
            <svg className={invitation.invitationInk} viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path className={invitation.invitationStroke} pathLength="100" d="M 25,40 C 9,49 12,72 37,83 C 71,98 147,88 186,92 C 219,95 265,84 277,66 C 285,54 280,43 268,46" />
              <path className={invitation.invitationStroke} pathLength="100" d="M 64,24 C 96,12 143,21 178,18 C 209,15 238,15 254,28 C 262,34 267,31 270,25" />
              <path className={invitation.invitationFlower} d="M 270,25 C 257,23 254,12 261,12 C 267,12 272,20 270,25 C 266,14 272,4 278,9 C 284,14 275,23 270,25 C 280,15 291,20 287,26 C 283,32 274,29 270,25" />
            </svg>
            <span>Become a member <span aria-hidden="true">↗</span></span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function InnerSanctumPage() {
  return <main className={styles.sanctum}><Door /><Glimpse /><Decision /></main>;
}
