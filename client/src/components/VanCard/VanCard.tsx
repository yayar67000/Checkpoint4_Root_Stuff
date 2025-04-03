import "./VanCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";

export default function VanCard({ van }: VansDataProps) {
  const { role } = useAuth();

  const navigate = useNavigate();

  const saveVanCard = (van: VansData) => {
    if (window.confirm("Voulez-vous vraiment sauvegarder cette offre ?")) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/vans`, van, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/roadies/information", { replace: true });
        })
        .catch((error) => {
          console.error("Erreur lors de la sauvegarde de l'offre :", error);
        });
    }
  };

  const deleteVanCard = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/vans/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          navigate("/roadies/information", { replace: true });
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'offre :", error);
        });
    }
  };
  return (
    <>
      <Link
        key={van.id}
        to={`/vanDetails/${van.id}`}
        className="van_each_cards"
      >
        <div className="van_card">
          <img src={van.picture} alt={van.name} />
          <h2>{van.name}</h2>
          {role === "roadie" && (
            <>
              <button
                type="button"
                onClick={() => saveVanCard(van)}
                className="light-box"
              >
                Sauvegarder
              </button>
              {/* Show delete button only on /roadies/information page */}
              {location.pathname.startsWith("/roadies/information") && (
                <button
                  type="button"
                  onClick={() => deleteVanCard(van.id)}
                  className="light-box"
                >
                  SUPPRIMER
                </button>
              )}
            </>
          )}
        </div>
      </Link>
    </>
  );
}
