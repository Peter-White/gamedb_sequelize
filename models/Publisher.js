const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Publisher extends Model {}
Publisher.init({
  game_id: DataTypes.INTEGER,
  company_id: DataTypes.INTEGER
}, { sequelize, modelName: 'game_publisher' });

module.exports = Publisher;
