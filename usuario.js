const express = require("express");
const router = express.Router();
const sequelize = require("./db");

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM usuarios");
    res.json(results);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error interno al obtener usuarios" });
  }
});

// Agregar un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;
    const sql = `
      INSERT INTO usuarios (nombre, correo, rol)
      VALUES (:nombre, :correo, :rol)
    `;
    await sequelize.query(sql, { replacements: { nombre, correo, rol } });
    // Se usa el status 201 para indicar que un recurso fue creado exitosamente
    res.status(201).json({ mensaje: "✅ Usuario agregado correctamente" });
  } catch (err) {
    console.error("Error al agregar usuario:", err);
    res.status(500).json({ error: "❌ Error interno al agregar el usuario" });
  }
});

module.exports = router;