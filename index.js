function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function mutiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  } else if (operator === "-") {
    return subtract(num1, num2);
  } else if (operator === "*") {
    return mutiply(num1, num2);
  } else if (operator === "/") {
    return divide(num1, num2);
  } else if (operator === "C") {
    clear();
  }
}
let displayValue = "";
let equation = [];
let display = document.querySelector("p");
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "operator") {
      equation = [e.target.innerText, parseInt(displayValue)];
      displayValue = "";
      display.innerText = displayValue;
      console.log(equation);
    } else if (e.target.id === "equals") {
      if (!equation) {
        return;
      } else {
        equation.push(parseInt(display.innerText));
        console.log(equation);
        displayValue = operate(
          equation[0],
          parseInt(equation[1]),
          parseInt(equation[2])
        );
        console.log(displayValue);
        display.innerText = displayValue;
      }
    } else {
      displayValue += e.target.innerText;
      display.innerText = displayValue;
    }
  });
});
function clear() {
  displayValue = "";
  equation = [];
  display.innerText = displayValue;
}
