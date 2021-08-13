import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import { API_ENDPOINT, API_KEY } from "../../config";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IFavorite } from "../../interfaces";
import Loading from "../../components/Loading";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { CgTimer } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi";
import SimilarRecipes from "../../components/SimilarRecipes";
import { recipePageReducer, RecipePageState } from "./reducer";
import "./style.scss";

interface Props extends RouteComponentProps<{ id: string }> {
  favorites: IFavorite[];
  addFavorite: (item: IFavorite) => void;
  removeFavorite: (id: number) => void;
}

const initialState: RecipePageState = {
  recipeInformation: null,
  recipeInformationLoading: true,
  recipeInformationMessage: "",
  similarRecipes: [],
  similarRecipesLoading: true,
  similarRecipesMessage: "",
};

function RecipePage({ favorites, match, addFavorite, removeFavorite }: Props): JSX.Element {
  const [
    {
      recipeInformation,
      recipeInformationLoading,
      recipeInformationMessage,
      similarRecipes,
      similarRecipesLoading,
      similarRecipesMessage,
    },
    dispatch,
  ] = useReducer(recipePageReducer, initialState);

  const fetchRecipeInformation = useCallback(async () => {
    dispatch({ type: "SET_RECIPE_INFORMATION_LOADING", payload: true });

    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/recipes/${match.params.id}/information?apiKey=${API_KEY}`
      );
      if (data && data.id) {
        dispatch({ type: "SET_RECIPE_INFORMATION", payload: data });
      }
    } catch (e) {
      dispatch({
        type: "SET_RECIPE_INFORMATION_MESSAGE",
        payload: "Failed to fetch recipe information.",
      });
    }

    dispatch({ type: "SET_RECIPE_INFORMATION_LOADING", payload: false });
  }, [match.params.id]);

  const fetchSimilarRecipes = useCallback(async () => {
    dispatch({ type: "SET_SIMILAR_RECIPES_LOADING", payload: true });

    try {
      const { data } = await axios.get(
        `${API_ENDPOINT}/recipes/${match.params.id}/similar?apiKey=${API_KEY}`
      );
      if (data && data.length) {
        dispatch({ type: "SET_SIMILAR_RECIPES", payload: data });
        dispatch({ type: "SET_SIMILAR_RECIPES_MESSAGE", payload: "" });
      } else {
        dispatch({ type: "SET_SIMILAR_RECIPES", payload: [] });
        dispatch({ type: "SET_SIMILAR_RECIPES_MESSAGE", payload: "No similar recipes found." });
      }
    } catch (e) {
      dispatch({
        type: "SET_SIMILAR_RECIPES_MESSAGE",
        payload: "Failed to fetch recipe information.",
      });
    }

    dispatch({ type: "SET_SIMILAR_RECIPES_LOADING", payload: false });
  }, [match.params.id]);

  useEffect(() => {
    fetchRecipeInformation();
    fetchSimilarRecipes();
  }, [fetchRecipeInformation, fetchSimilarRecipes]);

  const favoriteElement =
    recipeInformation && favorites.find((f) => f.id === recipeInformation.id) ? (
      <div
        className="favorite-text is-favorite"
        onClick={() => removeFavorite(recipeInformation.id)}
      >
        <AiFillStar />
        <span>Remove from Favorites</span>
      </div>
    ) : (
      <div
        className="favorite-text not-favorite"
        onClick={() =>
          recipeInformation &&
          addFavorite({
            id: recipeInformation.id,
            name: recipeInformation.title,
            preparationTime: recipeInformation.readyInMinutes,
          })
        }
      >
        <AiOutlineStar />
        <span>Add to Favorites</span>
      </div>
    );

  return (
    <div className="recipe-page" data-testid="recipe-page">
      {recipeInformation ? (
        <div className="recipe-information-content">
          <div className="main-wrapper">
            <img
              src={recipeInformation.image}
              className="recipe-img"
              alt={recipeInformation.title}
              data-testid="recipe-img"
              loading="lazy"
            />
            <h1>{recipeInformation.title}</h1>
            {favoriteElement}
            <div className="icon-text-row">
              <CgTimer />
              <span>{`${recipeInformation.readyInMinutes} minutes (preparation time)`}</span>
            </div>
            <div className="icon-text-row">
              <HiUserGroup />
              <span>{`${recipeInformation.servings} (servings)`}</span>
            </div>
            <p>{recipeInformation.instructions}</p>
          </div>
          <SimilarRecipes
            data={similarRecipes}
            favorites={favorites}
            message={similarRecipesMessage}
            removeFavorite={removeFavorite}
          />
        </div>
      ) : (
        <p className="info-message">{recipeInformationMessage}</p>
      )}
      {(recipeInformationLoading || similarRecipesLoading) && <Loading />}
    </div>
  );
}

export default withRouter(RecipePage);
