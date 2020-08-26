var gameLogicPath=require('./gameLogics.js')
var readlineSync = require('readline-sync');
var board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
var head = 1
var userVariable
var computerVariable
var userStarts = 1
var computerStarts = 2
var count = 0
var startGame
var result


console.log(toss)
function calculateToss() {
    return Math.floor(Math.random() * 2) + 1;
}
function calculateComputerVariable() {
    if (userVariable === "x") {
        computerVariable = "o"
    } else {
        computerVariable="x"
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
    return Math.floor(Math.random() * 9) ;

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
function printValue() {
    console.log(board[0] + " | " + board[1] + " | " + board[2])
    console.log("----------------------------------------------")
    console.log(board[3] + " | " + board[4] + " | " + board[5])
    console.log("----------------------------------------------")
    console.log(board[6] + " | " + board[7] + " | " + board[8])

}

var toss = calculateToss()
if (toss === head) {
    console.log("user won a toss")
    console.log("choose a letter x or o")
    userVariable = readlineSync.question("enter a letter")
    startGame=1
    calculateComputerVariable()
} else {
    console.log("computer won a toss")
    startGame=2
    var result = calculateToss()
    if (result == 1) {
        computerVariable = "o"
        userVariable="x"
    } else {
        computerVariable = "x"
        userVariable="o"
    }

}
    while (count < board.length) {
        if (startGame === 1) {
            var cell = readlineSync.question("enter a cell number")
            board[cell] = userVariable
            count += 1;
            printValue()
            startGame = alternatePlay(startGame)
            result = gameRule(count)
            if (result === 1) {
                break
            }
        } else {
            cell = getCellRandomValue()
            cell = cellChecking(cell)
            board[cell] = computerVariable
            count += 1
            printValue()
            startGame = alternatePlay(startGame)
            result = gameRule(count)
            if (result === 1) {
                break
            }
        }
}
if (result === 1) {
    console.log("match win")
} else {
    console.log("match tie")
}
/*var boardPath = require('./app.js')
*/
function gameRule(count) {
    if (count >= 5) {
        result = rowChecking()
        if (result === "1") {
            return;
        }
        result = columnChecking()
        if (result === "1") {
            return;
        }
        result = diagonalChecking(count)
    }
    return result
}
function rowChecking() {
    let rowValues = 0

    while (rowValues < 9) {
        let firstValue = rowValues
        let secondValue = firstValue + 1
        let thirdValue = secondValue + 1
        if (board[firstValue] === board[secondValue] && board[secondValue] === board[thirdValue]) {
            result = 1
            break;
        } else {
            result = 0
        }
        rowValues = thirdValue + 1
    }
    return result
}
function columnChecking() {
    var columnValues = 0
    var count = 1
    while (count < 9) {
        var firstValue = columnValues
        var secondValue = firstValue + 3
        var thirdValue = secondValue + 3
        if (board[firstValue] === board[secondValue] && board[secondValue] === board[thirdValue]) {
            result = 1
            count += 3
            break;
        } else {
            count += 3
            result = 0
        }
        columnValues = thirdValue - 5
    }
    return result
}
function diagonalChecking(count) {
    if (board[0] === board[4] && board[4] === board[8]) {
        result = 1
    } else if (board[2] === board[4] && board[4] === board[6]) {
        result = 1
    } else {
        if (count === 8) {
            result = 2
        }
    }
    return result
}

