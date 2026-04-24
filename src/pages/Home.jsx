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
            className="inline-block bg-[#FF5A5F] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#FF385C] transition"
          >
            Ver Todas las Propiedades
          </Link>
        </div>
      </section>
      
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <a href="/inversiones" className="block relative group overflow-hidden rounded-2xl">
              <img 
                src="/inversion.jpg" 
                alt="Inversor profesional" 
                className="w-full h-64 sm:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">Ver Oportunidades →</span>
              </div>
            </a>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Inversiones Inteligentes en Patagonia
              </h2>
              <p className="text-gray-300 mb-6">
                San Martín de los Andes es una de las zonas con mayor potencial de valorización en Argentina. 
                Con más de 20 años de experiencia en el mercado inmobiliario patagónico, te ayudamos a encontrar 
                la inversión perfecta para tu futuro.
              </p>
              <a 
                href="/inversiones" 
                className="inline-block bg-[#FF5A5F] hover:bg-[#e54548] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Ver Oportunidades
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}