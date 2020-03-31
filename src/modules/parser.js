const utils = require("./utils.js");
const lang = require("./language.js");
const instr = require("./instructions.js");

function parser(lexedInput) {
  const statements = [];
  // Divide words into statements
  let currentStatement = {words: [], tags: []};
  for (let i = 0; i < lexedInput.tags.length; i++) {
	currentStatement.words.push(lexedInput.words[i]);
	currentStatement.tags.push(lexedInput.tags[i]);
    if (lexedInput.tags[i] === lang.Tag.ASSEMBLE 
		|| lexedInput.tags[i] === lang.Tag.IDENTIFIER) {
		statements.push(currentStatement);
		currentStatement = {words: [], tags: []};
	}
  }
  // Check if statement are grammatically correct
  const instructions = [];
  for (statement of statements) {
	  for (ruleId in lang.Rule) { 
		  if (utils.compareGrammars(statement.tags, lang.Grammar[lang.Rule[ruleId]])) { 
			  grammarRule = lang.Rule[ruleId]; 
		  }
	  }
	  if (grammarRule === undefined) {
		  throw new Error("Syntax error");
	  }
	  const instruction = instr.createInstruction(statement.words, grammarRule);
	  instructions.push(instruction);
  }
  // Return instruction objects
  return instructions;
}

module.exports = parser;