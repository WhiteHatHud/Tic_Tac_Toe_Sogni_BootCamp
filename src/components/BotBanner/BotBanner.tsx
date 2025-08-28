import { getQuip } from "../../game/botQuips";
import type { GameState } from "../../game/types";
import styles from "./BotBanner.module.css";

export interface BotBannerProps {
  state: GameState;
}

export default function BotBanner({ state }: BotBannerProps) {
  const quip = getQuip(state);
  return (
    <div className={`${styles.banner} section`} role="status" aria-live="polite">
      {quip}
    </div>
  );
}
