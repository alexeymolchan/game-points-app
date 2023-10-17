import { Bonus, PlayerItem } from "./types";

export const getItemScoreAndBonusFromQuantity = (
  quantity: number,
  unitPoints: number,
  bonus: Bonus
) => {
  const scoreWithoutBonus = quantity * unitPoints;
  if (!bonus || quantity < bonus.count)
    return { score: scoreWithoutBonus, bonusPoints: 0 };

  const remainder = quantity % bonus.count;
  const scoreWithBonus =
    remainder * unitPoints +
    ((quantity - remainder) / bonus.count) * bonus.points;

  return {
    score: scoreWithBonus,
    bonusPoints: scoreWithBonus - scoreWithoutBonus,
  };
};

export const getTotalScoreAndBonuses = (playerItems: PlayerItem[]) =>
  playerItems.reduce(
    ({ bonuses, total }, { bonusPoints, score }) => ({
      bonuses: bonuses + bonusPoints,
      total: total + score,
    }),
    { total: 0, bonuses: 0 }
  );
