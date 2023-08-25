 const calculatorDisplay = document.querySelector('h1');
 const inputBtns = document.querySelectorAll('button');
 const clearBtn = document.getElementById('clear-btn');

  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;

function sendNumberValue(number){
    // Replace current display value if first value is entered
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else{
        const dispalyValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = dispalyValue === '0' ? number : dispalyValue + number;
    }
}

function addDecimal(){
    // if operator pressed don't add decimal
    if(awaitingNextValue) return; 
    // If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate first and second value depend on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber*secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber+secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber-secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operator
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if(!firstValue){
        firstValue = currentValue;
    } else{
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation; 
    }
    //Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
    operatorValue = operator;
}

// Add Event Listener for Numbers, Operator, Decimal Buttons
inputBtns.forEach((inputBtn)=>{
    if(inputBtn.classList.length ===0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value)); 
    } else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () => addDecimal()); 
    }
}); 


// Reset all value, DIsplay

function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listener
clearBtn.addEventListener('click', resetAll);