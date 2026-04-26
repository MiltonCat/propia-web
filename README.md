# Catalán Propiedades — Frontend

Sitio web inmobiliario para **Milton Catalán Propiedades**, San Martín de los Andes, Patagonia Argentina.

Desarrollado con **React + Vite + Tailwind CSS**.

---

## 🚀 Tecnologías

- React 18 + Vite
- Tailwind CSS
- React Router DOM
- React Leaflet (mapas)
- Recharts (gráficos)

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── Navbar.jsx          # Navbar sticky estilo Airbnb
│   ├── Hero.jsx            # Banner con animación de colapso a los 5s
│   ├── Footer.jsx
│   ├── PropertyCard.jsx    # Card de propiedad (venta y alquiler)
│   ├── InvestmentMap.jsx   # Mapa de zonas de inversión (Leaflet)
│   ├── FeaturedModal.jsx   # Modal flotante lateral
│   ├── ChatBot.jsx
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Properties.jsx      # Listado con tabs Comprar / Alquiler permanente
│   ├── PropertyDetail.jsx
│   ├── Inversiones.jsx
│   ├── CentroAyuda.jsx     # FAQs reales con filtros por categoría
│   ├── Contact.jsx
│   ├── About.jsx
│   └── ...
├── data/
│   └── properties.js       # Base de datos de propiedades
└── config.js               # WhatsApp, email, teléfono

public/
├── imgs/
│   ├── Imgs9 - Imgs25/     # Fotos de propiedades en venta
│   ├── Alquiler1/          # Departamento céntrico - Belgrano 555
│   ├── Alquiler2/          # Hermosa cabaña en la Cascada - Saurel
│   └── Alquiler3/          # Hermosa Cabaña en las Nalcas
├── portada.jpg             # Foto principal del banner
├── iso1.png                # Favicon animado
└── marca1.png              # Logo
```

---

## 🏠 Propiedades

### Venta
El sitio cuenta con propiedades en venta cargadas en `src/data/properties.js`. Cada propiedad incluye:
- `id`, `title`, `type`, `location`, `price` (USD)
- `modalidad: "venta"`
- Imágenes: `image`, `image1`–`image4`
- `bedrooms`, `bathrooms`, `area`, `features`, `description`

### Alquiler permanente
Las propiedades de alquiler usan `modalidad: "alquiler_permanente"` y tienen campos adicionales:
- `precioAlquilerARS` — precio mensual en pesos argentinos
- `disponibleDesde` — fecha de disponibilidad
- `mesesMinimos` — mínimo de meses de contrato
- `condiciones` — condiciones de ingreso

#### Propiedades de alquiler actuales
| ID | Título | Precio | Dirección |
|----|--------|--------|-----------|
| 101 | Departamento céntrico | $ 1.400.000/mes | Belgrano 555 |
| 102 | Hermosa cabaña en la Cascada | $ 1.500.000/mes | Saurel, Barrio La Cascada |
| 103 | Hermosa Cabaña en las Nalcas | $ 1.300.000/mes | Barrio Las Nalcas |

---

## 🗺️ Mapa de inversiones

Sección en Home con mapa oscuro (Carto Dark) mostrando 5 zonas de inversión en San Martín de los Andes con datos reales de **Zonaprop** y **Argenprop** (2025).

---

## ▶️ Correr el proyecto

```bash
cd frontend
npm install
npm run dev
```

---

## 📦 Build

```bash
npm run build
```

---

## 📸 Agregar fotos de alquiler

1. Crear carpeta en `public/imgs/AlquilerN/`
2. Nombrar fotos como `foto1.jpeg`, `foto2.jpeg`, etc.
3. Actualizar `src/data/properties.js` con las rutas correspondientes

---

## 📅 Última actualización

Abril 2026 — Versión con alquileres permanentes, mapa de inversiones y rediseño de banner.
