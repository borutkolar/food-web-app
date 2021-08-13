import ReactDOM from "react-dom";
import Favorites from "..";
import { render, cleanup } from "@testing-library/react";
import { mockFavorites } from "../../../mock-data";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <Favorites data={mockFavorites} removeFavorite={() => void 0} />
    </Router>
  );
  const utils = render(component);
  const page = utils.getByTestId("favorites-page");

  return {
    component,
    page,
    ...utils,
  };
};

it("renders without crashing", () => {
  const div = document.createElement("div");
  const { component } = setup();
  ReactDOM.render(component, div);
});

it("renders list component", () => {
  const { getByTestId } = setup();
  expect(getByTestId("favorites-list")).toBeTruthy();
});
