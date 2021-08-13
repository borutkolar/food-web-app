import { IFavorite } from "../../interfaces";
import FavoriteItem from "../FavoriteItem";
import "./style.scss";

interface Props {
  data: IFavorite[];
  emptyListMessage: string;
  removeFavorite: (id: number) => void;
}

function FavoritesList({ data, emptyListMessage, removeFavorite }: Props): JSX.Element {
  return (
    <div data-testid="favorites-list" className="favorites-list">
      <h1>Your favorite recipes</h1>
      {data.length ? (
        data.map((item, index) => (
          <FavoriteItem key={index} removeFavorite={removeFavorite} {...item} />
        ))
      ) : (
        <p className="info-message">{emptyListMessage}</p>
      )}
    </div>
  );
}

export default FavoritesList;
