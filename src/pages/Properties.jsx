import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import PropertyMap from "../components/PropertyMap";
import { properties } from "../data/properties";

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("type") || "Todos");
  const [priceRange, setPriceRange] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list");
  const [sortBy, setSortBy] = useState("default");

  const propertyTypes = ["Todos", ...new Set(properties.map((p) => p.type))];

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) setFilter(typeParam);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const filteredProperties = properties.filter((property) => {
    const searchParam = searchParams.get("search");
    const operation = searchParams.get("operation");
    
    const searchMatch = !searchParam || 
      property.title.toLowerCase().includes(searchParam.toLowerCase()) ||
      property.location.toLowerCase().includes(searchParam.toLowerCase()) ||
      property.type.toLowerCase().includes(searchParam.toLowerCase());
    
    const typeMatch = filter === "Todos" || property.type.toLowerCase() === filter.toLowerCase();
    
    const priceMinParam = searchParams.get("priceMin");
    const priceMaxParam = searchParams.get("priceMax");
    const bedroomsParam = searchParams.get("bedrooms");
    const metersParam = searchParams.get("meters");
    const documentsParam = searchParams.get("documents");
    
    const priceMatch =
      priceRange === "Todos" ||
      (priceRange === "Menos de 300000" && property.price < 300000) ||
      (priceRange === "300000-500000" && property.price >= 300000 && property.price <= 500000) ||
      (priceRange === "Más de 500000" && property.price > 500000);
    
    const minPriceMatch = !priceMinParam || property.price >= parseInt(priceMinParam);
    const maxPriceMatch = !priceMaxParam || property.price <= parseInt(priceMaxParam);
    const bedroomsMatch = !bedroomsParam || property.bedrooms >= parseInt(bedroomsParam);
    const metersMatch = !metersParam || property.area >= parseInt(metersParam);
    const documentsMatch = !documentsParam || property.documentsReady === true;
    
    const poolParam = searchParams.get("pool");
    const garageParam = searchParams.get("garage");
    const metersMinParam = searchParams.get("metersMin");
    
    const poolMatch = !poolParam || (poolParam === "si" ? property.features?.includes("Piscina") : !property.features?.includes("Piscina"));
    const garageMatch = !garageParam || (garageParam === "si" ? property.features?.includes("Garaje") : !property.features?.includes("Garaje"));
    const metersMinMatch = !metersMinParam || property.area >= parseInt(metersMinParam);
    
    const operationMatch = !operation || 
      property.operation === "ambas" || 
      property.operation === operation;

    return searchMatch && typeMatch && priceMatch && minPriceMatch && maxPriceMatch && bedroomsMatch && metersMatch && documentsMatch && operationMatch && poolMatch && garageMatch && metersMinMatch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  const clearFilters = () => {
    setFilter("Todos");
    setPriceRange("Todos");
    setSearchParams({});
    setSearchQuery("");
  };
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const activeFiltersCount = [
    searchParams.get("search"),
    searchParams.get("type"),
    searchParams.get("priceMin"),
    searchParams.get("priceMax"),
    searchParams.get("bedrooms"),
    searchParams.get("meters"),
    searchParams.get("documents"),
    searchParams.get("operation"),
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Nuestras Propiedades
          {(searchQuery || activeFiltersCount > 0) && (
            <span className="text-lg font-normal text-gray-500 ml-2">
              ({filteredProperties.length} resultados)
            </span>
          )}
        </h1>
        <div className="flex gap-2 flex-wrap">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#FF5A5F] bg-white"
          >
            <option value="default">Ordenar</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
          </select>
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === "list" ? "bg-[#FF5A5F] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === "map" ? "bg-[#FF5A5F] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Mapa
          </button>
        </div>
      </div>

      {(searchQuery || activeFiltersCount > 0) && (
        <button
          onClick={clearFilters}
          className="text-sm text-[#FF5A5F] hover:text-[#FF385C] font-medium mb-4"
        >
          ← Limpiar búsqueda
        </button>
      )}

      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value) {
              setSearchParams({ ...Object.fromEntries(searchParams), search: e.target.value });
            } else {
              searchParams.delete("search");
              setSearchParams(searchParams);
            }
          }}
          placeholder="Buscar por nombre, ubicación o tipo..."
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
        />
      </div>

      {viewMode === "map" ? (
        <div className="h-[500px] rounded-lg overflow-hidden border">
          <PropertyMap properties={filteredProperties} />
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">
            No se encontraron propiedades con los filtros seleccionados.
          </p>
          <button
            onClick={clearFilters}
            className="text-[#FF5A5F] hover:text-[#FF385C] font-medium"
          >
            Limpiar filtros y ver todas
          </button>
        </div>
      )}
    </div>
  );
}