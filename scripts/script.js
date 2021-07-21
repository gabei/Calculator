console.log('script.js loaded...');

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

/* Inputs
___________________________*/

const calContainer = document.querySelector('.calculator');
const calDisplay = document.querySelector('.display');

calContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('key')){
    let val = e.target.getAttribute('value');
    console.log(val);
    updateDisplay(val);
  }
});

function updateDisplay(value){
  value === 'clear' ?
  calDisplay.textContent = '' :
  calDisplay.textContent = calDisplay.textContent + value;
}

/* Inputs to Calculator Operations
___________________________________*/
let operands = [];
let operator = [];

function getOperandFromInput(){
  let newOperand = calDisplay.textContent;
  newOperand = stringToNum(newOperand);
  operands.push(newOperand);
}

function stringToNum(string){
  return --string;
}

function clearDisplay(){
  calDisplay.textContent = '';
}

/* Operators
___________________________*/

calContainer.addEventListener('click', function(e){
  if(e.target.classList.contains('operator')){
    console.log(e.target);
    //NEEDS NEW FUNCTION
    /*
    When pressed:
      1. current display number is stored
      2. If isTimeToEvaluate(), operate on expression
      3. If evaluation occurs, update operands with result
      4. Continue allowing number input.
    */ 
  }
});

function isTimeToEvaluate(){
  return (
    operands.length === 2 &&
    operator.length > 0
  )
}

/* Calculator Operations
___________________________*/
let calculator = new Calculator();

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