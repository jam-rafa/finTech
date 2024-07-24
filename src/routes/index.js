const dashBoard = require("./dashboard");
const xlsx = require('./xlsx')

module.exports = (app) => {
  app.use("/api", dashBoard); // Prefixo para as rotas de API
  app.use("/api", xlsx);
};
