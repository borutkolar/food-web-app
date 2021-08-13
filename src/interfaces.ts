export interface IRecipe {
  id: number;
  image: string;
  title: string;
}

export interface IRecipeInformation extends IRecipe {
  instructions: string;
  readyInMinutes: number;
  servings: number;
}

export interface IFavorite {
  id: number;
  name: string;
  preparationTime: number;
}

export interface ISimilarRecipe {
  id: number;
  readyInMinutes: number;
  title: string;
}
