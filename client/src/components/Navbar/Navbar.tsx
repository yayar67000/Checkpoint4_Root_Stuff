import "./Navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/AuthContext";
import Login from "./Login";

export default function Navbar() {
  const navigate = useNavigate();
  const { role, setRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(String);

  const disconnect = () => {
    setRole("anonymous");
    navigate("/");
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
      name: "Territoires à explorer",
      path: "/continents",
      role: ["anonymous", "roadie"],
    },
  ];

  return (
    <nav>
      <Link to="/" className="logo_picture">
        <img src="/Logo/van_logo.png" alt="van_logo" className="van_logo" />
      </Link>
      <h1>Road Stuff</h1>
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
            <>
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
            </>
          )}
        </ul>
      </div>
      <ul className="menuDesktop">
        {links.map((link) => (
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
