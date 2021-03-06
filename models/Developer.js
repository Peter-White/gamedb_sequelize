const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Developer extends Model {}
Developer.init({
  game_id: DataTypes.INTEGER,
  company_id: DataTypes.INTEGER
}, { sequelize, modelName: 'developer', tableName: 'developers' });

module.exports = Developer;
