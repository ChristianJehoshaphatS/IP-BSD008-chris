'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pocket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pocket.init({
    userId: DataTypes.INTEGER,
    code: DataTypes.STRING,
    access: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pocket',
  });
  return Pocket;
};