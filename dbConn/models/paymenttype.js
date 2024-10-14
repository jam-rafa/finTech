'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PaymentType.hasMany(models.movements, {
        foreignKey: "payment_typeId",
      });
    }
  }
  PaymentType.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PaymentTypes',
  });
  return PaymentType;
};