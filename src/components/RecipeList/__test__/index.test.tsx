import ReactDOM from "react-dom";
import RecipeList from "..";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockFavorites, mockRecipes } from "../../../mock-data";

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <RecipeList
        favorites={mockFavorites}
        recipes={mockRecipes}
        message=""
        removeFavorite={() => void 0}
      />
    </Router>
  );
  const utils = render(component);
  const input = utils.getByTestId("recipe-list");

  return {
    component,
    input,
    ...utils,
  };
};

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  const { component } = setup();
  ReactDOM.render(component, div);
});

it("renders list of data", () => {
  const { getAllByTestId } = setup();
  const listItems = getAllByTestId("recipe-item");
  expect(listItems).toHaveLength(mockRecipes.length);
});

it("renders correct message", () => {
  const message = "Start typing to search through the recipes!";
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <RecipeList
        favorites={mockFavorites}
        recipes={[]}
        message={message}
        removeFavorite={() => void 0}
      />
    </Router>
  );

  const { getByText } = render(component);
  expect(getByText(message)).toBeInTheDocument();
});
