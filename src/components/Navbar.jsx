import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { properties } from "../data/properties";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = properties
        .filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.type.toLowerCase().includes(query)
        )
        .slice(0, 5);
      setSearchResults(results);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/propiedades?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 bg-white border-b border-gray-100 ${
        scrolled ? "shadow-xl" : ""
      }`}
      style={{
        padding: scrolled ? "8px 0" : "20px 0",
        transition:
          "padding 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex justify-between items-center"
          style={{
            minHeight: "40px",
            transition: "min-height 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/marca1.png" alt="Catalan Propiedades" className="h-10 w-auto" />
          </Link>

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/inversiones" className="text-[15px] font-semibold tracking-tight text-gray-800 hover:text-[#FF5A5F] transition flex flex-col items-center gap-1 group">
              <span
                className="text-gray-700 group-hover:text-[#FF5A5F]"
                style={{
                  transform: animate ? "rotateY(0deg)" : "rotateY(-360deg)",
                  transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms",
                  transitionDelay: "0.15s",
                  display: "inline-block",
                }}
              >
                <svg className="nav-icon-trend" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M14 7h7v7" />
                </svg>
              </span>
              <span>Inversiones</span>
              <div className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link to="/nosotros" className="text-[15px] font-semibold tracking-tight text-gray-800 hover:text-[#FF5A5F] transition flex flex-col items-center gap-1 group">
              <span
                className="text-gray-700 group-hover:text-[#FF5A5F]"
                style={{
                  transform: animate ? "rotateY(0deg)" : "rotateY(-360deg)",
                  transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms",
                  transitionDelay: "0.15s",
                  display: "inline-block",
                }}
              >
                <svg className="nav-icon-person" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                </svg>
              </span>
              <span>Sobre mí</span>
              <div className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link to="/contacto" className="text-[15px] font-semibold tracking-tight text-gray-800 hover:text-[#FF5A5F] transition flex flex-col items-center gap-1 group">
              <span
                className="text-gray-700 group-hover:text-[#FF5A5F]"
                style={{
                  transform: animate ? "rotateY(0deg)" : "rotateY(-360deg)",
                  transition: "transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 200ms",
                  transitionDelay: "0.3s",
                  display: "inline-block",
                }}
              >
                <svg className="nav-icon-chat" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <span>Contacto</span>
              <div className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* Buscador — desktop */}
          <div className="hidden md:flex items-center relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="Buscar..."
                className="w-52 lg:w-72 bg-white rounded-full px-4 py-2.5 pl-11 text-base shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
              />
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 inline-flex pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="nav-icon-search h-5 w-5 text-[#FF5A5F]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </span>
            </form>

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {searchResults.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => { navigate(`/propiedades/${property.id}`); setShowResults(false); setSearchQuery(""); }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <img src={property.image} alt={property.title} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{property.title}</p>
                      <p className="text-xs text-gray-500 truncate">{property.location}</p>
                      <p className="text-xs font-semibold text-[#FF5A5F]">USD {property.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                <div onClick={handleSearch} className="p-3 text-center text-sm text-[#FF5A5F] hover:bg-gray-50 cursor-pointer border-t">
                  Ver todos los resultados →
                </div>
              </div>
            )}
          </div>

          {/* CTA Centro de ayuda — desktop */}
          <Link
            to="/centro-ayuda"
            aria-hidden={scrolled}
            tabIndex={scrolled ? -1 : 0}
            className="group hidden md:flex items-center gap-2 px-4 py-2.5 bg-black text-white text-[15px] font-semibold tracking-tight rounded-full hover:bg-gray-800"
            style={{
              opacity: scrolled ? 0 : 1,
              transform: scrolled ? "scale(0.85)" : "scale(1)",
              pointerEvents: scrolled ? "none" : "auto",
              maxWidth: scrolled ? "0px" : "220px",
              paddingLeft: scrolled ? "0px" : undefined,
              paddingRight: scrolled ? "0px" : undefined,
              overflow: "hidden",
              whiteSpace: "nowrap",
              transition:
                "opacity 250ms ease, transform 250ms cubic-bezier(0.4, 0, 0.2, 1), max-width 300ms cubic-bezier(0.4, 0, 0.2, 1), padding 250ms ease, background-color 200ms ease",
            }}
          >
            <svg className="nav-icon-help" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FF5A5F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4" />
              <line x1="12" y1="17" x2="12" y2="17.01" />
            </svg>
            Centro de ayuda
          </Link>

          {/* Hamburguesa — mobile */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {[
              { to: "/", label: "Inicio" },
              { to: "/propiedades", label: "Propiedades" },
              { to: "/alquileres", label: "Alquileres" },
              { to: "/inversiones", label: "Inversiones" },
              { to: "/centro-ayuda", label: "Centro de ayuda" },
              { to: "/contacto", label: "Contacto" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
