import "./Navbar.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useAuth } from "../../services/AuthContext";
import Login from "./Login";

export default function Navbar() {
  const navigate = useNavigate();
  const { role, setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(String);

  const disconnect = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/logout`, {
        withCredentials: true,
      });
      setRole("anonymous");
      navigate("/");
      toast.success("Vous êtes déconnecté !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Erreur lors de la déconnection !", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const links = [
    {
      name: "Accueil",
      path: "/",
      role: ["anonymous", "roadie"],
    },
    {
      name: "Chez qui louer?",
      path: "/companies",
      role: ["anonymous", "roadie"],
    },
    {
      name: "Les vans",
      path: "/vans",
      role: ["anonymous", "roadie"],
    },
    {
      name: "Mes informations",
      path: "/roadies/information",
      role: ["roadie"],
    },
    {
      name: "Territoires à explorer",
      path: "/continents",
      role: ["anonymous", "roadie"],
    },
  ];

  return (
    <nav>
      <img
        src="../Images/dino.jpg"
        alt="background_nav_img"
        className="background_nav_img"
      />
      <Link to="/" className="logo_title">
        <h1>Road Stuff</h1>
      </Link>
      <div className="burgerContainer">
        <button
          type="button"
          onClick={toggleMenu}
          className={`burgerButton ${isOpen ? "menuOpen" : ""}`}
        >
          {isOpen ? (
            <span className="close">✖</span>
          ) : (
            <span className="open">☰</span>
          )}
        </button>
        <ul className={`menuDroper ${isOpen ? "open" : ""}`}>
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={activeLink === link.name ? "active" : ""}
                  onClick={() => {
                    setActiveLink(link.name);
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          {role !== "anonymous" ? (
            <button
              type="button"
              className={activeLink === "disconnect" ? "active" : ""}
              onClick={() => {
                setActiveLink("disconnect");
                disconnect();
                setIsOpen(false);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <button
              type="button"
              className={activeLink === "se-connecter" ? "active" : ""}
              onClick={() => {
                setActiveLink("se-connecter");
                openModal();
                setIsOpen(false);
              }}
            >
              Se connecter
            </button>
          )}
        </ul>
      </div>
      <ul className="menuDesktop">
        {links
          .filter((link) => link.role.includes(role))
          .map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        {role !== "anonymous" ? (
          <button type="button" onClick={disconnect}>
            Se déconnecter
          </button>
        ) : (
          <>
            <button type="button" onClick={openModal}>
              Se connecter
            </button>
          </>
        )}
      </ul>
      <Login isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}
