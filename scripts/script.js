console.log('script.js loaded...');

/* DOM Elements and Trackers
__________________________________*/

const calContainer = document.querySelector('.calculator');
const calDisplay = document.querySelector('.display');

let operands = [];
let operator = {
  element: null,
  operator: []
}

/* Event Listeners
__________________________________*/

calContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('digit')){
    let val = e.target.getAttribute('value');
    console.log(val);
    updateDisplay(val);
  }
});

calContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('operator')){
    let val = e.target.getAttribute('value')
    getOperandFromInput();
    operator.operator = val;
    operator.element = e.target;
    console.log(operands);
    console.log(operator);
    //NEEDS NEW FUNCTION
    /*
    When pressed:
      - if operatorExist() already?
        - then return
      - getOperandFromInput()
      -if isTimeToEvaluate()
        - then operate(a, b, operator)
        - else
          - clearDisplay() for next input
    */ 
  }
});

/* Inputs and Display
___________________________*/

function getOperandFromInput(){
  let newOperand = calDisplay.textContent;
  newOperand = stringToNum(newOperand);
  operands.push(newOperand);
}

function stringToNum(string){
  return --string;
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
  operator.operator = []
}

/* Calculator Operations
___________________________*/

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
