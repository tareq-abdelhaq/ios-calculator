const resultScreen = document.querySelector(".result")
const controlsDiv = document.querySelector(".controls");

let operatorKey = null;
let operands = [];

let states = [{resultScreen: '0', operandA: null, operandB: null, operatorKey: null}]

const operations =  {
    'plus': (a,b) => a + b,
    'minus': (a,b) => a - b,
    'division': (a,b) => a / b,
    'multiplication': (a,b) => a * b,
}

function updateResultScreen (val) {
    resultScreen.innerText = val;
}

function handleClearClick () {
    updateResultScreen(0)
    operatorKey = null;
    operands = [];
    states = [{resultScreen: '0', operandA: null, operandB: null, operatorKey: null}]
}

function handleOperatorClick(operator) {
    if (operands.length === 0) {
        return;
    }
    if (!operatorKey) {
        operatorKey = operator;
        updateResultScreen('0')

        const lastState = states[states.length - 1]
        states.push({...lastState, operatorKey: operator, resultScreen: '0'})
    }
}

function handleNumberClick (number) {
    if (!operatorKey) {
        operands[0] = (operands[0] ?? '') + number;
        updateResultScreen(operands[0])

        const lastState = states[states.length - 1]
        states.push({...lastState, operandA: operands[0], resultScreen: operands[0]})
    }
    else {
        operands[1] = (operands[1] ?? '') + number;
        updateResultScreen(operands[1])

        const lastState = states[states.length - 1]
        states.push({...lastState, operandB: operands[1], resultScreen: operands[1]})
    }
}

function handleEqualClick () {
    if (operands.length === 0 || !operatorKey) {
        return;
    }
    const operandA = +operands[0]
    const operandB = +operands[1] ?? 0;
    const res = operations[operatorKey](operandA,operandB)
    updateResultScreen(res)

    const lastState = states[states.length - 1];
    states.push({...lastState, resultScreen: res})
}

function handleBackClick () {
    if (states.length <= 1) {
        return;
    }
    states.pop();

    const lastState = states[states.length - 1];

    operands[0] = lastState.operandA;
    operands[1] = lastState.operandB;
    updateResultScreen(lastState.resultScreen);
    operatorKey = lastState.operatorKey;
}

function handleControlsDivClick (e) {
    if (!e.target instanceof HTMLButtonElement) {
        return;
    }
    const btnId = e.target.id;
    switch (btnId) {
        case "clear":
            handleClearClick()
            break;
        case "plus":
            handleOperatorClick('plus')
            break;
        case "minus":
            handleOperatorClick('minus')
            break;
        case "division":
            handleOperatorClick('division')
            break;
        case "multiplication":
            handleOperatorClick('multiplication')
            break;
        case 'equal':
            handleEqualClick()
            break
        case "back":
            handleBackClick();
            break
        default:
            handleNumberClick(e.target.innerText)
    }
}

controlsDiv.addEventListener("click", handleControlsDivClick)
