'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Nature.hasMany(models.movements, {
        foreignKey: "natureId",
      });
      Nature.hasMany(models.NatureType, {
        foreignKey: "natureId",
      });
    }
  }
  Nature.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Natures',
  });
  return Nature;
};