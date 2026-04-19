import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {property.type}
          </span>
          <span className="text-xl font-bold text-blue-600">
            ${property.price.toLocaleString()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{property.title}</h3>
        <p className="text-gray-600 text-sm mb-3">📍 {property.location}</p>
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span>🛏️ {property.bedrooms} hab</span>
          <span>🚿 {property.bathrooms} baños</span>
          <span>📐 {property.area} m²</span>
        </div>
        <Link
          to={`/propiedades/${property.id}`}
          className="block text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}