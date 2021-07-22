console.log('script.js loaded...');

/* DOM Elements and Trackers
__________________________________*/

const calContainer = document.querySelector('.calculator');
const calDisplay = document.querySelector('.display');

let calculator = new Calculator();
let operands = [];
let operator = [];

/* Event Listeners
__________________________________*/

calContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('key')){
    let val = e.target.getAttribute('value');
    console.log(val);
    updateDisplay(val);
  }
});

calContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('operator')){
    console.log(e.target);
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
  calDisplay.textContent = '' :
  calDisplay.textContent = calDisplay.textContent + value;
}

function clearDisplay(){
  calDisplay.textContent = '';
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
  return operators.length > 0;
}

function operate(a, b, operator){
  let result;

  switch(operator){
    case '*':
      result = calculator.multiply(a, b);
      break;
    case '/':
      result = calculator.divide(a, b);
      break;
    case '+':
      result = calculator.add(a, b);
      break;
    case '-':
      result = calculator.subtract(a, b);
      break;
    default:
      break;
  }
  return result;
}

/* Calculator
___________________________*/

class Calculator {
  //empty for now
  constructor(){}

  multiply(a, b){
    return a * b;
  }

  divide(a, b){
    return a / b
  }

  add(a, b){
    return a + b;
  }

  subtract(a, b){
    return a - b;
  }
}