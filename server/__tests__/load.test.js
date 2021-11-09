//import `load.js` & `globals` module with CJS
const load = require("../api/load.js");
const { expect } = require("@jest/globals");

test("file is found and parsed sucessfully", async () => {
  const expected = ["This is a sample json file."];
  const data = await load("./__tests__/sample.json");
  expect(data["test"][0]).toMatch(expected[0]);
});