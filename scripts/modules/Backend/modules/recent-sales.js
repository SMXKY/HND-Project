import { sales } from "../database/sales.js";

export function recentSales() {
  const recentSalesRecords = [];

  function compareDate(a, b) {
    return a.date.day - b.date.day;
  }

  sales.forEach((sale) => {
    if (sale.date.month === 3 && sale.date.year === 2024) {
      recentSalesRecords.push(sale);
    }
  });

  return recentSalesRecords.sort(compareDate);
}
