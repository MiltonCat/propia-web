import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Página no encontrada | Catalán Propiedades";
    return () => { document.title = "Catalán Propiedades"; };
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-9xl font-bold text-[#FF5A5F] mb-2">404</p>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">Página no encontrada</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        La página que buscás no existe o fue eliminada. Podés volver al inicio o explorar nuestras propiedades.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="border border-gray-300 text-gray-700 hover:border-[#FF5A5F] hover:text-[#FF5A5F] px-6 py-3 rounded-lg font-semibold transition"
        >
          ← Volver atrás
        </button>
        <Link
          to="/"
          className="bg-[#FF5A5F] hover:bg-[#FF385C] text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Ir al inicio
        </Link>
        <Link
          to="/propiedades"
          className="border border-[#FF5A5F] text-[#FF5A5F] hover:bg-[#FF5A5F] hover:text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Ver propiedades
        </Link>
      </div>
    </div>
  );
}
