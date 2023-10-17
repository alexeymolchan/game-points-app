import { ItemsMap } from "./types";

export const itemsMap = {
  "1": {
    id: "1",
    name: "A",
    unitPoints: 50,
    bonus: {
      count: 3,
      points: 200,
    },
  },
  "2": {
    id: "2",
    name: "B",
    unitPoints: 30,
    bonus: {
      count: 2,
      points: 90,
    },
  },
  "3": {
    id: "3",
    name: "C",
    unitPoints: 20,
    bonus: null,
  },
  "4": {
    id: "4",
    name: "D",
    unitPoints: 15,
    bonus: null,
  },
} satisfies ItemsMap;

export type ItemId = keyof typeof itemsMap;
