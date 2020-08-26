var gameLogicPath=require('./gameLogics.js')
var readlineSync = require('readline-sync');
var board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
var head = 1
var userVariable
var computerVariable
var userStarts = 1
var computerStarts = 2
var blockMove=0
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
            if (count >= 5) {
                result = rowChecking(count, computerVariable)
            }
            if (result === 1) {
                break
            }
        } else {
            if (count >= 3) {
                block = rowBlock(computerVariable)
                
                if(block!==-1)
                board[block] = computerVariable
                if (blockMove === 0) {
                    cell = getCellRandomValue()
                    cell = cellChecking(cell)
                    board[cell] = computerVariable
                }
                result = rowChecking(count, computerVariable)
            } else {
                move = cornerMove()
                board[move] = computerVariable
            }
            count += 1
            printValue()
            startGame = alternatePlay(startGame)
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
function rowChecking(count) {
    let rowValues = 0

    while (rowValues < 9) {
        let firstValue = rowValues
        let secondValue = firstValue + 1
        let thirdValue = secondValue + 1
        if (board[firstValue] === board[secondValue] && board[secondValue] === board[thirdValue] && board[firstValue] !== "_" && board[secondValue] !== "_" && board[thirdValue] !== "_") {
            result = 1
            break;
        } else {
            result = 0
        }
        if (thirdValue === 8 && result === 0) {
            reult = columnChecking(count)
        }
        rowValues = thirdValue + 1
    }
    return result
}
function columnChecking(counts) {
    var columnValues = 0
    var count = 1
    while (count < 9) {
        var firstValue = columnValues
        var secondValue = firstValue + 3
        var thirdValue = secondValue + 3
        if (board[firstValue] === board[secondValue] && board[secondValue] === board[thirdValue] && board[firstValue] !== "_" && board[secondValue] !== "_" && board[thirdValue] !== "_") {
            result = 1
            count += 3
            break;
        } else {
            count += 3
            result = 0
        }
        if (thirdValue === 8 && result === 0) {
            result = diagonalChecking(counts)
        }
        columnValues = thirdValue - 5
    }
    return result
}
function diagonalChecking(count) {
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== "_" && board[4] !== "_" && board[8] !== "_") {
        result = 1
    } else if (board[2] === board[4] && board[4] === board[6] && board[2] !== "_" && board[4] !== "_" && board[6] !== "_") {
        result = 1
    } else {
        if (count === 8) {
            result = 2
        }
    }
    return result
}
function diagonalBlock() {
    if (board[0] === board[4] && board[0] !== "_" && board[4] !== "_" && board[8] === "_") {
        block = 8
        blockMove=1
    } else if (board[4] === board[8] && board[0] === "_" && board[4] !== "_" && board[8] !== "_") {
        block = 0
        blockMove = 1
    } else if (board[0] === board[8] && board[0] !== "_" && board[4] === "_" && board[8] !== "_") {
        block = 4
        blockMove = 1
    } else if (board[4] === board[2] && board[6] === "_" && board[2] !== "_" && board[4] !== "_") {
        block = 6
        blockMove = 1
    } else if (board[4] === board[6] && board[2] === "_" && board[4] !== "_" && board[6] !== "_") {
        block = 2
        blockMove = 1
    } else if (board[2] === board[6] && board[2] === "_" && board[4] === "_" && board[6] !== "_") {
        block = 4
        blockMove = 1
    }
    
    if (blockMove === 0) {
        block=-1
    }
    return block
}
    
function columnBlock(computerVariable) {
    var columnValues = 0
    var count = 1
    while (count < 9) {
        var firstValue = columnValues
        var secondValue = firstValue + 3
        var thirdValue = secondValue + 3
        if (board[firstValue] === board[secondValue]  && board[firstValue] !== "_" && board[secondValue] !== "_" && board[thirdValue] === "_") {
            block = thirdValue
            count += 3
            blockMove = 1
            break;
        } else if (board[secondValue] === board[thirdValue] && board[firstValue] === "_" && board[secondValue] !== "_" && board[thirdValue] !== "_") {
            block = firstValue
            count += 3
            blockMove = 1
            break
        } else if (board[firstValue] === board[thirdValue] && board[firstValue] !== "_" && board[secondValue] === "_" && board[thirdValue] !== "_") {
            block = secondValue
            count += 3
            blockMove = 1
            break
        }
        if (thirdValue === 8) {
            block = diagonalBlock(computerVariable)
            break
        }
        columnValues = thirdValue - 5
    }
    return block
}
function rowBlock(computerVariable) {
    var rowValues = 0
    var count = 1
    while (rowValues < 9) {
        var firstValue = rowValues
        var secondValue = firstValue + 1
        var thirdValue = secondValue + 1
        if (board[firstValue] === board[secondValue] && board[firstValue] !== "_" && board[secondValue] !== "_" && board[thirdValue] === "_") {
            block = thirdValue
            blockMove = 1
            break;
        } else if (board[secondValue] === board[thirdValue] && board[firstValue] === "_" && board[secondValue] !== "_" && board[thirdValue] !== "_") {
            block = firstValue
            blockMove = 1
            break;
        } else if (board[firstValue] === board[thirdValue] && board[firstValue] !== "_" && board[secondValue] === "_" && board[thirdValue] !== "_") {
            block = secondValue
            blockMove = 1
            break
        }
        if (thirdValue === 8) {
            block = columnBlock(computerVariable)
        }
        rowValues = thirdValue + 1
    }
    return block
}
function cornerMove() {
    var leftUpCor = 0
    var leftLowCor = 6
    while (leftUpCor <= 3 || leftLowCor <= 8) {
        if (board[leftUpCor] === "_") {
            move = leftUpCor
            break
        } leftUpCor = leftUpCor + 2
        if (board[leftLowCor] === "-") {
            move = leftLowCor
            break
        }
        leftLowCor += 2
    } return move
}
