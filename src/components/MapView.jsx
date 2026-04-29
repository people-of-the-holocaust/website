import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
// Imports for Leaflet for placing the markers and clusters on the map

export default function MapView() {
  useEffect(() => {
    const map = L.map('map').setView([49, 15], 4.25); // Can adjust map center coordinates / zoom accordingly

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map); // OpenStreetMaps API

    fetch("/data/mapdata.json") // Taking our mapdata.json from the data folder in public
      .then(res => res.json())
      .then(rawData => {
        const data = rawData["Map Data"];
      
        const markers = L.markerClusterGroup(); // Creates cluster group
      
        data.forEach(item => {
          if (!item.Latitude || !item.Longitude) return;
      
          const lat = parseFloat(item.Latitude);
          const lng = parseFloat(item.Longitude);
      
          const marker = L.circleMarker([lat, lng], { // Design for what each individual marker looks like (way less obnoxious)
            radius: 6,
            fillColor: "#fef",
            color: "#333",
            weight: 1,
            fillOpacity: 0.9,
          });
      
          marker.bindPopup(`
            <div style="color:black">
              <strong>${item.Name}</strong><br>
              ${item.Type} - ${item.Subtype}<br>
              ${item["Current Country"]}
            </div>
          `); // Marker onclick design
      
          markers.addLayer(marker); // Adds markers to cluster group
        });
      
        map.addLayer(markers); // Adds clusters and markers to map
      });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: "625px", width: "60%" }} />; // Map size on website, can change
}