import { FC, MouseEvent } from "react";
import styles from "./Summary.module.css";

type SummaryProps = {
  total: number;
  bonuses: number;
  onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Summary: FC<SummaryProps> = ({ total, bonuses, onButtonClick }) => (
  <div className={styles.root}>
    <div className={styles.item} data-testid="summary-bonuses">
      {`Bonuses ${bonuses}`}
    </div>
    <div className={styles.item}>
      <div className={styles.total} data-testid="summary-total">
        Total <br />
        {total}
      </div>
      <button
        data-testid="new-game-button"
        className={styles.button}
        onClick={onButtonClick}
      >
        New Game
      </button>
    </div>
  </div>
);

export default Summary;
