const { generateService, getSchema } = require("@umijs/openapi");
const path = require("path");
const schemaPath = path.resolve(__dirname, "../backend/api-doc.json");
generateService({
  schemaPath: path.resolve(__dirname, "../backend/api-doc.json"),
  serversPath: path.resolve(__dirname, "./src"),
  requestImportStatement:
    "import request from 'umi-request';const api = '/api'",
  apiPrefix: "api",
  enumStyle: true,
});
// const a = getSchema(schemaPath);

// console.log(a);
