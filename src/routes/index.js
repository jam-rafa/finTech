const dashBoard = require("./dashboard");

module.exports = (app) => {
  app.use("/api", dashBoard); // Prefixo para as rotas de API
};
