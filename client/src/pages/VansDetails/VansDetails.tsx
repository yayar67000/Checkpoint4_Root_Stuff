import "./VansDetails.css";
import { useLoaderData } from "react-router-dom";

export default function VansDetails() {
  const vans = useLoaderData() as VansByCompanyData;
  console.info(vans);
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
        <button type="button" className="colored-box">
          Réserver
        </button>
      </article>
    </main>
  );
}
