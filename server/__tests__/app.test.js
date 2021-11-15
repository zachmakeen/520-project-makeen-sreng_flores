const request = require("supertest");
const app = require("../app")
const { DAO } = require("../db/conn")

describe("GET /api ", async () => {
  jest.spyOn(DAO.prototype, "findAll").mockResolvedValue({ "_id": "randomId" })
  const response = await request(app).
    get("/api");
  console.log(response.text)
  console.log(response.statusCode)
})