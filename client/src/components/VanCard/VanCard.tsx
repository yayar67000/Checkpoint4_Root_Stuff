import "./VanCard.css";
import { useAuth } from "../../services/AuthContext";
import { useFavorites } from "../../services/FavoriteContext";

export default function VanCard({ van }: VansCardProps) {
  const { role } = useAuth();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const isConnected = role !== "anonymous"; // Vérifie si l'utilisateur est connecté
  const favorite = isFavorite(van.id); // Vérifie si le van est dans les favoris

  const handleFavoriteToggle = async () => {
    if (favorite) {
      await removeFromFavorites(van.id); // Supprime des favoris
    } else {
      await addToFavorites(van.id); // Ajoute aux favoris
    }
  };

  return (
    <div className="van_card_container">
      <div className="van_card">
        <img src={van.picture} alt={van.name} />
        <h2>{van.name}</h2>
      </div>
      {isConnected && (
        <button
          type="button"
          className={favorite ? "light-box" : "colored-box"}
          onClick={handleFavoriteToggle}
        >
          {favorite ? "Supprimer des favoris" : "Ajouter dans mes favoris"}
        </button>
      )}
    </div>
  );
}
