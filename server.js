const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const JSON_DB_FILE = path.join(__dirname, 'surtitodo.json');

const db = require('./db');

function readJSON() {
  if (!fs.existsSync(JSON_DB_FILE)) {
    return { productos: [] };
  }
  const data = fs.readFileSync(JSON_DB_FILE, 'utf8');
  return JSON.parse(data);
}

db.init();

if (db.getCount() === 0) {
  const jsonData = readJSON();
  if (jsonData.productos && jsonData.productos.length > 0) {
    const result = db.migrateFromJSON(jsonData);
    console.log(`Migrated ${result.migrated} products from JSON to SQLite`);
  }
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/productos', (req, res) => {
  try {
    const productos = db.getAllProductos();
    res.json({ success: true, data: productos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/registrar', (req, res) => {
  try {
    const { codigo, descripcion } = req.body;

    if (!codigo || !descripcion) {
      return res.status(400).json({ success: false, message: 'Codigo y descripcion son requeridos' });
    }

    if (!/^\d{13}$/.test(codigo)) {
      return res.status(400).json({ success: false, message: 'Codigo debe tener 13 digitos' });
    }

    if (db.codigoExists(codigo)) {
      return res.status(400).json({ success: false, message: 'El codigo ya existe' });
    }

    const nuevoProducto = db.insertProducto(codigo, descripcion);

    res.json({ success: true, data: nuevoProducto });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/registros', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registros.html'));
});

process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit());
process.on('SIGINT', () => process.exit());

app.listen(PORT, () => {
  console.log(`GenBarras server running on http://localhost:${PORT}`);
});