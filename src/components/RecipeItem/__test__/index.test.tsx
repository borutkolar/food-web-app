import ReactDOM from "react-dom";
import RecipeItem from "..";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockRecipes } from "../../../mock-data";
import "@testing-library/jest-dom";

const mockRecipe = mockRecipes[0];

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <RecipeItem data={mockRecipe} isFavorite removeFavorite={() => void 0} />
    </Router>
  );
  const utils = render(component);
  const input = utils.getByTestId("recipe-item");

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

it("renders correct data", () => {
  const { getByText, queryByTestId } = setup();
  const { image, title } = mockRecipe;
  expect(getByText(title)).toBeInTheDocument();
  expect(queryByTestId("recipe-list-img")).toHaveAttribute("src", image);
});

it("renders favorite icon", () => {
  const { queryByTestId } = setup();
  expect(queryByTestId("recipe-favorite")).toBeTruthy();
});

it("does not render favorite icon if not favorite", () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <RecipeItem data={mockRecipe} isFavorite={false} removeFavorite={() => void 0} />
    </Router>
  );

  const { queryByTestId } = render(component);
  expect(queryByTestId("recipe-favorite")).toBeFalsy();
});
