import { useState, MouseEvent, useCallback } from "react";
import { itemsMap, itemsList, type ItemId } from "./constants";
import styles from "./App.module.css";

const App = () => {
  const [playerItems, setPlayerItems] = useState<
    Record<string, { quantity: number; score: number; bonusPoints: number }>
  >({});

  const handleItemClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const id = event.currentTarget.dataset.id as ItemId;
      setPlayerItems((prev) => {
        const nextQuantity = (prev[id]?.quantity || 0) + 1;
        const { bonus, unitPoints } = itemsMap[id];
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
            quantity: nextQuantity,
            score: nextScore,
            bonusPoints,
          },
        };
      });
    },
    [setPlayerItems]
  );

  return (
    <main className={styles.root}>
      <section className={styles.points}>
        <h2 className={styles.title}>Kahoot! Points</h2>
        <div className={styles.container}>
          <h3 className={styles.label}>Items</h3>
          <div className={styles.items}>
            {itemsList.map((itemId) => (
              <button
                key={itemId}
                className={styles.item}
                data-id={itemId}
                onClick={handleItemClick}
              >
                {itemsMap[itemId].item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.playerItems}>
        <h2 className={styles.title}>Player Items</h2>
        <div>
          {Object.keys(playerItems).map((id) => (
            <div key={id}>{`Item: ${
              itemsMap[id as keyof typeof itemsMap].item
            }, quantity: ${playerItems[id].quantity}, score: ${
              playerItems[id].score
            }, bonusPerItem: ${playerItems[id].bonusPoints}`}</div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default App;
