import "./Home.css";
import { Link, useLoaderData } from "react-router-dom";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import ContinentCard from "../../components/ContinentCard/ContinentCard";
import CountryCard from "../../components/CountryCard/CountryCard";
import VanCard from "../../components/VanCard/VanCard";

export default function Home() {
  const { continents, countries, companies, vans } = useLoaderData() as {
    continents: ContinentData[];
    countries: CountriesData[];
    companies: CompaniesDetailData[];
    vans: VansData[];
  };

  const handleAddFavorite = async (vanId: number) => {
    console.info(`Ajout du van ${vanId} aux favoris`);
  };

  const handleRemoveFavorite = async (favoriteVanId: number) => {
    console.info(`Suppression du favori ${favoriteVanId}`);
  };
  return (
    <main className="all_home_page">
      <h1>
        Bienvenue à vous les roadies ! Prêts pour ajouter des couleurs et des
        souvenirs inoubliables dans votre vie ?
      </h1>
      <h2 className="div_titles">Les continents</h2>
      <div className="cards_scroll">
        {continents.length > 0
          ? continents.map((continent) => (
              <Link
                key={continent.id}
                to={`/countries/continent/${continent.id}`}
              >
                <ContinentCard key={continent.id} continent={continent} />
              </Link>
            ))
          : null}
      </div>
      <h2 className="div_titles">Les pays</h2>
      <div className="cards_scroll">
        {countries.length > 0
          ? countries.map((country) => (
              <Link key={country.id} to={`/companies/country/${country.id}`}>
                <CountryCard key={country.id} country={country} />
              </Link>
            ))
          : null}
      </div>
      <h2 className="div_titles">Les entreprises partenaires</h2>
      <div className="cards_scroll">
        {companies.length > 0
          ? companies.map((company) => (
              <Link key={company.id} to={`/companyDetails/${company.id}`}>
                <CompanyCard key={company.id} company={company} />
              </Link>
            ))
          : null}
      </div>
      <h2 className="div_titles">Les véhicules pour tracer ta route</h2>
      <div className="cards_scroll">
        {vans.length > 0
          ? vans.map((van) => (
              <VanCard
                key={van.id}
                van={van}
                isFavorite={false}
                onAddFavorite={handleAddFavorite}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))
          : null}
      </div>
    </main>
  );
}
