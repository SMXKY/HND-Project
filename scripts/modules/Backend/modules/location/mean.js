function normalMean(data) {
  let mean = 0.0;
  if (data.length > 100) {
    mean = groupedData(data);
  } else {
    mean = ungroupedData(data);
  }

  return mean;
}

function ungroupedData(ungroupedData = []) {
  let mean = 0.0;
  let sum = 0;

  for (let i = 0; i < ungroupedData.length; i++) {
    sum += ungroupedData[i];
  }

  return (mean = sum / ungroupedData.length);
}

function groupingData(data = []) {
  const groupedData = [];

  class groupedValue {
    constructor(number, frequency) {
      this.number = number;
      this.frequency = frequency;
    }
  }

  const doneValues = [0];

  data.forEach((value) => {
    let countFrequency = 0;
    let isDone = false;

    doneValues.forEach((doneValue) => {
      if (doneValue === value) {
        isDone = true;
      }
    });

    data.forEach((valueCount) => {
      if (value === valueCount) {
        countFrequency++;
      }
    });

    if (isDone === false) {
      const valueObj = new groupedValue(value, countFrequency);
      groupedData.push(valueObj);
    }

    doneValues.push(value);
  });

  return groupedData;
}

function groupedData(data = []) {
  const groupedDataArray = groupingData(data);

  let mean = 0.0;
  let sum = 0;
  let sumOfFreq = 0;

  groupedDataArray.forEach((value) => {
    sum += value.number * value.frequency;
    sumOfFreq += value.frequency;
  });

  return (mean = sum / sumOfFreq);
}
