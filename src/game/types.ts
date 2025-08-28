// Core type model matching the PRD

export type Piece = "X" | "O";
export type Cell = Piece | null;
export type GameStatus = "playing" | "win" | "draw";

export type Board = Cell[]; // length 9 at runtime

export interface Scores {
  X: number;
  O: number;
}

export interface GameState {
  board: Board;
  turn: Piece;
  status: GameStatus;
  winner: Piece | null;
  history: Board[]; // first entry is empty board
  moveCount: number;
  scores: Scores;
  winningLine: number[] | null; // e.g., [0,1,2]
}

export type Action =
  | { type: "MOVE"; index: number }
  | { type: "UNDO" }
  | { type: "RESTART_ROUND" }
  | { type: "NEXT_ROUND" };

export const EMPTY_BOARD = Array(9).fill(null) as Board;

export const FIRST_TURN: Piece = "X";
