export function alert(type, message) {
  const alertBoday = document.querySelector(".alert-content ");
  const cloasBtn = document.querySelector(".close-alert ");
  const messageEl = document.querySelector(".alert-message");
  const alertImg = document.querySelector(".js-close-aleart-img");

  if (type === "error") {
    alertBoday.classList.add("error-alert");
    alertBoday.classList.remove("validation-alert");

    cloasBtn.classList.add("close-alert-error-border");
    cloasBtn.classList.remove("close-alert-validation-border");

    alertImg.src = "images-and-icons/icons/close-red.png";
  } else {
    alertBoday.classList.remove("error-alert");
    alertBoday.classList.add("validation-alert");

    cloasBtn.classList.remove("close-alert-error-border");
    cloasBtn.classList.add("close-alert-validation-border");

    alertImg.src = "images-and-icons/icons/close-grean.png";
  }

  messageEl.innerHTML = message;

  document.querySelector(".js-function-allert").classList.add("show-allert");

  document
    .querySelector(`.js-close-alert-btn`)
    .addEventListener("click", () => {
      document
        .querySelector(`.js-function-allert`)
        .classList.remove(`show-allert`);
    });

  setTimeout(() => {
    document
      .querySelector(`.js-function-allert`)
      .classList.remove(`show-allert`);
  }, 2000);
}
