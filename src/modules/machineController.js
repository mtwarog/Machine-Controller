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
