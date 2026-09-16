import CallyPage from "@/app/(marketing)/cally/page";
import ExperiencePage from "@/app/(marketing)/experience/page";
import HomePage from "@/app/(marketing)/home/page";
import RetreatPage from "@/app/(marketing)/retreat/page";

import styles from "./experiment.module.css";

export const metadata = {
  title: "Continuous Scroll Experiment",
  description: "Filthy Princess as one continuous experience.",
};

export default function ExperimentPage() {
  return (
    <div className={styles.timeline}>
      <HomePage />
      <CallyPage />
      <ExperiencePage />
      <RetreatPage />
    </div>
  );
}
