export function popUpAnimation(
  openPopUp,
  popUpHolder,
  closePopUp,
  toggleClass
) {
  document.querySelector(`.${openPopUp}`).addEventListener("click", () => {
    document.querySelector(`.${popUpHolder}`).classList.add(`${toggleClass}`);

    document.querySelector(`.${closePopUp}`).addEventListener("click", () => {
      document
        .querySelector(`.${popUpHolder}`)
        .classList.remove(`${toggleClass}`);
    });

    document.addEventListener("click", (e) => {
      if (
        !document.querySelector(`.${popUpHolder}`).contains(e.target) &&
        !document.querySelector(`.${openPopUp}`).contains(e.target)
      ) {
        document
          .querySelector(`.${popUpHolder}`)
          .classList.remove(`${toggleClass}`);
      }
    });
  });
}
