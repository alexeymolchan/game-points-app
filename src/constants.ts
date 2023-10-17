import { Item } from "./types";

export const itemsMap = {
  "1": {
    id: "1",
    item: "A",
    unitPoints: 50,
    bonus: {
      count: 3,
      points: 200,
    },
  },
  "2": {
    id: "2",
    item: "B",
    unitPoints: 30,
    bonus: {
      count: 2,
      points: 90,
    },
  },
  "3": {
    id: "3",
    item: "C",
    unitPoints: 20,
    bonus: null,
  },
  "4": {
    id: "4",
    item: "D",
    unitPoints: 15,
    bonus: null,
  },
} satisfies Record<string, Item>;

export type ItemId = keyof typeof itemsMap;

export const itemsList = Object.keys(itemsMap) as ItemId[];
