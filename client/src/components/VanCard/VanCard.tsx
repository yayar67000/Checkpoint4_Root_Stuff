import "./VanCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import { useFavorites } from "../../services/FavoriteContext";

export default function VanCard({ van }: VansCardProps) {
  const { role } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const isConnected = role !== "anonymous";
  const [favorite, setFavorite] = useState(isFavorite(van.id));

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

  return (
    <div className="van_card_container">
      <Link to={`/vanDetails/${van.id}`}>
        <div className="van_card">
          <img src={van.picture} alt={van.name} />
          <h2>{van.name}</h2>
        </div>
      </Link>
      {isConnected && (
        <button
          type="button"
          className={favorite ? "delete-box" : "colored-box"}
          onClick={handleFavoriteToggle}
        >
          {favorite ? "Supprimer des favoris" : "Ajouter dans mes favoris"}
        </button>
      )}
    </div>
  );
}
