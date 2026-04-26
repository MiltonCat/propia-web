import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";
import InvestmentMap from "../components/InvestmentMap";
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
      
      <InvestmentMap />
    </div>
  );
}