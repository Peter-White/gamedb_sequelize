const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = new Sequelize("postgresql://postgres:ResidentEvil4@localhost:5432/gamedb",
  {
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      timestamps: false
    },
    operatorsAliases: false
  });
