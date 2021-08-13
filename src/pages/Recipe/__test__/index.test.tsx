import RecipePage from "..";
import { mockFavorites, mockRecipeInformation } from "../../../mock-data";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { cleanup, render, waitFor, within } from "@testing-library/react";

import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const setup = () => {
  const history = createMemoryHistory();
  const component = (
    <Router history={history}>
      <RecipePage
        addFavorite={() => void 0}
        favorites={mockFavorites}
        removeFavorite={() => void 0}
      />
    </Router>
  );
  const utils = render(component);

  return {
    component,
    ...utils,
  };
};

afterEach(cleanup);

test("renders recipe information", async () => {
  mockedAxios.get.mockResolvedValue({ data: mockRecipeInformation });
  const { getByTestId } = setup();

  expect(getByTestId("loading")).toBeInTheDocument();

  await waitFor(() => {
    const page = getByTestId("recipe-page");
    expect(page).toBeInTheDocument();
    const { getByText, getByTestId: getByTestIdPage } = within(page);
    expect(getByText(mockRecipeInformation.title)).toBeTruthy();
    expect(getByTestIdPage("recipe-img")).toHaveAttribute("src", mockRecipeInformation.image);
    expect(getByText(mockRecipeInformation.instructions)).toBeTruthy();
    expect(
      getByText(mockRecipeInformation.readyInMinutes.toString(), { exact: false })
    ).toBeTruthy();
    expect(getByText(`${mockRecipeInformation.servings} (servings)`)).toBeTruthy();
    expect(getByTestIdPage("similar-recipes")).toBeInTheDocument();
  });
});

test("renders error message", async () => {
  mockedAxios.get.mockRejectedValue({});
  const { getByTestId } = setup();

  expect(getByTestId("loading")).toBeInTheDocument();

  await waitFor(() => {
    const page = getByTestId("recipe-page");
    expect(page).toBeInTheDocument();
    const { getByText } = within(page);
    expect(getByText(/failed to fetch/i)).toBeTruthy();
  });
});
