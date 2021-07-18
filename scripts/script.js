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