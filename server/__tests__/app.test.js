/**
 * @author Juan-Carlos Sreng-Flores
 * Date: November 15th 2021
 * This file tests the express routes in api.js
 * For each routes in api.js they will be tested using jest mock 
 * where the dependency functions will not affect the overall testing of the routes
 * Email: juan-carlos.sreng-flores@dawsoncollege.qc.ca
 */
const request = require("supertest");
const app = require("../app");
const { DAO } = require("../db/conn");

jest.mock("../db/conn");

/**
 * This super test will test the /api express route where without the mocking 
 * the result would return the full list of meteorite landings.
 * The express route is expected to return the proper information as well as returning a proper
 * status code and a type application json.
 */
describe("GET /api ", () => {
  test("Test api/ path route and expecting all meteorite landings", async () => {
    const resolvedValue = [
      {
        _id: "618d859f2e36d988bc129218",
        name: "Aachen",
        id: 1,
        nametype: "Valid",
        recclass: "L5",
        mass: 21,
        fall: "Fell",
        year: 1880,
        geo: {
          type: "Point",
          coordinates: [6.08333, 50.775]
        }
      }
    ];

    // Set up the expected value in json
    const expectedValue = [
      {
        _id: "618d859f2e36d988bc129218",
        name: "Aachen",
        id: 1,
        nametype: "Valid",
        recclass: "L5",
        mass: 21,
        fall: "Fell",
        year: 1880,
        geo: {
          type: "Point",
          coordinates: [50.775, 6.08333]
        }
      }
    ];

    // Spy on the conn.js file since we cannot connect from the test
    jest.spyOn(DAO.prototype, "findAll").mockResolvedValue(resolvedValue);

    // Send request
    const response = await request(app).get("/api");

    // compare the results and stringify the expected result
    expect(response.text).toEqual(JSON.stringify(expectedValue));
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
});

/**
 * This test will test the express route where it requires an id specification 
 * and it will return a single meteorite json element.
 * The express route is expected to return the proper information as well as returning a proper
 * status code and a type application json.
 */
describe("GET /api/meteorite_landing/:id", () => {
  test("Test api/mtetorite_landing/:id path route and expecting the meteorite with ", async () => {
    const resolvedValue =
    {
      _id: "618d859f2e36d988bc129218",
      name: "Aachen",
      id: 1,
      nametype: "Valid",
      recclass: "L5",
      mass: 21,
      fall: "Fell",
      year: 1880,
      geo: {
        type: "Point",
        coordinates: [6.08333, 50.775]
      }
    };

    // Set up the expected value in json
    const expectedValue =
    {
      _id: "618d859f2e36d988bc129218",
      name: "Aachen",
      id: 1,
      nametype: "Valid",
      recclass: "L5",
      mass: 21,
      fall: "Fell",
      year: 1880,
      geo: {
        type: "Point",
        coordinates: [50.775, 6.08333]
      }
    };
    // Spy on the conn.js module to resolve the response to a predefined value.
    jest.spyOn(DAO.prototype, "findById").mockResolvedValue(resolvedValue);

    // Send request
    const response = await request(app).get("/api/meteorite_landing/" + resolvedValue._id);

    // Compare the expected value using json stringify.
    expect(response.text).toEqual(JSON.stringify(expectedValue));
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
});

/**
 * This test will test the express route where it requires the north east and south west
 * coordinates. It will check if the result is returned properly using json/application and 
 * status code 200.
 */
describe("GET /api/meteorite_landings/", () => {
  test("Test api/meteorite_landings/", async () => {
    const resolvedValue =
      [
        {
          _id: "618d859f2e36d988bc129218",
          name: "Aachen",
          id: 1,
          nametype: "Valid",
          recclass: "L5",
          mass: 21,
          fall: "Fell",
          year: 1880,
          geo: {
            type: "Point",
            coordinates: [6.08333, 50.775]
          }
        }
      ];
    const expectedValue =
      [
        {
          _id: "618d859f2e36d988bc129218",
          name: "Aachen",
          id: 1,
          nametype: "Valid",
          recclass: "L5",
          mass: 21,
          fall: "Fell",
          year: 1880,
          geo: {
            type: "Point",
            coordinates: [50.775, 6.08333]
          }
        }
      ];

    // Set up the queyr params
    const params = "neLon=10&neLat=12&swLon=14&swLat=45";

    // Spy on the conn.js module to resolve the response to a predefined value.
    jest.spyOn(DAO.prototype, "findAllInRectangle").mockResolvedValue(resolvedValue);

    // Send request
    const response = await request(app).get("/api/meteorite_landings/?" + params);

    // Compare the expected value using json stringify.
    expect(response.text).toEqual(JSON.stringify(expectedValue));
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
  });
});