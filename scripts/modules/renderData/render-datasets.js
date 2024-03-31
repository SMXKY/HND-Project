import { sessions } from "../Backend/database/sessions.js";
import { datasets } from "../Backend/database/datasets.js";
import { cretedataset } from "./create-dataset-holder.js";
import { csvHandler } from "../Backend/csv-handler.js";
import { deleteDataset } from "./delete-dataset.js";
import { renderResults } from "./render-results.js";

export function renderDatasets() {
  document.querySelectorAll(".js-session-link").forEach((link) => {
    link.addEventListener("click", () => {
      document
        .querySelector(".js-all-sessions-table")
        .classList.add("hide-sessions-table");
      document
        .querySelector(".js-datasets-all-table")
        .classList.remove("hide-sessions-table");

      let datasetHtml = "";

      let array = [];

      datasets.forEach((set) => {
        if (set.sessionId === Number(link.dataset.sessionid)) {
          array = set.datasets;
        }
      });

      csvHandler(Number(link.dataset.sessionid), renderDataFromDatset);

      function renderDataFromDatset() {
        datasetHtml = "";
        sessions.forEach((sesh, index) => {
          if (sesh.id === Number(link.dataset.sessionid)) {
            document.querySelector(".js-dataset-page-title").innerHTML = `${
              sessions[Number(index)].sessionName
            } / Datasets`;

            if (array.length > 0) {
              array.forEach((set) => {
                let day = set.date.day;
                let month = set.date.month;

                if (day < 10) {
                  day = "0" + day;
                }

                if (month < 10) {
                  month = "0" + month;
                }

                let hour = set.time.hours;
                let min = set.time.mins;
                let timeprefix = "";

                if (hour <= 12) {
                  timeprefix = "AM";
                } else if (hour > 12) {
                  timeprefix = "PM";
                  hour = hour - 12;
                }

                if (hour < 10) {
                  hour = "0" + hour;
                }

                if (min < 10) {
                  min = "0" + min;
                }

                let time = `${hour} : ${min} ${timeprefix}`;

                datasetHtml += `
                  <a href="#" class="view-all-sales-link">
                    <div class="products-sales-recent-grid-actual-grid-entry sessions-grid-entry data-set-grid-entry">
                      <div class="product-name-and-img js-session-link" data-dataid="${
                        set.id
                      }" data-datasetid ="${Number(link.dataset.sessionid)}">
                        <p>${set.name}</p>
                      </div>
              
                      <p class="responsive-table2 hide-data-second ">${day}/${month}/${
                  set.date.year
                }</p>
              
                      <p class="hide-data-first">${time}</p>
    
                      <button class="analyze-data-btn js-anlayze-data-btn" data-seshid="${
                        link.dataset.sessionid
                      }" data-dataid = "${set.id}">Analyze</button>
              
                      <button class="delete-session-btn js-delte-single-dataset" data-dataid="${
                        set.id
                      }" data-datasetid ="${Number(
                  link.dataset.sessionid
                )}"><img src="images-and-icons/icons/delete (1).png" alt="" /></button>
                    </div>
                  </a>
                `;
              });
            } else {
              datasetHtml += `
                <a href="#" class="view-all-sales-link">
                  <div class="products-sales-recent-grid-actual-grid-entry sessions-grid-entry data-set-grid-entry">
                    <div class="product-name-and-img">
                      <p>No dataset available</p>
                    </div>
                  </div>
                </a>`;
            }
          }
        });

        document.querySelector(".js-dataset-grid").innerHTML = datasetHtml;
        deleteDataset(renderDataFromDatset);
        renderResults();
      }

      renderDataFromDatset();

      document
        .querySelector(".js-go-back-to-sessions")
        .addEventListener("click", () => {
          document
            .querySelector(".js-all-sessions-table")
            .classList.remove("hide-sessions-table");
          document
            .querySelector(".js-datasets-all-table")
            .classList.add("hide-sessions-table");
        });
    });
  });
}
