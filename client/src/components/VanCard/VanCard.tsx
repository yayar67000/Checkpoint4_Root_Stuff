import "./VanCard.css";

export default function VanCard({ van }: VansDataProps) {
  return (
    <>
      <div className="van_card">
        <img src={van.picture} alt={van.name} />
        <h2>{van.name}</h2>
      </div>
    </>
  );
}
