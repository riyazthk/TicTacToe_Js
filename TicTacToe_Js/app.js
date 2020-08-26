var readlineSync = require('readline-sync');
var board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
var head = 1
var userVariable
var computerVariable
var toss = calculateToss()
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
if (toss === head) {
    console.log("user won a toss")
    console.log("choose a letter x or o")
    userVariable = readlineSync.question("enter a letter")
    calculateComputerVariable()
} else {
    console.log("computer won a toss")
    var result = calculateToss()
    if (result == 1) {
        computerVariable = "o"
        userVariable="x"
    } else {
        computerVariable = "x"
        userVariable="o"
    }
}
console.log("userVariable "+userVariable)
console.log("computerVariable "+computerVariable)

