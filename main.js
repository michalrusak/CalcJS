const currentNumber = document.querySelector(".calc__currentNumber");
const previousNumber = document.querySelector('.calc__previousNumber');
const mathSign = document.querySelector('.calc__mathSign');

const numberBtn = document.querySelectorAll('.calc__number');
const operatorBtn = document.querySelectorAll('.calc__operator');
const equalsBtn = document.querySelector('.calc__equals');

const clearAllBtn = document.querySelector('.calc__clear-all');
const clearCurrentBtn = document.querySelector('.calc__clear-current');
const clearLastSignBtn = document.querySelector('.calc__clear-lastsign');

const clearHistoryBtn = document.querySelector('.history__clearBtn');
const historyList = document.querySelector('.history__list');

const alertBox = document.querySelector('.alert');
const alertCloseBtn = document.querySelector('.alert__closeBtn');


let result = "";
let flag = false;

// funkcje
 function displayNumbers () {
    if(this.textContent === "." && currentNumber.innerHTML.includes(".")) return;
    if(this.textContent ==="." && currentNumber.innerHTML === "") return currentNumber.innerHTML = "0.";

    if(mathSign.innerHTML === "" && flag === true){
        clearAll();
        flag = false;
    }
     currentNumber.innerHTML += this.textContent;
 }


 function operate () {
    if(currentNumber.innerHTML === "" && this.textContent === "-"){
        currentNumber.innerHTML = "-";
        return;
    } 
    else if(currentNumber.innerHTML === "") {
        return;
    };

    
    if(mathSign !== ""){
        showResult();
    }
    
    if(currentNumber.innerHTML ==="-") return;

    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = "";
    showResult();
 }

 function asignResult () {
    if(Number.isNaN(result)){
        return;
    }
    else if(result == Infinity)
    {
        clearAll();
        showAlert();
    }
    else{
        addToHistory();
        currentNumber.innerHTML = result;
        previousNumber.innerHTML = "";
        mathSign.innerHTML = "";
        flag = true;
    }
 }

 function showResult () {
    
    if(previousNumber.innerHTML === ""){
        return;
    }

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let operator = mathSign.innerHTML;


    if(operator === "1/x" || operator === "sqrt" || operator === "%" || operator === "+/-" ){
        switch(operator){
        case '1/x':
            result = 1/b;
            break;

            case "sqrt":
            result = Math.sqrt(b);
            break;

            case "%":
            result =b/100;
            break;

            case "+/-":    
            result = b*(-1);
            break;
        }
        asignResult();
    }

    else if(currentNumber.innerHTML === "") return;
    else{
        switch(operator){
                case "+":
                result = a+b;
                break;

                case "-":
                result = b-a;
                break;

                case "x":
                result = a*b;
                break;

                case "/":
                result = b/a;
                break;

                case "^":
                result = b**a;
                break;
        }
        asignResult();
    }
 }

 function addToHistory () {
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `${previousNumber.innerHTML} ${mathSign.innerHTML} ${currentNumber.innerHTML} = ${result}`;
    historyItem.classList.add('history__listItem');
    historyList.appendChild(historyItem);
 }

 function clearHistory () {
    historyList.textContent = '';
 }

 function clearAll () {
    currentNumber.innerHTML = "";
    previousNumber.innerHTML = "";
    mathSign.innerHTML = "";
 }

 function clearCurrent () {
    currentNumber.innerHTML = "";
 }

 function clearLastSign () {
    currentNumber.innerHTML = currentNumber.innerHTML.toString().slice(0,-1);
 }

 function showAlert () {
    alertBox.style.display = "block";
 }
function hideAlert () {
    alertBox.style.display = "none";
}

// nasłuchiwanie
operatorBtn.forEach((button) => button.addEventListener('click', operate));

equalsBtn.addEventListener('click', showResult);

clearAllBtn.addEventListener('click', clearAll);
clearCurrentBtn.addEventListener('click', clearCurrent);
clearLastSignBtn.addEventListener('click', clearLastSign);
clearCurrentBtn.addEventListener('click', clearCurrent);

clearHistoryBtn.addEventListener('click', clearHistory);

numberBtn.forEach(button => button.addEventListener('click', displayNumbers));
alertCloseBtn.addEventListener('click', hideAlert);
