import styles from "./Scoreboard.module.css";

export interface ScoreboardProps {
  scores: { X: number; O: number };
}

export default function Scoreboard({ scores }: ScoreboardProps) {
  return (
    <div className={`${styles.score} section`} aria-label="Scoreboard">
      <div className={styles.item} role="group" aria-label="Score for X">
        <span className={styles.label}>X</span>
        <span className={styles.value}>{scores.X}</span>
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <div className={styles.item} role="group" aria-label="Score for O">
        <span className={styles.label}>O</span>
        <span className={styles.value}>{scores.O}</span>
      </div>
    </div>
  );
}
