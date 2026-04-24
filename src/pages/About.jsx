import { useState, useEffect } from 'react';

const stats = [
  { num: '10+', label: 'Años en Finanzas' },
  { num: '$3M+', label: 'Cartera Administrada' },
  { num: '100%', label: 'Asesoría Personalizada' },
];

const values = [
  { icon: '🎯', title: 'Transparencia', desc: 'Comunicación clara y honesta en cada paso del proceso.' },
  { icon: '📈', title: 'Profesionalismo', desc: 'Experticia financiera para maximizar tu inversión.' },
  { icon: '🤝', title: 'Compromiso', desc: 'Tu éxito patrimonial es nuestra prioridad.' },
  { icon: '💎', title: 'Calidad', desc: 'Solo trabajamos con las mejores oportunidades del mercado.' },
];

const services = [
  { 
    title: 'Asesoría Inmobiliaria', 
    desc: 'Análisis completo de inversiones propiedades y mercados.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  { 
    title: 'Gestión de Cartera', 
    desc: 'Administración profesional de tu portafolio inmobiliario.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  { 
    title: 'Análisis de Riesgo', 
    desc: 'Evaluación detallada para inversiones seguras.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  { 
    title: 'Asesoría Legal', 
    desc: 'Apoyo en procesos de compra-venta y documentación.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
];

function animateIn() {
  const elements = document.querySelectorAll('.animate-on-load');
  elements.forEach((el, i) => {
    setTimeout(() => el.classList.add('opacity-100', 'translate-y-0'), i * 100);
  });
}

export default function About() {
  const [flipMilton, setFlipMilton] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    animateIn();
    const startTimer = setTimeout(() => setFlipMilton(true), 5000);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (flipMilton) {
      const showLogoTimer = setTimeout(() => {
        setShowLogo(true);
        setFlipMilton(false);
      }, 500);
      return () => clearTimeout(showLogoTimer);
    }
  }, [flipMilton]);

  useEffect(() => {
    if (showLogo) {
      const resetTimer = setTimeout(() => {
        setShowLogo(false);
        setTimeout(() => setFlipMilton(true), 3000);
      }, 10000);
      return () => clearTimeout(resetTimer);
    }
  }, [showLogo]);

  return (
    <div className="min-h-screen bg-white">
      <section id="contact" className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative w-full h-96 perspective-1000">
            <img
              src="/Milton.jpeg"
              alt="Milton Catalan - Asesor inmobiliario profesional"
              className={`absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg ${flipMilton ? 'animate-card-flip' : ''}`}
            />
            <img
              src="/logoMC.jpg"
              alt="Logo MC Inversiones"
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-500"
              style={{ opacity: showLogo ? 1 : 0 }}
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-center text-center md:text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-800 tracking-tight text-right font-jakarta">
              Experto en guiar tu
            </h1>
            <p className="text-4xl md:text-5xl font-semibold text-gray-800 font-jakarta">
              patrimonio
            </p>
            <p className="text-gray-500 text-lg font-medium max-w-sm font-dm">
              Asesoramiento inmobiliario estratégico para que tu inversión crezca con seguridad.
            </p>
            <a
              href="#contact"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
              Contáctame
            </a>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-semibold text-primary text-center mb-12 font-jakarta">
            Lo que nos define
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-primary/10 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl">🎯</span>
                </div>
                <h2 className="text-xl font-bold text-primary mb-3 font-jakarta">Nuestra Misión</h2>
                <div className="h-px bg-gray-200 mb-3"></div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">●</span>
                    <p className="font-dm">Potenciar el patrimonio de nuestros clientes a través de una asesoría inmobiliaria de alto valor.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">●</span>
                    <p className="font-dm">Integrar análisis financiero riguroso, proyección estratégica de activos y evaluación experta.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">●</span>
                    <p><strong>Transformar cada decisión en un paso hacia la libertad financiera.</strong></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-primary/10 group relative overflow-hidden" style={{ animationDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl">🔭</span>
                </div>
                <h2 className="text-xl font-bold text-primary mb-3 font-jakarta">Nuestra Visión</h2>
                <div className="h-px bg-gray-200 mb-3"></div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">●</span>
                    <p className="font-dm">Ser la firma inmobiliaria de referencia en la región.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">●</span>
                    <p className="font-dm">Fusionar la inteligencia del wealth management con el mercado de activos reales.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">●</span>
                    <p><strong>Construir relaciones de confianza intergeneracional.</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="valores" className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 text-3xl font-semibold text-gray-800 text-center mb-12 font-jakarta">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="text-3xl">{v.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center font-jakarta">{v.title}</h3>
                <p className="text-gray-500 text-sm text-center">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="servicios" className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 text-3xl font-semibold text-gray-800 text-center mb-4 font-jakarta">
            Servicios
          </h2>
          <p className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            Ofrecemos soluciones integrales para cada etapa de tu journey inversor.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div
                key={i}
                className="animate-on-load opacity-0 translate-y-8 transition-all duration-500 bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300 text-white">
                  {s.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-jakarta">{s.title}</h3>
                <p className="text-gray-500 text-sm font-dm mb-3">{s.desc}</p>
                <a href="#contact" className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all duration-300">
                  Conocer más <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}