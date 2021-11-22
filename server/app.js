const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const api = require("./routes/api.js");
// import compression package to compress the responses.
const compression = require("compression");
const app = express();

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

// Set up compression to have the responses compressed.
app.use(compression());

// Set up browser caching. The cache will have a life time of about a year.
app.use(function (req, res, next) {
  res.set("Cache-control", "public, max-age=31536000");
  next();
});

app.use("/api", api);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.resolve(__dirname, "../client/build")));

module.exports = app;
