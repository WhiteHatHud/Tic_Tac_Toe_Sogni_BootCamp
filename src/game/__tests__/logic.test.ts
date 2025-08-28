import { checkWinner, isDraw, nextTurn } from "../logic";
import type { Board } from "../types";

describe("logic.ts", () => {
  it("detects no winner on empty board", () => {
    const board = Array(9).fill(null) as Board;
    const res = checkWinner(board);
    expect(res.winner).toBeNull();
    expect(res.line).toBeNull();
  });

  it("detects horizontal win", () => {
    const board: Board = ["X", "X", "X", null, null, null, null, null, null];
    const res = checkWinner(board);
    expect(res.winner).toBe("X");
    expect(res.line).toEqual([0, 1, 2]);
  });

  it("detects diagonal win", () => {
    const board: Board = ["O", null, null, null, "O", null, null, null, "O"];
    const res = checkWinner(board);
    expect(res.winner).toBe("O");
    expect(res.line).toEqual([0, 4, 8]);
  });

  it("detects draw", () => {
    // Full board with no winner
    const board: Board = [
      "X", "O", "X",
      "X", "O", "O",
      "O", "X", "X"
    ];
    expect(isDraw(board)).toBe(true);
  });

  it("nextTurn flips between X and O", () => {
    expect(nextTurn("X")).toBe("O");
    expect(nextTurn("O")).toBe("X");
  });
});
