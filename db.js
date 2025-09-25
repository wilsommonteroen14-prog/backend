require('dotenv').config();

const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
  'Montero', 'postgres', 'wilson', {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);
module.exports = sequelize