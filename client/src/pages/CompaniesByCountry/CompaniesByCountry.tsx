import "./CompaniesByCountry.css";
import { Link, useLoaderData } from "react-router-dom";
import CompanyCard from "../../components/CompanyCard/CompanyCard";

export default function CompaniesByCountry() {
  const companiesByCountries = useLoaderData() as CompaniesByCountryData[];
  console.info("Data Loaded", companiesByCountries);
  return (
    <main className="all_company_page">
      <h1>Entreprises de location dans ce pays</h1>
      <div>
        {companiesByCountries.length > 0 ? (
          companiesByCountries.map((company) => (
            <Link key={company.id} to={`/companyDetails/${company.id}`}>
              <CompanyCard key={company.id} company={company} />
            </Link>
          ))
        ) : (
          <p> Pas d'entreprise disponible pour ce pays</p>
        )}
      </div>
    </main>
  );
}
