import { frequency } from "../frequency-and-percentage/frequencyAndPercentage.js";

export function centralTendency(data) {
  const freqData = frequency(data);
  const solution = {};
  console.log(freqData);

  const keys = Object.keys(freqData);

  keys.forEach((key) => {
    solution[key] = [];
  });

  let isValid = false;

  keys.forEach((set) => {
    const data = freqData[set];

    if (!isNaN(Number(data[data.length - 1].val))) {
      console.log(set);
      let xf = 0;
      let sumOfFrequencies = 0;

      const compare = data.length;
      let mode = [];

      //Mean
      data.forEach((dataset) => {
        xf += Number(dataset.val) * Number(dataset.freq);
        sumOfFrequencies += Number(dataset.freq);
      });

      //Mode
      data.forEach((dataset) => {
        let check = 0;

        data.forEach((comp) => {
          if (dataset.freq >= comp.freq) {
            check++;
          }
        });

        if (check === compare) {
          mode.push({
            val: dataset.val,
            freq: dataset.freq,
          });
        }
      });

      const mean = (xf / sumOfFrequencies).toFixed(2);
      console.log(mean);
      console.log(mode);
    }
  });
}
