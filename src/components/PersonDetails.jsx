// Function that initializes the activity details when you click on a person entry on the People page
export default function PersonDetails({ person, activities }) {
    if (!person) {
      return <div style={{ width: "60%" }}>Select a person</div>;
    }
  
    return (
      <div id="person-details" className="person-details">
        <h2>
          {person["First Name"]} {person["Last Name"]}
        </h2>
  
        <p>{person.Place}</p>
  
        <h3 style={{ marginTop: "1.5rem" }} >Activities</h3>
  
        {activities.length === 0 && <p>No activities found</p>}
  
        {activities.map((a, i) => (
            <div key={i} className="activity">
                {a.action} {a.details}
                </div>
            ))}
      </div>
    );
  }