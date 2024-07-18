const getMonthChart = require("./monthlyBalance");
const getSectorChat = require("./sections");
const getProfitProducts = require("./profitproducts");
const getLossProducts = require("./loosProducts");
const getBalance = require("./totalBalance");

class DashBoardController {

  static async getBalance(req, res){
    return getBalance(req, res)
  }
  
  static async getSectorChat(req, res) {
    return getSectorChat(req, res);
  }

  static async getMonthChart(req, res){
    return getMonthChart(req, res)
  }

  static async getProfitProducts(req, res){
    return getProfitProducts(req, res)
  }

  static async getLossProducts(req, res){
    return getLossProducts(req, res)
  }

}

module.exports = DashBoardController;
