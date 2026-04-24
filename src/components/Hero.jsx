import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] bg-gray-900">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="/muelle.jpg"
          alt="Muelle"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-6">
          Cumple el sueño de tener tu propio hogar
        </h1>
        <p className="text-xl text-gray-200 text-center mb-8 max-w-2xl mx-auto">
          Encontrá la propiedad perfecta para vos y tu familia.
        </p>
        <div className="flex justify-center">
          <Link
            to="/propiedades"
            className="bg-[#FF5A5F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#FF385C] transition"
          >
            Ver Propiedades
          </Link>
        </div>
      </div>
    </div>
  );
}