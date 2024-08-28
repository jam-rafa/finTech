const moment = require('moment');
const { getXlsData } = require('../../../store/dataStore');

const getSectorChat = async (req, res) => {
  try {
    // Obtém o parâmetro de data do query string
    const dateParam = (req.query.date || "").replace(/"/g, '');
    console.log(dateParam, 'param');

    // Obtém os dados do arquivo Excel (ou outra fonte)
    let data = getXlsData();

    // Filtra os dados se dateParam estiver presente
    if (dateParam) {
      const startOfMonth = moment(dateParam, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(dateParam, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
      
      data = data.filter(item => {
        const itemDate = moment(item.DATA).format('YYYY-MM-DD');
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
      });
    }

    // Filtrar apenas os dados de entrada
    const entradaData = data.filter(item => item['C/D'].toLowerCase() === 'crédito');

    // Agrupar os dados pelo Centro de Custo e calcular o total arrecadado
    const totalArrecadadoPorCentro = entradaData.reduce((acc, curr) => {
      const centroDeCusto = curr['CENTRO DE CUSTO'];
      if (!acc[centroDeCusto]) {
        acc[centroDeCusto] = 0;
      }
      acc[centroDeCusto] += curr["VALOR"];
      return acc;
    }, {});

    // Converter o resultado em um array de objetos
    const result = Object.keys(totalArrecadadoPorCentro).map(key => ({
      centroDeCusto: key,
      totalArrecadado: totalArrecadadoPorCentro[key]
    }));

    // Enviar o resultado como resposta JSON
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar os dados', error });
  }
};

module.exports = getSectorChat;
