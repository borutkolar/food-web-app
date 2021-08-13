import { IFavorite } from "../../interfaces";
import FavoritesList from "../../components/FavoritesList";

interface Props {
  data: IFavorite[];
  removeFavorite: (id: number) => void;
}

function FavoritesPage({ data, removeFavorite }: Props): JSX.Element {
  return (
    <div data-testid="favorites-page" className="favorites-page">
      <FavoritesList
        data={data}
        emptyListMessage="No recipe found on your favorites list."
        removeFavorite={removeFavorite}
      />
    </div>
  );
}

export default FavoritesPage;
