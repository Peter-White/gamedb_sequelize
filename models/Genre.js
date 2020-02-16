const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

class Genre extends Model {}
Genre.init({
  name: DataTypes.STRING
}, { sequelize, modelName: 'genres' });

module.exports = Genre;
