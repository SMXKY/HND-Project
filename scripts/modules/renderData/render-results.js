import { datasets } from "../Backend/database/datasets.js";
import { frequency } from "../Backend/modules/frequency-and-percentage/frequencyAndPercentage.js";
import { centralTendency } from "../Backend/modules/location/centralTendency.js";
import { alert } from "./alert.js";

export function renderResults() {
  document.querySelectorAll(".js-anlayze-data-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dataset =
        datasets[Number(btn.dataset.seshid)].datasets[
          Number(btn.dataset.dataid)
        ].data[0];

      const fequency = frequency(dataset);
      const tendency = centralTendency(dataset);

      console.log(fequency);
      console.log(tendency);

      const keys = Object.keys(fequency);
      console.log(keys);

      function renderResultsTable(array) {
        let tableHtml = "";
        array.forEach((val) => {
          tableHtml += `       
        <div class="products-sales-recent-grid-actual-grid-entry sessions-grid-entry results-grid results-grid-entry">
          <div class="product-name-and-img">
            <p>${val.val}</p>
          </div>
  
          <p class="">${val.freq}</p>
          
          <p class="">${val.percent}%</p>
        </div>
        `;
        });

        return tableHtml;
      }

      function renderResultsGraph(id, array) {
        const lineChart = document.getElementById(`${id}`);

        //Populate lables

        const lables = [];
        const frequencies = [];
        const percentages = [];

        array.forEach((val) => {
          lables.push(val.val);
          frequencies.push(val.freq);
          percentages.push(val.percent);
        });

        //populate frequencies

        const chart = new Chart(lineChart, {
          type: "bar",
          data: {
            labels: lables,
            datasets: [
              {
                label: "Frequency",
                backgroundColor: "#287f71",
                borderColor: "#287f71",
                data: frequencies,
              },
              {
                label: "Percentages",
                backgroundColor: "#EB862A",
                borderColor: "#EB862A",
                data: percentages,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
          },
        });
      }

      function renderResultsFindings(data) {
        let findingsHtml = "";
        if (data.mean !== null) {
          findingsHtml += `<p class="findings-text">Mean: ${data.mean}</p>`;
        }

        if (data.median !== null) {
          findingsHtml += `<p class="findings-text">Median: ${data.median}</p>`;
        }

        if (data.mode[0] !== null) {
          findingsHtml += `<p class="findings-text">Mode: ${data.mode[0].val}</p>`;
        }

        if (data.standardDeviation !== 0) {
          findingsHtml += `<p class="findings-text">Standared deviation: ${data.standardDeviation}</p>`;
        }

        if (data.standardError !== null) {
          findingsHtml += `<p class="findings-text">Standard Error: ${data.standardError}</p>`;
        }

        if (data.variance !== null) {
          findingsHtml += `<p class="findings-text">Variance: ${data.variance}</p>`;
        }

        return findingsHtml;
      }

      function download(id, name) {
        const imageLink = document.createElement("a");
        const image = document.getElementById(`${id}`);
        imageLink.download = `${name}`;
        imageLink.href = image.toDataURL("image/jpg", 1);

        //document.write(`<img src="${imageLink}"/>`);

        imageLink.click();
      }

      function convertHtmlToCanvas(element, id, name) {
        html2canvas(document.querySelector(`.${element}`)).then((canvas) => {
          const myCanvas = canvas;

          myCanvas.id = id;

          console.log(myCanvas);

          const imageLink = document.createElement("a");
          const image = myCanvas;
          imageLink.download = `${name}`;
          imageLink.href = image.toDataURL("image/jpg", 1);

          //document.write(`<img src="${imageLink}"/>`);

          imageLink.click();
        });
      }

      function copyFindings(element) {
        let text = element.innerText;
        let inputElement = document.createElement("input");

        inputElement.setAttribute("value", text);

        document.body.appendChild(inputElement);

        inputElement.select();
        document.execCommand("copy");
        inputElement.parentNode.removeChild(inputElement);
      }

      let count = 0;

      let resultsHtml = "";
      keys.forEach((key) => {
        resultsHtml += `
        <div class="result-display-template">
        <p class="result-display-template-head">${key}</p>

        <div class="result-display-template-content">
          <div class="result-display-template-content-head">
            <p>Tabular representation</p>
            <button class="js-download-table" data-tableid ="table- ${key}" data-table = "${key}" data-tablename = "js-my-table-${key}">
              <img src="images-and-icons/icons/download (1).png" alt="" />
            </button>
          </div>

          <div class="result-display-template-content-holder">
            <div class="products-sales-recent-grid js-my-table-${key}" id="">
              <div
                class="products-sales-recent-grid-head new-session-grid data-set-grid-head results-grid"
              >
                <p class="results-grid-head-text">${key}</p>
                <p class="results-grid-head-text">Frequency</p>
                <p class="results-grid-head-text">Percentage</p>
              </div>

              <div
                class="products-sales-recent-grid-actual-grid js-dataset-grid"
              >
              ${renderResultsTable(fequency[key])}
              </div>
            </div>
          </div>
        </div>

        <div class="result-display-template-content">
          <div class="result-display-template-content-head">
            <p>Graphical representation</p>
            <button class = "js-download-graph" data-graphname = "${key}" data-graphid = "testChart-${key}">
              <img src="images-and-icons/icons/download (1).png" alt="" />
            </button>
          </div>

          <div class="result-display-template-content-holder">
            <div class="results-graph-holder">
              <canvas id="testChart-${key}"></canvas>
            </div>
          </div>
        </div>

        <div class="result-display-template-content">
          <div class="result-display-template-content-head">
            <p>Findings</p>
            <button class="js-copy-findings" data-element = "results-findings-${
              "key" + count
            }">
              <img src="images-and-icons/icons/copy.png" alt="" />
            </button>
          </div>

          <div
            class="result-display-template-content-holder results-findings-grid results-findings-${
              "key" + count
            }"
          >
            ${renderResultsFindings(tendency[key])}
          </div>
        </div>
        <!---->
      </div>
        `;
        count++;
      });

      document.querySelector(".js-result-container").innerHTML = resultsHtml;

      keys.forEach((key) => {
        renderResultsGraph(`testChart-${key}`, fequency[key]);
      });

      document.querySelectorAll(".js-download-graph").forEach((btn) => {
        btn.addEventListener("click", () => {
          download(
            `testChart-${btn.dataset.graphname}`,
            `${btn.dataset.graphid} frequency and percetage graph`
          );
        });
      });

      document.querySelectorAll(".js-download-table").forEach((btn) => {
        btn.addEventListener("click", () => {
          convertHtmlToCanvas(
            btn.dataset.tablename,
            btn.dataset.tableid,
            `${btn.dataset.table} Frequency distribution table`
          );
        });
      });

      document.querySelectorAll(".js-copy-findings").forEach((btn) => {
        btn.addEventListener("click", () => {
          const el = document.querySelector(`.${btn.dataset.element}`);

          copyFindings(el);
          alert("valid", "Results findings successfully copied!!");
        });
      });

      document
        .querySelector(".js-results-all-holder")
        .classList.add("reveal-results");
      document
        .querySelector(".js-close-results-column")
        .addEventListener("click", () => {
          document
            .querySelector(".js-results-all-holder")
            .classList.remove("reveal-results");
        });
    });
  });
}
