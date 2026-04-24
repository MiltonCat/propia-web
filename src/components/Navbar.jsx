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
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const results = properties
      .filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query)
      )
      .slice(0, 5);
    setSearchResults(results);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/propiedades?search=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100" 
          : "bg-white border-b border-gray-100"
      }`}
      style={{
        padding: scrolled ? '8px 0' : '20px 0',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{ minHeight: '40px', transition: 'min-height 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <Link to="/" className="flex items-center relative">
            <img 
              src="/marca1.png" 
              alt="Catalan Propiedades" 
              className={`h-10 w-auto transition-all duration-1000 ${scrolled ? 'rounded-full' : ''}`}
              style={{ 
                opacity: scrolled ? 0 : 1,
              }} 
            />
            <img 
              src="/fondoMarca.png" 
              alt="Catalan Propiedades" 
              className={`absolute inset-0 h-10 w-auto object-contain transition-all duration-1000 ${scrolled ? 'rounded-full' : ''}`}
              style={{ 
                opacity: scrolled ? 1 : 0,
              }} 
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
<Link to="/inversiones" className="text-sm font-medium text-gray-700 hover:text-[#FF5A5F] transition flex flex-col items-center gap-1 group">
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125" style={{
                transform: animate ? 'rotateY(0deg)' : 'rotateY(-360deg)',
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '0.15s',
                display: 'inline-block'
              }}>📈</span> 
              <span className="text-sm">Inversiones</span>
              <div className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </Link>
            
            <Link to="/nosotros" className="text-sm font-medium text-gray-700 hover:text-[#FF5A5F] transition flex flex-col items-center gap-1 group">
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125" style={{
                transform: animate ? 'rotateY(0deg)' : 'rotateY(-360deg)',
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '0.15s',
                display: 'inline-block'
              }}>👤</span> 
              <span className="text-sm">Sobre mí</span>
              <div className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </Link>
            
            <Link to="/contacto" className="text-sm font-medium text-gray-700 hover:text-[#FF5A5F] transition flex flex-col items-center gap-1 group">
              <span className="text-2xl transition-transform duration-300 group-hover:scale-125" style={{
                transform: animate ? 'rotateY(0deg)' : 'rotateY(-360deg)',
                transition: 'transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '0.3s',
                display: 'inline-block'
              }}>📞</span> 
              <span className="text-sm">Contacto</span>
              <div className="w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>

          <div className="hidden md:flex items-center relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="Buscar..."
                className="w-40 lg:w-48 bg-white rounded-full px-3 py-1.5 pl-8 text-sm shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-[#FF5A5F] absolute left-2.5 top-1/2 -translate-y-1/2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </form>

            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                {searchResults.map((property) => (
                  <div
                    key={property.id}
                    onClick={() => {
                      navigate(`/propiedades/${property.id}`);
                      setShowResults(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{property.title}</p>
                      <p className="text-xs text-gray-500 truncate">{property.location}</p>
                      <p className="text-xs font-semibold text-[#FF5A5F]">USD {property.price?.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                <div
                  onClick={handleSearch}
                  className="p-3 text-center text-sm text-[#FF5A5F] hover:bg-gray-50 cursor-pointer border-t"
                >
                  Ver todos los resultados →
                </div>
              </div>
            )}
          </div>

          {!scrolled && (
            <Link to="/centro-ayuda" className="hidden md:block px-3 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300">
              ❓ Centro de ayuda
            </Link>
          )}

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/propiedades" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Propiedades
            </Link>
            <Link to="/inversiones" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Inversiones
            </Link>
            <Link to="/centro-ayuda" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Centro de ayuda
            </Link>
            <Link to="/contacto" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}