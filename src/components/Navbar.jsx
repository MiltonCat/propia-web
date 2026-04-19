import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">PropIA</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Inicio</Link>
            <Link to="/propiedades" className="text-gray-700 hover:text-blue-600 transition">Propiedades</Link>
            <Link to="/nosotros" className="text-gray-700 hover:text-blue-600 transition">Nosotros</Link>
            <Link to="/contacto" className="text-gray-700 hover:text-blue-600 transition">Contacto</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}