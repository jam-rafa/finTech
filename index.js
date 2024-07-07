const express = require("express");
const app = express();
const port = 5000;
const XLSX = require("xlsx");
const path = require("path");

// Endpoint para converter todas as abas da planilha para JSON
app.get("/planilha", (req, res) => {
  const filePath = path.join(__dirname, "NA PRAIA.xlsx");

  try {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const data = {};

    sheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      data[sheetName] = XLSX.utils.sheet_to_json(worksheet);
    });

    res.json(data);
  } catch (error) {
    res.status(500).send("Erro ao processar a planilha: " + error);
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
