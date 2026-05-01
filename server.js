const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, 'surtitodo.json');

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    return { productos: [] };
  }
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/productos', (req, res) => {
  try {
    const db = readDB();
    const productos = db.productos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
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

    const db = readDB();

    if (db.productos.some(p => p.codigo === codigo)) {
      return res.status(400).json({ success: false, message: 'El codigo ya existe' });
    }

    const nuevoProducto = {
      id: db.productos.length + 1,
      codigo,
      descripcion,
      fecha: new Date().toISOString()
    };

    db.productos.push(nuevoProducto);
    writeDB(db);

    res.json({ success: true, data: nuevoProducto });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`GenBarras server running on http://localhost:${PORT}`);
});