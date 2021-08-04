console.log('script.js loaded...');

/* DOM Elements and Trackers
__________________________________*/

const calContainer = document.querySelector('.calculator');
const calDisplay = document.querySelector('.display');
const equalsButton = document.querySelector('.equals');

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
equalsButton.addEventListener('click', evaluateOnEquals);

/* Inputs and Display
___________________________*/

function inputDigit(e){
  if(resultInDisplay){
    calDisplay.textContent = '';
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
  clearDisplay() :
  calDisplay.textContent = calDisplay.textContent + value;
}

function clearDisplay(){
  calDisplay.textContent = '';
  operands = [];
  operator.element = null;
  operator.operator = [];
}

/* Calculator Functions
___________________________*/

function evaluateOnOperatorPress(e){
  if(e.target.classList.contains('operator')){
    getOperandFromInput();
    calDisplay.textContent = '';
    let result;

    if(isTimeToEvaluate()){
      result = operate();
      console.log(result);
    }

    updateOperator(e.target);
    
    console.log(operands);
    console.log(operator);
  }
}

function evaluateOnEquals(){
  getOperandFromInput();
  operate();
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
  operands = [];
  operands.push(result);
  console.log(result);
  updateDisplay(numToString(result));
  resultInDisplay = true;

  return result;
}

/* Calculator Operations
___________________________*/
function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}
