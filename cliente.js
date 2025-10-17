const express = require('express');
const router = express.Router();
const sequelize = require('./db');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const [results] = await sequelize.query('SELECT * FROM clientes');
    res.json(results);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: 'Error interno al obtener clientes' });
  }
});

// Agregar nuevo cliente
router.post('/', async (req, res) => {
  try {
    const { nombre, telefono, correo, direccion } = req.body;
    const sql = `
      INSERT INTO clientes (nombre, telefono, correo, direccion)
      VALUES (:nombre, :telefono, :correo, :direccion)
    `;
    await sequelize.query(sql, {
      replacements: { nombre, telefono, correo, direccion },
    });
    res.status(201).json({ mensaje: '✅ Cliente agregado correctamente' });
  } catch (error) {
    console.error("Error al agregar el cliente:", error);
    res.status(500).json({ error: '❌ Error interno al agregar el cliente' });
  }
});

module.exports = router;