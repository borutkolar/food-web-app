import { IFavorite, ISimilarRecipe } from "../../interfaces";
import FavoriteItem from "../FavoriteItem";
import "./style.scss";

interface Props {
  data: ISimilarRecipe[];
  favorites: IFavorite[];
  message: string;
  removeFavorite: (id: number) => void;
}

function SimilarRecipes({ data, favorites, message, removeFavorite }: Props): JSX.Element {
  return (
    <div data-testid="similar-recipes" className="similar-recipes">
      {data.length ? (
        <div className="similar-recipes-container">
          <h3>Similar recipes</h3>
          <div className="similar-recipes-list">
            {data.map((item, index) => {
              const favoriteFound = favorites.find((f) => f.id === item.id);
              const isFavorite = Boolean(favoriteFound);

              return (
                <FavoriteItem
                  key={index}
                  id={item.id}
                  name={item.title}
                  preparationTime={item.readyInMinutes}
                  isFavorite={isFavorite}
                  removeFavorite={removeFavorite}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p className="info-message">{message}</p>
      )}
    </div>
  );
}

export default SimilarRecipes;
