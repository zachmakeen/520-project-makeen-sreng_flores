//import `load.js` & `globals` module with CJS
const load = require("../utils/load.js");
const { expect } = require("@jest/globals");

test("lat and long properties are defined", async () => {
  const expected = [6.08333, 50.775];
  const data = await load("./__tests__/sample.json");
  console.log(data)
  expect(data[0].geo.coordinates[0]).toBe(expected[0]);
});

test("lat and long properties are undefined", async () => {
  const expected = "Nullarbor 002";
  const data = await load("./__tests__/sample-undefined-lat-long.json");
  console.log(data)
  expect(data[0].name).not.toMatch(expected);
});

test("file is found and parsed sucessfully", async () => {
  const expected = ["Aachen"];
  const data = await load("./__tests__/sample.json");
  expect(data[0]["name"]).toMatch(expected[0]);
});

test("file is not in JSON format", async () => {
  expect.assertions(1);
  try {
    await load("./__tests__/broken.json");
  } catch (e) {
    expect(e.message).toMatch("Unexpected");
  }
});

test("file is not found", async () => {
  expect.assertions(1);
  try {
    await load("./__tests__/non-existant.json");
  } catch (e) {
    expect(e.message).toMatch("no such");
  }
});