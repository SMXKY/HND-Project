import { popUpAnimation } from "../Utilities/popUpAnimation.js";
export function renderPopups() {
  //Sidebar slider
  popUpAnimation(
    "js-open-sidebar",
    "js-side-bar-holder",
    "js-close-side-bar",
    "show-side-bar"
  );
}
