import VanCard from "../../components/VanCard/VanCard";
import "./CompanyDetails.css";
import { Link, useLoaderData } from "react-router-dom";

export default function CompanyDetails() {
  const { company, vans = [] } = useLoaderData() as {
    company: CompaniesDetailData;
    vans: VansData[];
  };

  console.info(vans);

  return (
    <main className="all_companydetails_page">
      <h1>Details de {company.name}</h1>
      <article className="infos_company">
        <img src={company.logo} alt={company.name} />
        <h2>{company.name}</h2>
        <h3>Description</h3>
        <p>{company.description}</p>
        <h4>Adresse</h4>
        <p>{company.address}</p>
      </article>
      <article className="vanbycompany_cards">
        <h1>Vans disponibles {vans.length}</h1>
        {vans.length > 0
          ? vans.map((van) => (
              <Link
                key={van.id}
                to={`/vanDetails/${van.id}`}
                className="van_each_cards"
              >
                <VanCard key={van.id} van={van} />
              </Link>
            ))
          : null}
      </article>
    </main>
  );
}
