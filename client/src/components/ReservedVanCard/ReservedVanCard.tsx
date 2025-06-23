import "./ReservedVanCard.css";
import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import { useReservedVans } from "../../services/ReservedVanContext";

export default function ReservedVanCard({
  reservedVan,
}: ReservedVansCardProps) {
  const { role } = useAuth();
  const { removeFromReserved, updateReservation } = useReservedVans();

  const toDipslayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    const [year, month, day] = date.toISOString().split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  // const toInputDate = (dateString: string) => {
  //   if (!dateString) return "";
  //   return dateString.split("T")[0];
  // };

  const [showEditForm, setShowEditForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isConnected = role !== "anonymous";
  const { revalidate } = useRevalidator();

  const handleEditClick = () => {
    setStartDate(toDipslayDate(reservedVan.start_date));
    setEndDate(toDipslayDate(reservedVan.end_date));
    setShowEditForm(true);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      await await updateReservation(reservedVan.id, startDate, endDate);
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
      revalidate();
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
          <p>Date du départ : {toDipslayDate(reservedVan.start_date)}</p>
          <p>Date de retour : {toDipslayDate(reservedVan.end_date)}</p>
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
            type="button"
            className="delete-box"
            onClick={() => setShowEditForm(false)}
          >
            Annuler
          </button>
          <button type="submit" className="colored-box">
            Valider
          </button>
        </form>
      )}
    </div>
  );
}
