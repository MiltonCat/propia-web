import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

export default function PropertyCard({ property }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(property.id);

  const operationLabel = {
    venta: "Venta",
    alquiler: "Alquiler",
    ambas: "Venta y Alquiler",
  };

  const operationColor = {
    venta: "bg-green-100 text-green-800",
    alquiler: "bg-purple-100 text-purple-800",
    ambas: "bg-[#FF5A5F] text-white",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <Link to={`/propiedades/${property.id}`} className="relative block">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="w-full h-48 object-cover cursor-pointer"
        />
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded ${operationColor[property.operation]}`}>
          {operationLabel[property.operation]}
        </span>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(property.id); }}
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow transition hover:scale-110"
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill={fav ? "#FF5A5F" : "none"} stroke={fav ? "#FF5A5F" : "#9ca3af"} strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{property.title}</h3>
        <p className="text-gray-500 text-sm mb-3">{property.location}</p>

        <div className="flex flex-col gap-2 mb-3">
          {(property.operation === "venta" || property.operation === "ambas") && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Venta</span>
              <span className="text-xl font-bold text-green-600">
                USD {property.price.toLocaleString()}
              </span>
            </div>
          )}
          {(property.operation === "alquiler" || property.operation === "ambas") && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Alquiler</span>
              <span className="text-xl font-bold text-purple-600">
                ${property.rentPrice?.toLocaleString()}/mes
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded">🛏️ {property.bedrooms} hab</span>
          <span className="bg-gray-100 px-2 py-1 rounded">🚿 {property.bathrooms} baños</span>
          <span className="bg-gray-100 px-2 py-1 rounded">📐 {property.area} m²</span>
          {property.landArea && property.landArea !== property.area && (
            <span className="bg-gray-100 px-2 py-1 rounded">🏞️ {property.landArea} m² terreno</span>
          )}
        </div>

        {property.features?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{feature}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
