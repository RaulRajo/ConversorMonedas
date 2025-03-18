const express = require('express');
const db = require('./database');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require("./authRoutes");
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'claveRaul';

// Middleware para verificar JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ mensaje: 'Token requerido' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ mensaje: 'Token inválido' });
        req.user = decoded;
        next();
    });
};

// Rutas de autenticación
app.use("/auth", authRoutes);

app.post('/convert', verificarToken, async (req, res) => {
    const { de, a, cantidad } = req.body;
  
    if (!de || !a || !cantidad) {
      return res.status(400).json({ mensaje: 'Parámetros de conversión requeridos' });
    }
  
    try {
      // Realizar solicitud a la API de tasas de cambio
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${de}`);
  
      // Verificar si la moneda de destino existe en los tipos de cambio
      const tasaDeCambio = response.data.rates[a];
      if (!tasaDeCambio) {
        return res.status(400).json({ mensaje: 'Moneda de destino no soportada' });
      }
  
      // Cálculo de la conversión
      const resultado = cantidad * tasaDeCambio;
  
      // Obtener el id del usuario desde el token
      const usuarioId = req.user.id;
  
      // Insertar el registro de conversión en el historial
      const fecha = new Date().toISOString();

      db.run(`
        INSERT INTO historial (usuario_id, de, a, cantidad, resultado, fecha)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [usuarioId, de, a, cantidad, resultado, fecha],
        function(err) {
          if (err) {
            console.error('Error al insertar en el historial', err.message);
            return res.status(500).json({ mensaje: 'Error al guardar el historial' });
          }
          console.log(`Conversión guardada con ID: ${this.lastID}`);
        });
  
      // Enviar el resultado de la conversión al frontend
      res.json({ resultado });
    } catch (error) {
      console.error('Error al obtener tasa de cambio:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener la tasa de cambio' });
    }
  });

// Obtener todas las conversiones del usuario en orden descendente
app.get('/historial', verificarToken, (req, res) => {
  const usuarioId = req.user.id;  // Obtener id del usuario del token

  db.all('SELECT * FROM historial WHERE usuario_id = ? ORDER BY fecha DESC', [usuarioId], (err, rows) => {
    if (err) {
      console.error('Error al obtener el historial', err.message);
      return res.status(500).json({ mensaje: 'Error al obtener el historial' });
    }

    res.json(rows);
  });
});

// Ruta para eliminar el historial del usuario
app.delete('/historial', verificarToken, (req, res) => {
    const usuarioId = req.user.id;  // Obtener usuario del token
    
    db.run('DELETE FROM historial WHERE usuario_id = ?', [usuarioId], function(err) {
      if (err) {
        console.error('Error al eliminar el historial', err.message);
        return res.status(500).json({ mensaje: 'Error al limpiar el historial' });
      }
  
      res.json({ mensaje: 'Historial eliminado correctamente' });
    });
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));
