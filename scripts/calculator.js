
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

    if (calculatorData.operation == undefined) { //still on first number
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
            updateScreenEquation();
            updateScreenInput();
        }
        else if (calculatorData.operation != undefined && calculatorData.secondOperand != undefined) {
            chainOperation(operation)
        }
    }
}


function chainOperation(operation) {
    if (calculatorData.result != undefined) {
        calculatorData.firstOperand = calculatorData.result;
        calculatorData.operation = operation;
        calculatorData.secondOperand = undefined;
        calculatorData.result = undefined

        updateScreenAfterOperation();
    }
    else {
        operate()
    }
}


/**
 *  For =
 */
function operate() {
    if (canBeOperated(calculatorData)) {
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
        }
        updateScreenEquation()
        updateScreenInput(calculatorData.result)
    }
    else {
        console.log("invalid operation")
    }
}

function canBeOperated(calculatorData) {
    return !isNaN(calculatorData.firstOperand) && !isNaN(calculatorData.secondOperand) && calculatorData.operation != undefined
}


/*
    Update UI
*/

function updateScreenInput(currentInput = "") {
    document.getElementById("current-input").textContent = currentInput;
}

function updateScreenEquation() {
    document.getElementById("current-equation").textContent = getCurrentEquation();
}

function getCurrentEquation() {
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