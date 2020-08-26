function calculateToss() {
    return Math.floor(Math.random() * 2) + 1;
}
function calculateComputerVariable() {
    if (userVariable === "x") {
        computerVariable = "o"
    } else {
        computerVariable = "x"
    }
}
function alternatePlay(startGame) {
    if (startGame === 1) {
        startGame = 2
    } else {
        startGame = 1
    }
    return startGame
}
function getCellRandomValue() {
    return Math.floor(Math.random() * 9);

}
function cellChecking(cell) {
    while (board[cell] !== "_") {
        if (board[cell] === "_") {
            break
        } else {
            cell = getCellRandomValue()
        }
    }
    return cell
}

module.exports = { calculateToss, calculateComputerVariable, alternatePlay, getCellRandomValue, cellChecking}