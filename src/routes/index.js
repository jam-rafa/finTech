const dashBoard = require("./dashboard");
const feed = require("./feed");

const xlsx = require('./xlsx')

module.exports = (app) => {
  app.use("/api", dashBoard); // Prefixo para as rotas de API
  app.use("/api", feed); // Prefixo para as rotas de API
  app.use("/api", xlsx);
};
