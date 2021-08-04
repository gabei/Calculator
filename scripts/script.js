/* Calculator JS

// A note about operations variables:
/* 
 - Operands are temporarily stored in an array so that evaluations can be made when exactly two operands exist. The resulting evaluation can then be stored in the newly cleared operands array. ex: [2, 2] = [4]
 - The Operator contains:
  1. an element (DOM element) for styling purposes
  2. An operator array for evaluation (see above operand explanation). The newest operator replaces the previous one upon evaluation.
  3. A boolean to signify whether the operator DOM element is currently highlighted (i.e. being used in operations) for UI. */

  /* resultInDisplay helps decide when the display should be cleared to allow new number inputs after a completed operation is being shown in the display */


/* DOM Elements and Variables
__________________________________*/

const calContainer = document.querySelector('.calculator');
const calDisplay = document.querySelector('.display');

let operands = [];
let operator = {
  element: null,
  operator: [],
  isHighlighted: false,
}

let resultInDisplay = false;

/* Event Listeners
__________________________________*/

calContainer.addEventListener('click', inputDigit);
calContainer.addEventListener('click', evaluateOnOperatorPress);
calContainer.addEventListener('click', evaluateOnEquals);

/* Inputs and Display
__________________________________*/

function inputDigit(e){
  if(resultInDisplay){
    clearDisplay();
    resultInDisplay = false;
  }

  if(e.target.classList.contains('digit')){
    let val = e.target.getAttribute('value');
    updateDisplay(val);
  }
}

function getOperandFromInput(){
  let newOperand = calDisplay.textContent;
  if(newOperand){
    newOperand = stringToNum(newOperand);
    operands.push(newOperand);
  }
}

function stringToNum(string){
  return +string;
}

function numToString(num){
  return num.toString();
}

function updateDisplay(value){
  value === 'clear' ?
  clearVariablesAndDisplay() :
  calDisplay.textContent = calDisplay.textContent + value;
}

function clearDisplay(){
  calDisplay.textContent = '';
}

function clearVariablesAndDisplay(){
  clearDisplay();
  operands = [];
  operator.element = null;
  operator.operator = [];
}

/* Calculator Functions
__________________________________*/

function evaluateOnOperatorPress(e){
  if(e.target.classList.contains('operator')){
    getOperandFromInput();
    clearDisplay();
    if(isTimeToEvaluate()) operate();
    updateOperator(e.target);
  }
}

function evaluateOnEquals(e){
  if(e.target.classList.contains('equals')) {
    if(resultInDisplay) return;
    getOperandFromInput();
    clearDisplay();
    if(isTimeToEvaluate()) operate();
  }
}

function isTimeToEvaluate(){
  return (
    operands.length === 2 &&
    operatorExists()
  )
}

function operatorExists(){
  return operator.operator.length > 0;
}

function operandExists(){
  return operands.length != 0;
}

function updateOperator(target){
  if(operandExists()){
    operator.operator = target.getAttribute('value');
    operator.element = target;
  }
}

function handleError(){
  clearVariablesAndDisplay();
  updateDisplay('ERROR');
  resultInDisplay = true;
}

function operate(){
  let a = operands[0];
  let b = operands[1];
  let op = operator.operator;
  
  let result;

  switch(op){
    case '*':
      result = multiply(a, b);
      break;
    case '/':
      result = divide(a, b);
      break;
    case '+':
      result = add(a, b);
      break;
    case '-':
      result = subtract(a, b);
      break;
    default:
      break;
  }

  // seperate function? operateResult()??
  if(result === 'ERROR'){
    handleError();
    return;
  } 
  result = stringToNum(result.toFixed(2));
  operands = [];
  operands.push(result);
  console.log(result);
  updateDisplay(result);
  resultInDisplay = true;

  return result;
}

/* Calculator Operations
__________________________________*/
function multiply(a, b){
  return a * b;
}

function divide(a, b){
  if (b === 0) return 'ERROR';
  return a / b
}

function add(a, b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}
