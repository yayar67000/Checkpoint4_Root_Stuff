import "./RoadieInformation.css";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useRevalidator } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function RoadieInformation() {
  const { revalidate } = useRevalidator();
  const location = useLocation();
  const roadies = useLoaderData() as RoadieData;

  const roadieToUpdate = {
    firstname: roadies.firstname,
    lastname: roadies.lastname,
    email: roadies.email,
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
          <p className="form_CI">{roadies.firstname}</p>
          <p>Ton nom de famille:</p>
          <p className="form_CI">{roadies.lastname}</p>
          {location.pathname.endsWith("information") ? (
            <>
              <p>Ton E-mail:</p>
              <p className="form_CI">{roadies.email}</p>
            </>
          ) : null}
          {location.pathname.endsWith("information") ? (
            <>
              <button
                type="button"
                className="colored-box"
                onClick={() => setIsEditing(true)}
              >
                Modifier mes informations
              </button>
            </>
          ) : null}
        </section>
      ) : (
        renderEditableForm()
      )}
    </main>
  );
}
