import { useState, MouseEvent, FC } from "react";
import Section from "./components/Section";
import ItemsList from "./components/ItemsList";
import PlayerItemsTable from "./components/PlayerItemsTable";
import Summary from "./components/Summary";
import {
  getItemScoreAndBonusFromQuantity,
  getTotalScoreAndBonuses,
} from "./utils";
import { itemsMap, type ItemId } from "./constants";
import { PlayerItem } from "./types";
import styles from "./App.module.css";

const INITIAL_STATE = {};

const App: FC = () => {
  const [playerItems, setPlayerItems] =
    useState<Record<string, PlayerItem>>(INITIAL_STATE);

  const resetGame = () => setPlayerItems(INITIAL_STATE);

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.itemId as ItemId;
    setPlayerItems((prev) => {
      const nextQuantity = (prev[id]?.quantity || 0) + 1;
      const { bonus, unitPoints, name } = itemsMap[id];
      const { score, bonusPoints } = getItemScoreAndBonusFromQuantity(
        nextQuantity,
        unitPoints,
        bonus
      );

      return {
        ...prev,
        [id]: {
          id,
          quantity: nextQuantity,
          score,
          bonusPoints,
          name,
        },
      };
    });
  };

  const playerItemsData = Object.values(playerItems);

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
        <Summary
          {...getTotalScoreAndBonuses(playerItemsData)}
          onButtonClick={resetGame}
        />
      </Section>
    </main>
  );
};

export default App;
