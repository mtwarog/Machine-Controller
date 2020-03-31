const lang = require("../src/modules/language");
const parser = require("../src/modules/parser");

test('parsing creation of identifier outputs "create identifier" instruction', () => {
  const sampleWords = ["c", "A"];
  const sampleTags = [lang.Tag.CREATE, lang.Tag.IDENTIFIER];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.CREATE, "itemToProduce": "A"};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction);
});

test('parsing assemble statement outputs "assemble" instruction', () => {
  const sampleWords = ["a"];
  const sampleTags = [lang.Tag.ASSEMBLE];
  const lexedInput = {words: sampleWords, tags: sampleTags};
  const expectedInstruction = {"grammarRule": lang.Rule.ASSEMBLE};
  const instruction = parser(lexedInput)[0];
  expect(instruction).toEqual(expectedInstruction);
});
