require('dotenv').config();
const { Sequelize } = require('sequelize');

// Render nos dará esta variable de entorno automáticamente
const connectionUrl = process.env.DATABASE_URL;

const sequelize = connectionUrl
  // Si estamos en producción (Render), usa la URL con SSL
  ? new Sequelize(connectionUrl, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Requerido para conexiones de Render
        }
      },
      logging: false,
    })
  // Si estamos en local, usa las variables de .env de siempre
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST,
        dialect: 'postgres'
      }
    );

module.exports = sequelize;