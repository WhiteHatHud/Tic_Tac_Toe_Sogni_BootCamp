import { checkWinner, isDraw, nextTurn } from "./logic";
import type { Action, GameState, Piece } from "./types";
import { EMPTY_BOARD, FIRST_TURN } from "./types";

export function createInitialState(): GameState {
  return {
    board: [...EMPTY_BOARD],
    turn: FIRST_TURN,
    status: "playing",
    winner: null,
    history: [ [...EMPTY_BOARD] ],
    moveCount: 0,
    scores: { X: 0, O: 0 },
    winningLine: null
  };
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "MOVE": {
      const i = action.index;
      if (state.status !== "playing") return state;
      if (state.board[i] !== null) return state;

      const newBoard = state.board.slice();
      newBoard[i] = state.turn;

      const newHistory = [...state.history, newBoard];
      const newMoveCount = state.moveCount + 1;

      const { winner, line } = checkWinner(newBoard);

      if (winner) {
        const newScores = { ...state.scores, [winner]: state.scores[winner] + 1 };
        return {
          ...state,
          board: newBoard,
          history: newHistory,
          moveCount: newMoveCount,
          status: "win",
          winner,
          winningLine: line,
          scores: newScores
        };
      }

      if (isDraw(newBoard)) {
        return {
          ...state,
          board: newBoard,
          history: newHistory,
          moveCount: newMoveCount,
          status: "draw",
          winner: null,
          winningLine: null
        };
      }

      return {
        ...state,
        board: newBoard,
        history: newHistory,
        moveCount: newMoveCount,
        turn: nextTurn(state.turn),
        winner: null,
        winningLine: null
      };
    }

    case "UNDO": {
      if (state.history.length <= 1) return state;

      const newHistory = state.history.slice(0, -1);
      const restoredBoard = newHistory[newHistory.length - 1]!.slice();
      const newMoveCount = Math.max(0, state.moveCount - 1);

      // Parity: even -> X to move (0,2,4...), odd -> O to move
      const restoredTurn: Piece = newMoveCount % 2 === 0 ? "X" : "O";

      return {
        ...state,
        board: restoredBoard,
        history: newHistory,
        moveCount: newMoveCount,
        turn: restoredTurn,
        status: "playing",
        winner: null,
        winningLine: null
      };
    }

    case "RESTART_ROUND":
    case "NEXT_ROUND": {
      return {
        ...state,
        board: [...EMPTY_BOARD],
        history: [ [...EMPTY_BOARD] ],
        moveCount: 0,
        turn: FIRST_TURN,
        status: "playing",
        winner: null,
        winningLine: null
      };
    }

    default:
      return state;
  }
}
