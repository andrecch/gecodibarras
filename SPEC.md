# GenBarras - Gestión de Códigos de Barras EAN-13

## 1. Concepto y Visión

Aplicación web offline-first para gestión de productos con códigos de barras EAN-13. Interfaz elegante con Glassmorphism, transmitiendo profesionalismo y claridad. La experiencia debe sentirse como una herramienta premium de escritorio, fluida y confiable.

## 2. Design Language

### Aesthetic Direction
Glassmorphism sutil: fondos claros con capas de cristal esmerilado, profundidad visual mediante transparencias y blur.

### Color Palette
- **Primary**: #1e3a5f (Azul profundo)
- **Secondary**: #3d5a80 (Azul acero)
- **Accent**: #5c7a99 (Gris azulado)
- **Background**: #f8f9fa → #e9ecef (gradiente sutil)
- **Surface**: rgba(255, 255, 255, 0.7) con blur
- **Text Primary**: #1a1a2e
- **Text Secondary**: #6c757d
- **Border**: rgba(0, 0, 0, 0.08)
- **Success**: #2d6a4f
- **Error**: #9d0208

### Typography
- **Font Family**: 'Segoe UI', system-ui, sans-serif
- **Headings**: 600 weight, tracking -0.02em
- **Body**: 400 weight, 1.6 line-height

### Spatial System
- Base unit: 8px
- Border radius: 16px (cards), 12px (buttons), 8px (inputs)
- Padding cards: 24px
- Gap between elements: 16px

### Motion Philosophy
- Transiciones suaves de 300ms ease
- Hover: scale(1.02) con sombra elevada
- Modal: fade-in 200ms con slide-up sutil

## 3. Layout & Structure

### Dashboard (Main View)
- Header con logo y título "GenBarras"
- Stats cards en fila: Total códigos, Último registro
- Quick actions: botón "Registrar Producto" prominente
- Sección de búsqueda con input centrado
- Grid de tarjetas de productos (3 columnas, responsive)

### Modal de Registro
- Overlay oscuro semi-transparente
- Panel central con glassmorphism (blur 15px, fondo semi-transparente)
- Campos: Descripción, Código (editable), Preview del código de barras
- Botones: Generar nuevo código, Cancelar, Guardar

## 4. Features & Interactions

### Generación EAN-13
- Prefijo fijo: 77027 (Colombia)
- Generación automática de 8 dígitos adicionales válidos
- Validación de checksum correcta
- Preview en canvas 200x100

### Registro de Producto
- Campos: descripción (texto), código (numérico 13 dígitos)
- Validación en tiempo real
- Al guardar: POST a /registrar, refresh del grid
- Animación de éxito/error

### Búsqueda
- Filtrado en tiempo real por descripción o código
- Debounce de 300ms
- Mensaje "Sin resultados" cuando aplica

### Grid de Productos
- Tarjetas con glassmorphism
- Código de barras visual generado en canvas
- Descripción truncada si es larga
- Fecha de registro formateada

## 5. Component Inventory

### StatCard
- Icono + número grande + label
- Hover: elevación sutil

### ActionButton (Primary)
- Fondo: gradient blue (#1e3a5f → #3d5a80)
- Texto blanco, padding generoso
- Hover: brillo aumentado, scale 1.02
- Active: scale 0.98

### ProductCard
- Glassmorphism surface
- Canvas barcode (200x60)
- Código numérico debajo
- Descripción y fecha
- Hover: elevación

### Modal
- Overlay: rgba(0,0,0,0.4)
- Panel: glassmorphism, max-width 480px
- Header con título y botón cerrar
- Body con formulario
- Footer con acciones

### SearchInput
- Borde sutil, fondo transparente
- Focus: borde primary, glow sutil
- Icono de lupa integrado

## 6. Technical Approach

### Backend (Node.js + Express)
```
server.js
├── /productos GET → lista todos
├── /registrar POST → {codigo, descripcion}
└── inicialización automática de DB
```

### Database (SQLite/better-sqlite3)
```sql
CREATE TABLE productos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codigo TEXT UNIQUE NOT NULL,
  descripcion TEXT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Frontend (Vanilla JS)
- Canvas API para dibujar EAN-13 manualmente
- Fetch API para comunicación con servidor
- Event delegation para eficiencia
- Sin dependencias externas

### API Response Format
```json
// GET /productos
{
  "success": true,
  "data": [
    {"id": 1, "codigo": "7702700123451", "descripcion": "Producto X", "fecha": "2026-04-28"}
  ]
}

// POST /registrar
// Body: {"codigo": "7702700123451", "descripcion": "Producto X"}
// Response: {"success": true, "data": {...}}
```