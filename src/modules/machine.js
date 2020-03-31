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
