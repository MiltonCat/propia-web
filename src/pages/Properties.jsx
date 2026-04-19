import { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

export default function Properties() {
  const [filter, setFilter] = useState("Todos");
  const [priceRange, setPriceRange] = useState("Todos");

  const propertyTypes = ["Todos", ...new Set(properties.map((p) => p.type))];

  const filteredProperties = properties.filter((property) => {
    const typeMatch = filter === "Todos" || property.type === filter;
    const priceMatch =
      priceRange === "Todos" ||
      (priceRange === "Menos de 300000" && property.price < 300000) ||
      (priceRange === "300000-500000" && property.price >= 300000 && property.price <= 500000) ||
      (priceRange === "Más de 500000" && property.price > 500000);
    return typeMatch && priceMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Nuestras Propiedades</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-48 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full md:w-48 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Todos">Todos los precios</option>
            <option value="Menos de 300000">Menos de $300,000</option>
            <option value="300000-500000">$300,000 - $500,000</option>
            <option value="Más de 500000">Más de $500,000</option>
          </select>
        </div>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-12">
          No se encontraron propiedades con los filtros seleccionados.
        </p>
      )}
    </div>
  );
}