import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(String);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    {
      name: "Accueil",
      path: "/",
    },
    {
      name: "Chez qui louer?",
      path: "/companies",
    },
    {
      name: "Les vans",
      path: "/vans",
    },
    {
      name: "Territoires à explorer",
      path: "/continents",
    },
    {
      name: "Mon RoadBook",
      path: "/roadbook",
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
          {links.map((link) => (
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
        </ul>
      </div>
      <ul className="menuDesktop">
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path}>{link.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
