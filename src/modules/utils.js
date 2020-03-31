const lang = require("./language.js");

const Util = {
  compareGrammars: (sentenceOne, sentenceTwo) => {
    if (sentenceOne.length != sentenceTwo.length) {
      return false;
    };
    for (let i = 0; i < sentenceOne.length; i++) {
      if (sentenceOne[i] != sentenceTwo[i]) {
        return false;
      }
    }
    return true;
  },
  recognizeTag: (character) => {
    for (const tagName in lang.Tag) {
      if (lang.Syntax[lang.Tag[tagName]].test(character)) {
        return lang.Tag[tagName];
      }
    }
    throw new Error("Syntax error! Tag not recognized.")
  },
  findTagEnd: (input) => {  
    const tagName = Util.recognizeTag(input[0]);
    for (let i = 1; i < input.length; i++) {
      const nextTagName = Util.recognizeTag(input[i]);
      if (tagName != nextTagName) {  
        return i - 1;
      }
    }
    return input.length - 1;
  },
};

module.exports = Util;