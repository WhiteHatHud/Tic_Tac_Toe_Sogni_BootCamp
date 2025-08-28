import type { Board as BoardType, GameStatus } from "../../game/types";
import Square from "../Square/Square";
import styles from "./Board.module.css";

export interface BoardProps {
  board: BoardType;
  status: GameStatus;
  winningLine: number[] | null;
  onMove: (index: number) => void;
  turn: "X" | "O";
}

export default function Board({
  board,
  status,
  winningLine,
  onMove,
  turn
}: BoardProps) {
  const isPlaying = status === "playing";

  function ariaFor(index: number, value: "X" | "O" | null): string {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    if (value === null && isPlaying) {
      return `Place ${turn} at row ${row}, column ${col}`;
    }
    if (value) {
      return `Cell occupied by ${value} at row ${row}, column ${col}`;
    }
    return `Cell at row ${row}, column ${col}`;
  }

  return (
    <div className={`${styles.wrap} section`}>
      <div className={styles.grid} role="grid" aria-label="Tic Tac Toe board">
        {board.map((cell, i) => {
          const isWinning = !!winningLine?.includes(i);
          const disabled = !isPlaying || cell !== null;
          return (
            <div key={i} role="gridcell" className={styles.cell}>
              <Square
                value={cell}
                onClick={() => onMove(i)}
                isWinning={isWinning}
                disabled={disabled}
                ariaLabel={ariaFor(i, cell)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
