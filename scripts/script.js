/* Calculator JS

// A note about operations variables:
/* 
 - Operands are temporarily stored in an array so that evaluations can be made
   when exactly two operands exist. The resulting evaluation can then be stored
   in the newly cleared operands array. ex: [2, 2] = [4]
 - The Operator contains:
  1. an element (DOM element) for styling purposes
  2. An operator array for evaluation (see above operand explanation). The
     newest operator replaces the previous one upon evaluation.
  3. A boolean (isSelected) maintaining the current state of the operator
     element (highlighted or not)

/* resultInDisplay helps decide when the display should be cleared to allow new
number inputs after a completed operation is being shown in the display */

// decimalPressed tracks decimal presses to prevent more than one decimal point

/* DOM Elements and Variables
__________________________________*/

const calContainer = document.querySelector(".calculator");
const calDisplay = document.querySelector(".display");
const decimal = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");
//specific to keyboard input
const subtractButton = document.querySelector(".subtract");
const addButton = document.querySelector(".add");
const multiplyButton = document.querySelector(".multiply");
const divideButton = document.querySelector(".divide");
const equalsButton = document.querySelector(".equals");

let operands = [];
let operator = {
  element: null,
  operator: [],
  isSelected: false,
};

let resultInDisplay = false;
let decimalPressed = false;

/* Event Listeners
__________________________________*/

calContainer.addEventListener("click", inputDigit);
calContainer.addEventListener("click", evaluateOnOperatorPress);
calContainer.addEventListener("click", evaluateOnEquals);
decimal.addEventListener("click", disableDecimal);
backspaceButton.addEventListener("click", backspace);

/* Inputs and Display
__________________________________*/

function inputDigit(e) {
  // if there is a result in the display
  //AND
  // if there is NOT an operator (post equation)
  // clear the operands array
  if (resultInDisplay) {
    clearDisplay(true);
    resultInDisplay = false;
  }

  if (e.target.classList.contains("digit")) {
    if (!operatorExists()) {
      console.log("clearing operands!");
      operands = [];
    }
    let val = e.target.getAttribute("value");
    updateDisplay(val);
  }
}

function getOperandFromInput() {
  let newOperand = calDisplay.textContent;
  if (newOperand) {
    newOperand = stringToNum(newOperand);
    operands.push(newOperand);
  }
}

function backspace() {
  let input = calDisplay.textContent;
  let removed = input[input.length - 1];
  input = input.slice(0, input.length - 1);

  if (removed === ".") enableDecimal();
  clearDisplay();
  updateDisplay(input);
}

function updateDisplay(value) {
  value === "clear"
    ? clearVariablesAndDisplay()
    : (calDisplay.textContent = calDisplay.textContent + value);
}

function clearDisplay(resetDecimal) {
  calDisplay.textContent = "";
  removeOperatorHighlight();
  if (resetDecimal) enableDecimal();
}

function clearVariablesAndDisplay() {
  clearDisplay(true);
  operands = [];
  operator.element = null;
  operator.operator = [];
}

/* Calculator Functions
__________________________________*/

function evaluateOnOperatorPress(e) {
  if (e.target.classList.contains("operator")) {
    getOperandFromInput();
    clearDisplay(true);
    if (isTimeToEvaluate()) operate();
    if (operator.isSelected) removeOperatorHighlight();

    updateOperator(e);
    highlightOperator();
  }
}

function evaluateOnEquals(e) {
  if (e.target.classList.contains("equals")) {
    if (resultInDisplay) return;
    getOperandFromInput();
    clearDisplay();
    removeOperatorHighlight();
    if (isTimeToEvaluate()) operate();
  }
}

function isTimeToEvaluate() {
  return operands.length === 2 && operatorExists();
}

function operatorExists() {
  return operator.operator.length > 0;
}

function operandExists() {
  return operands.length != 0;
}

function updateOperator(e) {
  if (operandExists()) {
    operator.operator = e.target.getAttribute("value");
    operator.element = e.target;
  }
}

function selectOperator(key) {
  switch (key) {
    case "Backspace":
      backspaceButton.click();
      break;
    case "-":
      subtractButton.click();
      break;
    case "+":
      addButton.click();
      break;
    case "*":
      multiplyButton.click();
      break;
    case "/":
      divideButton.click();
      break;
    default:
    case "=":
    case "Enter":
      equalsButton.click();
      break;
  }
}

function operate() {
  let a = operands[0];
  let b = operands[1];
  let op = operator.operator;

  let result;

  switch (op) {
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    default:
      break;
  }

  // seperate function? operateResult()??
  if (result === "ERROR") {
    handleError();
    return;
  }

  result = formatAndDisplayResult(result);
  return result;
}

/* Calculator Operations
__________________________________*/

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "ERROR";
  return a / b;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

/* Helper Functions
__________________________________*/

function stringToNum(string) {
  return +string;
}

function numToString(num) {
  return num.toString();
}

function handleError() {
  clearVariablesAndDisplay();
  updateDisplay("ERROR");
  resultInDisplay = true;
}

function highlightOperator() {
  if (operator.element) {
    operator.element.classList.add("is-selected");
    operator.isSelected = true;
  }
}

function removeOperatorHighlight() {
  if (operator.isSelected) {
    operator.element.classList.remove("is-selected");
    operator.isSelected = false;
  }
}

function formatAndDisplayResult(result) {
  result = stringToNum(result.toFixed(3));
  operands = [];
  operands.push(result);
  updateDisplay(result);
  resultInDisplay = true;
  operator.element = null;
  operator.operator = [];

  return result;
}

function disableDecimal() {
  decimal.classList.add("decimal-pressed");
  decimalPressed = true;
}

function enableDecimal() {
  decimal.classList.remove("decimal-pressed");
  decimalPressed = false;
}

/* Keyboard Functionality
__________________________________*/

document.addEventListener("keydown", function (e) {
  const validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
  const operatorChars = ["-", "+", "*", "/", "=", "Backspace", "Enter"];
  console.log(e.key);

  if (validChars.includes(e.key)) {
    if (e.key === ".") {
      if (decimalPressed) return;
      disableDecimal();
    }
    updateDisplay(e.key);
  }
  if (operatorChars.includes(e.key)) {
    selectOperator(e.key);
  }
});
