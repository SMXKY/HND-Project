import { frequency } from "./modules/frequency-and-percentage/frequencyAndPercentage.js";
import { centralTendency } from "./modules/location/centralTendency.js";
import { percentile } from "./modules/dispersion-and-variation/percentile.js";
import { cretedataset } from "../renderData/create-dataset-holder.js";
import { alert } from "../renderData/alert.js";

export function csvHandler(id, render) {
  let csvData = [];
  document.querySelector(".js-submit-csv").addEventListener("click", (e) => {
    e.preventDefault();
    csvData = Papa.parse(document.getElementById("js-uploaded-file").files[0], {
      download: true,

      header: true,

      skipEmptyLines: true,

      complete: (results) => {
        cretedataset(id, results.data, render);
      },
    });
  });
}
