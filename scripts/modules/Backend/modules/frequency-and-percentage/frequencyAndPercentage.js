import { validKeys } from "../../../Utilities/validKeys.js";
import { cleanData } from "../../../Utilities/cleanData.js";

export function frequency(array) {
  const keys = validKeys(array[0]);

  const data = cleanData(array, keys);

  const solution = {};

  keys.forEach((key) => {
    solution[key] = [];
  });

  for (const property in data) {
    let values = data[property];
    const total = data[property].length;

    values.forEach((val) => {
      let freq = 0;
      const value = val;
      let percentage = 0;

      values.forEach((compare) => {
        if (val === compare) {
          freq++;
        }
      });

      percentage = (freq / total) * 100;

      values = values.filter((vl) => {
        return vl !== val;
      });

      if (freq > 0) {
        solution[property].push({
          val: value,
          freq: freq,
          percent: Number(percentage.toFixed(2)),
        });
      }
    });
  }

  return solution;
}
