import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-40"
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
          alt="Hero background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          Encuentra Tu Hogar Perfecto
        </h1>
        <p className="text-xl text-gray-200 text-center mb-8 max-w-2xl mx-auto">
          Las mejores propiedades en Lima. Encuentra la casa de tus sueños con nosotros.
        </p>
        <div className="flex justify-center">
          <Link
            to="/propiedades"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ver Propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}