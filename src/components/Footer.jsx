import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PropIA</h3>
            <p className="text-gray-300">Tu inmobiliaria de confianza en Lima, Perú.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/propiedades" className="text-gray-300 hover:text-white transition">Propiedades</Link>
              <Link to="/nosotros" className="text-gray-300 hover:text-white transition">Nosotros</Link>
              <Link to="/contacto" className="text-gray-300 hover:text-white transition">Contacto</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <p className="text-gray-300">📍 Av. Principal 123, Lima</p>
            <p className="text-gray-300">📞 +51 999 999 999</p>
            <p className="text-gray-300">✉️ info@propia.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2026 PropIA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}