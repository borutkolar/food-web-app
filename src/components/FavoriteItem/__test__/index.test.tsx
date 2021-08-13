import ReactDOM from "react-dom";
import FavoriteItem from "..";
import { render, cleanup } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mockFavorites } from "../../../mock-data";

const mockFavorite = mockFavorites[0];

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <FavoriteItem removeFavorite={() => void 0} {...mockFavorite} />
    </Router>
  );
  const utils = render(component);
  const input = utils.getByTestId("favorite-item");

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
  const { getByText } = setup();
  const { name, preparationTime } = mockFavorite;
  expect(getByText(name)).toBeInTheDocument();
  expect(getByText(preparationTime.toString(), { exact: false })).toBeInTheDocument();
});

it("renders favorite icon", () => {
  const { queryByTestId } = setup();
  expect(queryByTestId("favorite-icon")).toBeTruthy();
});

it("does not render favorite icon if not favorite", () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <FavoriteItem isFavorite={false} removeFavorite={() => void 0} {...mockFavorite} />
    </Router>
  );

  const { queryByTestId } = render(component);
  expect(queryByTestId("favorite-icon")).toBeFalsy();
});
