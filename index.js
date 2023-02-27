let firstOperator = "";
let secondOperator = "";
let currentOperator = null;
let reset = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equal-button");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const pointButton = document.getElementById("point");
const oldScreen = document.getElementById("old-screen");
const currentScreen = document.getElementById("current-screen");

numberButtons.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => setOperator(button.textContent));
});

equalsButton.addEventListener("click", () => evaluate());

clearButton.addEventListener("click", () => clear());

deleteButton.addEventListener("click", () => deleteDigit());

pointButton.addEventListener("click", () => appendPoint());

function appendNumber(num) {
  if (currentScreen.textContent === "0" || reset) {
    resetScreen();
  }
  currentScreen.textContent += num;
}

function appendPoint() {
  if (currentScreen.textContent.includes(".")) return;
  currentScreen.textContent += ".";
}

function resetScreen() {
  currentScreen.textContent = "";
  reset = false;
}

function clear() {
  currentScreen.textContent = "";
  oldScreen.textContent = "";
  firstOperator = "";
  secondOperator = "";
  currentOperator = null;
}

function deleteDigit() {
  let str = currentScreen.textContent;
  str = str.slice(0, str.length - 1);
  currentScreen.textContent = str;
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperator = currentScreen.textContent;
  currentOperator = operator;
  oldScreen.textContent = `${firstOperator} ${currentOperator}`;
  reset = true;
}

function evaluate() {
  if (currentOperator === null || reset) return;
  if (currentOperator === "/" && currentScreen === "0") {
    alert("You cannot divide by 0!");
    return;
  }
  secondOperator = currentScreen.textContent;
  currentScreen.textContent = roundResult(
    operate(currentOperator, firstOperator, secondOperator)
  );
  oldScreen.textContent = `${firstOperator} ${currentOperator} ${secondOperator} =`;
  currentOperator = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
