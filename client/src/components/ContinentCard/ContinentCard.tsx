import "./ContinentCard.css";

export default function ContinentCard({ continent }: ContinentDataProps) {
  return (
    <>
      <div className="continent_card">
        <img
          src={continent.picture}
          alt={`continent_picture ${continent.name}`}
        />
        <h2>{continent.name}</h2>
      </div>
    </>
  );
}
