import axios from "axios";
import "./SignUp.css";
import { useState } from "react";
import SvgIcons from "../SvgIcons";
import Login from "./Login";

const icon = {
  visible: {
    width: "21px",
    height: "21px",
    path: "M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z",
  },
  notVisible: {
    width: "21px",
    height: "21px",
    path: "m637-425-62-62q4-38-23-65.5T487-576l-62-62q13-5 27-7.5t28-2.5q70 0 119 49t49 119q0 14-2.5 28t-8.5 27Zm133 133-52-52q36-28 65.5-61.5T833-480q-49-101-144.5-158.5T480-696q-26 0-51 3t-49 10l-58-58q38-15 77.5-21t80.5-6q143 0 261.5 77.5T912-480q-22 57-58.5 103.5T770-292Zm-2 202L638-220q-38 14-77.5 21t-80.5 7q-143 0-261.5-77.5T48-480q22-57 58-104t84-85L90-769l51-51 678 679-51 51ZM241-617q-35 28-65 61.5T127-480q49 101 144.5 158.5T480-264q26 0 51-3.5t50-9.5l-45-45q-14 5-28 7.5t-28 2.5q-70 0-119-49t-49-119q0-14 3.5-28t6.5-28l-81-81Zm287 89Zm-96 96Z",
  },
};

export default function SignUp({ isOpen, onClose }: LoginRoadieProps) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    firstname: "",
    lastname: "",
  });

  const [checked, setChecked] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const toggleCheck = () => {
    setChecked(!checked);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  const showIconPassword = showPassword ? icon.visible : icon.notVisible;

  const showIconConfirmPassword = confirmPassword
    ? icon.visible
    : icon.notVisible;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("Données envoyées :", credentials);

    const formData = new FormData();
    formData.append("firstname", credentials.firstname);
    formData.append("lastname", credentials.lastname);
    formData.append("email", credentials.email);
    formData.append("password", credentials.password);
    formData.append("password_confirmation", credentials.password_confirmation);

    formData.append("role", "roadie");

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
      console.error("La requête a été annulée après 10 minutes d'attente.");
    }, 600000);

    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/roadies`, credentials, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.info(response.data);
          setIsSignIn(true);
          setError("");
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.error(error);
        });
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const isStrongPassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  return (
    <dialog className="dialog_signup" open={isOpen}>
      {isSignIn ? (
        <Login isOpen={isOpen} onClose={onClose} />
      ) : (
        <form onSubmit={handleSubmit} className="opening_register">
          <h2>S'inscrire</h2>
          <div className="register_content">
            <p className="register_text">Déjà inscrit ?</p>
            <button
              id="sign-in-button"
              className="colored-box"
              type="button"
              onClick={() => setIsSignIn(true)}
            >
              Se connecter
            </button>
          </div>

          <div className="candidate_form">
            <label htmlFor="candidate-firstname">
              Prénom<span className="star"> *</span>
            </label>
            <input
              type="firsname"
              id="candidate-firstname"
              name="firstname"
              value={credentials.firstname}
              onChange={handleChange}
              placeholder="Votre Prénom"
              required
            />
            <label htmlFor="candidate-lastname">
              Nom<span className="star"> *</span>
            </label>
            <input
              type="lastname"
              id="candidate-lastname"
              name="lastname"
              value={credentials.lastname}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
            <label htmlFor="candidate-email">
              Email<span className="star"> *</span>
            </label>
            <input
              type="email"
              id="candidate-email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Votre e-mail"
              required
            />
            {error ? <p className="errorMessage">{error}</p> : null}
            <label htmlFor="candidate-password">
              Mot de passe<span className="star"> *</span>
            </label>
            <div className="password_input">
              <input
                className="input_password"
                type={showPassword ? "text" : "password"}
                id="candidate-password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                aria-invalid="false"
                placeholder="Votre mot de passe"
                required
                minLength={8}
              />
              <button
                id="show_password"
                type="button"
                onClick={togglePassword}
                className="show_password"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                <SvgIcons
                  path={showIconPassword.path}
                  height={showIconPassword.height}
                  width={showIconPassword.width}
                />
              </button>
            </div>
            {isStrongPassword(credentials.password) ? "✅" : "❌"}
            <p id="passwordHelp">
              8 caractères minimum, au moins une majuscule, une minuscule, un
              chiffre et un caractère spécial.
            </p>
            <label htmlFor="confirmPassword">
              Confirmez votre mot de passe<span className="star"> *</span>
            </label>
            <div className="password_input">
              <input
                className="input_password"
                type={confirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="password_confirmation"
                value={credentials.password_confirmation}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                minLength={8}
                required
              />
              <button
                id="show_password"
                type="button"
                onClick={toggleConfirmPassword}
                className="show_password"
                aria-label={
                  showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                <SvgIcons
                  path={showIconConfirmPassword.path}
                  height={showIconConfirmPassword.height}
                  width={showIconConfirmPassword.width}
                />
              </button>
            </div>
            {credentials.password === credentials.password_confirmation ? (
              <span style={{ color: "green" }}>
                ✅ Les mots de passe correspondent
              </span>
            ) : (
              <span style={{ color: " #b80000" }}>
                ❌ Les mots de passe ne correspondent pas
              </span>
            )}
            <label htmlFor="checkbox" className="checkbox">
              <input
                type="checkbox"
                id="checkbox"
                checked={checked}
                onChange={toggleCheck}
              />
              <p>
                En cochant cette case, vous acceptez les CGU.
                <span className="star"> *</span>
              </p>
            </label>
            <button
              id="colored-box"
              type="submit"
              className="colored-box"
              disabled={!checked}
            >
              Créer un compte
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
