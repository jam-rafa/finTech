const moment = require("moment");
const { getXlsData } = require("../../../store/dataStore");

// Função para traduzir os dias da semana para português
const translateDayOfWeekToPortuguese = (dayOfWeek) => {
  const daysInPortuguese = {
    'Monday': 'Segunda-feira',
    'Tuesday': 'Terça-feira',
    'Wednesday': 'Quarta-feira',
    'Thursday': 'Quinta-feira',
    'Friday': 'Sexta-feira',
    'Saturday': 'Sábado',
    'Sunday': 'Domingo'
  };
  return daysInPortuguese[dayOfWeek] || dayOfWeek;
};

const getMonthlyGrowth = async (req, res) => {
  try {
    // Remove aspas do parâmetro de data, se presentes
    const dateParam = (req.query.date || "").replace(/"/g, '');
    const data = getXlsData();

    // Filtra os dados para incluir apenas os créditos e o mês selecionado, se fornecido
    const filterData = data.filter((entry) => {
      const entryDate = moment(entry["DATA"], "YYYY-MM-DD");
      if (entry["C/D"] !== "Débito") {
        return false; // Filtra apenas os créditos
      }
      if (dateParam) {
        // Se o parâmetro date estiver presente, filtra pelo mês
        const requestedMonth = moment(dateParam, "YYYY-MM", true);
        if (!requestedMonth.isValid()) {
          return false; // Data inválida, não deve retornar dados
        }
        return entryDate.isSame(requestedMonth, 'month');
      }
      return true; // Se não houver parâmetro, inclui todos os meses
    });

    // Se não houver dados após o filtro, retorna uma resposta apropriada
    if (filterData.length === 0) {
      return res.status(404).json({ message: "No data found for the given criteria." });
    }

    // Agrupa os dados por dia da semana
    const weeklyData = filterData.reduce((acc, entry) => {
      const entryDate = moment(entry["DATA"], "YYYY-MM-DD");
      const dayOfWeek = entryDate.format('dddd'); // Nome do dia da semana em inglês
      if (!acc[dayOfWeek]) {
        acc[dayOfWeek] = { total: 0, count: 0 };
      }
      acc[dayOfWeek].total += entry["VALOR"];
      acc[dayOfWeek].count += 1;
      return acc;
    }, {});

    // Calcula a média de entrada por dia da semana
    const dailyAverage = Object.keys(weeklyData).map((dayOfWeek) => {
      const { total, count } = weeklyData[dayOfWeek];
      return {
        dayOfWeek: translateDayOfWeekToPortuguese(dayOfWeek), // Traduz para português
        average: total / count
      };
    });

    // Ordena os dias da semana de acordo com a ordem padrão em português
    const orderedDaysOfWeek = [
      'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'
    ];

    const sortedDailyAverage = orderedDaysOfWeek.map(dayOfWeek => {
      const dayData = dailyAverage.find(d => d.dayOfWeek === dayOfWeek);
      return {
        dayOfWeek,
        average: dayData ? dayData.average : 0
      };
    });

    // Retorna o resultado
    res.json(sortedDailyAverage);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getMonthlyGrowth;
