const lang = require("../src/modules/language");
const lexer = require("../src/modules/lexer");

// TODO: Compare arrays using Jest matchers (it will provide more verbose logging
test('lexing of code outputs words', () => {
  const sampleInput = `
	cA
	cA
	a`;
  const expectedWords = ["c", "A", "c", "A", "a"];
  const lexedInput = lexer(sampleInput);
  expect(lexedInput.words).toEqual(expectedWords);
});

test('lexing of code outputs tags', () => {
  const sampleInput = `
	cA
	a`;
  const expectedTags = [lang.Tag.CREATE, lang.Tag.IDENTIFIER, lang.Tag.ASSEMBLE];
  const lexedInput = lexer(sampleInput);
  expect(lexedInput.tags).toEqual(expectedTags);
});

test('lexing of code removes whitespaces', () => {
  const sampleInput = `
	cA
	cA
	a`;
  const lexedTags = lexer(sampleInput).tags;
  expect(lexedTags.includes(lang.Tag.WHITESPACE)).toBe(false);
});
