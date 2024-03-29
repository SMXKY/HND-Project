import { renderPopups } from "./modules/pop-ups/renderPopUps.js";
import { sessions } from "./modules/Backend/database/sessions.js";
import { rederSessions } from "./modules/renderData/render-sessions.js";
import { popUpAnimation } from "./modules/Utilities/popUpAnimation.js";
import { filterSessions } from "./modules/renderData/filter-sessions.js";
import { createSession } from "./modules/renderData/create-session.js";

renderPopups();
rederSessions(sessions);

popUpAnimation(
  "js-open-filter",
  "js-filter-holder",
  "js-close-the-filter-btn",
  "hide-filter"
);

popUpAnimation(
  "js-open-create-session",
  "js-create-session-holder",
  "js-close-create-session-btn",
  "on-create-session-overlay"
);

filterSessions();

createSession();

popUpAnimation(
  "dummy",
  "js-function-allert",
  "js-close-alert-btn",
  "show-allert"
);
