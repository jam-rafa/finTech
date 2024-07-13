const express = require("express");
const routes = require("./src/routes");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const porta = process.env.porta || 5000;

routes(app);

app.listen(porta, () => console.log(`servidor rodando porta ${porta}`));

module.exports = app;