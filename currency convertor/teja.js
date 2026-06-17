const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Add currency options
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");

    option.value = currCode;
    option.innerText = currCode;

    // Default selected
    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }

    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.appendChild(option);
  }

  // Change flag when currency changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Update country flag
const updateFlag = (element) => {
  let currCode = element.value;

  let countryCode = countryList[currCode];

  let img = element.parentElement.querySelector("img");

  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Fetch exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");

  let amtVal = amount.value;

  if (amtVal === "" || amtVal <= 0) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value}`;

  try {
    let response = await fetch(URL);

    let data = await response.json();

    let rate = data.rates[toCurr.value];

    let finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText =
      `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Conversion failed";
  }
};

// Button click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Initial load
window.addEventListener("load", () => {
  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
});