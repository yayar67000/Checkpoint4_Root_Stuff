import "./VanCard.css";

import { Link } from "react-router-dom";

export default function VanCard({
  van,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}: VansCardProps) {
  return (
    <div className="van_card_container">
      <Link
        key={van.id}
        to={`/vanDetails/${van.id}`}
        className="van_each_cards"
      >
        <div className="van_card">
          <img src={van.picture} alt={van.name} />
          <h2>{van.name}</h2>
        </div>
      </Link>
      {isFavorite ? (
        <button
          type="button"
          className="light-box"
          onClick={() => onRemoveFavorite(van.id)}
        >
          Supprimer des favoris
        </button>
      ) : (
        <button
          type="button"
          className="colored-box"
          onClick={() => onAddFavorite(van.id)}
        >
          Ajouter aux favoris
        </button>
      )}
    </div>
  );
}
