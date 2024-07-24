// index.js ou app.js
const express = require("express");
const routes = require("./src/routes");
const cors = require("cors");
const requestXlsData = require("./src/exel");
const { setXlsData, getXlsData } = require("./store/dataStore");

const app = express();

//armazena o xls em uma lista global 
const xlsData = requestXlsData();
setXlsData(xlsData);

const corsOptions = {
  origin: "*", // Replace with your frontend's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const porta = process.env.porta || 5000;

routes(app);

app.listen(porta, () => console.log(`servidor rodando porta ${porta}`));

module.exports = app;
