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

      sessionHtml += `
      <a href="#" class="view-all-sales-link">
        <div class="products-sales-recent-grid-actual-grid-entry sessions-grid-entry">
          <div class="product-name-and-img">
            <p>${session.sessionName}</p>
          </div>
  
          <p class="responsive-table hide-datasets">${session.datasets.length}</p>
          
          <p class="responsive-table2">${dayE}/${monthE}/${session.lastEdited.year}</p>
  
          <p>${dayC}/${monthC}/${session.dateOfCreation.year}</p>
  
          <button class="delete-session-btn"><img src="images-and-icons/icons/delete (1).png" alt="" /></button>
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
}
