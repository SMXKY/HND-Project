import { sales } from "../database/sales.js";
import { productsAndservices } from "../database/products.js";

export function totalIncomeCalculator() {
  const allSales = sales;

  const salesThisMonth = [];
  const salesLastMonth = [];
  const lastThirdMonth = [];

  let salesThisMonthFigures = 0;
  let salesLastMonthFigures = 0;
  let ogPricesThisMonth = 0;
  let ogPricesLastMonth = 0;
  let unitsThisMonth = 0;
  let unitsLastMonth = 0;

  allSales.forEach((sale) => {
    if (sale.date.month === 3 && sale.date.year === 2024) {
      salesThisMonth.push(sale);
      salesThisMonthFigures +=
        sale.units * productsAndservices[sale.productId].productPrice;
      ogPricesThisMonth +=
        sale.units * productsAndservices[sale.productId].originalPrice;
      unitsThisMonth += sale.units;
    }
  });

  allSales.forEach((sale) => {
    if (sale.date.month === 2 && sale.date.year === 2024) {
      salesLastMonth.push(sale);
      salesLastMonthFigures +=
        sale.units * productsAndservices[sale.productId].productPrice;
      ogPricesLastMonth +=
        sale.units * productsAndservices[sale.productId].originalPrice;
      unitsLastMonth = sale.units;
    }
  });

  allSales.forEach((sale) => {
    if (sale.date.month === 1 && sale.date.year === 2024) {
      lastThirdMonth.push(sale);
    }
  });

  const profitsThisMonth = salesThisMonthFigures - ogPricesThisMonth;
  const profitsLastMonth = salesLastMonthFigures - ogPricesLastMonth;

  function calculateData(thisMonth, lastMonth, title) {
    const salesThisMonthPercentage = (thisMonth / lastMonth) * 100 - 100;

    let isUp = false;

    if (salesThisMonthPercentage > 0) {
      isUp = true;
    }

    return {
      total: thisMonth,
      percentage: Number(salesThisMonthPercentage.toFixed(2)),
      isBetter: isUp,
      cardTitle: title,
    };
  }

  function calculateReturnPercentage(array1, array2) {
    const customers = array1.length;
    let returningCustomers = 0;

    array1.forEach((customer1) => {
      for (let i = 0; i < array2.length; i++) {
        if (customer1.customerId === array2[i].customerId) {
          returningCustomers++;
          break;
        }
      }
    });

    const percentage = calculateData(returningCustomers, customers).percentage;

    return percentage;
  }

  const customerRetentionLastMonth = calculateReturnPercentage(
    lastThirdMonth,
    salesLastMonth
  );

  const customerRetentionThisMonth = calculateReturnPercentage(
    salesLastMonth,
    salesThisMonth
  );

  const income = calculateData(
    salesThisMonthFigures,
    salesLastMonthFigures,
    "Total Income"
  );
  const profits = calculateData(profitsThisMonth, profitsLastMonth, "Profits");
  const products = calculateData(
    unitsThisMonth,
    unitsLastMonth,
    "Products sold"
  );
  const retention = calculateData(
    customerRetentionThisMonth,
    customerRetentionLastMonth,
    "Customer retention"
  );

  return [income, profits, products, retention];
}
