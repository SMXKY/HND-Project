import { renderPopups } from "./modules/pop-ups/renderPopUps.js";
import { toggleGraphButtonAnimaiton } from "./modules/Animations/toggleGraphButtons.js";
import { renderDashboardDAta } from "./modules/renderData/index.js";
import { csvHandler } from "./modules/Backend/csv-handler.js";

if (window.location.pathname === "/upload.html") {
  csvHandler();
} else if (window.location.pathname === "/index.html") {
  renderPopups();
  //toggleGraphButtonAnimaiton();
  renderDashboardDAta();
}
