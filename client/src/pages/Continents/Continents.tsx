import "./Continents.css";
import { Link, useLoaderData } from "react-router-dom";
import ContinentCard from "../../components/ContinentCard/ContinentCard";

export default function Continents() {
  const allContinents = useLoaderData() as ContinentData[];

  return (
    <main className="all_continent_page">
      <h1>Continents</h1>
      <div>
        {allContinents.length > 0
          ? allContinents.map((continent) => (
              <Link
                key={continent.id}
                to={`/countries/continent/${continent.id}`}
              >
                <ContinentCard key={continent.id} continent={continent} />
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}
