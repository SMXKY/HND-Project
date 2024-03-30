import { datasets } from "../Backend/database/datasets.js";
import { alert } from "./alert.js";
import { csvHandler } from "../Backend/csv-handler.js";
import { sessions } from "../Backend/database/sessions.js";

export function cretedataset(sessionid, data, render) {
  document
    .querySelector(".js-create-new-dataset-store-btn")
    .addEventListener("click", () => {
      const inputField = document.querySelector(".js-input-dataset-name");
      const inputFile = document.querySelector(".js-input-dataset-file");

      const extension = inputFile.files[0].name.split("").slice(-3).join("");

      if (
        inputField.value !== "" &&
        inputFile.files.length > 0 &&
        extension === "csv"
      ) {
        let nameExist = false;

        datasets.forEach((set) => {
          if (set.sessionId === sessionid) {
            set.datasets.forEach((subset) => {
              if (
                subset.name.toLocaleLowerCase() ===
                inputField.value.toLocaleLowerCase()
              ) {
                nameExist = true;
              }
            });

            if (nameExist === false) {
              set.datasets.push({
                id: set.datasets.length,
                name: inputField.value,
                date: {
                  day: new Date().getDate(),
                  month: new Date().getMonth(),
                  year: new Date().getUTCFullYear(),
                },
                time: {
                  hours: new Date().getHours(),
                  mins: new Date().getMinutes(),
                },
                data: [],
              });

              set.datasets.forEach((subseter) => {
                if (subseter.id === set.datasets.length - 1) {
                  subseter.data.push(data);
                }
              });

              localStorage.setItem("datasetsDb", JSON.stringify(datasets));

              render();

              alert("valid", "Dataset successfully created");

              document
                .querySelector(".js-create-new-dataset-holder")
                .classList.remove("on-create-session-overlay");
            } else {
              alert("error", "Dataset name already exist");
              inputField.value = "";
            }
          }
        });
      } else {
        alert(
          "error",
          "Dataset name or File upload field cannot be empty, uploaded file must also be csv!!"
        );
        inputField.value = "";
      }
    });
}
