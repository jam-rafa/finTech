"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class NatureType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      NatureType.belongsTo(models.Nature, {
        foreignKey: "natureId",
      });
    }
  }
  NatureType.init(
    {
      name: DataTypes.STRING,
      natureId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "NatureType",
    }
  );
  return NatureType;
};
