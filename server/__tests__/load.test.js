//import `load.js` & `globals` module with CJS
const load = require("../utils/load.js");
const { expect } = require("@jest/globals");

test("file is found and parsed sucessfully", async () => {
  const expected = ["This is a sample json file."];
  const data = await load("./dataset/meteorite-landings.json");
  // expect(data["test"][0]).toMatch(expected[0]);
});

// test("file is found and parsed sucessfully", async () => {
//   const expected = ["This is a sample json file."];
//   const data = await load("./__tests__/sample.json");
//   expect(data["test"][0]).toMatch(expected[0]);
// });

// test("file is not in JSON format", async () => {
//   expect.assertions(1);
//   try {
//     await load("./__tests__/broken.json");
//   } catch (e) {
//     expect(e.message).toMatch("Unexpected");
//   }
// });

// test("file is not found", async () => {
//   expect.assertions(1);
//   try {
//     await load("./__tests__/non-existant.json");
//   } catch (e) {
//     expect(e.message).toMatch("no such");
//   }
// });