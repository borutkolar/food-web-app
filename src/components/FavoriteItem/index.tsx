import React from "react";
import { CgTimer } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.scss";

interface Props {
  id: number;
  name: string;
  preparationTime: number;
  removeFavorite: (id: number) => void;
  isFavorite?: boolean;
}

function FavoriteItem({
  id,
  name,
  preparationTime,
  isFavorite = true,
  removeFavorite,
}: Props): JSX.Element {
  const onFavoriteClick = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    event.preventDefault();
    removeFavorite(id);
  };

  return (
    <Link
      data-testid="favorite-item"
      to={`/recipe/${id}`}
      className="favorite-item with-box-shadow with-hover-scale"
    >
      <div className="recipe-data">
        <p>{name}</p>
        <div className="preparation-time">
          <CgTimer />
          <span>{`${preparationTime} minutes`}</span>
        </div>
      </div>
      {isFavorite && (
        <AiFillStar
          data-testid="favorite-icon"
          className="favorite-icon"
          onClick={onFavoriteClick}
        />
      )}
    </Link>
  );
}

export default FavoriteItem;
