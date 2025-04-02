import { Link, useLoaderData } from "react-router-dom";
import VanCard from "../../components/VanCard/VanCard";
import "./Vans.css";

export default function Vans() {
  const allVans = useLoaderData() as VansData[];
  return (
    <main className="all_vans_page">
      <h1>Vans</h1>
      <div>
        {allVans.length > 0
          ? allVans.map((van) => (
              <Link key={van.id} to={`/vansDetails/${van.id}`}>
                <VanCard key={van.id} van={van} />
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}
