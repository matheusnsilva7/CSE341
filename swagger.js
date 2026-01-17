const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "User Api",
    description: "Users Api",
  },
  host: "localhost:3001",
  schemes: ["https", "http"],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/contactRoute.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
