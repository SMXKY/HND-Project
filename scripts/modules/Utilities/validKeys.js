export function validKeys(obj) {
  const allKeys = Object.keys(obj);
  const validKeys = [];

  allKeys.forEach((key) => {
    if (Number(key.split("")[0]) !== 0) {
      validKeys.push(key);
    }
  });

  return validKeys;
}
