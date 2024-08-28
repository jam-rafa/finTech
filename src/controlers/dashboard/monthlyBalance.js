const moment = require('moment');
const { getXlsData } = require('../../../store/dataStore');

// Função para converter número do mês para abreviação em português
const getMonthAbbreviation = (monthNumber) => {
  const monthMap = {
    '01': 'Jan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Abr',
    '05': 'Mai',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Ago',
    '09': 'Set',
    '10': 'Out',
    '11': 'Nov',
    '12': 'Dez'
  };
  return monthMap[monthNumber] || '';
};

const getMonthChart = async (req, res) => {
  try {
    // Obtém o parâmetro de data do query string
    const dateParam = (req.query.date || "").replace(/"/g, '');

    // Função para calcular entradas, débitos e balanços por dia
    const calculateDailyBalances = (data) => {
      const balances = {};

      data.forEach((entry) => {
        const day = moment(entry.DATA).format('DD/MM'); // Extrai o dia da data (formato DD)
        const month = moment(entry.DATA).format('MM'); // Extrai o mês da data (formato MM)
        const year = moment(entry.DATA).format('YYYY'); // Extrai o ano da data (formato YYYY)

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
        label: balances[key].dia,
        entradas: balances[key].entradas,
        saidas: balances[key].saidas,
        saldo: balances[key].saldo,
        status: balances[key].status,
      }));

      return balancesArray;
    };

    // Função para calcular balanços totais por mês
    const calculateMonthlyBalances = (data) => {
      const balances = {};

      data.forEach((entry) => {
        const month = moment(entry.DATA).format('MM'); // Extrai o mês da data (formato MM)
        const year = moment(entry.DATA).format('YYYY'); // Extrai o ano da data (formato YYYY)
        const key = `${year}-${month}`;

        if (!balances[key]) {
          balances[key] = { mes: getMonthAbbreviation(month), entradas: 0, saidas: 0, saldo: 0, status: '' };
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
        label: balances[key].mes,
        entradas: balances[key].entradas,
        saidas: balances[key].saidas,
        saldo: balances[key].saldo,
        status: balances[key].status,
      }));

      return balancesArray;
    };

    // Obtém os dados do arquivo Excel (ou outra fonte)
    const allData = getXlsData();

    // Filtra os dados se dateParam estiver presente
    const filteredData = dateParam
      ? allData.filter((entry) => {
          const entryMonth = moment(entry.DATA).format('YYYY-MM');
          const paramMonth = moment(dateParam, 'YYYY-MM').format('YYYY-MM');
          return entryMonth === paramMonth;
        })
      : allData;

    // Calcula os balanços diários com os dados filtrados
    const result = dateParam
      ? calculateDailyBalances(filteredData)
      : calculateMonthlyBalances(filteredData);

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = getMonthChart;
