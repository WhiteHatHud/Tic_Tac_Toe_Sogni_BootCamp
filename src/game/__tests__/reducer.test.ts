import { reducer, createInitialState } from "../reducer";
import type { Action, GameState } from "../types";

function run(initial: GameState, actions: Action[]): GameState {
  return actions.reduce((s, a) => reducer(s, a), initial);
}

describe("reducer.ts", () => {
  it("ignores MOVE on occupied cell", () => {
    const s0 = createInitialState();
    const s1 = run(s0, [{ type: "MOVE", index: 0 }]);
    const s2 = run(s1, [{ type: "MOVE", index: 0 }]); // same cell
    expect(s2.board[0]).toBe("X");
    expect(s2.moveCount).toBe(1);
  });

  it("X wins and score increments; board locks", () => {
    const s0 = createInitialState();
    const winMoves: Action[] = [
      { type: "MOVE", index: 0 }, // X
      { type: "MOVE", index: 3 }, // O
      { type: "MOVE", index: 1 }, // X
      { type: "MOVE", index: 4 }, // O
      { type: "MOVE", index: 2 }  // X wins [0,1,2]
    ];
    const sWin = run(s0, winMoves);
    expect(sWin.status).toBe("win");
    expect(sWin.winner).toBe("X");
    expect(sWin.scores.X).toBe(1);
    // try extra move -> ignored
    const sAfter = reducer(sWin, { type: "MOVE", index: 5 });
    expect(sAfter).toBe(sWin);
  });

  it("UNDO reverts last move and restores turn", () => {
    const s0 = createInitialState();
    const s1 = run(s0, [{ type: "MOVE", index: 0 }, { type: "MOVE", index: 4 }]); // X, O
    expect(s1.moveCount).toBe(2);
    const s2 = reducer(s1, { type: "UNDO" });
    expect(s2.moveCount).toBe(1);
    expect(s2.turn).toBe("O"); // after one move (odd) -> O to move
    expect(s2.status).toBe("playing");
    expect(s2.board[4]).toBeNull();
  });

  it("RESTART keeps scores but clears board and history", () => {
    const s0 = createInitialState();
    const s1 = run(s0, [
      { type: "MOVE", index: 0 },
      { type: "MOVE", index: 3 },
      { type: "MOVE", index: 1 },
      { type: "MOVE", index: 4 },
      { type: "MOVE", index: 2 } // X wins
    ]);
    expect(s1.scores.X).toBe(1);
    const s2 = reducer(s1, { type: "RESTART_ROUND" });
    expect(s2.status).toBe("playing");
    expect(s2.scores.X).toBe(1);
    expect(s2.moveCount).toBe(0);
    expect(s2.board.every((c) => c === null)).toBe(true);
  });

  it("handles a draw state", () => {
    const s0 = createInitialState();
    // A known draw sequence:
    const moves: number[] = [0,1,2,4,3,5,7,6,8]; // results in draw
    let s = s0;
    moves.forEach((idx) => (s = reducer(s, { type: "MOVE", index: idx })));
    expect(s.status).toBe("draw");
    expect(s.winner).toBeNull();
  });

  it("UNDO at initial state is a no-op", () => {
    const s0 = createInitialState();
    const s1 = reducer(s0, { type: "UNDO" });
    expect(s1).toBe(s0);
  });

  it("NEXT_ROUND same as RESTART_ROUND", () => {
    const s0 = createInitialState();
    const s1 = run(s0, [
      { type: "MOVE", index: 0 },
      { type: "MOVE", index: 3 },
      { type: "MOVE", index: 1 },
      { type: "MOVE", index: 4 },
      { type: "MOVE", index: 2 } // X wins
    ]);
    const s2 = reducer(s1, { type: "NEXT_ROUND" });
    expect(s2.status).toBe("playing");
    expect(s2.turn).toBe("X");
    expect(s2.board.filter(Boolean).length).toBe(0);
    expect(s2.scores.X).toBe(1); // scores kept
  });
});
