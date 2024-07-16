const getMonthChart = require("./monthlyBalance");
const getSectorChat = require("./sections");

class DashBoardController {
  static async getSectorChat(req, res) {
    return getSectorChat(req, res);
  }

  static async getMonthChart(req, res){
    return getMonthChart(req, res)
  }

}

module.exports = DashBoardController;
