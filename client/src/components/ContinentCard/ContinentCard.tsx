import "./ContinentCard.css";

export default function ContinentCard({ continent }: ContinentDataProps) {
  return (
    <>
      <div className="card">
        <img src={continent.picture} alt={continent.name} />
        <h2>{continent.name}</h2>
      </div>
    </>
  );
}
