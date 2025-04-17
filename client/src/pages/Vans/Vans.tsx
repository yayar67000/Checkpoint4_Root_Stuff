import { useLoaderData } from "react-router-dom";
import VanCard from "../../components/VanCard/VanCard";
import "./Vans.css";

export default function Vans() {
  const allVans = useLoaderData() as VansData[];

  const handleAddFavorite = async (vanId: number) => {
    console.info(`Ajout du van ${vanId} aux favoris`);
  };

  const handleRemoveFavorite = async (favoriteVanId: number) => {
    console.info(`Suppression du favori ${favoriteVanId}`);
  };
  return (
    <main className="all_vans_page">
      <h1>Vans</h1>
      <div>
        {allVans.length > 0
          ? allVans.map((van) => (
              <VanCard
                key={van.id}
                van={van}
                isFavorite={false}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))
          : null}
      </div>
    </main>
  );
}
