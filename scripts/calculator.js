
/*
    Calculator data
*/
let calculatorData = resetCalculatorData();



function resetCalculatorData() {
    return {
        firstOperand: undefined,
        secondOperand: undefined,
        operation: undefined,
    }
}


/**
    Calculator methods
 */
function operate(calculatorData) {

    if (isNotOperatable(calculatorData)) {
        return null; //TODO check it out later
    }

    switch (calculatorData.operation) {
        case "+":
            return calculatorData.firstOperand + calculatorData.secondOperand;

        case "-":
            return calculatorData.firstOperand - calculatorData.secondOperand;

        case "*":
            return calculatorData.firstOperand * calculatorData.secondOperand;

        case "/":
            return calculatorData.firstOperand / calculatorData.secondOperand;
    }
}

function isNotOperatable(calculatorData) {
    return isNaN(calculatorData.firstOperand) || isNaN(calculatorData.secondOperand) || calculatorData.operation == undefined
}


/*
    Buttons methods
*/
function numberButtonClick(number) {
    if (isNaN(number)) {
        return //TODO if someone modify the button to put something other than button
    }

    if (calculatorData.operation == undefined) { //still on first number
        calculatorData.firstOperand = calculatorData.firstOperand ? parseInt("" + calculatorData.firstOperand + number) : number;
        console.log(calculatorData)
    }
    else {
        calculatorData.secondOperand = calculatorData.secondOperand ? parseInt("" + calculatorData.secondOperand + number) : number;
        console.log(calculatorData)
    }
}


function operationButtonClick(operation) {
    const acceptedOperations = "+-/*";

    if (calculatorData.operation == undefined && acceptedOperations.includes(operation)) {
        calculatorData.operation = operation;
    }
}