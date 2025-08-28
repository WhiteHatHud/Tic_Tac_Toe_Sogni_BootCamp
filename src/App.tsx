import { useReducer } from "react";
import "./styles/global.css";

import Scoreboard from "./components/Scoreboard/Scoreboard";
import BotBanner from "./components/BotBanner/BotBanner";
import Board from "./components/Board/Board";
import Controls from "./components/Controls/Controls";

import { createInitialState, reducer } from "./game/reducer";

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  const canUndo = state.history.length > 1;

  return (
    <div className="app">
      <header className="section">
        <h1>Tic Tac Toe</h1>
        <div className="row">
          <div>
            <span>Current turn: </span>
            <strong aria-live="polite">{state.turn}</strong>
          </div>
          <div>
            <span>Status: </span>
            <strong aria-live="polite">
              {state.status === "playing"
                ? "playing"
                : state.status === "win"
                ? `win (${state.winner})`
                : "draw"}
            </strong>
          </div>
        </div>
      </header>

      <Scoreboard scores={state.scores} />
      <BotBanner state={state} />

      <Board
        board={state.board}
        status={state.status}
        winningLine={state.winningLine}
        onMove={(index) => dispatch({ type: "MOVE", index })}
        turn={state.turn}
      />

      <Controls
        canUndo={canUndo}
        status={state.status}
        onUndo={() => dispatch({ type: "UNDO" })}
        onRestart={() => dispatch({ type: "RESTART_ROUND" })}
        onNextRound={() => dispatch({ type: "NEXT_ROUND" })}
      />

      <p className="visuallyHidden" aria-live="polite">
        {state.status === "win" && state.winner
          ? `${state.winner} wins${
              state.winningLine ? ` on line ${state.winningLine.join(", ")}` : ""
            }`
          : state.status === "draw"
          ? "It is a draw"
          : `Turn: ${state.turn}`}
      </p>
    </div>
  );
}
