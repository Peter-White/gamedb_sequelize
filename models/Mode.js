const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Mode extends Model {}
Mode.init({
  title: DataTypes.STRING
}, { sequelize, modelName: 'mode' });

module.exports = Mode;
