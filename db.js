const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'gencodibarras.db');

let db;

function init() {
  db = new Database(DB_FILE);

  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      codigo TEXT UNIQUE NOT NULL,
      descripcion TEXT NOT NULL,
      fecha TEXT NOT NULL
    );
  `);

  return db;
}

function getAllProductos() {
  const stmt = db.prepare(`
    SELECT id, codigo, descripcion, fecha
    FROM productos
    ORDER BY fecha DESC
  `);
  return stmt.all();
}

function insertProducto(codigo, descripcion) {
  const stmt = db.prepare(`
    INSERT INTO productos (codigo, descripcion, fecha)
    VALUES (?, ?, ?)
  `);

  const fecha = new Date().toISOString();
  const result = stmt.run(codigo, descripcion, fecha);

  return {
    id: result.lastInsertRowid,
    codigo,
    descripcion,
    fecha
  };
}

function codigoExists(codigo) {
  const stmt = db.prepare('SELECT 1 FROM productos WHERE codigo = ?');
  return stmt.get(codigo) !== undefined;
}

function getCount() {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM productos');
  return stmt.get().count;
}

function migrateFromJSON(data) {
  const productos = data.productos || [];

  if (productos.length === 0) {
    return { migrated: 0 };
  }

  const insert = db.prepare(`
    INSERT INTO productos (codigo, descripcion, fecha)
    VALUES (?, ?, ?)
  `);

  const migrateMany = db.transaction((items) => {
    for (const item of items) {
      insert.run(item.codigo, item.descripcion, item.fecha);
    }
  });

  migrateMany(productos);

  return { migrated: productos.length };
}

function close() {
  if (db) {
    db.close();
  }
}

module.exports = {
  init,
  getAllProductos,
  insertProducto,
  codigoExists,
  getCount,
  migrateFromJSON,
  close
};