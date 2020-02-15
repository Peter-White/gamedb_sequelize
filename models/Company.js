const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Company extends Model {}
Company.init({
  name: DataTypes.STRING,
  address: DataTypes.STRING,
  description: DataTypes.STRING,
  founded: DataTypes.INTEGER,
  discontinued: DataTypes.STRING,
  image_url: DataTypes.STRING
}, { sequelize, modelName: 'company' });

module.exports = Company;
