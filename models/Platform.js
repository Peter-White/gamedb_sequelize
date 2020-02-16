const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Platform extends Model {}
Platform.init({
  name: DataTypes.STRING,
  manufacturer_id: DataTypes.INTEGER,
  image: DataTypes.STRING,
  released: DataTypes.DATE,
  discontinued: DataTypes.DATE,
  description: DataTypes.STRING
}, { sequelize, modelName: 'platforms' });

module.exports = Platform;
