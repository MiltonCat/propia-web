import { useParams, Link } from "react-router-dom";
import { properties } from "../data/properties";

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Propiedad no encontrada
        </h2>
        <Link
          to="/propiedades"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          Volver a propiedades
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/propiedades"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
      >
        ← Volver a propiedades
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div>
          <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
            {property.type}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">
            {property.title}
          </h1>
          <p className="text-gray-600 mb-4">📍 {property.location}</p>
          <p className="text-4xl font-bold text-blue-600 mb-6">
            ${property.price.toLocaleString()}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{property.bedrooms}</p>
              <p className="text-gray-600">Habitaciones</p>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{property.bathrooms}</p>
              <p className="text-gray-600">Baños</p>
            </div>
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-2xl font-bold text-gray-800">{property.area}</p>
              <p className="text-gray-600">m²</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">Descripción</h2>
          <p className="text-gray-600 mb-6">{property.description}</p>

          <h2 className="text-xl font-semibold text-gray-800 mb-3">Características</h2>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {property.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Contactar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}