const { getXlsData } = require("../../../store/dataStore");
const moment = require('moment');

const getSearch = async (req, res) => {
    try {
      const allData = getXlsData();

      const transformedData = allData.map(item => ({
        id: item.ID,
        natureza: item.NATUREZA,
        nome: item["NOME/EMPRESA"],
        valor: item.VALOR,
        tipo_pgto: item["C/D"],
        tipo_custo: item['FIXO/VARIAVEL'],
        centro_custo: item["CENTRO DE CUSTO"],
        data: item.DATA
      }));
  
      // Ordena os dados pela data
      const sortedData = transformedData.sort((a, b) => moment(b.data, 'YYYY-MM-DD').diff(moment(a.data, 'YYYY-MM-DD')));
  
      // Retorna os dados como JSON
      res.json(sortedData);
    } catch (error) {
      // Em caso de erro, retorna uma mensagem de erro
      res.status(500).json({ error: 'Ocorreu um erro ao processar os dados.' });
    }
  };
  
  module.exports = { getSearch };