// International PCMorse by 1230james
// PCMorse -> Plaintext
"use strict";

// =====================================================================================================================

const morseTable   = require("./pcmorseTable.json"); // Translation table; ['englishChar']: "PCMorseChar"
var   unMorseTable = {}; // O(1) time baybee B)

// =====================================================================================================================

function decodePCMorseLetter(str) {
    str = str.toUpperCase();
    let letter = unMorseTable[str];
    if (letter == undefined) {
        return ""; // remove from string
    }
    return letter;
}

function decodePCMorseWord(str) { // EXCLUDE word-delineating character from str
    let arr    = str.split(" ");
    let outStr = "";
    for (let index in arr) {
        outStr += decodePCMorseLetter(arr[index]);
    }
    return outStr;
}

function decodePCMorseLine(str) {
    let arr    = str.split("/");
    let outStr = "";
    for (let index in arr) {
        outStr += decodePCMorseWord(arr[index]) + " ";
    }
    return outStr.substring(0, outStr.length - 1); // snip the space at the end off
}

// =====================================================================================================================

// Fill unMorseTable
for (let engChar in morseTable) {
    let pcmChar = morseTable[engChar];
    unMorseTable[pcmChar] = engChar;
}

module.exports = decodePCMorseLine;