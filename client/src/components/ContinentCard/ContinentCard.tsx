import "./ContinentCard.css";

export default function ContinentCard({ continent }: ContinentDataProps) {
  return (
    <>
      <div className="card_item">
        <img
          src={continent.picture}
          alt={`continent_picture ${continent.name}`}
        />
        <h2>{continent.name}</h2>
      </div>
    </>
  );
}
