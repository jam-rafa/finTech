const XLSX = require('xlsx');
const path = require('path');
const moment = require('moment');

// Função para converter número serial em data usando Moment.js
function excelDateToJSDate(serial) {
    return moment(new Date((serial - (25567 + 1)) * 86400 * 1000)).format("YYYY-MM-DD");
}

// Função para converter string de valor monetário para número
function convertCurrencyStringToNumber(currencyString) {
    return parseFloat(currencyString.replace('R$', '').replace('.', '').replace(',', '.').trim());
}

const readXlsData = (filePath) => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        const data = {};
    
        sheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            data[sheetName] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        });
    
        // Converter datas e valores no JSON
        const sheetData = data['BASE'];
        sheetData.forEach(row => {
            for (let key in row) {
                if (key === 'DATA') { // Supondo que datas serão números grandes
                    row[key] = excelDateToJSDate(row[key]);
                } else if (typeof row[key] === 'string' && row[key].includes('R$')) { // Supondo que valores monetários incluem 'R$'
                    console.log(row)
                    row[key] = convertCurrencyStringToNumber(row[key]);
                }
            }
        });

        return sheetData;
    } catch (error) {
        console.error("Erro ao processar a planilha: ", error);
        return [];
    }
};

const requestXlsData = () => {
  const filePath = path.join(__dirname, 'Pasta.xlsx');
  return readXlsData(filePath);
};

module.exports = requestXlsData;