const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Platform extends Model {}
Platform.init({
  title: DataTypes.STRING,
  manufacturer_id: DataTypes.INTEGER,
  image_url: DataTypes.STRING,
  released: DataTypes.DATE,
  discontinued: DataTypes.DATE,
  description: DataTypes.STRING
}, { sequelize, modelName: 'platform' });

module.exports = Platform;
