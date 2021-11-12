const swaggerJSDoc = require("swagger-jsdoc");

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

app.use(express.static(path.resolve(__dirname, "../client/build")));