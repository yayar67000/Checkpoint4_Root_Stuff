import { Link, useLoaderData } from "react-router-dom";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./Companies.css";

export default function Companies() {
  const allCompanies = useLoaderData() as CompaniesDetailData[];
  return (
    <main className="all_companies_page">
      <h1>Les entreprises</h1>
      <div>
        {allCompanies.length > 0
          ? allCompanies.map((company) => (
              <Link key={company.id} to={`/companyDetails/${company.id}`}>
                <CompanyCard key={company.id} company={company} />
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}
