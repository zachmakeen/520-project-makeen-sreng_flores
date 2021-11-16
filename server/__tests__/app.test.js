const request = require("supertest");
const app = require("../app")
const { DAO } = require("../db/conn");

jest.mock("../db/conn");

describe("GET /api ", () => {
  test("It should respond", async () => {
    const resolvedValue = [{ "_id": "randomId" }]
    jest.spyOn(DAO.prototype, "findAll").mockResolvedValue(resolvedValue)
    const response = await request(app).get("/api");
    console.log(response.text)
    expect(response.text).toEqual(JSON.stringify(resolvedValue))
    expect(response.statusCode).toBe(200)
    expect(response.type).toBe("application/json")
  })
})

describe("GET /api/", () => {
  test("It should respond", async () => {
    const resvolved = []
    jest.spyOn(DAO.prototype)
  })
})