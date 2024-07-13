const mockData = require("../../mockData");
const moment = require('moment');

class DashBoardController {
  static async getMonthChart(req, res) {
    try {
      // Função para calcular entradas, saídas e balanço
      const calculateMonthlyBalances = (data) => {
        const balances = {};

        data.forEach((entry) => {
          const month = moment(entry.Data).format("YYYY-MM"); // Extrai o mês e o ano da data (formato YYYY-MM)

          if (!balances[month]) {
            balances[month] = { entradas: 0, saidas: 0, saldo: 0, status: '' };
          }

          const amount = 1; // Considerando que cada entrada ou saída é um valor de 1 unidade. Ajuste conforme necessário.

          if (entry["Tipo Pagamento"] === "Entrada") {
            balances[month].entradas += amount;
            balances[month].saldo += amount;
          } else if (entry["Tipo Pagamento"] === "Saída") {
            balances[month].saidas += amount;
            balances[month].saldo -= amount;
          }
        });

        // Determinar o status de lucro ou prejuízo
        Object.keys(balances).forEach((month) => {
          balances[month].status = balances[month].saldo >= 0 ? 'Lucro' : 'Prejuízo';
        });

        // Converter o objeto balances para um array de objetos
        const balancesArray = Object.keys(balances).map((month) => ({
          month,
          ...balances[month],
        }));

        return balancesArray;
      };

      const monthlyBalances = calculateMonthlyBalances(mockData);

      return res.status(200).json(monthlyBalances);
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}

module.exports = DashBoardController;
