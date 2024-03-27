export function cleanData(array, keys) {
  const sortedData = {};

  keys.forEach((key) => {
    sortedData[key] = [];
  });

  array.forEach((data) => {
    for (const property in data) {
      if (Number(property.split("")[0]) !== 0) {
        sortedData[property].push(data[property]);
      }
    }
  });

  return sortedData;
}
