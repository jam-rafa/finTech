const moment = require('moment');
const mockData = require('../../../mockData');

const getBalance = async (req, res) => {
  try {
    const currentMonth = moment().format('YYYY-MM');
    const previousMonth = moment().subtract(1, 'months').format('YYYY-MM');

    const monthsData = {
      [currentMonth]: { entradas: 0, debitos: 0 },
      [previousMonth]: { entradas: 0, debitos: 0 }
    };

    // Organize data by month
    mockData.forEach(entry => {
      const month = moment(entry.Data).format('YYYY-MM');
      if (monthsData[month]) {
        if (entry["Tipo Pagamento"].toLowerCase() === 'entrada') {
          monthsData[month].entradas += entry.valor;
        } else if (entry["Tipo Pagamento"].toLowerCase() === 'débito') {
          monthsData[month].debitos += entry.valor;
        }
      }
    });

    // Calculate balance and percentage changes for the current month only
    const currentData = monthsData[currentMonth];
    const previousData = monthsData[previousMonth];

    const lucroPrejuizo = currentData.entradas - currentData.debitos;

    const entradaPercentChange = previousData.entradas ? ((currentData.entradas - previousData.entradas) / previousData.entradas) * 100 : 100;
    const debitoPercentChange = previousData.debitos ? ((currentData.debitos - previousData.debitos) / previousData.debitos) * 100 : 100;
    const lucroPrejuizoPercentChange = (previousData.entradas - previousData.debitos) ? ((lucroPrejuizo - (previousData.entradas - previousData.debitos)) / (previousData.entradas - previousData.debitos)) * 100 : 100;

    const result = {
      month: currentMonth,
      totalEntradas: currentData.entradas,
      totalDebitos: currentData.debitos,
      lucroPrejuizo,
      entradaPercentChange: entradaPercentChange.toFixed(2),
      debitoPercentChange: debitoPercentChange.toFixed(2),
      lucroPrejuizoPercentChange: lucroPrejuizoPercentChange.toFixed(2),
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getBalance;
