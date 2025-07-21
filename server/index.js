const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT Usuarios.id, Usuarios.Nombre, Usuarios.Correo, Rol.Nombre AS Rol
      FROM Usuarios
      LEFT JOIN Rol ON Usuarios.IdRol = Rol.id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
