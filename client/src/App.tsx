import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
