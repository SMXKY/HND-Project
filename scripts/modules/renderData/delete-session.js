import { sessions } from "../Backend/database/sessions.js";
import { rederSessions } from "./render-sessions.js";
import { alert } from "./alert.js";
import { datasets } from "../Backend/database/datasets.js";

export function deleteSession() {
  document.querySelectorAll(".js-delete-session-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      sessions.forEach((sesh, index) => {
        if (sesh.id === Number(btn.dataset.sessionid)) {
          sessions.splice(index, 1);
          datasets.forEach((set, index) => {
            if (sesh.id === set.id) {
              datasets.splice(index, 1);
            }
          });
        }
      });

      localStorage.setItem("sessions-db", JSON.stringify(sessions));
      localStorage.setItem("datasetsDb", JSON.stringify(datasets));

      rederSessions(sessions);

      alert("valid", "Session deleted");
    });
  });
}
