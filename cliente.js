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
    // Se obtienen los datos del cuerpo de la petición
    const { nombre, telefono, correo, direccion } = req.body;
    
    // Consulta SQL para insertar
    const sql = `
      INSERT INTO clientes (nombre, telefono, correo, direccion)
      VALUES (:nombre, :telefono, :correo, :direccion)
    `;
    
    await sequelize.query(sql, {
      replacements: { 
        nombre, 
        telefono, 
        correo, 
        // --- MEJORA CLAVE ---
        // Si la dirección no se envía (es undefined), se inserta NULL en la base de datos
        direccion: direccion || null 
      },
    });

    res.status(201).json({ mensaje: '✅ Cliente agregado correctamente' });
  } catch (error) {
    console.error("Error al agregar el cliente:", error);
    res.status(500).json({ error: '❌ Error interno al agregar el cliente' });
  }
});

module.exports = router;