(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const utils = require("./utils.js");
const lang = require("./language.js");

const InstructionDecorator = {};
InstructionDecorator[lang.Rule.CREATE] = (instruction, words) => {
	instruction.itemToProduce = words[1];
};
InstructionDecorator[lang.Rule.ASSEMBLE] = (instruction, words) => {};

const InstructionExecutor = {};
InstructionExecutor[lang.Rule.CREATE] = (instruction, machineInput) => {
    machineInput(instruction.itemToProduce);
};    
InstructionExecutor[lang.Rule.ASSEMBLE] = (instruction, machineInput) => {
    machineInput();
};    
  
function createInstruction (words, grammarRule) {
	const instruction = {};
	instruction.grammarRule = grammarRule;
	decorator = InstructionDecorator[grammarRule];
	decorator(instruction, words);
	return instruction;
};

module.exports = {
	InstructionExecutor: InstructionExecutor,
	createInstruction: createInstruction,
}
},{"./language.js":2,"./utils.js":7}],2:[function(require,module,exports){
const Tag = {
  WHITESPACE: 0,
  IDENTIFIER: 1,
  CREATE: 2,
  ASSEMBLE: 3,
}

const Rule = {
  CREATE: 0,
  ASSEMBLE: 1,
}

const Syntax = {};
Syntax[Tag.WHITESPACE] = new RegExp("\\s");
Syntax[Tag.IDENTIFIER] = new RegExp("[A-Z]");
Syntax[Tag.CREATE] = new RegExp("[c]");
Syntax[Tag.ASSEMBLE] = new RegExp("[a]");

const Grammar = {};
Grammar[Rule.CREATE] = [Tag.CREATE, Tag.IDENTIFIER];
Grammar[Rule.ASSEMBLE] = [Tag.ASSEMBLE];

module.exports = {
	Tag: Tag,
	Rule: Rule,
	Syntax: Syntax,
	Grammar: Grammar,
}
},{}],3:[function(require,module,exports){
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
},{"./language.js":2,"./utils.js":7}],4:[function(require,module,exports){
class Machine {
	constructor(receipes, newIngradientCallback, producedCallback) {
		this.receipes = receipes; // e.g. {"AAB": "Puppet", "ABB": Ball}
		this.output = producedCallback; // e.g. (product) => {console.log(product)}
		this.newIngradient = newIngradientCallback;
		this.ingradients = [];
	}
	input(ingradient) {
		if (ingradient === undefined) {
			this.assemble();
		} else {
			this.addIngradient(ingradient);
		}
	}
	addIngradient(ingradient) {
		this.ingradients.push(ingradient);
		this.newIngradient(ingradient);
	}
	assemble(ingradient) {
		this.ingradients.push(ingradient);
		const ingradients = this.ingradients.sort().join("");
		this.output(this.receipes[ingradients]);
		this.ingradients = [];
	}
	setReceipes(receipes) {
		this.receipes = receipes;
	}
	getReceipes() {
		return this.receipes;
	}
}

module.exports = Machine;

},{}],5:[function(require,module,exports){
const instruct = require("./instructions.js");
const lexer = require("./lexer.js");
const parser = require("./parser.js");

class MachineController {
  constructor(machine) {
    this.machineInput = machine.input.bind(machine);
  }
  runMachine(input) {
    const lexedInput = lexer(input);
    const instructions = parser(lexedInput);
    for (const instruction of instructions) {
  	  const executor = instruct.InstructionExecutor[instruction.grammarRule];
  	  if (executor === undefined) {
  		  throw new Error("Instruction not recognized!");
  	  }
  	  executor(instruction, this.machineInput);
    }
  }
}

module.exports = MachineController;

},{"./instructions.js":1,"./lexer.js":3,"./parser.js":6}],6:[function(require,module,exports){
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
},{"./instructions.js":1,"./language.js":2,"./utils.js":7}],7:[function(require,module,exports){
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
},{"./language.js":2}],8:[function(require,module,exports){
(function (global){
const MachineController = require("./modules/machineController.js");
const Machine = require("./modules/machine.js");

global.ProductionLine = {MachineController, Machine};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./modules/machine.js":4,"./modules/machineController.js":5}]},{},[8]);
