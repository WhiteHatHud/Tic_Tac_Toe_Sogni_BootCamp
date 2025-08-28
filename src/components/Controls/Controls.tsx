import styles from "./Controls.module.css";
import type { GameStatus } from "../../game/types";

export interface ControlsProps {
  canUndo: boolean;
  status: GameStatus;
  onUndo: () => void;
  onRestart: () => void;
  onNextRound: () => void;
}

export default function Controls({
  canUndo,
  status,
  onUndo,
  onRestart,
  onNextRound
}: ControlsProps) {
  const postGame = status !== "playing";
  return (
    <div className={`${styles.controls} section`} aria-label="Controls">
      <div className={styles.left}>
        <button onClick={onUndo} disabled={!canUndo} aria-label="Undo last move">
          Undo
        </button>
        <button onClick={onRestart} aria-label="Restart the round">
          Restart
        </button>
      </div>
      {postGame && (
        <div className={styles.right}>
          <button
            className={styles.primary}
            onClick={onNextRound}
            aria-label="Start next round"
          >
            Next Round
          </button>
        </div>
      )}
    </div>
  );
}
