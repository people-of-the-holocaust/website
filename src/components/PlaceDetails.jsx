// // Function that initializes the activity, location, and camp details when you click on a place entry on the Place page

export default function PlaceDetails({ place, activities }) {
    if (!place) {
      return <div>Select a place</div>;
    }
  
    return (
      <div>
        <h2>{place.Name}</h2>
  
        <p>
          {place.Type} {place.Subtype && `- ${place.Subtype}`}
        </p>
  
        <p >{place["Current Country"]}</p>
  
        <h3 style={{ marginTop: "1.5rem" }}> Activities </h3>
  
        {activities.length === 0 && <p>No activities found</p>}
  
        {activities.map((a, i) => (
          <div key={i} className="activity">
            {a.action} {a.details}
          </div>
        ))}
      </div>
    );
  }