const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const inputElement = document.getElementById("input");
const displayRate = document.querySelector(".msg");

let i = 0;
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  const fromCurrency = fromCurr.value.toLowerCase();
  const toCurrency = toCurr.value.toLowerCase();
  let response = await fetch(URL);
  res = await response.json();
  let exchangeRate = res[fromCurrency][toCurrency];
  const inputValue = inputElement.value;

  displayRate.innerHTML = `${inputValue} ${fromCurrency.toUpperCase()} = ${(
    exchangeRate * inputValue
  ).toFixed(2)} ${toCurrency.toUpperCase()}`;
});
