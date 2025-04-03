import { Link, useLoaderData } from "react-router-dom";
import "./CountriesByContinent.css";
import CountryCard from "../../components/CountryCard/CountryCard";

export default function CountriesByContinent() {
  const countriesByContinent = useLoaderData() as CountriesData[];
  return (
    <main className="all_country_page">
      <h1>Pays</h1>
      <div>
        {countriesByContinent.length > 0
          ? countriesByContinent.map((country) => (
              <Link key={country.id} to={`/companies/country/${country.id}`}>
                <CountryCard key={country.id} country={country} />
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}
