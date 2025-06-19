import "./ReservedVanCard.css";
import axios from "axios";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import { useReservedVans } from "../../services/ReservedVanContext";

export default function ReservedVanCard({
  reservedVan,
}: ReservedVansCardProps) {
  const { role } = useAuth();
  const { removeFromReserved } = useReservedVans();

  const [showEditForm, setShowEditForm] = useState(false);
  const [startDate, setStartDate] = useState(reservedVan.start_date);
  const [endDate, setEndDate] = useState(reservedVan.end_date);

  const isConnected = role !== "anonymous";

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/reserved_van/${reservedVan.id}`,
        {
          start_date: startDate,
          end_date: endDate,
        },
        {
          withCredentials: true,
        },
      );
      setShowEditForm(false);
      toast("🚐 Réservation modifiée avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la réservation :",
        error,
      );
      toast.error("Erreur lors de la modification de la réservation", {
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

  const deleteReservation = async () => {
    await removeFromReserved(reservedVan.id);
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
  };

  return (
    <div className="reserved_van_card_container">
      <div className="reserved_van_card">
        <img src={reservedVan.picture} alt={reservedVan.name} />
        <h2>{reservedVan.name}</h2>
        <div className="reservations_dates">
          <p>Date du départ : {formatDate(reservedVan.start_date)}</p>
          <p>Date de retour : {formatDate(reservedVan.end_date)}</p>
        </div>
        {isConnected && (
          <div className="buttons_card_reservation">
            <button
              type="button"
              className="delete-box"
              onClick={deleteReservation}
            >
              Supprimer la réservation
            </button>
            <button
              type="button"
              className="edit-box"
              onClick={handleEditClick}
            >
              Modifier la réservation
            </button>
          </div>
        )}
      </div>

      {showEditForm && (
        <form className="edit_form" onSubmit={handleSubmit}>
          <label>
            Date de début :
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            Date de fin :
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="submit_edit"
            onClick={() => setShowEditForm(false)}
          >
            Modifier
          </button>
        </form>
      )}
    </div>
  );
}
