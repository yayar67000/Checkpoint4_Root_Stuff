import "./CountryCard.css";

export default function CountryCard({ country }: CountriesDataProps) {
  return (
    <>
      <div className="country_card">
        <img src={country.picture} alt={country.name} />
        <h2>{country.name}</h2>
      </div>
    </>
  );
}
