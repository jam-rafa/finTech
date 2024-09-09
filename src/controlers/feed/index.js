const { getSearch } = require("./search");

class FeedController {
  
  static async getSearch(req, res){
    return getSearch(req, res)
  }


}

module.exports = FeedController;
