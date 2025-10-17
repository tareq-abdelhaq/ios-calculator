const resultScreen = document.querySelector(".result")
const controlsDiv = document.querySelector(".controls");

let operatorKey = null;
let operands = [];

let history = [{resultScreen: '0', operandA: null, operandB: null, operatorKey: null}]

const operations =  {
    'plus': (a,b) => a + b,
    'minus': (a,b) => a - b,
    'division': (a,b) => a / b,
    'multiplication': (a,b) => a * b,
}

function updateHistory (state) {
    const latestHistoryState = history[history.length - 1];
    history = [...latestHistoryState, ...state]
}

function resetHistory () {
    history = [{resultScreen: '0', operandA: null, operandB: null, operatorKey: null}]
}

function updateResultScreen (val) {
    resultScreen.innerText = val;
}

function handleClearClick () {
    updateResultScreen(0)
    operatorKey = null;
    operands = [];
    resetHistory()
}

function handleOperatorClick(operator) {
    if (operands.length === 0) {
        return;
    }
    if (!operatorKey) {
        operatorKey = operator;
        updateResultScreen('0')
        updateHistory({operatorKey: operator, resultScreen: '0'})
    }
}

function handleNumberClick (number) {
    if (!operatorKey) {
        operands[0] = (operands[0] ?? '') + number;
        updateResultScreen(operands[0])
        updateHistory({operandA: operands[0], resultScreen: operands[0]})
    }
    else {
        operands[1] = (operands[1] ?? '') + number;
        updateResultScreen(operands[1])
        updateHistory({operandB: operands[1], resultScreen: operands[1]})
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
    updateHistory({resultScreen: res})
}

function handleBackClick () {
    if (history.length <= 1) {
        return;
    }
    history.pop();

    const stateToTravel = history[history.length - 1];

    operands[0] = stateToTravel.operandA;
    operands[1] = stateToTravel.operandB;
    updateResultScreen(stateToTravel.resultScreen);
    operatorKey = stateToTravel.operatorKey;
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
