import { useState, useEffect } from "react";

export default function Hero() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCollapsed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-gray-900"
      style={{
        height: collapsed ? "110px" : "55vh",
        minHeight: collapsed ? "110px" : "380px",
        transition: "height 900ms cubic-bezier(0.4, 0, 0.2, 1), min-height 900ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Foto */}
      <img
        src="/portada.jpg"
        alt="Portada de Milton Catalán Propiedades"
        loading="eager"
        fetchpriority="high"
        className="absolute inset-0 w-full h-full object-cover hero-kenburns"
        style={{
          transition: "opacity 900ms ease",
          opacity: collapsed ? 0.35 : 1,
        }}
      />

      {/* Gradiente inferior */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: collapsed ? "110px" : "112px",
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)",
          transition: "height 900ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Franja de stats — siempre pegada al fondo */}
      <div className="absolute inset-x-0 bottom-0 px-6 flex items-center justify-center"
        style={{ height: "110px" }}
      >
        <div className="flex items-center gap-6 md:gap-12">

          <div className="text-center">
            <p className="text-white text-base md:text-xl font-bold leading-none">Inversiones</p>
          </div>

          <div className="w-px h-6 bg-white/30" />

          <div className="text-center">
            <p className="text-white text-base md:text-xl font-bold leading-none">10+</p>
            <p className="text-white/70 text-xs mt-0.5 tracking-wide">Años de experiencia</p>
          </div>

          <div className="w-px h-6 bg-white/30" />

          <div className="text-center">
            <p className="text-white text-base md:text-xl font-bold leading-none">San Martín</p>
            <p className="text-white/70 text-xs mt-0.5 tracking-wide">de los Andes</p>
          </div>

        </div>
      </div>
    </div>
  );
}
