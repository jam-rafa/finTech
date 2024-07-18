const moment = require('moment'); // Certifique-se de importar moment
const mockData = require('../../../mockData');

const getMonthChart = async (req, res) => {
  try {
    // Função para calcular entradas, débitos e balanço
    const calculateMonthlyBalances = (data) => {
      const balances = {};

      data.forEach((entry) => {
        const month = moment(entry.Data).format('YYYY-MM'); // Extrai o mês e o ano da data (formato YYYY-MM)

        if (!balances[month]) {
          balances[month] = { entradas: 0, saidas: 0, saldo: 0, status: '' };
        }

        if (entry['Tipo Pagamento'] === 'Entrada') {
          balances[month].entradas += entry.valor;
          balances[month].saldo += entry.valor; // Atualiza o saldo com o valor da entrada
        } else if (entry['Tipo Pagamento'] === 'débito') {
          balances[month].saidas += entry.valor;
          balances[month].saldo -= entry.valor; // Atualiza o saldo com o valor da débito
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
};

module.exports = getMonthChart;
