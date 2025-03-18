const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database");

const router = express.Router();
const secretKey = process.env.JWT_SECRET || "claveRaul";

// Registro de usuario
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    function (err) {
      if (err) return res.status(500).json({ message: "Error registrando usuario" });
      res.json({ message: "Usuario registrado correctamente" });
    }
  );
});

// Login de usuario
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err || !user) return res.status(401).json({ message: "Usuario no encontrado" });

    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  });
});

module.exports = router;
