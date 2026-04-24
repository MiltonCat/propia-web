import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { CONTACT_EMAIL } from "../config";

const ZONA_DATA = {
  update: "20 Abril 2026",
  fuentes: [
    { nombre: "Diario 7 Lagos", url: "https://www.diario7lagos.com.ar", dato: "USD 2.520/m² - ciudad más cara Argentina (2022)" },
    { nombre: "Argenprop", url: "https://www.argenprop.com/inmuebles/venta/san-martin-de-los-andes", dato: "1.066 propiedades en venta (2026)" },
    { nombre: "Zonaprop", url: "https://www.zonaprop.com.ar", dato: "202 terrenos (2026)" },
    { nombre: "Properati", url: "https://www.properati.com.ar", dato: "Terrenos ~USD 86/m² (ene 2026)" },
    { nombre: "Realigro", url: "https://argentina.realigro.com", dato: "Tendencias de precios EUR/m²" },
    { nombre: "Banco Nación", url: "https://bna.com.ar", dato: "Crédito hipotecario - Plazo obra 24 meses Patagonia" },
  ],
  nota: "No existe índice officiel para San Martín de los Andes. Datos referenciales basados en listings de portales y fuentes periodísticas.",
  zonas: [
    { nombre: "Centro", tipo: "Departamento", precioM2: 2735, variacion: 4.5, rentabilidad: 5.8 },
    { nombre: "Centro", tipo: "Casa", precioM2: 2180, variacion: 4.2, rentabilidad: 4.8 },
    { nombre: "Centro", tipo: "Terreno", precioM2: 560, variacion: 2.1, rentabilidad: null },
    { nombre: "Centro", tipo: "Local", precioM2: 2400, variacion: 3.5, rentabilidad: 6.2 },
    { nombre: "Chapelco Golf", tipo: "Departamento", precioM2: 3400, variacion: 6.5, rentabilidad: 4.2 },
    { nombre: "Chapelco Golf", tipo: "Casa", precioM2: 2950, variacion: 5.8, rentabilidad: 4.0 },
    { nombre: "Chapelco Golf", tipo: "Terreno", precioM2: 380, variacion: 8.2, rentabilidad: null },
    { nombre: "Caleuche", tipo: "Departamento", precioM2: 2550, variacion: 5.2, rentabilidad: 5.5 },
    { nombre: "Caleuche", tipo: "Casa", precioM2: 2050, variacion: 4.5, rentabilidad: 4.5 },
    { nombre: "Caleuche", tipo: "Terreno", precioM2: 60, variacion: 3.2, rentabilidad: 8.5 },
    { nombre: "Las Marias", tipo: "Casa", precioM2: 1750, variacion: 3.5, rentabilidad: 4.2 },
    { nombre: "Las Marias", tipo: "Terreno", precioM2: 110, variacion: 2.8, rentabilidad: null },
    { nombre: "Costanera", tipo: "Departamento", precioM2: 2950, variacion: 5.5, rentabilidad: 6.5 },
    { nombre: "Costanera", tipo: "Casa", precioM2: 2400, variacion: 4.8, rentabilidad: 5.2 },
  ],
  promedioGeneral: 2650,
  promedioReferencia: 2520,
  evolucionHistorica: [
    { anio: 2021, precio: 1680, variacion: null, contexto: "Post-pandemia - Recuperación del mercado", fuente: "Diario 7 Lagos" },
    { anio: 2022, precio: 1950, variacion: 16.1, contexto: "San Martín de los Andes lidera precios en Argentina", fuente: "Diario 7 Lagos" },
    { anio: 2023, precio: 2180, variacion: 11.8, contexto: "Aumento de demanda turística e inversionista", fuente: "Estimado" },
    { anio: 2024, precio: 2450, variacion: 12.4, contexto: "Crecimiento sostenido - boom de construcciones", fuente: "Estimado" },
    { anio: 2025, precio: 2590, variacion: 5.7, contexto: "Estabilización de precios - mercado maduro", fuente: "Estimado" },
    { anio: 2026, precio: 2650, variacion: 2.3, contexto: "Consolidación - demanda internacional", fuente: "Argenprop/Zonaprop" },
  ],
  rentals: [
    { tipo: "Depto 1 dorm (40m²)", precioVenta: 95000, precioM2: 2375, alquiler: 650, rentabilidad: 8.2 },
    { tipo: "Depto 2 dorm (80m²)", precioVenta: 185000, precioM2: 2310, alquiler: 950, rentabilidad: 6.2 },
    { tipo: "Casa 2 dorm (96m²)", precioVenta: 210000, precioM2: 2187, alquiler: 1400, rentabilidad: 8.0 },
    { tipo: "Casa 3 dorm (165m²)", precioVenta: 330000, precioM2: 2000, alquiler: 1800, rentabilidad: 6.5 },
    { tipo: "Casa 4 dorm (225m²)", precioVenta: 490000, precioM2: 2177, alquiler: 2500, rentabilidad: 6.1 },
  ],
  bancoNacion: {
    tasaViviendaUnica: "4.5% - 6% TNA fija",
    tasaSegundaVivienda: "8% - 12% TNA fija",
    financiacion: "75% - 90% del valor",
    plazoMaximo: "30 años",
    cuotaIngresoMax: "25% - 30%",
    plazoObraPatagonia: "24 meses",
    referencia: "bna.com.ar - +Hogares con BNA",
  },
  plazoFijo: 37.0,
};

