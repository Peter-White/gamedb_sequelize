const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Game extends Model {}
Game.init({
  title: DataTypes.STRING,
  released: DataTypes.DATE,
  mode_id: DataTypes.INTEGER,
  image_url: DataTypes.STRING,
  description: DataTypes.STRING
}, { sequelize, modelName: 'game' });

module.exports = Game;
