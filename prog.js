const blank = require("./blank");

// **************************************************
/////////////////////////////////////////////////////
// **************************************************

var now = Date.now();
blank.scoreDictionary.scoreDictionary();
var later = Date.now();
var elapsed = (later - now) / 1000;
console.log("elapsed seconds: ", elapsed);

// **************************************************
/////////////////////////////////////////////////////
// **************************************************