export default function Inversiones() {
  const [filtroZona, setFiltroZona] = useState("todas");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroRango, setFiltroRango] = useState("todos");
  const [activeTab, setActiveTab] = useState("zonas");
  const [zonaSeleccionada, setZonaSeleccionada] = useState(null);
  const [expandMep, setExpandMep] = useState(false);
  const [expandToken, setExpandToken] = useState(false);

  const rangosPrecio = [
    { value: "todos", label: "Todos los precios" },
    { value: "bajo", label: "Hasta USD 2,000/m²", min: 0, max: 2000 },
    { value: "medio", label: "USD 2,000 - 2,500/m²", min: 2000, max: 2500 },
    { value: "alto", label: "USD 2,500 - 3,000/m²", min: 2500, max: 3000 },
    { value: "premium", label: "Más de USD 3,000/m²", min: 3000, max: 10000 },
  ];
  
  const [calcMonto, setCalcMonto] = useState(150000);
  const [calcPlazo, setCalcPlazo] = useState(5);
  const [calcTipo, setCalcTipo] = useState("alquiler");

  const zonasUnicas = ["todas", ...new Set(ZONA_DATA.zonas.map(z => z.nombre))];
  const tiposUnicos = ["todos", ...new Set(ZONA_DATA.zonas.map(z => z.tipo))];

  const getCounts = () => {
    const counts = { zonas: {}, tipos: {} };
    ZONA_DATA.zonas.forEach(z => {
      counts.zonas[z.nombre] = (counts.zonas[z.nombre] || 0) + 1;
      counts.tipos[z.tipo] = (counts.tipos[z.tipo] || 0) + 1;
    });
    return counts;
  };
  const counts = getCounts();

  const getRangoFilter = () => {
    return rangosPrecio.find(r => r.value === filtroRango);
  };
  const rangoFilter = getRangoFilter();

  const zonasFiltradas = ZONA_DATA.zonas.filter(z => 
    (filtroZona === "todas" || z.nombre === filtroZona) &&
    (filtroTipo === "todos" || z.tipo === filtroTipo) &&
    (!rangoFilter || (z.precioM2 >= rangoFilter.min && z.precioM2 < rangoFilter.max))
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const exportPDF = () => {
    const currentDate = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
    
    const dataText = `
VALORES POR M² - SAN MARTÍN DE LOS ANDES
${"=".repeat(45)}
Fecha: ${currentDate}

${"ZONA".padEnd(22)} | ${"TIPO".padEnd(12)} | ${"USD/m²".padEnd(10)}
${"-".repeat(45)}
${zonasFiltradas.map(z => `${z.nombre.padEnd(22)} | ${z.tipo.padEnd(12)} | $${z.precioM2}`.padEnd(10)).join("\n")}

EVOLUCIÓN HISTÓRICA (USD/m²)
${"=".repeat(45)}
${ZONA_DATA.evolucionHistorica.map(e => `${e.anio}: $${e.precio.toLocaleString()}/m² ${e.variacion ? `(+${e.variacion}%)` : ""} - ${e.contexto}`).join("\n")}

RENTABILIDAD POR ALQUILER
${"=".repeat(45)}
${ZONA_DATA.rentals.map(r => `${r.tipo}: $${r.rentabilidad}% anual`).join("\n")}

${"=".repeat(45)}
Fuentes: Diario 7 Lagos, Argenprop, Zonaprop, Properati
Nota: Datos referenciales basados en listings de portales inmobiliarios.
    `.trim();

    const blob = new Blob([dataText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `CatalanPropiedades-Valores-SMA-${new Date().toISOString().split("T")[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
<div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Inversiones Inmobiliarias</h1>
          <p className="text-sm text-gray-500">San Martín de los Andes - Patagonia</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
          <svg className="w-4 h-4 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-amber-800 font-medium">
            {ZONA_DATA.update}
          </span>
        </div>
        <button
          onClick={exportPDF}
          className="flex items-center gap-2 bg-[#FF5A5F] hover:bg-[#e54b4f] text-white px-3 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Exportar
        </button>
      </div>

      

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
          <button
            onClick={() => setActiveTab("zonas")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "zonas" 
                ? "bg-[#FF5A5F] text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Evolución
          </button>
          <button
            onClick={() => setActiveTab("rentabilidad")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "rentabilidad" 
                ? "bg-[#FF5A5F] text-white" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Rentabilidad
          </button>
        </div>

        {activeTab === "zonas" && (
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Evolución de precios (USD/m²)</h3>
            <div className="h-48 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ZONA_DATA.evolucionHistorica} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPrecio" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5A5F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF5A5F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="anio" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `$${value/1000}k`}
                    stroke="#6b7280" 
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    domain={["dataMin - 200", "dataMax + 200"]}
                    width={40}
                  />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      const item = props.payload;
                      return [
                        <div key="tooltip" className="text-center">
                          <div className="font-bold text-lg text-gray-800">USD {value.toLocaleString()}/m²</div>
                          {item.variacion && (
                            <div className="text-green-600 font-medium">+{item.variacion}% vs año anterior</div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">{item.contexto}</div>
                          <div className="text-xs text-gray-400 mt-2 border-t pt-2">{item.fuente}</div>
                        </div>,
                        "Precio"
                      ];
                    }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", padding: "12px" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="precio" 
                    stroke="#FF5A5F" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorPrecio)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 sm:mt-4 flex justify-between text-xs sm:text-sm text-gray-500">
              <span>2021: $1,680</span>
              <span className="text-green-600 font-semibold">+57.7%</span>
              <span>2026: $2,650</span>
            </div>
          </div>
        )}

        {activeTab === "rentabilidad" && (
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Rentabilidad por alquiler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {ZONA_DATA.rentals.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-800">{item.tipo}</span>
                    <span className="text-2xl font-bold text-green-600">{item.rentabilidad}%</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Precio venta:</span>
                      <span className="font-medium">USD {item.precioVenta.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alquiler:</span>
                      <span className="font-medium">USD {item.alquiler}/mes</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-100">
                    <div className="text-xs text-green-700">
                      ROI anual: USD {(item.alquiler * 12).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Explorá las zonas</h2>
          <p className="text-sm text-gray-500">Tocá una zona para ver detalles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-5 gap-2">
              {[
                { nombre: "Centro", color: "bg-red-500", label: "Centro" },
                { nombre: "Costanera", color: "bg-orange-500", label: "Costa" },
                { nombre: "Chapelco Golf", color: "bg-green-500", label: "Golf" },
                { nombre: "Caleuche", color: "bg-blue-500", label: "Caleu" },
                { nombre: "Las Marias", color: "bg-purple-500", label: "Marias" },
              ].map((zona) => (
                <button
                  key={zona.nombre}
                  onClick={() => setZonaSeleccionada(zona.nombre)}
                  className={`${zona.color} text-white text-[10px] sm:text-xs py-2 px-1 rounded-lg font-medium truncate ${
                    zonaSeleccionada === zona.nombre ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                >
                  {zona.label}
                </button>
              ))}
            </div>
            {zonaSeleccionada && (
              <div className="bg-gray-50 rounded-xl p-4">
                {(() => {
                  const datosZona = ZONA_DATA.zonas.find(z => z.nombre === zonaSeleccionada);
                  if (!datosZona) return null;
                  return (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🏠</span>
                        <h3 className="font-semibold text-gray-800">{datosZona.nombre}</h3>
                        <span className="ml-auto bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          +{datosZona.variacion}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <div className="text-xs text-gray-500">Precio m²</div>
                          <div className="text-lg font-bold text-gray-800">USD {datosZona.precioM2}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Tipo</div>
                          <div className="text-sm font-medium text-gray-800">{datosZona.tipo}</div>
                        </div>
                      </div>
                      {datosZona.rentabilidad && (
                        <div className="pt-3 border-t border-gray-200">
                          <div className="text-xs text-gray-500">Rentabilidad estimada</div>
                          <div className="text-lg font-bold text-green-600">{datosZona.rentabilidad}% anual</div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
            {!zonaSeleccionada && (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Seleccioná una zona para ver detalles</p>
              </div>
            )}
          </div>
          <div className="space-y-2 sm:space-y-3">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Ranking por potencial</h3>
            {[
              { nombre: "Centro", precio: 2735, renta: 5.8 },
              { nombre: "Costanera", precio: 2950, renta: 6.5 },
              { nombre: "Chapelco Golf", precio: 3400, renta: 4.2 },
            ].map((z, i) => (
              <button 
                key={z.nombre}
                onClick={() => setZonaSeleccionada(z.nombre)}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#FF5A5F] text-white rounded-full flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </div>
                  <span className="font-medium text-gray-800 text-sm">{z.nombre}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800 text-sm">${z.precio}/m²</div>
                  <div className="text-xs text-green-600">{z.renta}%</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-8">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Financiamiento</h2>
          <p className="text-xs sm:text-sm text-gray-500">Banco Nación - Línea +Hogares Patagonia</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          <div className="border border-blue-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Tasa Viv. Única</div>
            <div className="text-base sm:text-lg font-bold text-blue-700">{ZONA_DATA.bancoNacion.tasaViviendaUnica}</div>
          </div>
          <div className="border border-purple-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Tasa 2da Viv.</div>
            <div className="text-base sm:text-lg font-bold text-purple-700">{ZONA_DATA.bancoNacion.tasaSegundaVivienda}</div>
          </div>
          <div className="border border-green-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Financiación</div>
            <div className="text-base sm:text-lg font-bold text-green-700">{ZONA_DATA.bancoNacion.financiacion}</div>
          </div>
          <div className="border border-orange-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Plazo</div>
            <div className="text-base sm:text-lg font-bold text-orange-700">{ZONA_DATA.bancoNacion.plazoMaximo}</div>
          </div>
          <div className="border border-red-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Cuota/Ingreso</div>
            <div className="text-base sm:text-lg font-bold text-red-700">{ZONA_DATA.bancoNacion.cuotaIngresoMax}</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Plazo Obra</div>
            <div className="text-base sm:text-xl font-bold text-gray-700">{ZONA_DATA.bancoNacion.plazoObraPatagonia}</div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500">
          Fuente: {ZONA_DATA.bancoNacion.referencia}. Los requisitos incluyen antigüedad laboral mínima, capacidad de pago y evaluación crediticia.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4 sm:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Calculadora de Retorno</h2>
            <p className="text-sm text-gray-600">Simulá tu inversión</p>
          </div>
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full self-start">
            Interactive
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Monto (USD)</label>
            <select
              value={calcMonto}
              onChange={(e) => setCalcMonto(Number(e.target.value))}
              className="w-full px-2 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={25000}>USD 25K</option>
              <option value={50000}>USD 50K</option>
              <option value={75000}>USD 75K</option>
              <option value={100000}>USD 100K</option>
              <option value={150000}>USD 150K</option>
              <option value={200000}>USD 200K</option>
              <option value={250000}>USD 250K</option>
              <option value={350000}>USD 350K</option>
              <option value={500000}>USD 500K</option>
              <option value={750000}>USD 750K</option>
              <option value={1000000}>USD 1M</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Tipo</label>
            <select
              value={calcTipo}
              onChange={(e) => setCalcTipo(e.target.value)}
              className="w-full px-2 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="alquiler">Alquiler</option>
              <option value="turistico">Turístico</option>
              <option value="revta">Reventa</option>
            </select>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Plazo</label>
            <select
              value={calcPlazo}
              onChange={(e) => setCalcPlazo(Number(e.target.value))}
              className="w-full px-2 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1 año</option>
              <option value={3}>3 años</option>
              <option value={5}>5 años</option>
              <option value={10}>10 años</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl p-3 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center p-2 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">
                {calcTipo === "alquiler" ? "6.5%" : calcTipo === "turistico" ? "12%" : "15%"}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500">ROI Anual</div>
            </div>
            <div className="text-center p-2 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                USD {Math.round(calcMonto * (calcTipo === "alquiler" ? 0.065 : calcTipo === "turistico" ? 0.12 : 0.15) * calcPlazo).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">Ganancia Total</div>
            </div>
            <div className="text-center p-2 sm:p-4 bg-purple-50 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">
                USD {Math.round(calcMonto * (1 + (calcTipo === "alquiler" ? 0.065 : calcTipo === "turistico" ? 0.12 : 0.15) * calcPlazo)).toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500">Total Final</div>
            </div>
            <div className="text-center p-2 sm:p-4 bg-orange-50 rounded-lg sm:rounded-xl">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                +{((calcPlazo * (calcTipo === "alquiler" ? 6.5 : calcTipo === "turistico" ? 12 : 15)) - (calcPlazo * ZONA_DATA.plazoFijo)).toFixed(1)}%
              </div>
              <div className="text-[10px] sm:text-xs text-gray-500">vs Plazo Fijo</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="text-xs sm:text-sm text-gray-600">vs Plazo Fijo ({ZONA_DATA.plazoFijo}% anual)</div>
              <div className="text-xs text-gray-500">En {calcPlazo} años</div>
            </div>
            <div className="text-right">
              <div className="text-base sm:text-xl font-bold text-green-600">
                USD {Math.round(calcMonto * ((calcTipo === "alquiler" ? 0.065 : calcTipo === "turistico" ? 0.12 : 0.15) - ZONA_DATA.plazoFijo / 100) * calcPlazo).toLocaleString()}
              </div>
              <div className="text-xs text-green-600">más que en banco</div>
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4 text-center">
          <a 
            href={`mailto:${CONTACT_EMAIL}?subject=Propuesta%20de%20inversión%20-%20San%20Martín%20de%20los%20Andes`}
            className="inline-block w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#FF5A5F] text-white font-semibold rounded-lg sm:rounded-xl hover:bg-[#e54548] transition-colors text-sm text-center"
          >
            Solicitar propuesta
          </a>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="h-32 sm:h-40 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop" 
            alt="Personas usando tecnología"
            className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
          />
        </div>
        <button
          onClick={() => setExpandToken(!expandToken)}
          className="w-full flex items-center gap-3 p-4 sm:p-6 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">¿Qué es la Tokenización?</h2>
            <p className="text-sm text-gray-500">Activos digitales en blockchain</p>
          </div>
          <span className={`transform transition-transform duration-200 ${expandToken ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${expandToken ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600">
            <p className="mb-4">
              La <strong>tokenización</strong> es el proceso de convertir activos del mundo real (propiedades, obras de arte, empresas) en tokens digitales en una blockchain.
            </p>
            <p className="font-medium text-gray-800 mb-2">¿Para qué sirve?</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 text-sm">✓</span>
                <span><strong>Fraccionalización:</strong> Comprar fracción de propiedad</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 text-sm">✓</span>
                <span><strong>Liquidez:</strong> Vender tokens en cualquier momento</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 text-sm">✓</span>
                <span><strong>Transparencia:</strong> Registro en blockchain</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 text-sm">✓</span>
                <span><strong>Acceso global:</strong> Inversores de cualquier lugar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="h-32 sm:h-40 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&h=200&fit=crop" 
            alt="Personas en banco"
            className="w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
          />
        </div>
        <button
          onClick={() => setExpandMep(!expandMep)}
          className="w-full flex items-center gap-3 p-4 sm:p-6 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">¿Qué es el dólar MEP?</h2>
            <p className="text-sm text-gray-500">Mercado Electrónico de Pagos</p>
          </div>
          <span className={`transform transition-transform duration-200 ${expandMep ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${expandMep ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-600">
            <p className="mb-4">
              El <strong>dólar MEP</strong> (Mercado Electrónico de Pagos) es una forma LEGAL de comprar dólares en Argentina mediante la compraventa de bonos corporativos.
            </p>
            <p className="font-medium text-gray-800 mb-2">Ventajas:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <span>Es 100% legal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <span>No tiene límites de monto</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <span>Suele estar más barato que el blue</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 text-sm">✓</span>
                <span>Sin tiempo de espera obligatorio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

function DollarCard({ title, subtitle, price, date, color, icon }) {
  const formatPrice = (price) => {
    if (!price) return "-";
    return `$${Number(price).toLocaleString("es-AR")}`;
  };

  return (
    <div className={`${color} rounded-xl p-6`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-800">{formatPrice(price)}</p>
      <p className="text-xs text-gray-400 mt-1">{date}</p>
    </div>
  );
}