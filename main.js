const resultScreenEl = document.querySelector(".result")
let resultScreen = '0';

let resultSoFar = 0;
let prevOperator = null;

const operations = {
    'plus': () => resultSoFar + parseInt(resultScreen),
    'minus': () => resultSoFar - parseInt(resultScreen),
    'multiplication': () => resultSoFar * parseInt(resultScreen),
    'division': () => resultSoFar / parseInt(resultScreen)
}

function rerenderResultScreen() {
    resultScreenEl.innerText = resultScreen;
}

function calcOperation() {
    resultSoFar = operations[prevOperator]()
}


function handleBtnClick (e) {
    if (!(e.target instanceof HTMLButtonElement)) {
        return;
    }
    const btnId = e.target.id;
        switch (btnId) {
            case "clear":
                handleClearClick()
                break;
            case "plus":
            case "minus":
            case "division":
            case "multiplication":
                handleOperatorClick(btnId)
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
    rerenderResultScreen()
}

function handleNumberClick(number) {
    if (resultScreen === '0') {
        resultScreen = number;
    }else {
        resultScreen += number;
    }
}

function handleClearClick () {
    resultScreen = '0';
}
function handleOperatorClick(operator) {
    if (resultScreen === '0') {
        return;
    }

    if (resultSoFar === 0) {
        resultSoFar = parseInt(resultScreen);
    }else {
        calcOperation()
    }


    prevOperator = operator;
    resultScreen = '0';
}
function handleEqualClick () {
    if (!prevOperator) {
        return;
    }
    calcOperation()
    resultScreen = resultSoFar.toString()
    prevOperator = null;
    resultSoFar = 0;
}
function handleBackClick() {
    if (resultScreen.length === 1) {
        resultScreen = '0';
    }else {
        resultScreen = resultScreen.substring(0, resultScreen.length - 1)
    }
}

function init () {
    const calcControls = document.querySelector(".controls");
    calcControls.addEventListener('click', handleBtnClick)
}

init()
