const { getXlsData } = require("../../../store/dataStore");

class XlsxController {
  
    static async getXlsxData (req, res){
            res.json(getXlsData())
    }
  }
  
  module.exports = XlsxController;