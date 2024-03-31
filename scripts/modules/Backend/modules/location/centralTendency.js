import { frequency } from "../frequency-and-percentage/frequencyAndPercentage.js";

export function centralTendency(data) {
  const freqData = frequency(data);
  const solution = {};

  const keys = Object.keys(freqData);

  keys.forEach((key) => {
    solution[key] = [];
  });

  let isValid = false;

  keys.forEach((set) => {
    const data = freqData[set];
    const compare = data.length;
    let mode = [];
    let mean = null;
    let median = null;
    let variance = null;
    let standardError = null;

    //Mean calculations
    if (!isNaN(Number(data[data.length - 1].val))) {
      let xf = 0;
      let sumOfFrequencies = 0;

      data.forEach((dataset) => {
        xf += Number(dataset.val) * Number(dataset.freq);
        sumOfFrequencies += Number(dataset.freq);
      });

      mean = Number((xf / sumOfFrequencies).toFixed(2));

      //Median calculation
      function compareValues(a, b) {
        return a.val - b.val;
      }

      const sortedValues = data.sort(compareValues);

      let totalFreq = 0;
      let cf = 0;
      const medArray = [];

      sortedValues.forEach((medSet) => {
        cf += medSet.freq;
        medSet.cf = cf;
        totalFreq += medSet.freq;

        for (let i = 0; i < medSet.freq; i++) {
          medArray.push(Number(medSet.val));
        }
      });

      if (totalFreq % 2 !== 0) {
        median = medArray[(totalFreq + 1) / 2 - 1];
      } else {
        median =
          (medArray[totalFreq / 2 - 1] + medArray[totalFreq / 2 + 1]) / 2;
      }

      //Variance
      const varianceTable = [];

      medArray.forEach((medVal) => {
        varianceTable.push({
          val: medVal,
          xiCheck: medVal - mean,
          xiSquared: (medVal - mean) * (medVal - mean),
        });
      });

      let sumOfxiSquared = 0;

      varianceTable.forEach((xi) => {
        sumOfxiSquared += xi.xiSquared;
      });

      variance = Number(
        (sumOfxiSquared / (varianceTable.length - 1)).toFixed(2)
      );

      standardError = Number(
        (
          Number(Math.sqrt(variance).toFixed(2)) / Math.sqrt(medArray.length)
        ).toFixed(2)
      );
    }

    //Mode calculations
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

    solution[set] = {
      dataSet: set,
      mean: mean,
      median: median,
      mode: mode,
      variance: variance,
      standardDeviation: Number(Math.sqrt(variance).toFixed(2)),
      standardError: standardError,
    };
  });
  return solution;
}
