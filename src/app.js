async function initializeMap() {
    const response = await fetch('mapdata.json');
    const rawData = await response.json();

    const data = rawData["Map Data"]; 
    // Necessary to unpack data because data is an object on the outermost layer rather than an array
    // Might fix later but is functional for now

    console.log("Full data:", data);

    const map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Using OpenStreetMap now instead of Google Maps API using Leaflet
    // Consult OpenStreetMap wiki and YouTube, will collect resources later
    // https://wiki.openstreetmap.org/
    // https://leafletjs.com/

    data.forEach(item => {
        console.log(item);
        if (!item.Latitude || !item.Longitude) {
            console.log("SKIPPED:", item);
            return;
    }
    // Runs through data + checks if each individual place has a Latitude/Longitude value
    // (otherwise we can't plot it as a marker)

    const lat = parseFloat(item.Latitude);
    const lng = parseFloat(item.Longitude);

    console.log("Lat/Lng:", lat, lng);
    // All of these are displayed in the inspect console on Google Chrome, if
    // you so desire to debug that way. I found it helpful

    const marker = L.marker([lat, lng]).addTo(map);
    // Self explanatory

    marker.bindPopup(`
        <div style="color:black">
            <strong>${item.Name}</strong><br>
            ${item.Type} - ${item.Subtype}<br>
            ${item["Current Country"]}
        </div>
        `);
    });
}

    if (typeof window !== "undefined") {
    window.onload = initializeMap;
}

async function loadPeople() {
    const response = await fetch('peopledata.json');
    const rawData = await response.json();

    const people = rawData["People"];
    const container = document.getElementById("people-container");
        
    // Overall pretty similar experience just working with .json information

    people.forEach(person => {
        const record = document.createElement("div");
        record.className = "record";
    
        let summary = "";
    
        for (let i = 1; i <= 5; i++) { // 5 is hard set placeholder value for now
            if (person[`Location ${i}`]) {
                summary += `
                    ${person[`Location ${i}`].trim()}
                    (${person[`Time Period ${i}`] || "No date"})
                    <br>
                `;
                // Gets rid of excess spaces + adds date if there is one (otherwise no date obv)
            }
        }
            
        const title = document.createElement("div");
        title.className = "record-title";
        title.textContent = person.Name;
    
        const meta = document.createElement("div");
        meta.className = "record-meta";
        meta.innerHTML = summary;
    
        const extra = document.createElement("div");
        extra.className = "record-meta";
        extra.style.display = "none";
        extra.style.marginTop = "0.5rem";
        extra.innerHTML = `
            <em>${person["Personal Information"] || "No additional info"}</em>
        `;
        record.addEventListener("click", () => {
            extra.style.display = extra.style.display === "none" ? "block" : "none";
        });
        // So we see the extra information for each record on click

        record.appendChild(title);
        record.appendChild(meta);
        record.appendChild(extra);
        container.appendChild(record);
    });
}
module.exports = { loadPeople, initializeMap};