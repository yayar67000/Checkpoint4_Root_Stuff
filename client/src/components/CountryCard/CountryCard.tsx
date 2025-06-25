export default function CountryCard({ country }: CountriesDataProps) {
  return (
    <>
      <div className="card_item">
        <img src={country.picture} alt={`country_picture${country.name}`} />
        <h2>{country.name}</h2>
      </div>
    </>
  );
}
