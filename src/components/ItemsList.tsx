import { FC, MouseEvent } from "react";
import { Item } from "../types";
import styles from "./ItemsList.module.css";

type ItemsListProps = {
  items: Item[];
  onItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ItemsList: FC<ItemsListProps> = ({ items, onItemClick }) => {
  return (
    <div className={styles.root}>
      {items.map(({ id, name }) => (
        <button
          key={id}
          className={styles.item}
          data-item-id={id}
          onClick={onItemClick}
          aria-label={`Points Item: ${name}`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default ItemsList;
