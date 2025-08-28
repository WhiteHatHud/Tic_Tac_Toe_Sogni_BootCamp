import styles from "./Square.module.css";

export interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
  ariaLabel: string;
}

export default function Square({
  value,
  onClick,
  isWinning,
  disabled,
  ariaLabel
}: SquareProps) {
  return (
    <button
      type="button"
      className={`${styles.square} ${isWinning ? styles.winning : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true" className={styles.mark}>
        {value ?? ""}
      </span>
    </button>
  );
}
