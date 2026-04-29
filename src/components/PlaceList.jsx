// Function that creates the individual records for each place in the place_table.csv
export default function PlaceList({ places, onSelect }) {
    return (
      <div>
        {places.map((p, i) => (
          <div
            key={i}
            className="record"
            onClick={() => onSelect(p)}
          >
            <div className="record-title">
              {p.Name}
            </div>
          </div>
        ))}
      </div>
    );
  }