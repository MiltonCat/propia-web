import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 600);
  };

  const handleViewProperties = () => {
    handleClose();
    navigate('/propiedades');
  };

  if (!isOpen && !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <button
          onClick={handleClose}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full text-sm transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isHovered
              ? 'scale-110 rotate-90 bg-gray-200'
              : 'bg-white shadow-md hover:bg-gray-100'
          }`}
        >
          <span className={isHovered ? 'animate-spin' : ''}>✕</span>
        </button>

        <div className="relative h-24 bg-gradient-to-r from-rose-500 to-rose-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-white/10 animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="text-center relative z-10">
            <span className="text-4xl animate-[pulse_3s_ease-in-out_infinite]">✨</span>
          </div>
          <div className="absolute bottom-2 left-3 rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-rose-600">
            Destacado
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-base font-semibold text-gray-900">
            ¡Propiedades Destacadas!
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Explora nuestra selección de propiedades exclusivas con las mejores ubicaciones.
          </p>

          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="text-base animate-[bounce_3s_ease-in-out_infinite]">🏠</span>
              <span>Propiedades premium</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="text-base animate-[pulse_3s_ease-in-out_infinite]">📍</span>
              <span>Ubicaciones exclusivas</span>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={handleViewProperties}
              className="flex-1 rounded-lg bg-rose-500 py-2 text-xs font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-rose-600 hover:shadow-lg"
            >
              Ver propiedades
            </button>
            <button
              onClick={handleClose}
              className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-gray-50"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedModal;