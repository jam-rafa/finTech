"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account_CostCenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account_CostCenter.belongsTo(models.CostCenters, {
        foreignKey: "cost_centerId",
      }),
        Account_CostCenter.belongsTo(models.Account, {
          foreignKey: "accountId",
        });
    }
  }
  Account_CostCenter.init(
    {
      account: DataTypes.INTEGER,
      cost_center: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account_CostCenter",
    }
  );
  return Account_CostCenter;
};
