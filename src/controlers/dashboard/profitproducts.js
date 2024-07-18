const mockData = require('../../../mockData');

const getProfitProducts = async (req, res) => {
  try {
    // Filtrar apenas as entradas
    const entradas = mockData.filter(item => item["Tipo Pagamento"].toLowerCase() === "entrada");

    // Calcular o lucro e a quantidade por produto e setor
    const lucroPorProduto = entradas.reduce((acc, curr) => {
      const { Produto, valor, "Centro de Custo": setor } = curr;
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