"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movements.belongsTo(models.Nature, {
        foreignKey: "natureId",
      }),
        Movements.belongsTo(models.PaymentType, {
          foreignKey: "payment_typeId",
        }),
        Movements.belongsTo(models.CostCenters, {
          foreignKey: "cost_centerId",
        });
      Movements.hasMany(models.Payments, {
        foreignKey: "movementsId",
      });
    }
  }
  Movements.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.DATE,
      cost_type: DataTypes.STRING,
      value: DataTypes.FLOAT,
      natureId: DataTypes.INTEGER,
      payment_typeId: DataTypes.INTEGER,
      cost_centerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movements",
    }
  );
  return Movements;
};
