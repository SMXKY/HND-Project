import { sessions } from "../Backend/database/sessions.js";
import { deleteSession } from "./delete-session.js";
import { renderDatasets } from "./render-datasets.js";
import { datasets } from "../Backend/database/datasets.js";

export function rederSessions(array) {
  let sessionHtml = "";

  if (array.length > 0) {
    array.forEach((session) => {
      let dayC = Number(session.dateOfCreation.day);
      let monthC = Number(session.dateOfCreation.month);
      let dayE = Number(session.lastEdited.day);
      let monthE = Number(session.lastEdited.month);

      if (dayC < 10) {
        dayC = "0" + dayC;
      }

      if (monthC < 10) {
        monthC = "0" + monthC;
      }

      if (dayE < 10) {
        dayE = "0" + dayE;
      }

      if (monthE < 10) {
        monthE = "0" + monthE;
      }

      let setExist = false;
      let sesh = session.datasets.length;

      datasets.forEach((set) => {
        if (set.sessionId === session.id) {
          setExist = true;
          sesh = set.datasets.length;
        }
      });

      sessionHtml += `
      <a href="#" class="view-all-sales-link">
        <div class="products-sales-recent-grid-actual-grid-entry sessions-grid-entry">
          <div class="product-name-and-img js-session-link" data-sessionid = "${session.id}">
            <p>${session.sessionName}</p>
          </div>
  
          <p class="responsive-table hide-datasets">${sesh}</p>
          
          <p class="responsive-table2">${dayE}/${monthE}/${session.lastEdited.year}</p>
  
          <p>${dayC}/${monthC}/${session.dateOfCreation.year}</p>
  
          <button class="delete-session-btn js-delete-session-btn" data-sessionId="${session.id}"><img src="images-and-icons/icons/delete (1).png" alt="" /></button>
        </div>
      </a>
    `;
    });
  } else {
    sessionHtml += `
    <a href="#" class="view-all-sales-link">
      <div class="products-sales-recent-grid-actual-grid-entry sessions-grid-entry">
        <div class="product-name-and-img">
          <p>No session available</p>
        </div>
      </div>
    </a>`;
  }

  document.querySelector(".js-sessions-grid").innerHTML = sessionHtml;
  deleteSession();
  renderDatasets();
}
