"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CostCenter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CostCenter.hasMany(models.movements, {
        foreignKey: "cost_centerId",
      }),
      CostCenter.hasMany(models.Account_CostCenter, {
        foreignKey: "cost_centerId",
      });
    }
  }
  CostCenter.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CostCenters",
    }
  );
  return CostCenter;
};
