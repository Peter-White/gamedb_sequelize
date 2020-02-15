const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class GamePlatform extends Model {}
GamePlatform.init({
  game_id: DataTypes.INTEGER,
  platform_id: DataTypes.INTEGER
}, { sequelize, modelName: 'game_platform' });

module.exports = GamePlatform;
