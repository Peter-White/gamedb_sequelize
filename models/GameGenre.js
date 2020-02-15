const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class GameGenre extends Model {}
GameGenre.init({
  game_id: DataTypes.INTEGER,
  genre_id: DataTypes.INTEGER
}, { sequelize, modelName: 'game_genre' });

module.exports = GameGenre;
