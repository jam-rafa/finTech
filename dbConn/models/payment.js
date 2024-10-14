'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Movements, {
        foreignKey: "movementsId",
      });
    }
  }
  Payment.init({
    status: DataTypes.STRING,
    installment: DataTypes.INTEGER,
    installment_value: DataTypes.FLOAT,
    expiration_date: DataTypes.DATE,
    movementsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payment;
};