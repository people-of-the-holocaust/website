import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PlaceList from "../components/PlaceList";
import PlaceDetails from "../components/PlaceDetails";

import { loadCSV } from "../data/loaders";
import { buildPlaceIndex } from "../data/indexes";

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [placeIndex, setPlaceIndex] = useState({});
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlaces = (places || []).filter((p) => {
    return (p.Name || "")
      .toLowerCase()
      .includes((searchTerm || "").toLowerCase());
  });

  useEffect(() => {
    async function loadData() {
        const placeData = await loadCSV("/data/place_table.csv");
        const activityData = await loadCSV("/data/activity_table.csv");

        setPlaces(placeData);
        setPlaceIndex(buildPlaceIndex(activityData));
    }

    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="database-section">
        <h3>The Places</h3>

        <input
          type="text"
          placeholder="Search the Places..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "0.6rem",
            marginBottom: "1rem",
            background: "#111",
            color: "#eee",
            border: "1px solid #444",
            borderRadius: "4px"
          }}
        />

        <div style={{ display: "flex", gap: "2rem" }}>
          
          <div style={{ width: "40%", maxHeight: "600px", overflowY: "auto" }}>
            <PlaceList places={filteredPlaces} onSelect={setSelected} />
          </div>

          <div style={{ width: "60%" }}>
            <PlaceDetails
              place={selected}
              activities={
                selected
                  ? placeIndex[String(parseInt(selected.LID))] || []
                  : []
              }
            />
          </div>

        </div>
      </section>
    </>
  );
}