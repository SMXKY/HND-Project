import { frequency } from "../frequency-and-percentage/frequencyAndPercentage.js";

export function percentile(data, subScript) {
  const freqData = frequency(data);
  const solution = [];
  let percentile = 0;

  const keys = Object.keys(freqData);

  keys.forEach((key) => {
    const data = freqData[key];

    if (!isNaN(Number(data[data.length - 1].val))) {
      function compareValues(a, b) {
        return a.val - b.val;
      }

      const sortedValues = freqData[key].sort(compareValues);

      const listOfValues = [];

      sortedValues.forEach((medSet) => {
        for (let i = 0; i < medSet.freq; i++) {
          listOfValues.push(Number(medSet.val));
        }
      });

      percentile = (subScript / 100) * (listOfValues.length + 1);

      if (percentile % 1 !== 0) {
        percentile =
          (listOfValues[Math.ceil(percentile)] +
            listOfValues[Math.floor(percentile)]) /
          2;
      }

      solution.push({
        key: key,
        percentile: percentile,
      });
    }
  });

  return solution;
}
