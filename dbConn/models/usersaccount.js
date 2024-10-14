"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsersAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsersAccount.belongsTo(models.Users, {
        foreignKey: "userId",
      }),
        UsersAccount.belongsTo(models.Account, {
          foreignKey: "accountId",
        });
    }
  }
  UsersAccount.init(
    {
      userId: DataTypes.INTEGER,
      accountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsersAccount",
    }
  );
  return UsersAccount;
};
