import { useReducer } from "react";
import Search from "../../components/Search";
import axios, { CancelTokenSource } from "axios";
import { API_ENDPOINT, API_KEY } from "../../config";
import { IFavorite } from "../../interfaces";
import RecipeList from "../../components/RecipeList";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { homePageReducer, HomePageState } from "./reducer";
import "./style.scss";

const initialMessage = "Start typing to search through the recipes!";
const initialResultsLimit = 15;

interface Props {
  favorites: IFavorite[];
  removeFavorite: (id: number) => void;
}

let cancel: CancelTokenSource | null = null;

const initialState: HomePageState = {
  isLoading: false,
  message: initialMessage,
  recipes: [],
  resultsLimit: initialResultsLimit,
  searchValue: "",
  totalResults: 0,
};

function HomePage({ favorites, removeFavorite }: Props): JSX.Element {
  const [{ isLoading, message, recipes, resultsLimit, searchValue, totalResults }, dispatch] =
    useReducer(homePageReducer, initialState);

  const fetchRecipes = async (query: string, limit: number) => {
    try {
      if (cancel) {
        cancel.cancel();
      }

      cancel = axios.CancelToken.source();
      const { data } = await axios.get(
        `${API_ENDPOINT}/recipes/complexSearch?apiKey=${API_KEY}&query=${query}&number=${limit}`,
        { cancelToken: cancel.token }
      );

      if (data && data.results && data.results.length) {
        dispatch({ type: "SET_RECIPES", payload: data.results });
        dispatch({ type: "SET_TOTAL_RESULTS", payload: data.totalResults });
        dispatch({ type: "SET_MESSAGE", payload: "" });
      } else {
        dispatch({ type: "SET_RECIPES", payload: [] });
        dispatch({ type: "SET_TOTAL_RESULTS", payload: 0 });
        dispatch({ type: "SET_MESSAGE", payload: "No recipes found." });
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        dispatch({ type: "SET_RECIPES", payload: [] });
        dispatch({ type: "SET_TOTAL_RESULTS", payload: 0 });
        dispatch({ type: "SET_MESSAGE", payload: "Failed to fetch search results." });
      }
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };

  const onSearchChange = (value: string) => {
    dispatch({ type: "SET_SEARCH_VALUE", payload: value });

    if (value) {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_RESULTS_LIMIT", payload: initialResultsLimit });

      fetchRecipes(value, initialResultsLimit);
    } else {
      dispatch({ type: "SET_RECIPES", payload: [] });
      dispatch({ type: "SET_MESSAGE", payload: initialMessage });
    }
  };

  const onLoadMore = () => {
    const newResultsLimit = resultsLimit + initialResultsLimit;

    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_RESULTS_LIMIT", payload: newResultsLimit });

    fetchRecipes(searchValue, newResultsLimit);
  };

  const showLoadMore = resultsLimit < totalResults;

  return (
    <div className="home-page" data-testid="home-page">
      <Link to="/favorites" className="favorites-title" data-testid="favorites-title">
        <div>
          <AiFillStar />
          <span>Favorites</span>
        </div>
      </Link>
      <Search value={searchValue} onChange={onSearchChange} />
      <RecipeList
        favorites={favorites}
        message={message}
        recipes={recipes}
        removeFavorite={removeFavorite}
      />
      {showLoadMore && (
        <div className="load-more">
          <button onClick={onLoadMore}>LOAD MORE</button>
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
}

export default HomePage;
