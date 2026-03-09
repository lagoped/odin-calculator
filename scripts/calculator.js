
/*
    Calculator data
*/
let calculatorData = initializeCalculatorData();



function initializeCalculatorData() {
    return {
        firstOperand: undefined,
        secondOperand: undefined,
        operation: undefined,
        result: undefined,
    }
}


/*
    Buttons methods
*/
function numberButtonClick(number) {
    if (isNaN(number)) {
        return
    }

    if (calculatorData.operation == undefined || calculatorData.result != undefined) { //still on first number, or new series

        if (calculatorData.result != undefined) {
            calculatorData = initializeCalculatorData();
            updateScreenEquation();
        }

        calculatorData.firstOperand = calculatorData.firstOperand ? parseInt("" + calculatorData.firstOperand + number) : number;
        updateScreenInput(calculatorData.firstOperand);
    }
    else {
        calculatorData.secondOperand = calculatorData.secondOperand ? parseInt("" + calculatorData.secondOperand + number) : number;
        updateScreenInput(calculatorData.secondOperand);
    }
}


function operationButtonClick(operation) {
    const acceptedOperations = "+-/*";

    if (acceptedOperations.includes(operation)) {

        if (calculatorData.operation == undefined) {
            calculatorData.operation = operation;
            updateScreenAfterOperation();
        }
        else if (calculatorData.operation != undefined && calculatorData.secondOperand != undefined) {
            chainOperation(operation)
        }
    }
}


function chainOperation(operation) {
    if (calculatorData.result == undefined) {
        operate();
        updateScreenResult(calculatorData.result);
    }

    calculatorData.firstOperand = calculatorData.result;
    calculatorData.operation = operation;
    calculatorData.secondOperand = undefined;
    calculatorData.result = undefined

    updateScreenEquation();
    updateScreenInput();
}


/**
 *  For =
 */
function equalButtonClick() {
    if (canBeOperated(calculatorData)) {
        operate();

        updateScreenResult(calculatorData.result);
        updateScreenAfterOperation();
    }
    else {
        console.log("invalid operation")
    }
}


function canBeOperated(calculatorData) {
    return !isNaN(calculatorData.firstOperand) && !isNaN(calculatorData.secondOperand) && calculatorData.operation != undefined
}

function operate() {
    switch (calculatorData.operation) {
        case "+":
            calculatorData.result = calculatorData.firstOperand + calculatorData.secondOperand;
            break;

        case "-":
            calculatorData.result = calculatorData.firstOperand - calculatorData.secondOperand;
            break;

        case "*":
            calculatorData.result = calculatorData.firstOperand * calculatorData.secondOperand;
            break;

        case "/":
            calculatorData.result = calculatorData.firstOperand / calculatorData.secondOperand;
            break;

        default:
            console.log("Operation not recognized");
            break;
    }
}

/*
    Update UI
*/

function updateScreenInput(currentInput = "") {
    console.log(currentInput)
    console.log(calculatorData)
    document.getElementById("current-input").textContent = currentInput;
}

function updateScreenResult(currentResult = "") {
    document.getElementById("equation-result").textContent = currentResult;
}

function updateScreenEquation() {
    document.getElementById("current-equation").textContent = getCurrentEquation();
}

function getCurrentEquation() {
    if (calculatorData.firstOperand == undefined) {
        return "";
    }

    let equation = "" + calculatorData.firstOperand

    if (calculatorData.operation != undefined) {
        equation = equation + " " + calculatorData.operation

        if (calculatorData.secondOperand != undefined) {
            equation = equation + " " + calculatorData.secondOperand
        }
    }

    return equation;
}

function updateScreenAfterOperation() {
    updateScreenEquation()
    updateScreenInput();
}