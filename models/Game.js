const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Game extends Model {}
Game.init({
  title: DataTypes.STRING,
  released: DataTypes.DATE,
  mode: DataTypes.STRING,
  description: DataTypes.STRING,
  rating: DataTypes.STRING,
  cover: DataTypes.STRING
}, { sequelize, modelName: 'games' });

module.exports = Game;
