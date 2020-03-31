const MachineController = require('../src/modules/machineController.js');

test('evaluation of program with syntax error throws error', () => {
  const sampleInput = "cA;a";
  let output = "";
  const machineMock = {input: (out) => output = out};
  const machineController = new MachineController(machineMock);
  const evaluationOfIncorrectProgram = () => machineController.runMachine(sampleInput);
  expect(evaluationOfIncorrectProgram).toThrow("Syntax error");
});

test('evaluation of create operation outputs item to produce', () => {
  const sampleInput = "cA";
  let output = "";
  const machineMock = {input: (out) => output = out};
  const machineController = new MachineController(machineMock);
  machineController.runMachine(sampleInput)
  expect(output).toBe("A");
});

test('evaluation of assemble operation outputs nothing', () => {
  const sampleInput = "a";
  let output = "";
  const machineMock = {input: (out) => output = out};
  const machineController = new MachineController(machineMock);
  machineController.runMachine(sampleInput)
  expect(output).toBe();
});
