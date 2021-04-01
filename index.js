// International PCMorse by 1230james
// An International Morse translator for r/PCM
// Requires Node.js
"use strict";

// =====================================================================================================================

const decode   = require("./decode.js");
const encode   = require("./encode.js");
const readline = require("readline");

var   state   = 0;
const rl      = readline.createInterface({
    input:    process.stdin,
    output:   process.stdout,
    terminal: false
});

/*

    Valid values for state:
    0: Menu
    1: To plaintext; prompting for input
    2: To PCMorse; prompting for input
    3: Exit prompt

*/

// =====================================================================================================================

function showMenu() {
    console.log("0: Translate to plaintext\n1: Translate to PCMorse\n\nEnter option:");
}

function promptLoop(line) {
    switch(state) {
    case 0:
        state0(line);
        break;
    case 1:
        state1(line);
        break;
    case 2:
        state2(line);
        break;
    case 3:
        state3(line);
        break;
    }
}

function state0(line) {
    switch(line) {
    case "0":
        state = 1;
        console.log("Mode selected: Translate to plaintext\n\nEnter PCMorse message:");
        break;
    case "1":
        state = 2;
        console.log("Mode selected: Translate to PCMorse\n\nEnter message to translate:");
        break;
    default:
        console.log("Invalid mode.\n");
        showMenu();
    }
}

function state1(line) {
    if (line.length < 1) { // keep waiting if the line is empty
        return;
    }
    console.log(); // blank line
    let msg = decode(line);
    console.log(msg);
    state = 3;
    console.log("\nEnter 'exit' to exit, else enter anything else to start again.");
}

function state2(line) {
    console.log();
    let msg = encode(line);
    console.log(msg);
    state = 3;
    console.log("\nEnter 'exit' to exit, else enter anything else to start again.");
}

function state3(line) {
    switch(line) {
    case "exit":
        rl.close();
        break;
    default:
        state = 0;
        showMenu();
    }
}

// =====================================================================================================================

console.log(
    "\n== International PCMorse Translator by 1230james =="
    + "\nhttps://github.com/1230james/international-pcmorse"
);
showMenu();
rl.on("line", promptLoop);