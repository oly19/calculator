const roundDecimal = 4;

function add(a, b) {
    return Math.round((parseFloat(a) + parseFloat(b)) * 10 ** roundDecimal) 
        / 10 ** roundDecimal;
}

function subtract(a, b) {
    return Math.round((parseFloat(a) - parseFloat(b)) * 10 ** roundDecimal) 
        / 10 ** roundDecimal;
}

function multiply(a, b) {
    return Math.round((parseFloat(a) * parseFloat(b)) * 10 ** roundDecimal) 
        / 10 ** roundDecimal;
}

function divide(a, b) {
    return (b == 0)? 
        "Cannot Divide By 0": 
        Math.round((parseFloat(a) / parseFloat(b)) * 10 ** roundDecimal) 
            / 10 ** roundDecimal;
}

function percentage(num) {
    return Math.round((num * 100) * 10 ** roundDecimal) / 10 ** roundDecimal;
}

const displayResult = document.querySelector("#display-result")
const mainContainer = document.querySelector("#main-container");

const allButtons = Array.from(mainContainer.querySelectorAll("div > button"));
const numButons = allButtons.filter(button => !isNaN(parseInt(button.textContent)));
const decimalButton = allButtons.filter(button => button.textContent ==".")
const clearButton = allButtons.find(button => button.textContent == "C");
const calculateButton = allButtons.find(button => button.textContent == "=");
const operationButtons = allButtons.filter(button => {
    return (button.textContent == "%" || 
        button.textContent == "÷" || 
        button.textContent == "x" ||
        button.textContent == "-" ||
        button.textContent == "+" ||
        button.textContent == "+/-"
    )
})


allButtons.filter(button => !operationButtons.includes(button))
    .forEach((button) => {
        const currentBackgroundColor = getComputedStyle(button).backgroundColor;
        const newBackgroundColor = `rgba(${currentBackgroundColor.match(/\d+/g).
            concat("0.5").join(", ")})`;
        button.addEventListener("mousedown", () => {
            button.style.backgroundColor = newBackgroundColor;
        })
        button.addEventListener("mouseup", () => {
            button.style.backgroundColor = currentBackgroundColor;
        })
    })

allOperationsArray = operationButtons.map(button => button.textContent)
let currentOperationButton = [];
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentOperationButton.push(button);
        const n = currentExpression.length;

        if (currentExpression !== "" && currentExpression[n - 1] !== ".") {
            currentExpression += button.textContent
            displayResult.textContent = currentExpression;
            button.style["border-width"] = "4px"
        }

        const currentOperation = currentOperationButton[currentOperationButton.length - 2].textContent;
        evalString = currentExpression.slice(0,-1).split(currentOperation);
        console.log(evalString)
        console.log(currentOperation)
        if (evalString.length == 2 && evalString.every(item => item !== "")) {
                const num1 = currentExpression.split(currentOperation)[0];
                const num2 = currentExpression.split(currentOperation)[1];
                currentExpression = operate(num1, currentOperation, num2);
                displayResult.textContent = currentExpression;
                currentExpression += button.textContent
            }
    })
})

let currentExpression = ""
numButons.concat(decimalButton).forEach((button) => {
    button.addEventListener("click", () => {
        currentExpression += button.textContent
        displayResult.textContent = currentExpression;
        
        if (currentOperationButton != []) {
            currentOperationButton[currentOperationButton.length - 1].style["border-width"] = "1px"
        }
    })
})

calculateButton.addEventListener(("click"), operate);

clearButton.addEventListener(("click"), () => {
    currentExpression = ""
    displayResult.textContent = currentExpression;
})



function operate(num1, operator, num2) {

    switch (operator) {
        case "+":
            return add(num1, num2)
            break;
        case "-":
            return subtract(num1, num2)
            break;
        case "x":
            return multiply(num1, num2)
            break;
        case "÷":
            return divide(num1, num2)
            break;            
        default:
            break;
    }
}

allButtons.forEach(button => {
        
})

function runOperate(displayResult) {

}