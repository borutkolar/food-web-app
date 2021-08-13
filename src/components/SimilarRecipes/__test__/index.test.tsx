import ReactDOM from "react-dom";
import SimilarRecipes from "..";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockFavorites, mockSimilarRecipes } from "../../../mock-data";

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <SimilarRecipes
        data={mockSimilarRecipes}
        favorites={mockFavorites}
        message=""
        removeFavorite={() => void 0}
      />
    </Router>
  );
  const utils = render(component);
  const input = utils.getByTestId("similar-recipes");

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

it("renders title", () => {
  const { getByText } = setup();
  expect(getByText(/similar recipes/i)).toBeInTheDocument();
});

it("renders list of data", () => {
  const { getAllByTestId } = setup();
  const listItems = getAllByTestId("favorite-item");
  expect(listItems).toHaveLength(mockSimilarRecipes.length);
});

it("renders correct if no data", () => {
  const message = "Failed to fetch recipe information";
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <SimilarRecipes
        data={[]}
        favorites={mockFavorites}
        message={message}
        removeFavorite={() => void 0}
      />
    </Router>
  );

  const { getByText } = render(component);
  expect(getByText(message)).toBeInTheDocument();
});
