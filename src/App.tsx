import { useState, MouseEvent, useCallback, FC } from "react";
import Section from "./components/Section";
import ItemsList from "./components/ItemsList";
import PlayerItemsTable from "./components/PlayerItemsTable";
import { itemsMap, type ItemId } from "./constants";
import { Item } from "./types";
import styles from "./App.module.css";
import Summary from "./components/Summary";

const App: FC = () => {
  const [playerItems, setPlayerItems] = useState<
    Record<
      string,
      Pick<Item, "name" | "id"> & {
        quantity: number;
        score: number;
        bonusPoints: number;
      }
    >
  >({});

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.itemId as ItemId;
      setPlayerItems((prev) => {
        const nextQuantity = (prev[id]?.quantity || 0) + 1;
        const { bonus, unitPoints, name } = itemsMap[id];
        let nextScore = nextQuantity * unitPoints;
        let bonusPoints = 0;

        if (bonus !== null && nextQuantity >= bonus.count) {
          const remainder = nextQuantity % bonus.count;
          nextScore =
            remainder * unitPoints +
            ((nextQuantity - remainder) / bonus.count) * bonus.points;

          bonusPoints = nextScore - nextQuantity * unitPoints;
        }

        return {
          ...prev,
          [id]: {
            id,
            quantity: nextQuantity,
            score: nextScore,
            bonusPoints,
            name,
          },
        };
      });
    },
    [setPlayerItems]
  );

  const resetGame = () => setPlayerItems({});
  const playerItemsData = Object.values(playerItems);

  const { total, bonuses } = playerItemsData.reduce(
    ({ bonuses, total }, { bonusPoints, score }) => ({
      bonuses: bonuses + bonusPoints,
      total: total + score,
    }),
    { bonuses: 0, total: 0 }
  );

  return (
    <main className={styles.root}>
      <Section className={styles.points} title="Kahoot! Points">
        <div className={styles.container}>
          <h3 className={styles.label}>Items</h3>
          <ItemsList
            items={Object.values(itemsMap)}
            onItemClick={handleItemClick}
          />
        </div>
      </Section>
      <Section className={styles.playerItems} title="Player Items">
        <PlayerItemsTable data={playerItemsData} />
        <Summary bonuses={bonuses} total={total} onButtonClick={resetGame} />
      </Section>
    </main>
  );
};

export default App;
