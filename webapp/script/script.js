// TODO: add less for css. Check how to generate css in modern way in 2020
// TODO: read how to implement CSS grid. Do ppl still use flebox in some cases etc?

const receipesNode = document.getElementById("receipts");
const machineNode = document.getElementById("machine-ingradients-chamber");
const productsNode = document.getElementById("products");
const machinInputNode = document.getElementById("machine-input");
const runButtonNode = document.getElementById("run-machine-button");

const RECEIPE_ELEMENT_CLASS = "receipe";
const INGRADIENT_ELEMENT_CLASS = "ingradient";
const INGRADIENT_IN_MACHINE_ELEMENT_CLASS = "ingradient";

const receipes = {
  "ABC": "Puppet",
  "BCC": "Ball",
};
const ingradientNames = {
  "A": "Wool",
  "B": "Thread",
  "C": "Plastic",
}

const newIngradientCallback = (ingradient) => {
  // Modify machine to show new ingradient
  const ingradientName = ingradientNames[ingradient];
  showIngradient(ingradientName);
}
const producedCallback = (itemProduced) => {
  if (itemProduced === undefined) {
    itemProduced = "Unknown item";
  }
  showProduct(itemProduced);
  setTimeout(showEmptyMachine, 1000);
}

const machine = new ProductionLine.Machine(receipes, newIngradientCallback, producedCallback);
const machineController = new ProductionLine.MachineController(machine);

function showEmptyMachine() {
  machineNode.innerHTML = "";
}

function showIngradient(ingradientName) {
  const ingradientElement = document.createElement('div');
  ingradientElement.className = INGRADIENT_IN_MACHINE_ELEMENT_CLASS;
  ingradientElement.innerText = ingradientName;
  machineNode.appendChild(ingradientElement);
}

function showProduct(productName) {
  const productElement = document.createElement('span');
  productElement.className = RECEIPE_ELEMENT_CLASS;
  productElement.innerHTML = `${productName} <br />`;
  productsNode.appendChild(productElement);
}

function showReceipes(receipes, ingradientNames) {
  for (const receipe in receipes) {
    const ingradients = receipe.split("");
    const receipeIngradients = [];
    for (ingradient of ingradients) {
      const ingradientName = ingradientNames[ingradient];
      receipeIngradients.push(ingradientName);
    }
    printReceipe(receipes[receipe], receipeIngradients);
  }
}

function printReceipe(productName, receipeIngradientNames) {
  const receipeElement = document.createElement('span');
  receipeElement.className = RECEIPE_ELEMENT_CLASS;
  receipeElement.innerHTML = `${productName}: ${receipeIngradientNames.join(" + ")} <br />`;
  receipesNode.appendChild(receipeElement);
}

function printIngradientNames(ingradientNames) {
  const emptyLine = document.createElement('br');
  receipesNode.appendChild(emptyLine);
  for (const ingradient in ingradientNames) {
    const ingradientElement = document.createElement('span');
    ingradientElement.className = INGRADIENT_ELEMENT_CLASS;
    ingradientElement.innerHTML = `${ingradientNames[ingradient]}: ${ingradient} <br />`;
    receipesNode.appendChild(ingradientElement);
  }
}

function triggerMachine() {
  const machineInput = machinInputNode.value;
  // TODO: Validation should be done before running machine
  machineController.runMachine(machineInput);
}

showReceipes(receipes, ingradientNames);
printIngradientNames(ingradientNames);
runButtonNode.addEventListener("click", triggerMachine);
