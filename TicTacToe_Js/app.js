var board = ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
var head = 1
var tail = 2
var toss = Math.floor(Math.random() * 2) + 1;
if (toss === head) {
    console.log("user won a toss")
} else {
    console.log("computer won a toss")
}

