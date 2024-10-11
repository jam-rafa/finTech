const moment = require('moment');
const { getXlsData } = require('../../../store/dataStore');

const getCosts = async (req, res) => {
  try {
    // Obtém o parâmetro de data do query string
    const dateParam = (req.query.date || "").replace(/"/g, '');

    // Recuperar os dados do XLS
    let data = await getXlsData();

    // Filtra os dados se dateParam estiver presente
    if (dateParam) {
      const startOfMonth = moment(dateParam, 'YYYY-MM').startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment(dateParam, 'YYYY-MM').endOf('month').format('YYYY-MM-DD');
      
      data = data.filter(item => {
        const itemDate = moment(item.DATA).format('YYYY-MM-DD');
        return itemDate >= startOfMonth && itemDate <= endOfMonth;
      });
    }

    // Inicializar os totais de custos
    const totais = {
      fixo: 0.0,
      variavel: 0.0
    };

    // Processar os dados
    data.forEach(item => {
      const valor = parseFloat(item.VALOR) || 0;
      const tipo = item['FIXO/VARIAVEL'] || 'VARIAVEL';
      const cd = item['C/D'] || '';

      // Verificar se o item é um débito
      if (cd === 'Débito') {
        if (tipo === 'FIXO') {
          totais.fixo += valor;
        } else if (tipo === 'VARIAVEL') {
          totais.variavel += valor;
        }
      }
    });

    // Retornar a resposta com os totais calculados
    res.status(200).json(totais);
  } catch (error) {
    // Em caso de erro, retornar o status 500 com a mensagem de erro
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCosts;
