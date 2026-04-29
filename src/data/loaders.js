// Uses papaparse to load CSV into usable data
import Papa from "papaparse";

export async function loadCSV(url) {
  const res = await fetch(url);
  const text = await res.text();

  return new Promise((resolve) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data)
    });
  });
}