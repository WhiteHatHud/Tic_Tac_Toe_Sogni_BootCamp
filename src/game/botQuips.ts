import type { Board, GameState, Piece } from "./types";
import { WIN_LINES } from "./logic";

function other(p: Piece): Piece {
  return p === "X" ? "O" : "X";
}

function imminentWin(board: Board, piece: Piece): boolean {
  // Any line with exactly two of `piece` and one empty
  return WIN_LINES.some(([a, b, c]) => {
    const line = [board[a], board[b], board[c]];
    const countP = line.filter((v) => v === piece).length;
    const countEmpty = line.filter((v) => v === null).length;
    return countP === 2 && countEmpty === 1;
  });
}

// Pure function deriving a short, context-aware quip
export function getQuip(state: GameState): string {
  if (state.status === "win") {
    return `Checkmate? Wrong game — but a win’s a win! Congrats ${state.winner}.`;
  }
  if (state.status === "draw") {
    return "Balanced as all things should be. It’s a draw.";
  }

  // Playing
  if (state.moveCount === 0) {
    return "X to move. Corners are classy.";
  }

  if (imminentWin(state.board, state.turn)) {
    return `${state.turn} could seal it this turn. Don’t blink.`;
  }
  if (imminentWin(state.board, other(state.turn))) {
    return `${other(state.turn)} is one move from glory… eyes open 👀`;
  }

  return `Your move, ${state.turn}. Don’t overthink it.`;
}
