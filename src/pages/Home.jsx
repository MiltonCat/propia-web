import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";
import { Link } from "react-router-dom";

export default function Home() {
  const featuredProperties = properties.slice(0, 3);

  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Propiedades Destacadas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/propiedades"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Ver Todas las Propiedades
          </Link>
        </div>
      </section>
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            ¿Por Qué Elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Amplio Catálogo</h3>
              <p className="text-gray-600">
                Más de 500 propiedades en las mejores zonas de Lima.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Asesoría Personalizada</h3>
              <p className="text-gray-600">
                Te acompañamos en todo el proceso de compra o alquiler.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Garantía Legal</h3>
              <p className="text-gray-600">
                Todas nuestras propiedades están verificadas legalmente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}