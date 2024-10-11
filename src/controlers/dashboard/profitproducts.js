const moment = require('moment');
const { getXlsData } = require('../../../store/dataStore');

const getProfitProducts = async (req, res) => {
  try {
    // Obtém o parâmetro de data do query string
    const dateParam = (req.query.date || "").replace(/"/g, '');

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

    // Filtrar apenas as entradas
    const entradas = data.filter(item => item["C/D"] === "Crédito");

    // Calcular o lucro e a quantidade por produto e setor
    const lucroPorProduto = entradas.reduce((acc, curr) => {
      const { "NATUREZA": Produto, "VALOR": valor, "CENTRO DE CUSTO": setor } = curr;
      if (!acc[Produto]) {
        acc[Produto] = { lucro: 0, quantidade: 0, setor };
      }
      acc[Produto].lucro += valor;
      acc[Produto].quantidade += 1;
      return acc;
    }, {});

    // Ordenar os produtos pelo lucro em ordem decrescente
    const produtosOrdenados = Object.entries(lucroPorProduto)
      .sort((a, b) => b[1].lucro - a[1].lucro)
      .slice(0, 6);

    // Calcular o valor total de lucro
    const valorTotalLucro = produtosOrdenados.reduce((acc, [, { lucro }]) => acc + lucro, 0);

    // Formatar a resposta
    const response = {
      topProducts: produtosOrdenados.map(([produto, { lucro, quantidade, setor }]) => ({
        produto,
        lucro,
        quantidade,
        setor
      })),
      valorTotalLucro
    };

    // Enviar a resposta
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar os dados' });
  }
};

module.exports = getProfitProducts;
