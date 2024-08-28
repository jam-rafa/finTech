const moment = require("moment");
const { getXlsData } = require("../../../store/dataStore");

const getBalance = async (req, res) => {
  try {
    const dateParam = req.query.date; // Obtém o parâmetro de consulta 'date'
    const monthsData = {
      entradas: 0,
      debitos: 0,
    };

    // Obtém os dados do Excel
    const data = getXlsData(); 

    // Filtra os dados com base no mês fornecido
    const filterData = data.filter((entry) => {
      const entryDate = moment(entry["DATA"], "YYYY-MM-DD", true); // Ajusta o formato e valida a data
      if (!dateParam) {
        return true; // Se nenhum mês for fornecido, não filtre por mês
      }
      const requestedMonth = moment(dateParam, "YYYY-MM", true).startOf('month');
      // Verifica se a data de entrada é válida e pertence ao mês solicitado
      return entryDate.isValid() && entryDate.isSame(requestedMonth, 'month');
    });

    filterData.forEach((entry) => {
      const valor = parseFloat(entry["VALOR"]); // Garante que VALOR é um número
      // console.log(valor, '--', entry["ID"])
      if (isNaN(valor)) {
        console.warn(`Valor inválido encontrado: ${entry["VALOR"]}`);
        return;
      }
      if (entry['C/D'].toLowerCase() === "débito") {
        monthsData.debitos += valor;
      } else if (entry['C/D'].toLowerCase() === "crédito") {
        monthsData.entradas += valor;
      }
    });

    // Calcula o saldo
    const lucroPrejuizo = monthsData.entradas - monthsData.debitos;

    const result = {
      month: dateParam || 'Todos os meses',
      totalEntradas: monthsData.entradas.toFixed(2),
      totalDebitos: monthsData.debitos.toFixed(2),
      lucroPrejuizo: lucroPrejuizo.toFixed(2),
    };

    res.json(result);
  } catch (error) {
    console.error('Erro ao processar dados:', error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = getBalance;
