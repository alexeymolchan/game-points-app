import { expect, describe, it } from "vitest";
import {
  getItemScoreAndBonusFromQuantity,
  getTotalScoreAndBonuses,
} from "./utils";

describe("getItemScoreAndBonusFromQuantity", () => {
  it("should correctly calculate score without bonus", () => {
    expect(getItemScoreAndBonusFromQuantity(2, 50, null)).toEqual({
      score: 100,
      bonusPoints: 0,
    });
  });
  it("should correctly calculate score when bonus is not reached", () => {
    expect(
      getItemScoreAndBonusFromQuantity(2, 50, { points: 70, count: 3 })
    ).toEqual({ score: 100, bonusPoints: 0 });
  });
  it("should correctly calculate score when bonus is reached", () => {
    expect(
      getItemScoreAndBonusFromQuantity(3, 50, { points: 200, count: 3 })
    ).toEqual({ score: 200, bonusPoints: 50 });
  });
  it("should correctly calculate score when bonus is reached multiple times", () => {
    expect(
      getItemScoreAndBonusFromQuantity(6, 50, { points: 250, count: 3 })
    ).toEqual({ score: 500, bonusPoints: 200 });

    expect(
      getItemScoreAndBonusFromQuantity(4, 50, { points: 250, count: 3 })
    ).toEqual({ score: 300, bonusPoints: 100 });
  });
  it("should correctly calculate score when bonus and remainder are available", () => {
    expect(
      getItemScoreAndBonusFromQuantity(4, 50, { points: 250, count: 3 })
    ).toEqual({ score: 300, bonusPoints: 100 });
  });
});

describe("getTotalScoreAndBonuses", () => {
  it("should correctly calculate total score and bonuses", () => {
    expect(
      getTotalScoreAndBonuses([
        { id: "1", name: "A", quantity: 2, score: 100, bonusPoints: 0 },
        { id: "2", name: "B", quantity: 10, score: 450, bonusPoints: 150 },
      ])
    ).toEqual({ total: 550, bonuses: 150 });
  });
});
