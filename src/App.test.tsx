import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { itemsMap } from "./constants";
import App from "./App";

const itemsList = Object.values(itemsMap);
const initialBonusesText = "Bonuses 0";
const initialTotalText = "Total 0";

describe("App", () => {
  it("renders initial layout", () => {
    render(<App itemsConfig={itemsMap} />);

    // items
    itemsList.forEach(({ id, name }) => {
      const item = screen.getByTestId(`item-button-${id}`);
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent(name);
    });

    // player items
    expect(screen.getByTestId("player-items-root")).toBeInTheDocument();
    expect(screen.getByTestId("player-items-header")).toBeInTheDocument();
    const tableBody = screen.getByTestId("player-items-body");
    expect(tableBody).toBeInTheDocument();
    expect(tableBody.children.length).toBe(0);

    // summary
    expect(screen.getByTestId("summary-bonuses")).toHaveTextContent(
      initialBonusesText
    );
    expect(screen.getByTestId("summary-total")).toHaveTextContent(
      initialTotalText
    );
    expect(screen.getByTestId("new-game-button")).toBeInTheDocument();
  });

  it("add items, calculates total and bonuses", () => {
    render(<App itemsConfig={itemsMap} />);

    const { id: aItemId } = itemsList[0];
    const { id: bItemId } = itemsList[1];

    const bonuses = screen.getByTestId("summary-bonuses");
    const total = screen.getByTestId("summary-total");
    const aItem = screen.getByTestId(`item-button-${aItemId}`);
    const bItem = screen.getByTestId(`item-button-${bItemId}`);

    expect(bonuses).toHaveTextContent(initialBonusesText);
    expect(total).toHaveTextContent(initialTotalText);

    fireEvent.click(bItem);

    expect(
      screen.getByTestId(`player-items-row-${bItemId}`)
    ).toBeInTheDocument();
    expect(bonuses.textContent).toMatchSnapshot();
    expect(total.textContent).toMatchSnapshot();

    fireEvent.click(aItem);

    expect(
      screen.getByTestId(`player-items-row-${aItemId}`)
    ).toBeInTheDocument();
    expect(bonuses.textContent).toMatchSnapshot();
    expect(total.textContent).toMatchSnapshot();

    fireEvent.click(bItem);

    expect(bonuses.textContent).toMatchSnapshot();
    expect(total.textContent).toMatchSnapshot();

    fireEvent.click(aItem);
    fireEvent.click(aItem);

    expect(bonuses.textContent).toMatchSnapshot();
    expect(total.textContent).toMatchSnapshot();
  });

  it("should successfully reset player points", () => {
    render(<App itemsConfig={itemsMap} />);

    const { id: aItemId } = itemsList[0];

    const bonuses = screen.getByTestId("summary-bonuses");
    const total = screen.getByTestId("summary-total");
    const aItem = screen.getByTestId(`item-button-${aItemId}`);
    const newGameButton = screen.getByTestId("new-game-button");

    expect(bonuses).toHaveTextContent(initialBonusesText);
    expect(total).toHaveTextContent(initialTotalText);

    fireEvent.click(aItem);
    fireEvent.click(aItem);
    fireEvent.click(aItem);

    const row = screen.getByTestId(`player-items-row-${aItemId}`);

    expect(row).toBeInTheDocument();
    expect(bonuses.textContent).toMatchSnapshot();
    expect(total.textContent).toMatchSnapshot();

    fireEvent.click(newGameButton);

    expect(screen.getByTestId("player-items-body").children.length).toBe(0);
    expect(row).not.toBeInTheDocument();
    expect(bonuses).toHaveTextContent(initialBonusesText);
    expect(total).toHaveTextContent(initialTotalText);
  });
});
