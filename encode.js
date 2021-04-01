// International PCMorse by 1230james
// Plaintext -> PCMorse
"use strict";

// =====================================================================================================================

const morseTable   = require("./pcmorseTable.json"); // Translation table; ['englishChar']: "PCMorseChar"

// =====================================================================================================================

function encodePCMorseLetter(str) {
    str = str.toUpperCase();
    let letter = morseTable[str];
    if (letter == undefined) {
        return ""; // remove from string
    }
    return letter;
}

function encodePCMorseWord(str) {
    let arr    = str.split("");
    let outStr = "";
    for (let index in arr) {
        outStr += encodePCMorseLetter(arr[index]) + " ";
    }
    return outStr;
}

function encodePCMorseLine(str) {
    let arr    = str.split(" ");
    let outStr = "";
    for (let index in arr) {
        outStr += " / " + encodePCMorseWord(arr[index]);
    }
    return outStr.substring(3, outStr.length); // snip the delineator at the start off
}

// =====================================================================================================================

module.exports = encodePCMorseLine;