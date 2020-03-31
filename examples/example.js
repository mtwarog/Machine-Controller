require("../src/productionLine.js");
const machineInput = "cAcAcBa";
const receipes = {"AAB": "Puppet", "ABB": "Ball"};
const newIngradientCallback = (ingradient) => console.log(`Ingradient added: ${ingradient}`);
const producedCallback = (itemProduced) => console.log(`Item produced: ${itemProduced}`);
const machine = new ProductionLine.Machine(receipes, newIngradientCallback, producedCallback);
const machineController = new ProductionLine.MachineController(machine);
machineController.runMachine(machineInput);
