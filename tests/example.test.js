// @jest-environment jsdom
// Fetch
global.fetch = jest.fn(); 

// Leaflet because it doesn't work with jest for some reason I didn't bother to figure out
global.L = {
  map: jest.fn(() => ({setView: jest.fn()})),
  tileLayer: jest.fn(() => ({addTo: jest.fn()})),
  marker: jest.fn(() => ({addTo: jest.fn().mockReturnThis(), bindPopup: jest.fn()}))
};

// Importing functions from a separate app.js file, since Farzeen wanted me to move my scripts from my index.html file into a separate one
const { loadPeople, initializeMap } = require('../src/app'); 

beforeEach(() => {
  document.body.innerHTML = `
    <div id="people-container"></div>
    <div id="map"></div>`;
  fetch.mockClear();
});

// First test -- checking if the peopledata.json file registers properly
test('loadPeople renders people records from data', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      People: [
        {
          Name: "John Johnson",
          "Location 1": "Berlin",
          "Time Period 1": "1940",
          "Personal Information": "Involved in the war"
        }
      ]})});

  await loadPeople();
  const records = document.querySelectorAll('.record');
  expect(records.length).toBe(1);
  expect(records[0].textContent).toContain("John Johnson");
});

// Second test -- Clicking on a record brings up additional info from data
test('Clicking a record toggles extra info', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      People: [
        {
          Name: "Michael Michaelson",
          "Location 1": "Vienna",
          "Time Period 1": "1938",
          "Personal Information": "Guy in the war"
        }
    ]})});

  await loadPeople();

  const record = document.querySelector('.record');
  const extra = record.querySelectorAll('.record-meta')[1];
  
  expect(extra.style.display).toBe("none");
  record.click();
  expect(extra.style.display).toBe("block");
  record.click();
  expect(extra.style.display).toBe("none");
});

// Third test -- map initializes properly and creates all of the markers
test('initializeMap creates map and markers', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => ({
      "Map Data": [
        {
          Name: "Example Place",
          Latitude: "4",
          Longitude: "7",
          Type: "City",
          Subtype: "Capital",
          "Current Country": "Testermany"
        }
      ]})});

  await initializeMap();

  expect(L.map).toHaveBeenCalledWith('map');
  expect(L.marker).toHaveBeenCalled();
});