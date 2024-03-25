import { sales } from "../database/sales.js";
import { productsAndservices } from "../database/products.js";

export function topProducts() {
  const repetitionData = [];

  productsAndservices.forEach((product) => {
    let productRepetion = 0;
    sales.forEach((sale) => {
      if (sale.productId === product.id) {
        productRepetion++;
      }
    });

    repetitionData.push({
      id: product.id,
      reps: productRepetion,
      name: checkText(product.productName),
      percent: percentage(productRepetion, sales.length).toFixed(1),
    });
  });

  function compareReps(a, b) {
    return a.reps - b.reps;
  }

  function percentage(val, total) {
    return (val / total) * 100;
  }

  function checkText(text) {
    let textArray = text.split("");
    if (textArray.length > 19) {
      textArray = textArray.slice(0, 16);
      return textArray.join("") + "...";
    } else {
      return textArray.join("");
    }
  }

  return repetitionData.sort(compareReps);
}
