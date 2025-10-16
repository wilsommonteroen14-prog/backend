const express = require('express');
const router = express.Router();
const sequelize = require('./db'); // tu conexión Sequelize o pg

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM clientes');
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});


module.exports = router;