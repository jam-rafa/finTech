const moment = require('moment'); // Certifique-se de importar moment
const { getXlsData } = require('../../../store/dataStore');

const getMonthChart = async (req, res) => {
  try {
    // Função para calcular entradas, débitos e balanço por dia e mês
    const calculateDailyBalances = (data) => {
      const balances = {};

      data.forEach((entry) => {
        const day = moment(entry.DATA).format('DD/MM'); // Extrai o dia da data (formato DD)
        const month = moment(entry.DATA).format('MM'); // Extrai o mês da data (formato MM)

        const key = `${day}-${month}`;

        if (!balances[key]) {
          balances[key] = { dia: day, entradas: 0, saidas: 0, saldo: 0, status: '' };
        }

        if (entry['C/D'] === 'Débito') {
          balances[key].saidas += entry.VALOR;
          balances[key].saldo -= entry.VALOR; // Atualiza o saldo com o valor do débito
        } else if (entry['C/D'] === 'Crédito') {
          balances[key].entradas += entry.VALOR;
          balances[key].saldo += entry.VALOR; // Atualiza o saldo com o valor da entrada
        }
      });

      // Determinar o status de lucro ou prejuízo
      Object.keys(balances).forEach((key) => {
        balances[key].status = balances[key].saldo >= 0 ? 'Lucro' : 'Prejuízo';
      });

      // Converter o objeto balances para um array de objetos
      const balancesArray = Object.keys(balances).map((key) => ({
        dia: balances[key].dia,
        entradas: balances[key].entradas,
        saidas: balances[key].saidas,
        saldo: balances[key].saldo,
        status: balances[key].status,
      }));

      return balancesArray;
    };

    const data = getXlsData(); // Obtém os dados do arquivo Excel (ou outra fonte)

    const dailyBalances = calculateDailyBalances(data);

    return res.status(200).json(dailyBalances);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = getMonthChart;
