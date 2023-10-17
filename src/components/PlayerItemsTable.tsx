import { FC } from "react";
import styles from "./PlayerItemsTable.module.css";

type PlayerItemsTableProps = {
  data: { id: string; name: string; quantity: number; score: number }[];
  className?: string;
};

const PlayerItemsTable: FC<PlayerItemsTableProps> = ({ data, className }) => (
  <div
    className={`${styles.root} ${className}`}
    data-testid="player-items-root"
  >
    <table className={styles.table}>
      <thead data-testid="player-items-header">
        <tr className={`${styles.row} ${styles.sticky}`}>
          <th className={styles.col}>Item</th>
          <th className={styles.col}>Qty</th>
          <th className={styles.col}>Score</th>
        </tr>
      </thead>
      <tbody data-testid="player-items-body">
        {data.map(({ id, name, quantity, score }) => (
          <tr
            key={id}
            className={styles.row}
            data-testid={`player-items-row-${id}`}
          >
            <td className={styles.col}>
              <div className={styles.name}>{name}</div>
            </td>
            <td className={styles.col}>{quantity}</td>
            <td className={styles.col}>{score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PlayerItemsTable;
