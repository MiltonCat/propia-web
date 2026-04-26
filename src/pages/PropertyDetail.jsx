import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { properties } from "../data/properties";
import Lightbox from "../components/Lightbox";
import { useFavorites } from "../hooks/useFavorites";
import { usePageMeta } from "../hooks/usePageMeta";
import { WA_NUMBER } from "../config";

function waLink(propertyTitle, message = "") {
  const text = message || `Hola! Me interesa la propiedad: "${propertyTitle}". ¿Podemos hablar?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function PropertyDetail() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [inquiry, setInquiry] = useState("");
  const { isFavorite, toggle } = useFavorites();

  usePageMeta(
    property
      ? {
          title: `${property.title} | Catalán Propiedades`,
          description: property.description?.slice(0, 155),
          image: property.image,
          url: window.location.href,
        }
      : {}
  );

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center pt-24">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Propiedad no encontrada</h2>
        <Link to="/propiedades" className="text-[#FF5A5F] hover:text-[#FF385C] underline">
          Volver a propiedades
        </Link>
      </div>
    );
  }

  const allImages = [property.image, property.image1, property.image2, property.image3, property.image4].filter(Boolean);
  const fav = isFavorite(property.id);

  const isAlquiler = property.modalidad === "alquiler_permanente";

  const operationLabel = {
    venta: "Venta",
    alquiler: "Alquiler permanente",
    ambas: "Venta y Alquiler",
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInquiry = () => {
    const msg = inquiry.trim()
      ? `Hola! Me interesa la propiedad: "${property.title}".\n\n${inquiry}`
      : `Hola! Me interesa la propiedad: "${property.title}". ¿Podemos hablar?`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pt-24">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-[#FF5A5F]">Inicio</Link>
        <span>/</span>
        <Link to="/propiedades" className="hover:text-[#FF5A5F]">Propiedades</Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-xs">{property.title}</span>
      </nav>

      <Link to="/propiedades" className="inline-flex items-center text-[#FF5A5F] hover:text-[#FF385C] mb-6">
        ← Volver a propiedades
      </Link>

      <div className="flex gap-2 mb-2">
        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded">{property.type}</span>
        <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded">{operationLabel[property.operation]}</span>
      </div>

      {/* Title row with favorites + share */}
      <div className="flex items-start justify-between gap-4 mt-2 mb-2">
        <h1 className="text-3xl font-bold text-gray-800">{property.title}</h1>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          {/* Favorite */}
          <button
            onClick={() => toggle(property.id)}
            className="flex items-center gap-1.5 border rounded-lg px-3 py-2 text-sm transition hover:border-[#FF5A5F]"
            style={{ borderColor: fav ? "#FF5A5F" : "#e5e7eb", color: fav ? "#FF5A5F" : "#6b7280" }}
            aria-label={fav ? "Quitar de favoritos" : "Guardar"}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fav ? "#FF5A5F" : "none"} stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span className="hidden sm:inline">{fav ? "Guardada" : "Guardar"}</span>
          </button>
          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-500 hover:border-[#FF5A5F] hover:text-[#FF5A5F] transition"
            aria-label="Compartir"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            <span className="hidden sm:inline">{copied ? "¡Copiado!" : "Compartir"}</span>
          </button>
        </div>
      </div>

      <p className="text-lg text-gray-500 mb-2">📍 {property.location}</p>

      {/* Image grid desktop */}
      <div className="grid grid-cols-4 grid-rows-2 gap-1 mb-6 hidden lg:grid h-64 lg:h-80">
        <div className="col-span-2 row-span-2">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover rounded-l-lg cursor-pointer hover:opacity-95 transition" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} />
        </div>
        <div className="col-span-1 row-span-1">
          <img src={property.image1 || property.image} alt={`${property.title} - 2`} loading="lazy" className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition" onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }} />
        </div>
        <div className="col-span-1 row-span-1">
          <img src={property.image2 || property.image} alt={`${property.title} - 3`} loading="lazy" className="w-full h-full object-cover rounded-tr-lg cursor-pointer hover:opacity-95 transition" onClick={() => { setLightboxIndex(2); setLightboxOpen(true); }} />
        </div>
        <div className="col-span-1 row-span-1">
          <img src={property.image3 || property.image} alt={`${property.title} - 4`} loading="lazy" className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition" onClick={() => { setLightboxIndex(3); setLightboxOpen(true); }} />
        </div>
        <div className="col-span-1 row-span-1">
          <img src={property.image4 || property.image} alt={`${property.title} - 5`} loading="lazy" className="w-full h-full object-cover rounded-br-lg cursor-pointer hover:opacity-95 transition" onClick={() => { setLightboxIndex(4); setLightboxOpen(true); }} />
        </div>
      </div>

      {/* Image carousel mobile */}
      <div className="lg:hidden overflow-x-auto flex gap-1 pb-2 snap-x snap-mandatory mb-6">
        {allImages.map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-full snap-center">
            <img src={img} alt={`${property.title} - ${idx + 1}`} loading={idx > 0 ? "lazy" : undefined} className="w-full h-64 object-cover rounded-lg cursor-pointer" onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }} />
          </div>
        ))}
      </div>

      <p className="text-gray-600 font-semibold mb-6">{property.features?.slice(0, 2).join(" • ")}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center justify-between border rounded-xl p-4">
          {isAlquiler ? (
            <div className="flex flex-col gap-1 w-full">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Alquiler mensual</span>
                <span className="text-2xl font-bold text-purple-600">
                  $ {property.precioAlquilerARS?.toLocaleString("es-AR")}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-500 text-sm">Disponible desde</span>
                <span className="text-sm font-semibold text-green-600">{property.disponibleDesde}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Mínimo</span>
                <span className="text-sm text-gray-700">{property.mesesMinimos} meses</span>
              </div>
              {property.condiciones && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Condiciones</span>
                  <span className="text-sm text-gray-700">{property.condiciones}</span>
                </div>
              )}
              <a
                href={waLink(property.title, `Hola! Me interesa alquilar la propiedad: "${property.title}". ¿Podemos hablar?`)}
                target="_blank" rel="noopener noreferrer"
                className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-5 rounded-lg transition text-center"
              >
                Consultar disponibilidad
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">USD {property.price?.toLocaleString()}</span>
                <span className="text-gray-500 text-sm">precio de venta</span>
              </div>
              <a href={waLink(property.title)} target="_blank" rel="noopener noreferrer" className="bg-[#FF5A5F] hover:bg-[#FF385C] text-white font-semibold py-3 px-6 rounded-lg transition shrink-0">
                Me interesa
              </a>
            </div>
          )}
        </div>
        <div className="border rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Sobre esta propiedad</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{property.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-100 rounded-lg">
          <p className="text-xl font-bold text-gray-800">{property.bedrooms}</p>
          <p className="text-xs text-gray-600">Dormitorios</p>
        </div>
        <div className="text-center p-3 bg-gray-100 rounded-lg">
          <p className="text-xl font-bold text-gray-800">{property.bathrooms}</p>
          <p className="text-xs text-gray-600">Baños</p>
        </div>
        <div className="text-center p-3 bg-gray-100 rounded-lg">
          <p className="text-xl font-bold text-gray-800">{property.area}</p>
          <p className="text-xs text-gray-600">m²</p>
        </div>
        <div className="text-center p-3 bg-gray-100 rounded-lg">
          <p className="text-xl font-bold text-gray-800">{property.landArea || property.area}</p>
          <p className="text-xs text-gray-600">m² terreno</p>
        </div>
      </div>

      {property.yearBuilt && (
        <p className="text-sm text-gray-500 mb-4">Año de construcción: <span className="font-medium text-gray-800">{property.yearBuilt}</span></p>
      )}

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Descripción</h2>
      <p className="text-gray-600 mb-6">{property.description}</p>

      <h2 className="text-lg font-semibold text-gray-800 mb-3">Características</h2>
      <ul className="grid grid-cols-2 gap-2 mb-6">
        {property.features.map((feature, i) => (
          <li key={i} className="flex items-center text-gray-600">
            <span className="text-green-500 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* Asesor + consulta rápida */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-xl p-6 flex items-center gap-4">
          <img src="/Milton.jpeg" alt="Asesor" loading="lazy" className="w-24 h-24 rounded-full object-cover" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">Milton</h3>
            <p className="text-gray-500 text-sm">Asesor inmobiliario</p>
            <a href={waLink(property.title)} target="_blank" rel="noopener noreferrer" className="bg-[#FF5A5F] hover:bg-[#FF385C] text-white font-semibold py-2 px-4 rounded-lg transition mt-2 inline-block">
              Contactar
            </a>
          </div>
        </div>

        {/* Consulta rápida */}
        <div className="border rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-1">Consulta rápida</h3>
          <p className="text-gray-500 text-sm mb-3">Enviá tu consulta por WhatsApp directamente sobre esta propiedad.</p>
          <textarea
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            placeholder={`Me interesa "${property.title.slice(0, 40)}...". ¿Está disponible?`}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#FF5A5F] resize-none mb-3"
          />
          <button
            onClick={handleInquiry}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            Enviar por WhatsApp
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {isAlquiler ? (
          <a href={waLink(property.title, `Hola! Me interesa alquilar permanentemente la propiedad: "${property.title}". ¿Está disponible?`)} target="_blank" rel="noopener noreferrer" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition text-center block">
            Consultar disponibilidad
          </a>
        ) : (
          <>
            {(property.operation === "venta" || property.operation === "ambas") && (
              <a href={waLink(property.title, `Hola! Me interesa comprar la propiedad: "${property.title}". ¿Está disponible?`)} target="_blank" rel="noopener noreferrer" className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg font-semibold hover:bg-[#FF385C] transition text-center block">
                Me interesa comprar
              </a>
            )}
          </>
        )}
      </div>

      <Lightbox images={allImages} title={property.title} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} startIndex={lightboxIndex} />
    </div>
  );
}
