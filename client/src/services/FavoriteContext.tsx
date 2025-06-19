import { createContext, useContext, useEffect, useState } from "react";
import {
  addFavoriteVan,
  getFavoriteVans,
  removeFavoriteVan,
} from "../services/requests";

const FavoriteContext = createContext<FavoriteContextProps | undefined>(
  undefined,
);

export const FavoriteProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [favoriteVans, setFavoriteVans] = useState<FavoriteVansData[]>([]);

  // Charger les favoris au montage du composant
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavoriteVans();
        setFavoriteVans(favorites || []);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
        setFavoriteVans([]);
      }
    };

    fetchFavorites();
  }, []);

  // Vérifie si un van est dans les favoris
  const isFavorite = (vanId: number) => {
    return favoriteVans?.some((van) => van.van_id === vanId) || false;
  };

  // Ajouter un van aux favoris
  const addToFavorites = async (vanId: number) => {
    try {
      await addFavoriteVan(vanId);
      const updatedFavorites = await getFavoriteVans();
      setFavoriteVans(updatedFavorites);
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
    }
  };

  // Supprimer un van des favoris
  const removeFromFavorites = async (vanId: number) => {
    try {
      // Trouve le favori correspondant à ce van
      const favorite = favoriteVans.find((fav) => fav.van_id === vanId);
      if (!favorite) {
        console.error("Favori non trouvé pour ce van !");
        return;
      }
      await removeFavoriteVan(favorite.id); // id de la réservation/favori
      const updatedFavorites = await getFavoriteVans();
      setFavoriteVans(updatedFavorites);
    } catch (error) {
      console.error("Erreur lors de la suppression des favoris :", error);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteVans, isFavorite, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites doit être utilisé dans un FavoriteProvider");
  }
  return context;
};
