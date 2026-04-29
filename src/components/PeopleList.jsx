// Function that creates the individual records for each person on the people_table.csv
export default function PeopleList({ people, onSelect }) {
  return (
    <div>
      {people.map((p, i) => (
        <div
          key={i}
          className="record"
          onClick={() => onSelect(p)}
        >
          <div className="record-title">
            {p["First Name"]} {p["Last Name"]}
          </div>
        </div>
      ))}
    </div>
  );
}