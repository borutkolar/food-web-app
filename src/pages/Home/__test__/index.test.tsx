import HomePage from "..";
import { mockFavorites } from "../../../mock-data";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { cleanup, fireEvent, render, waitFor, within } from "@testing-library/react";

import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <HomePage favorites={mockFavorites} removeFavorite={() => void 0} />
    </Router>
  );
  const utils = render(component);

  return {
    component,
    ...utils,
  };
};

afterEach(cleanup);

test("renders initial message", () => {
  const { getByTestId } = setup();
  const page = getByTestId("home-page");
  expect(page).toBeInTheDocument();
  const { getByText } = within(page);
  expect(getByText(/start typing/i)).toBeTruthy();
});

test("renders correct elements", () => {
  const { getByTestId } = setup();

  const page = getByTestId("home-page");
  expect(page).toBeInTheDocument();
  const { getByTestId: getByTestIdPage } = within(page);
  const searchInput = getByTestIdPage("search") as HTMLInputElement;
  expect(getByTestIdPage("favorites-title")).toBeTruthy();
  expect(searchInput).toBeTruthy();

  fireEvent.change(searchInput, {
    target: {
      value: "pasta",
    },
  });
  expect(searchInput.value).toBe("pasta");

  const recipeList = getByTestIdPage("recipe-list");
  expect(recipeList).toBeTruthy();
});

test("renders error message", async () => {
  const { getByTestId } = setup();

  const page = getByTestId("home-page");
  expect(page).toBeInTheDocument();
  const { getByTestId: getByTestIdPage, getByText } = within(page);

  const searchInput = getByTestIdPage("search") as HTMLInputElement;
  expect(searchInput).toBeTruthy();

  fireEvent.change(searchInput, {
    target: {
      value: "pasta",
    },
  });
  expect(searchInput.value).toBe("pasta");

  mockedAxios.get.mockRejectedValue({});

  await waitFor(() => expect(getByText(/failed to fetch/i)).toBeTruthy());
});
