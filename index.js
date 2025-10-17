const express = require("express");
const sequelize = require("./db");
require("dotenv").config();

// Importar ambos archivos de rutas
const clienteRoutes = require("./cliente");
const usuarioRoutes = require("./usuario");

const app = express();

// Middleware de CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Middleware para parsear JSON
app.use(express.json());

// Probar la conexión a la base de datos al iniciar
sequelize
  .authenticate()
  .then(() => console.log("✅ ¡Conexión a PostgreSQL establecida correctamente!"))
  .catch((err) => console.error("❌ Error al conectar con la base de datos:", err));

// Rutas de la API
app.use("/api/clientes", clienteRoutes);
app.use("/api/usuarios", usuarioRoutes);

// Usar el puerto definido en el archivo .env (que debe ser 4001)
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));