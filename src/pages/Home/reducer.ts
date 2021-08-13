import { IRecipe } from "../../interfaces";

export interface HomePageState {
  isLoading: boolean;
  message: string;
  recipes: IRecipe[];
  resultsLimit: number;
  searchValue: string;
  totalResults: number;
}

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_RECIPES"; payload: IRecipe[] }
  | { type: "SET_RESULTS_LIMIT"; payload: number }
  | { type: "SET_SEARCH_VALUE"; payload: string }
  | { type: "SET_TOTAL_RESULTS"; payload: number };

export function homePageReducer(state: HomePageState, action: Action): HomePageState {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "SET_MESSAGE": {
      return {
        ...state,
        message: action.payload,
      };
    }
    case "SET_RECIPES": {
      return {
        ...state,
        recipes: action.payload,
      };
    }
    case "SET_RESULTS_LIMIT": {
      return {
        ...state,
        resultsLimit: action.payload,
      };
    }
    case "SET_SEARCH_VALUE": {
      return {
        ...state,
        searchValue: action.payload,
      };
    }
    case "SET_TOTAL_RESULTS": {
      return {
        ...state,
        totalResults: action.payload,
      };
    }
    default:
      return state;
  }
}
