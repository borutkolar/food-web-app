import { IRecipeInformation, ISimilarRecipe } from "../../interfaces";

export interface RecipePageState {
  recipeInformation: IRecipeInformation | null;
  recipeInformationLoading: boolean;
  recipeInformationMessage: string;
  similarRecipes: ISimilarRecipe[];
  similarRecipesLoading: boolean;
  similarRecipesMessage: string;
}

type Action =
  | { type: "SET_RECIPE_INFORMATION"; payload: IRecipeInformation }
  | { type: "SET_RECIPE_INFORMATION_LOADING"; payload: boolean }
  | { type: "SET_RECIPE_INFORMATION_MESSAGE"; payload: string }
  | { type: "SET_SIMILAR_RECIPES"; payload: ISimilarRecipe[] }
  | { type: "SET_SIMILAR_RECIPES_LOADING"; payload: boolean }
  | { type: "SET_SIMILAR_RECIPES_MESSAGE"; payload: string };

export function recipePageReducer(state: RecipePageState, action: Action): RecipePageState {
  switch (action.type) {
    case "SET_RECIPE_INFORMATION": {
      return {
        ...state,
        recipeInformation: action.payload,
      };
    }
    case "SET_RECIPE_INFORMATION_LOADING": {
      return {
        ...state,
        recipeInformationLoading: action.payload,
      };
    }
    case "SET_RECIPE_INFORMATION_MESSAGE": {
      return {
        ...state,
        recipeInformationMessage: action.payload,
      };
    }
    case "SET_SIMILAR_RECIPES": {
      return {
        ...state,
        similarRecipes: action.payload,
      };
    }
    case "SET_SIMILAR_RECIPES_LOADING": {
      return {
        ...state,
        similarRecipesLoading: action.payload,
      };
    }
    case "SET_SIMILAR_RECIPES_MESSAGE": {
      return {
        ...state,
        similarRecipesMessage: action.payload,
      };
    }
    default:
      return state;
  }
}
