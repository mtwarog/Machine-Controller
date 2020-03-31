const lang = require("../src/modules/language");
const utils = require("../src/modules/utils");

test('compareGrammar test given equal grammars', () => {
  const grammarOne = [lang.Tag.CREATE, lang.Tag.IDENTIFIER, lang.Tag.ASSEMBLE];
  const grammarTwo = [lang.Tag.CREATE, lang.Tag.IDENTIFIER, lang.Tag.ASSEMBLE];	;
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(true);
});

test('compareGrammar test given different grammars', () => {
  const grammarOne = [lang.Tag.CREATE, lang.Tag.ASSEMBLE];
  const grammarTwo = [lang.Tag.ASSEMBLE, lang.Tag.CREATE];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(false);
});

test('compareGrammar test given different length grammars', () => {
  const grammarOne = [lang.Tag.CREATE, lang.Tag.ASSEMBLE];
  const grammarTwo = [lang.Tag.CREATE, lang.Tag.IDENTIFIER, lang.Tag.ASSEMBLE];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(false);
});

test('compareGrammar test given empty grammars', () => {
  const grammarOne = [];
  const grammarTwo = [];
  const areGrammarsEqual = utils.compareGrammars(grammarOne, grammarTwo)
  expect(areGrammarsEqual).toBe(true);
});

// TODO: make below test one parameteric (data-driven) test
test('recognizeTag test given space character (WHITESPACE tag)', () => {
  const character = " ";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.WHITESPACE);
});

test('recognizeTag test given "0" character (CREATE tag)', () => {
  const character = "c";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.CREATE);
});

test('recognizeTag test given "A" character (IDENTIFIER tag)', () => {
  const character = "A";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.IDENTIFIER);
});

test('recognizeTag test given "a" character (ASSEMBLE tag)', () => {
  const character = "a";
  const recognizedTag = utils.recognizeTag(character)
  expect(recognizedTag).toBe(lang.Tag.ASSEMBLE);
});

test('recognizeTag test given throw error on unrecognized character', () => {
  const character = "#";
  expect(utils.recognizeTag.bind(this, character)).toThrow();
});

test('findTagEnd test given only one tag in input', () => {
  const input = "c";
  const found = utils.findTagEnd(input)
  expect(found).toBe(0);
});

test('findTagEnd test given only two tags in input', () => {
  const input = "cA";
  const found = utils.findTagEnd(input)
  expect(found).toBe(0);
});

test('findTagEnd test given one character input', () => {
  const input = "a";
  const found = utils.findTagEnd(input)
  expect(found).toBe(0);
});

test('findTagEnd test given empty input', () => {
  const input = "";
  const findTag = () => utils.findTagEnd(input);
  expect(findTag).toThrow("Syntax error! Tag not recognized.");
});
