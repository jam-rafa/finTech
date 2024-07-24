const mockData = require('../../../mockData');
const { getXlsData } = require('../../../store/dataStore');

const getSectorChat = async (req, res) => {
  try {
    // Filtrar apenas os dados de entrada
    const entradaData = getXlsData().filter(item => item['C/D'].toLowerCase() === 'crédito');

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
