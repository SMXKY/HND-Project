import { frequency } from "./modules/frequency-and-percentage/frequencyAndPercentage.js";
import { centralTendency } from "./modules/location/centralTendency.js";
export function csvHandler() {
  let csvData = [];
  document.querySelector(".js-submit-csv").addEventListener("submit", (e) => {
    e.preventDefault();
    Papa.parse(document.getElementById("js-uploaded-file").files[0], {
      download: true,

      header: true,

      skipEmptyLines: true,

      complete: (results) => {
        csvData = results;

        console.log(csvData);

        centralTendency(csvData.data);
      },
    });
  });
}
