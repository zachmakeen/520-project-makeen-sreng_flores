const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const path = require("path");
const api = require("./routes/api.js");

// swagger
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Meteorite Landings",
    version: "1.0.0",
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./server/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api", api);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.resolve(__dirname, "../client/build")));



module.exports = app;
