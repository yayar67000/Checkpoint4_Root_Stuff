import "./RoadieInformation.css";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ReservedVanCard from "../../components/ReservedVanCard/ReservedVanCard";
import VanCard from "../../components/VanCard/VanCard";
import { useFavorites } from "../../services/FavoriteContext";
import { useReservedVans } from "../../services/ReservedVanContext";

export default function RoadieInformation() {
  const { revalidate } = useRevalidator();
  const location = useLocation();
  const { roadie } = useLoaderData() as {
    roadie: RoadieData;
  };

  const { favoriteVans, addToFavorites, removeFromFavorites } = useFavorites();
  const { reservedVans, addToReserved, removeFromReserved } = useReservedVans();

  const roadieToUpdate = {
    firstname: roadie.firstname,
    lastname: roadie.lastname,
    email: roadie.email,
  };

  const [updatedRoadie, setUpdatedRoadie] = useState(roadieToUpdate);
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setUpdatedRoadie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/roadies`,
        updatedRoadie,
        {
          withCredentials: true,
        },
      );
      setErrorMessage("");

      console.info("Données mises à jour avec succès !");
      toast.success("Données mises à jour avec succès !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      revalidate();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erreur lors de l'ajout de l'offre :", error);
        setErrorMessage(error.response?.data.error);
        toast.error(errorMessage, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      } else {
        console.error("Une erreur inattendue s'est produite :", error);
        setErrorMessage("Une erreur inattendue s'est produite.");
      }
    }
  };

  const deleteAccount = async () => {
    if (
      window.confirm(
        "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible.",
      )
    ) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/roadies/:id`, {
          withCredentials: true,
        });
        toast.success("Compte supprimé avec succès.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });

        window.location.href = "/";
      } catch (error) {
        console.error("Erreur lors de la suppression du compte :", error);
        toast.error(
          "Une erreur s'est produite lors de la suppression du compte.",
          {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            transition: Bounce,
          },
        );
      }
    }
  };

  const renderEditableForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h2 className="title_CI">
          Mes <strong>MODIFICATIONS</strong>
        </h2>

        <section>
          <label htmlFor="company-name-update">Ton prénom :</label>
          <input
            className="form_CI"
            type="text"
            name="firstname"
            value={updatedRoadie.firstname}
            onChange={handleInputChange}
          />
          <label htmlFor="company-logo-update">Ton nom de famille:</label>
          <input
            className="form_CI"
            type="text"
            name="lastname"
            value={updatedRoadie.lastname}
            onChange={handleInputChange}
          />
          <label htmlFor="company-adress-update">Email:</label>
          <input
            className="form_CI"
            type="text"
            name="email"
            value={updatedRoadie.email}
            onChange={handleInputChange}
          />
          <input type="submit" value="Enregistrer" className="colored-box" />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />

          <button
            id="back-button"
            type="button"
            className="light-box"
            onClick={() => setIsEditing(!isEditing)}
          >
            Retour
          </button>
        </section>
      </form>
    );
  };

  return (
    <main className="container_CI">
      {!isEditing ? (
        <section>
          {location.pathname.endsWith("information") ? (
            <h2 className="title_CI">
              Mes <strong>INFORMATIONS</strong>
            </h2>
          ) : (
            <h2 className="title_CI">
              <strong>INFORMATIONS</strong>
            </h2>
          )}
          <p>Ton prénom:</p>
          <p className="form_CI">{roadie.firstname}</p>
          <p>Ton nom de famille:</p>
          <p className="form_CI">{roadie.lastname}</p>
          {location.pathname.endsWith("information") ? (
            <>
              <p>Ton E-mail:</p>
              <p className="form_CI">{roadie.email}</p>
            </>
          ) : null}
          {location.pathname.endsWith("information") ? (
            <>
              <button
                id="edit-button"
                type="button"
                className="edit-box"
                onClick={() => setIsEditing(true)}
              >
                Modifier mes informations
              </button>
              <button
                id="delete-account-button"
                type="button"
                className="delete-box"
                onClick={deleteAccount}
              >
                Supprimer mon compte
              </button>

              <h2 className="title_CI">
                Mes <strong>VANS FAVORIS</strong>
              </h2>
              <ul className="scroll-card-container">
                {favoriteVans && favoriteVans.length > 0 ? (
                  favoriteVans.map((favoriteVan) => (
                    <li key={favoriteVan.van_id} className="van_card_favorite">
                      {" "}
                      <VanCard
                        van={{
                          id: favoriteVan.van_id,
                          name: favoriteVan.name,
                          number_plate: favoriteVan.number_plate,
                          picture: favoriteVan.picture,
                          fuel: favoriteVan.fuel,
                          lbs: favoriteVan.lbs,
                          brand: favoriteVan.brand,
                          company_id: favoriteVan.company_id,
                        }}
                        isFavorite={true}
                        onAddFavorite={addToFavorites}
                        onRemoveFavorite={removeFromFavorites}
                      />
                    </li>
                  ))
                ) : (
                  <li>Pas de van sauvegardé</li>
                )}
              </ul>
              <h2 className="title_CI">
                Mes <strong>RESERVATIONS</strong>
              </h2>
              <ul className="scroll-container-card">
                {reservedVans && reservedVans.length > 0 ? (
                  reservedVans.map((reservedVan) => (
                    <li key={reservedVan.id} className="van_card_reserved">
                      <ReservedVanCard
                        reservedVan={{
                          id: reservedVan.id,
                          van_id: reservedVan.van_id,
                          start_date: reservedVan.start_date,
                          end_date: reservedVan.end_date,
                          roadie_id: reservedVan.roadie_id,
                          name: reservedVan.name,
                          picture: reservedVan.picture,
                          number_plate: reservedVan.number_plate,
                          fuel: reservedVan.fuel,
                          lbs: reservedVan.lbs,
                          brand: reservedVan.brand,
                          company_id: reservedVan.company_id,
                          updated_at: reservedVan.updated_at,
                        }}
                        isReserved={true}
                        onAddReserved={addToReserved}
                        onRemoveReserved={removeFromReserved}
                      />
                    </li>
                  ))
                ) : (
                  <li>Pas de van réservé</li>
                )}
              </ul>
            </>
          ) : null}
        </section>
      ) : (
        renderEditableForm()
      )}
    </main>
  );
}
