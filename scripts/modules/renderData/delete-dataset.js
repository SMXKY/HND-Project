import { datasets } from "../Backend/database/datasets.js";

export function deleteDataset(render) {
  document.querySelectorAll(".js-delte-single-dataset").forEach((btn) => {
    btn.addEventListener("click", () => {
      datasets[Number(btn.dataset.datasetid)].datasets.forEach((set, index) => {
        if (set.id === Number(btn.dataset.dataid)) {
          datasets[Number(btn.dataset.datasetid)].datasets.splice(index, 1);
        }
      });

      render();
      deleteDataset(render);
      localStorage.setItem("datasetsDb", JSON.stringify(datasets));
    });
  });
}
