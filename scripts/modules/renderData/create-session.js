import { sessions } from "../Backend/database/sessions.js";
import { alert } from "./alert.js";
import { rederSessions } from "./render-sessions.js";
import { datasets } from "../Backend/database/datasets.js";

export function createSession() {
  document
    .querySelector(".js-create-session-btn")
    .addEventListener("click", () => {
      let sessionName = document.querySelector(".js-session-name-input").value;

      if (sessionName !== "") {
        let alreadyExist = false;

        sessions.forEach((sesh) => {
          if (sesh.sessionName.toLowerCase() === sessionName.toLowerCase()) {
            alreadyExist = true;
          }
        });

        if (alreadyExist === false) {
          const seshId = sessions.length;

          sessions.push({
            id: sessions.length,
            sessionName: sessionName,
            datasets: [],
            lastEdited: {
              day: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getUTCFullYear(),
            },
            dateOfCreation: {
              day: new Date().getDate(),
              month: new Date().getMonth() + 1,
              year: new Date().getUTCFullYear(),
            },
          });

          datasets.push({
            id: seshId,
            sessionId: seshId,
            datasets: [],
          });

          document.querySelector(".js-session-name-input").value = "";

          rederSessions(sessions);

          localStorage.setItem("sessions-db", JSON.stringify(sessions));
          localStorage.setItem("datasetsDb", JSON.stringify(datasets));

          document
            .querySelector(".js-create-session-holder")
            .classList.remove("on-create-session-overlay");

          alert("valid", "Session succefully created!");
        } else {
          document.querySelector(".js-session-name-input").value = "";
          alert("error", "Session name already exist!");
        }
      } else {
        alert("error", "Session name connot be blank!");
      }
    });
}
