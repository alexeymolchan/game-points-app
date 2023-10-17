import { useState, MouseEvent, FC } from "react";
import Section from "./components/Section";
import ItemsList from "./components/ItemsList";
import PlayerItemsTable from "./components/PlayerItemsTable";
import Summary from "./components/Summary";
import {
  getItemScoreAndBonusFromQuantity,
  getTotalScoreAndBonuses,
} from "./utils";
import { type ItemId } from "./constants";
import { ItemsMap, PlayerItem } from "./types";
import styles from "./App.module.css";

const INITIAL_STATE = {};

type AppProps = {
  itemsConfig: ItemsMap;
};

const App: FC<AppProps> = ({ itemsConfig }) => {
  const [playerItems, setPlayerItems] =
    useState<Record<string, PlayerItem>>(INITIAL_STATE);

  const resetPoints = () => setPlayerItems(INITIAL_STATE);

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.dataset.id as ItemId;
    setPlayerItems((prev) => {
      const nextQuantity = (prev[id]?.quantity || 0) + 1;
      const { bonus, unitPoints, name } = itemsConfig[id];
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
            items={Object.values(itemsConfig)}
            onItemClick={handleItemClick}
          />
        </div>
      </Section>
      <Section className={styles.playerItems} title="Player Items">
        <PlayerItemsTable data={Object.values(playerItems)} />
        <Summary
          {...getTotalScoreAndBonuses(playerItemsData)}
          onButtonClick={resetPoints}
        />
      </Section>
    </main>
  );
};

export default App;
