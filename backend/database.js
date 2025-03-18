const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error abriendo la base de datos", err.message);
  } else {
    console.log("Base de datos conectada");
    
    // Creación de la tabla users
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) console.error("Error creando tabla users", err.message);
      }
    );

    // Creación de la tabla historial
    db.run(
      `CREATE TABLE IF NOT EXISTS historial (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        fecha TEXT NOT NULL,
        de TEXT NOT NULL,
        a TEXT NOT NULL,
        cantidad REAL NOT NULL,
        resultado REAL NOT NULL,
        FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) console.error("Error creando tabla historial", err.message);
      }
    );
  }
});

module.exports = db;
