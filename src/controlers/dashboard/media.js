const moment = require('moment');
const { getXlsData } = require('../../../store/dataStore');

const getMedia = async (req, res) => {
  try {
    const data = await getXlsData();

    const dailyTotals = {};
    data.forEach(entry => {
      const { DATA, VALOR, "C/D": CD } = entry;
      const date = moment(DATA, 'YYYY-MM-DD').format('YYYY-MM-DD');
      if (!dailyTotals[date]) {
        dailyTotals[date] = { entrada: 0, saida: 0 };
      }
      if (CD === 'Crédito') {
        dailyTotals[date].entrada += VALOR;
      } else if (CD === 'Débito') {
        dailyTotals[date].saida += VALOR;
      }
    });

    const daysWithData = Object.keys(dailyTotals).length;
    const totalEntrada = Object.values(dailyTotals).reduce((acc, curr) => acc + curr.entrada, 0);
    const totalSaida = Object.values(dailyTotals).reduce((acc, curr) => acc + curr.saida, 0);

    const mediaEntradaDiaria = totalEntrada / daysWithData;
    const mediaSaidaDiaria = totalSaida / daysWithData;

    const daysInMonth = moment().daysInMonth();
    const mediaEntradaMensal = totalEntrada / daysInMonth;
    const mediaSaidaMensal = totalSaida / daysInMonth;

    res.json({
      mediaEntradaDiaria: mediaEntradaDiaria || 0,
      mediaSaidaDiaria: mediaSaidaDiaria || 0,
      mediaEntradaMensal: mediaEntradaMensal || 0,
      mediaSaidaMensal: mediaSaidaMensal || 0,
      daysWithData, 
      daysWithNoData: daysInMonth - daysWithData 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMedia;
