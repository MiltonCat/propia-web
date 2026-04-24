import { useState } from "react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "¿Cómo puedo publicar una propiedad?",
    answer: "Para publicar una propiedad, debes registrarte en nuestra plataforma y completar el formulario de publicación con los detalles de tu propiedad incluyendo fotos, descripción, precio y ubicación."
  },
  {
    question: "¿Quais son los métodos de pago aceptados?",
    answer: "Aceptamos transferencias bancarias, tarjetas de crédito y débito, y pagos en efectivo en nuestra oficina."
  },
  {
    question: "¿Cuánto tiempo tarda en procesarse una compra?",
    answer: "El proceso de compra típicamente toma entre 24-48 horas una vez completada la documentación requerida."
  },
  {
    question: "¿Puedo alquilar una propiedad sin comprarla?",
    answer: "Sí, ofrecemos opciones de alquiler mensual para todas nuestras propiedades. Los precios de alquiler varían según la ubicación y tipo de propiedad."
  },
  {
    question: "¿Qué documentos necesito para comprar?",
    answer: "Para compras necesitas: DNI vigente, comprobante de ingresos, estados de cuenta bancarios y documentación de la propiedad que deseas adquirir."
  },
  {
    question: "¿Offeren servicio de tokenización?",
    answer: "Sí, tokenizamos propiedades para que puedas invertir desde $100 USD y recibir dividendos mensuales por alquiler."
  }
];

export default function CentroAyuda() {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-r from-[#FF5A5F] to-[#FF385C] rounded-2xl p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Centro de Ayuda</h1>
          <p className="text-white/80 text-lg mb-6">
            Encuentra respuestas a tus preguntas sobre propiedades y servicios
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 pl-12"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link to="/contacto" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF5A5F]/20">
              <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Email</h3>
            <p className="text-gray-500 text-sm">contacto@propia.com</p>
          </Link>
          <Link to="/contacto" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF5A5F]/20">
              <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">Teléfono</h3>
            <p className="text-gray-500 text-sm">+54 9 2944 30-1470</p>
          </Link>
          <a href="https://wa.me/542944301470" target="_blank" rel="noopener noreferrer" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center group block">
            <div className="w-12 h-12 bg-[#FF5A5F]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FF5A5F]/20">
              <svg className="w-6 h-6 text-[#FF5A5F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800">WhatsApp</h3>
            <p className="text-gray-500 text-sm">Chateá con nosotros</p>
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">Preguntas Frecuentes</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="hover:bg-gray-50 transition">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-gray-700 pr-4">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
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

        <div className="mt-8 bg-gray-900 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">¿Necesitás más ayuda?</h2>
          <p className="text-gray-400 mb-4">Nuestro equipo está disponible 24/7</p>
          <Link
            to="/contacto"
            className="inline-block bg-[#FF5A5F] text-white px-6 py-3 rounded-full hover:bg-[#FF385C] transition font-medium"
          >
            Contactar soporte
          </Link>
        </div>
      </div>
    </div>
  );
}