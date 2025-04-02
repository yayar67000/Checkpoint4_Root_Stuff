import "./CompanyCard.css";

export default function CompanyCard({ company }: CompaniesByCountryDataProps) {
  return (
    <>
      <div className="company_card">
        <img src={company.logo} alt={company.name} />
        <h2>{company.name}</h2>
      </div>
    </>
  );
}
