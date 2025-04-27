import "./VanCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import { useFavorites } from "../../services/FavoriteContext";
import { useReserved } from "../../services/ReservedVanContext";

export default function VanCard({ van }: VansCardProps) {
  const { role } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isReserved, addToReserved, removeFromReserved } = useReserved();

  const isConnected = role !== "anonymous";
  const [favorite, setFavorite] = useState(isFavorite(van.id));
  const [reserved, setReserved] = useState(isReserved(van.id));

  const handleFavoriteToggle = async () => {
    if (favorite) {
      await removeFromFavorites(van.id);
      setFavorite(false);
      toast("🚐 Van supprimé des favoris !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      await addToFavorites(van.id);
      setFavorite(true);
      toast("🚐 Van ajouté aux favoris !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleReservedToggle = async () => {
    if (reserved) {
      await removeFromReserved(van.id);
      setReserved(false);
      toast("🚐 Van supprimé des réservations !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } else {
      await addToReserved(van.id);
      setReserved(true);
      toast("🚐 Van ajouté aux réservations !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="van_card_container">
      <Link to={`/vanDetails/${van.id}`}>
        <div className="van_card">
          <img src={van.picture} alt={van.name} />
          <h2>{van.name}</h2>
        </div>
      </Link>
      {isConnected && (
        <div className="buttons_favorite_reserved">
          <button
            type="button"
            className={favorite ? "light-box" : "colored-box"}
            onClick={handleFavoriteToggle}
          >
            {favorite ? "Supprimer des favoris" : "Ajouter dans mes favoris"}
          </button>
          <button
            type="button"
            className={reserved ? "light-box" : "colored-box"}
            onClick={handleReservedToggle}
          >
            {reserved ? "Annuler la réservation" : "Réserver"}
          </button>
        </div>
      )}
    </div>
  );
}
