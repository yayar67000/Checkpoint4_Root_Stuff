import "./CompanyCard.css";

export default function CompanyCard({ company }: CompaniesByCountryDataProps) {
  return (
    <>
      <div className="card_item">
        <img src={company.logo} alt={`company_picture${company.name}`} />
        <h2>{company.name}</h2>
      </div>
    </>
  );
}
