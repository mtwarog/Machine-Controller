const utils = require("./utils.js");
const lang = require("./language.js");

function lexer(input) {
  const words = [];
  const tags = [];
  // Divide inputs and generate tags
  while (input.length > 0) {
    const nextTag = utils.recognizeTag(input[0]);
    const nextTagEnd = utils.findTagEnd(input);
    const nextWord = input.slice(0, nextTagEnd + 1);
    words.push(nextWord);
    tags.push(nextTag);
    input = input.slice(nextTagEnd + 1);
  }
  // Get rid of all whitespaces
  for (let i = 0; i < words.length; i++) {
    if (tags[i] === lang.Tag.WHITESPACE) {
      words.splice(i, 1);
      tags.splice(i, 1);
      i = i - 1;
    }
  }
  // Return divided input and tags
  return {
    "words": words,
    "tags": tags,
  }
}

module.exports = lexer;