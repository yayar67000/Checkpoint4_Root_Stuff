import "./VansDetails.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useReservedVans } from "../../services/ReservedVanContext";

export default function VansDetails() {
  const { vans, reservedVan } = useLoaderData() as {
    vans: VansByCompanyData;
    reservedVan: ReservedVansData;
  };
  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  const { addToReserved, updateReservation, removeFromReserved } =
    useReservedVans();

  const { revalidate } = useRevalidator();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addToReserved(vans.id, startDate, endDate);
      alert(`Réservation pour le van ${vans.name} effectuée !`);
      setIsReserved(true);
      setShowModal(false);
      setStartDate("");
      setEndDate("");
      revalidate();
      toast("🚐 Réservation effectuée avec succès !", {
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
      alert("Erreur lors de la réservation !");
      console.error(error);
    }
  };

  const handleEditSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      if (Array.isArray(reservedVan)) {
        if (reservedVan.length === 0) return;
        await updateReservation(reservedVan[0].id, startDate, endDate);
      } else if (reservedVan) {
        await updateReservation(reservedVan.id, startDate, endDate);
      } else {
        return;
      }

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

  const handleCancel = async () => {
    console.info("reservedVan", reservedVan);

    if (Array.isArray(reservedVan)) {
      if (reservedVan.length === 0) return;
      await removeFromReserved(reservedVan[0].id);
    } else if (reservedVan) {
      await removeFromReserved(reservedVan.id);
    } else {
      return;
    }
    setIsReserved(false);
    revalidate();
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

  const toDipslayDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    const [year, month, day] = date.toISOString().split("T")[0].split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <main className="all_vansdetails_page">
      <h1>Détails du véhicule : {vans.name}</h1>
      <article className="infos_vans">
        <img src={vans.picture} alt={vans.name} />
        <h2>{vans.name}</h2>
        <p>Marque : {vans.brand}</p>
        <p>Escence : {vans.fuel}</p>
        <p>Poids: {vans.lbs}</p>
        <p>Immatriculation : {vans.number_plate}</p>
        {Array.isArray(reservedVan) && reservedVan.length > 0 ? (
          <p>
            Réservé du {toDipslayDate(reservedVan[0]?.start_date)} au{" "}
            {toDipslayDate(reservedVan[0]?.end_date)}
          </p>
        ) : reservedVan?.start_date ? (
          <p>
            Réservé du {toDipslayDate(reservedVan?.start_date)} au{" "}
            {toDipslayDate(reservedVan?.end_date)}
          </p>
        ) : null}
        {!reservedVan && !isReserved ? (
          <button
            id="reserve-button"
            type="button"
            className="colored-box"
            onClick={() => setShowModal(true)}
          >
            Réserver
          </button>
        ) : (
          <div className="edit_delete_reservation">
            <button
              id="edit_box"
              type="button"
              className="edit-box"
              onClick={() => setShowEditForm(true)}
            >
              Modifier la réservation
            </button>
            <button
              id="delete_box"
              type="button"
              className="delete-box"
              onClick={handleCancel}
            >
              Annuler la réservation
            </button>
          </div>
        )}
      </article>
      {showModal && (
        <div className="reservation_content">
          <h3>Réserver ce van</h3>
          <form onSubmit={handleSubmit}>
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

            <button id="colored-box" type="submit" className="colored-box">
              Valider
            </button>
            <button
              id="cancel-reservation-button"
              type="button"
              onClick={() => setShowModal(false)}
              className="delete-box"
            >
              Annuler
            </button>
          </form>
        </div>
      )}
      {showEditForm && (
        <form className="edit_form" onSubmit={handleEditSubmit}>
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
            id="cancel-edit-button"
            type="button"
            className="delete-box"
            onClick={() => setShowEditForm(false)}
          >
            Annuler
          </button>
          <button id="colored-box" type="submit" className="colored-box">
            Valider
          </button>
        </form>
      )}
    </main>
  );
}
