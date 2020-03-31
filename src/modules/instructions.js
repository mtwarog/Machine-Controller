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