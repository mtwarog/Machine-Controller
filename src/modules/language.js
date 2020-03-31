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