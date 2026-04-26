import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Evita que los controles de Leaflet se superpongan al navbar
const leafletFix = `
  .leaflet-pane, .leaflet-top, .leaflet-bottom {
    z-index: 1 !important;
  }
  .leaflet-control {
    z-index: 2 !important;
  }
`;

const ZONES = [
  {
    name: "Centro / Lago Lácar",
    coords: [-40.1579, -70.9698],
    rentabilidad: "USD 2.100/m²",
    tipo: "Residencial · Turístico",
    descripcion: "La zona con el m² más caro del país. Alta demanda de alquiler turístico con retorno de USD 60–90/día en temporada alta.",
  },
  {
    name: "Altos del Chapelco",
    coords: [-40.2050, -70.9300],
    rentabilidad: "USD 310.000 prom.",
    tipo: "Premium · Country",
    descripcion: "Barrio privado en plena expansión. Valor promedio de venta USD 310.000. Alta plusvalía y demanda sostenida de compradores premium.",
  },
  {
    name: "Faldeos del Chapelco",
    coords: [-40.2200, -70.9150],
    rentabilidad: "Lotes en valorización",
    tipo: "Desarrollo · Terrenos",
    descripcion: "Zona de desarrollo activo con proyectos como Ollagua II (lanzado 2024). Terrenos con alta proyección de valorización.",
  },
  {
    name: "Chapelco Golf & Resort",
    coords: [-40.1900, -70.9000],
    rentabilidad: "Rentabilidad turística alta",
    tipo: "Turístico · Resort",
    descripcion: "Destino 4 estaciones: ski en invierno, golf y trekking en verano. Una de las 3 zonas más buscadas según Argenprop.",
  },
  {
    name: "Meliquina",
    coords: [-40.3200, -71.0500],
    rentabilidad: "Acceso a precios bajos",
    tipo: "Natural · En desarrollo",
    descripcion: "Una de las 3 zonas más populares según Argenprop. Precios accesibles con fuerte potencial de crecimiento y turismo de naturaleza.",
  },
];

export default function InvestmentMap() {
  const [isClient, setIsClient] = useState(false);
  const [activeZone, setActiveZone] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="bg-gray-950 py-16" style={{ isolation: "isolate" }}>
      <style>{leafletFix}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-[#FF5A5F] text-sm font-semibold tracking-widest uppercase mb-2">
            Oportunidades
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Zonas de inversión en la Patagonia
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
            Seleccioná una zona en el mapa para ver su potencial de rentabilidad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Mapa */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-2xl" style={{ height: "320px", position: "relative", zIndex: 0 }}>
            {isClient ? (
              <MapContainer
                center={[-40.1900, -71.0100]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                />
                {ZONES.map((zone) => (
                  <CircleMarker
                    key={zone.name}
                    center={zone.coords}
                    radius={activeZone?.name === zone.name ? 16 : 11}
                    pathOptions={{
                      color: "#FF5A5F",
                      fillColor: "#FF5A5F",
                      fillOpacity: activeZone?.name === zone.name ? 0.9 : 0.6,
                      weight: 2,
                    }}
                    eventHandlers={{
                      click: () => setActiveZone(zone),
                    }}
                  >
                    <Popup>
                      <div className="text-sm font-semibold">{zone.name}</div>
                      <div className="text-xs text-gray-600">{zone.tipo}</div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            ) : (
              <div className="w-full h-full bg-gray-800 animate-pulse" />
            )}
          </div>

          {/* Panel lateral */}
          <div className="flex flex-col gap-3">
            {ZONES.map((zone) => (
              <button
                key={zone.name}
                onClick={() => setActiveZone(activeZone?.name === zone.name ? null : zone)}
                className={`text-left rounded-xl p-4 border transition-all duration-200 ${
                  activeZone?.name === zone.name
                    ? "bg-[#FF5A5F]/10 border-[#FF5A5F] shadow-lg"
                    : "bg-gray-900 border-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-white text-sm font-semibold">{zone.name}</p>
                  <span className="text-[#FF5A5F] text-xs font-bold">{zone.rentabilidad}</span>
                </div>
                <p className="text-gray-500 text-xs">{zone.tipo}</p>

                {activeZone?.name === zone.name && (
                  <p className="text-gray-300 text-xs mt-2 leading-relaxed border-t border-gray-700 pt-2">
                    {zone.descripcion}
                  </p>
                )}
              </button>
            ))}

            <a
              href="/inversiones"
              className="mt-2 text-center bg-[#FF5A5F] hover:bg-[#FF385C] text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg text-sm"
            >
              Ver oportunidades →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
