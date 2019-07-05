const dictionary = require("./dictionary").words;
// const dictionary = require("./dictionaryTest").words;
const letterVal = require("./letterVal");
const letterDist = require("./letterDist");
const fs = require("fs");




const wordScorer = {
  scoreWords: words => {
    let score = 0;
    // TODO: Write teh codez to do the things

    for (let i = 0; i < words.length; i++) {
      let wordScore = 0;
      for (let j = 0; j < words[i].length; j++) {
        wordScore += letterVal[words[i][j]];
      }
      score += wordScore;
    }
    return score;
  }
};


const eliminateTheImpossible = {
  checkWord: word => {
    // TODO: Write teh codez to do the things
    // loop through word
    // count the letters
    // once it exceeds a limit twice (to account for wilds) it fails and is eliminated
    // if the word requires a wild it must be tagged with the number of wilds used
    let lettersUsed = {};
    let wildsUsed = 0;
    for (let letter in word) {
      let theLetter = word[letter];
      if (lettersUsed[theLetter]) {
        lettersUsed[theLetter]++;
        let letterCompare = letterDist[theLetter];
        if (lettersUsed[theLetter] > letterCompare) {
          if (wildsUsed >= 2) {
            return { result: false };
          }
          wildsUsed++;
        }

      }
      else {
        lettersUsed[word[letter]] = 1;
      }
    }

    return {
      result: true,
      wilds: wildsUsed
    };
  },
  checkDictionary: () => {
    let newDictionary = [];
    for (let i = 0; i < dictionary.length; i++) {
      const theWord = {
        word: dictionary[i]
      }
      
      let possible = eliminateTheImpossible.checkWord(theWord.word);

      let keep = possible.result;
      theWord.wilds = possible.wilds;
      if (keep) {
        newDictionary.push(theWord);
      }
      else {
        console.log("take it out: ", theWord);
      }
    }
    console.log("newDictionary.length: ", newDictionary.length);
    return newDictionary;
  }
}

const innerWordFinder = {
  findInnerWords: word => {
    let results = [];

    // TODO: Write teh codez to do the things

    for (let i = 0; i < dictionary.length; i++) {
      if (word.includes(dictionary[i])) {
        results.push(dictionary[i]);
      }
    }

    return results;
  }
}

const scoreDictionary = {
  scoreDictionary: () => {
    let newDictionary = eliminateTheImpossible.checkDictionary();
    let scoredDictionary = [];
    for (let i = 0; i < newDictionary.length; i++) {
      let components = innerWordFinder.findInnerWords(newDictionary[i].word);
      let score = wordScorer.scoreWords(components);
      let wilds = newDictionary[i].wilds;
      let dictionaryEntry = {
        word: newDictionary[i].word,
        components: components,
        score: score,
        wilds: wilds
      };
      scoredDictionary.push(dictionaryEntry);
      if(i % 100) {

      }
      else
      {
        console.log(i);
      }
    }
    console.log(scoredDictionary.length);
    scoredDictionary.sort((a, b) => (a.score < b.score) ? 1 : (a.score === b.score) ? ((a.word.length > b.word.length) ? 1 : -1) : -1 );


    let scoredDic = JSON.stringify(scoredDictionary);
    fs.writeFile("scoredDictionary.txt", scoredDic, err => {
      if (err) throw err;
      console.log("Successfully Written");
    })
    return scoredDictionary;
  }
}

// **************************************************
/////////////////////////////////////////////////////
// **************************************************

var now = Date.now();
scoreDictionary.scoreDictionary();
var later = Date.now();
var elapsed = (later - now) / 60000;
console.log("elapsed minutes: ", elapsed);


// **************************************************
/////////////////////////////////////////////////////
// **************************************************
