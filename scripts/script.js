console.log('script.js loaded...');

/* DOM Elements and Trackers
__________________________________*/

const calContainer = document.querySelector('.calculator');
const calDisplay = document.querySelector('.display');

let operands = [];
let operator = {
  element: null,
  operator: [],
  isHighlighted: false,
}

/* Event Listeners
__________________________________*/

calContainer.addEventListener('click', inputDigit);
calContainer.addEventListener('click', evaluateCurrentExpression);

/* Inputs and Display
___________________________*/

function inputDigit(e){
  if(e.target.classList.contains('digit')){
    let val = e.target.getAttribute('value');
    updateDisplay(val);
    toggleOperatorStyling(true);
  }
}

function getOperandFromInput(){
  let newOperand = calDisplay.textContent;
  if(newOperand){
    newOperand = stringToNum(newOperand);
    operands.push(newOperand);
  }
}

function updateOperator(target){
  if(operandExists()){
    operator.operator = target.getAttribute('value');
    operator.element = target;
  }
}

function stringToNum(string){
  return +string;
}

function numToString(num){
  return num.toString();
}

function updateDisplay(value){
  if(calDisplay.textContent){
    calDisplay.textContent = '';
  }
  value === 'clear' ?
  clearDisplay() :
  calDisplay.textContent = calDisplay.textContent + value;
}

function clearDisplay(){
  calDisplay.textContent = '';
  operands = [];
  toggleOperatorStyling(true);
  operator.element = null;
  operator.operator = [];
}

function toggleOperatorStyling(isDigitPress){
  if(operatorExists() && !isDigitPress){
    if(operator.isHighlighted) return;
    operator.element.classList.add('operator-pressed');
    operator.isHighlighted = true;
  }
  if(operatorExists() && isDigitPress){
    operator.element.classList.remove('operator-pressed');
    operator.isHighlighted = false;
  }
}

/* Calculator Operations
___________________________*/

function evaluateCurrentExpression(e){
  if(e.target.classList.contains('operator')){
    getOperandFromInput();
    calDisplay.textContent = '';
    toggleOperatorStyling(false);
    let result;
    if(isTimeToEvaluate()){
      result = operate(operands[0], operands[1], operator.operator);
      console.log(result);
      updateDisplay(numToString(result));
    }

    updateOperator(e.target);
    

    console.log(operands);
    console.log(operator);
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

function operate(a, b, operator){
  let result;

  switch(operator){
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
  operands = [];
  operands.push(result);
  return result;
}

/* Calculator Functions
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
