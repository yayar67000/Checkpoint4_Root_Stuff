import "./VansDetails.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { addReservedVan, deleteReservedVan } from "../../services/requests";

export default function VansDetails() {
  const { vans, reservedVan } = useLoaderData() as {
    vans: VansByCompanyData;
    reservedVan?: ReservedVansData;
  };
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isReserved, setIsReserved] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.info({
        van_id: vans.id,
        start_date: startDate,
        end_date: endDate,
      });
      await addReservedVan({
        van_id: vans.id,
        start_date: startDate,
        end_date: endDate,
      });
      alert(`Réservation pour le van ${vans.name} effectuée !`);
      setIsReserved(true);
      setShowModal(false);
      setStartDate("");
      setEndDate("");
    } catch (error) {
      alert("Erreur lors de la réservation !");
      console.error(error);
    }
  };

  const handleCancel = async () => {
    if (!reservedVan) {
      alert("Aucune réservation à annuler !");
      return;
    }
    try {
      await deleteReservedVan(reservedVan.id);
      setIsReserved(false);
      alert("Réservation annulée !");
    } catch (error) {
      alert("Erreur lors de l'annulation !");
      console.error(error);
    }
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
        {!reservedVan && !isReserved ? (
          <button
            type="button"
            className="colored-box"
            onClick={() => setShowModal(true)}
          >
            Réserver
          </button>
        ) : (
          <button type="button" className="delete-box" onClick={handleCancel}>
            Annuler la réservation
          </button>
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

            <button type="submit" className="colored-box">
              Valider
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="delete-box"
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
