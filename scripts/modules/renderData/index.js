import { totalIncomeCalculator } from "../Backend/modules/totalIncome.js";
import { topProducts } from "../Backend/modules/topProductis.js";

export function renderDashboardDAta() {
  const cardData = totalIncomeCalculator();

  let cardHtml = "";

  cardData.forEach((data, index) => {
    let img = "";
    let IsBetterText = "";
    let IsBetterHolder = "";

    if (data.isBetter === true) {
      img = "images-and-icons/icons/up-arrow (1).png";
      IsBetterText = "isGreen";
      IsBetterHolder = "isGreenBackGround";
    } else {
      img = "images-and-icons/icons/down-arrow (1).png";
      IsBetterText = "isRed";
      IsBetterHolder = "isRedBackGround";
    }

    let extention = "";

    if (index < 2) {
      extention = "XAF";
    } else if (index > 2) {
      extention = "%";
    }

    cardHtml += `
    <div class="data-card-template">
      <p class="data-card-title">${data.cardTitle}</p>
      <p class="data-card-value">${Number(
        data.total
      ).toLocaleString()} ${extention}</p>
      <div class="data-card-footer">
        <div class="data-card-percentage ${IsBetterHolder}">
          <img src="${img}" alt="" class="data-card-percentage-img"/>
          <p class="data-card-percentage-value ${IsBetterText}">${Math.abs(
      data.percentage
    )}%</p>
        </div>

        <p class="data-card-comment">Compared to last month</p>
      </div>
    </div>
    `;
  });

  document.querySelector(".js-data-cards").innerHTML = cardHtml;

  const rankedProducts = topProducts().reverse();

  let hofHtml = "";

  for (let i = 0; i < 4; i++) {
    hofHtml += `
      <a href="" class="hof-product-link">
        <div class="hof-template">
          <img
            src="images-and-icons/products/${rankedProducts[i].id}.jpg"
            alt="product-image"
            class="hof-product-img"
          />
          <div class="hof-details">
            <div class="hof-template-numbers">
              <p class="hof-product-name">${rankedProducts[i].name}</p>
              <p class="hof-product-percentage">${rankedProducts[i].percent}% of sales</p>
            </div>
            <div class="hof-percentage-holder">
              <div class="hof-percentage-keeper" style="width: ${rankedProducts[i].percent}%"></div>
            </div>
          </div>
        </div>
      </a>
    `;
  }

  document.querySelector(".js-hof-entries").innerHTML = hofHtml;
}
