'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.UsersAccount, {
        foreignKey: "accountId",
      });
      Account.hasMany(models.Account_CostCenter, {
        foreignKey: "accountId",
      });
    }
  }
  Account.init({
    name: DataTypes.STRING,
    account_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Account;
};