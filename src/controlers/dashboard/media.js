const moment = require('moment');
const { getXlsData } = require('../../../store/dataStore');

const getMedia = async (req, res) => {
  try {
    const dateParam = (req.query.date || "").replace(/"/g, '');
    const requestedMonth = dateParam ? moment(dateParam, 'YYYY-MM') : null;

    const data = await getXlsData();

    // Filtra os dados
    const filteredData = data.filter(entry => {
      const entryDate = moment(entry.DATA, 'YYYY-MM-DD');
      if (!requestedMonth) {
        // Se a data não for fornecida, retorna todos os dados
        return true;
      }
      // Filtra pelo mês e ano fornecidos
      return entryDate.isSame(requestedMonth, 'month');
    });

    // Calcula totais diários
    const dailyTotals = {};
    filteredData.forEach(entry => {
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

    const daysInMonth = requestedMonth ? requestedMonth.daysInMonth() : moment().daysInMonth();
    const mediaEntradaDiaria = daysWithData > 0 ? totalEntrada / daysWithData : 0;
    const mediaSaidaDiaria = daysWithData > 0 ? totalSaida / daysWithData : 0;

    const mediaEntradaMensal = totalEntrada / daysInMonth;
    const mediaSaidaMensal = totalSaida / daysInMonth;

    res.json({
      mediaEntradaDiaria,
      mediaSaidaDiaria,
      mediaEntradaMensal,
      mediaSaidaMensal,
      daysWithData,
      daysWithNoData: daysInMonth - daysWithData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getMedia;
