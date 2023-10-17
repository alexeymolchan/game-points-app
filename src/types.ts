export type Item = {
  id: string;
  name: string;
  unitPoints: number;
  bonus: Bonus;
};

export type Bonus = {
  count: number;
  points: number;
} | null;
