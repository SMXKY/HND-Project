export function toggleGraphButtonAnimaiton() {
  document
    .querySelector(".js-recent-toggle-button")
    .addEventListener("click", () => {
      document
        .querySelector(".js-activity-toggle-button")
        .classList.remove("toggle-btn-on");

      document
        .querySelector(".js-activity-toggle-button")
        .classList.add("toggle-btn-off");

      document
        .querySelector(".js-recent-toggle-button")
        .classList.add("toggle-btn-on");

      document
        .querySelector(".js-recent-toggle-button")
        .classList.remove("toggle-btn-off");
    });

  document
    .querySelector(".js-activity-toggle-button")
    .addEventListener("click", () => {
      document
        .querySelector(".js-activity-toggle-button")
        .classList.add("toggle-btn-on");

      document
        .querySelector(".js-activity-toggle-button")
        .classList.remove("toggle-btn-off");

      document
        .querySelector(".js-recent-toggle-button")
        .classList.remove("toggle-btn-on");

      document
        .querySelector(".js-recent-toggle-button")
        .classList.add("toggle-btn-off");
    });
}
