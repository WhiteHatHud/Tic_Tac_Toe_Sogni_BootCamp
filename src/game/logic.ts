import type { Board, Piece } from "./types";

export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function checkWinner(
  board: Board
): { winner: Piece | null; line: number[] | null } {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return { winner: v, line };
    }
  }
  return { winner: null, line: null };
}

export function isDraw(board: Board): boolean {
  // Draw = board full and no winner
  if (board.some((c) => c === null)) return false;
  const { winner } = checkWinner(board);
  return !winner;
}

export function nextTurn(turn: Piece): Piece {
  return turn === "X" ? "O" : "X";
}
