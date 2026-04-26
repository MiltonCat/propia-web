import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { WA_URL, CONTACT_EMAIL, PHONE_DISPLAY } from "../config";

const CATEGORIAS = ["Todas", "Compra", "Alquiler", "Inversión", "Zona", "Proceso"];

const faqs = [
  {
    categoria: "Compra",
    question: "¿Puedo comprar una propiedad en San Martín siendo extranjero?",
    answer: "Sí. Los extranjeros pueden comprar propiedades en Argentina. Necesitás obtener un CDI (Clave de Identificación) ante la AFIP y contar con una cuenta bancaria local. El proceso es similar al de un ciudadano argentino y te asesoramos en cada paso.",
  },
  {
    categoria: "Proceso",
    question: "¿Cómo es el proceso de compra de una propiedad en Neuquén?",
    answer: "El proceso consta de: 1) Reserva con seña (generalmente 10% del valor), 2) Boleto de compraventa, 3) Escritura ante escribano público. El tiempo estimado desde la reserva hasta la escritura es de 30 a 90 días según la documentación.",
  },
  {
    categoria: "Proceso",
    question: "¿Qué documentos necesito para comprar?",
    answer: "DNI vigente, CUIL/CUIT, comprobante de domicilio y, si comprás con financiación, comprobante de ingresos. En el caso de extranjeros, pasaporte y CDI.",
  },
  {
    categoria: "Compra",
    question: "¿Qué impuestos y gastos tiene una compra en la zona?",
    answer: "Los gastos de escritura rondan el 3–4% del valor de venta (honorarios del escribano, sellos e impuestos provinciales). El impuesto a la transferencia de inmuebles (ITI) es del 1,5% a cargo del vendedor. Te detallamos todos los costos antes de avanzar.",
  },
  {
    categoria: "Inversión",
    question: "¿Es buen momento para invertir en San Martín de los Andes?",
    answer: "Sí. San Martín de los Andes tiene el m² más caro del país (USD 2.100/m² en 2025) con una valorización del 17,7% interanual. Es un destino de 4 estaciones con alta demanda turística, lo que garantiza rentabilidad por alquiler y plusvalía sostenida.",
  },
  {
    categoria: "Inversión",
    question: "¿Qué rentabilidad puedo esperar por alquiler turístico?",
    answer: "Las propiedades en zonas turísticas como Chapelco o el Centro generan entre USD 60 y USD 90 por día en temporada alta. En temporada baja la demanda baja pero el alquiler mensual residencial compensa. La rentabilidad anual promedio ronda el 8–12% en dólares.",
  },
  {
    categoria: "Inversión",
    question: "¿Cuáles son las zonas con mayor potencial de valorización?",
    answer: "Altos del Chapelco y Faldeos del Chapelco son las zonas premium con mayor crecimiento. Para quienes buscan entrada a menor precio con alto potencial, Meliquina es la zona en desarrollo más prometedora actualmente.",
  },
  {
    categoria: "Alquiler",
    question: "¿Puedo alquilar temporalmente sin comprar?",
    answer: "Sí. Gestionamos alquileres temporarios y mensuales. Los contratos temporarios (turísticos) no están regulados por la Ley de Alquileres y ofrecen mayor flexibilidad tanto para el propietario como para el inquilino.",
  },
  {
    categoria: "Alquiler",
    question: "¿Cómo funciona el alquiler con fines turísticos?",
    answer: "El propietario pone la propiedad a disposición por períodos cortos (días o semanas). Nos encargamos de la publicación, coordinación de ingresos y pagos. El ingreso se liquida mensualmente descontando la comisión de administración.",
  },
  {
    categoria: "Zona",
    question: "¿Qué hace única a San Martín de los Andes como destino?",
    answer: "Es una ciudad de 4 estaciones con esquí en invierno (Chapelco), pesca y trekking en verano, y gastronomía y naturaleza todo el año. A diferencia de Bariloche, mantiene un perfil boutique con menor masificación, lo que preserva el valor de las propiedades.",
  },
  {
    categoria: "Zona",
    question: "¿Hay servicios e infraestructura desarrollada en la zona?",
    answer: "Sí. San Martín cuenta con hospital, colegios, aeropuerto (Chapelco), supermercados, gastronomía de nivel y conectividad de fibra óptica. Es una ciudad completa para vivir de forma permanente o como segunda residencia.",
  },
];

export default function CentroAyuda() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), 250);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredFaqs = faqs.filter((faq) => {
    const matchCategoria = categoriaActiva === "Todas" || faq.categoria === categoriaActiva;
    const matchSearch =
      faq.question.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(debouncedTerm.toLowerCase());
    return matchCategoria && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Centro de Ayuda</h1>
          <p className="text-white/80 text-base mb-6">
            Respondemos las dudas más comunes sobre compra, alquiler e inversión en la Patagonia
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCategoriaActiva("Todas"); }}
              className="w-full px-5 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 pl-12"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Contacto */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link to="/contacto" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF5A5F]/20 transition">
              <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Email</h3>
            <p className="text-gray-500 text-sm">{CONTACT_EMAIL}</p>
          </Link>
          <Link to="/contacto" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF5A5F]/20 transition">
              <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Teléfono</h3>
            <p className="text-gray-500 text-sm">{PHONE_DISPLAY}</p>
            <p className="text-gray-400 text-xs mt-1">Lun–Vie 9 a 18hs</p>
          </Link>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group block">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF5A5F]/20 transition">
              <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">WhatsApp</h3>
            <p className="text-gray-500 text-sm">Chateá con nosotros</p>
            <p className="text-gray-400 text-xs mt-1">Respuesta rápida</p>
          </a>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800 mb-3">Preguntas Frecuentes</h2>
            {/* Filtros de categoría */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategoriaActiva(cat); setSearchTerm(""); }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    categoriaActiva === cat
                      ? "bg-[#FF5A5F] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#FF5A5F] hover:text-[#FF5A5F]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="hover:bg-gray-50 transition">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-[#FF5A5F] bg-[#FF5A5F]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {faq.categoria}
                      </span>
                      <span className="font-medium text-gray-700">{faq.question}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </div>
            )}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-8 bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">¿Tenés una consulta específica?</h2>
          <p className="text-gray-400 mb-5 text-sm">
            Cada operación es única. Contactanos y te asesoramos sin compromiso.
          </p>
          <Link
            to="/contacto"
            className="inline-block bg-[#FF5A5F] text-white px-8 py-3 rounded-full hover:bg-[#FF385C] transition font-medium"
          >
            Hablar con Milton
          </Link>
        </div>

      </div>
    </div>
  );
}
