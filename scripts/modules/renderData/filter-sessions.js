import { rederSessions } from "./render-sessions.js";
import { sessions } from "../Backend/database/sessions.js";

export function filterSessions() {
  const year = new Date().getUTCFullYear();
  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;

  document
    .querySelector(".js-see-all-sessions")
    .addEventListener("click", () => {
      rederSessions(sessions);
    });

  document
    .querySelector(".js-sort-last-edited")
    .addEventListener("click", () => {
      const selectSessions = [];

      sessions.forEach((sesh) => {
        if (sesh.dateOfCreation.month === month) {
          selectSessions.push(sesh);
        }
      });

      function compareValues(a, b) {
        return a.dateOfCreation.day - b.dateOfCreation.day;
      }

      const sortedSessions = selectSessions.sort(compareValues);

      rederSessions(sortedSessions.reverse());
    });

  document
    .querySelector(".js-sort-this-year-sessions")
    .addEventListener("click", () => {
      const selectSessions = [];

      sessions.forEach((sesh) => {
        if (sesh.dateOfCreation.year === year) {
          selectSessions.push(sesh);
        }
      });

      function compareValues(a, b) {
        return a.dateOfCreation.month - b.dateOfCreation.month;
      }

      function compareValuesTwice(a, b) {
        return a.dateOfCreation.day - b.dateOfCreation.day;
      }

      const sortedSessions = selectSessions
        .sort(compareValues)
        .sort(compareValuesTwice);

      rederSessions(sortedSessions.reverse());
    });

  document
    .querySelector(".js-sort-sessions-today")
    .addEventListener("click", () => {
      const selectSessions = [];

      sessions.forEach((sesh) => {
        if (sesh.dateOfCreation.day === day) {
          selectSessions.push(sesh);
        }
      });

      function compareValues(a, b) {
        return a.dateOfCreation.day - b.dateOfCreation.day;
      }

      const sortedSessions = selectSessions.sort(compareValues);

      rederSessions(sortedSessions.reverse());
    });
}
