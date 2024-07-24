const moment = require("moment");
const { getXlsData } = require("../../../store/dataStore");

const getBalance = async (req, res) => {
  try {
    const currentMonth = moment().subtract(1, "months").format("YYYY-MM");
    const pastMonth = moment().subtract(2, "months").format("YYYY-MM");

    const monthsData = {
      entradas: 0,
      debitos: 0,
    };

    // Organize data by month
    const data = getXlsData(); // Assuming getXlsData() returns an array of objects

    data.forEach((entry) => {
      if (entry["C/D"].toLowerCase() === "débito") {
        monthsData.debitos += entry["VALOR"];
      } else if (entry["C/D"].toLowerCase() === "crédito") {
        monthsData.entradas += entry["VALOR"];
      }
    });

    // Calculate balance and percentage changes for the current month only
    const currentData = monthsData;

    const lucroPrejuizo = currentData.entradas - currentData.debitos;

    const result = {
      month: currentMonth,
      totalEntradas: currentData.entradas.toFixed(2),
      totalDebitos: currentData.debitos.toFixed(2),
      lucroPrejuizo: lucroPrejuizo.toFixed(2),
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getBalance;
