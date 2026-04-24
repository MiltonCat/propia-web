import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ImageWithSkeleton({ src, alt, className, aspectRatio = "aspect-video" }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative ${aspectRatio} ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}
      <img
        src={error ? "https://via.placeholder.com/800x400?text=Imagen" : src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

const articles = [
  {
    id: 1,
    title: "Cómo invertir en bienes raíces en 2026: Guía completa para principiantes",
    excerpt: "Todo lo que necesitas saber para comenzar a construir patrimonio inmobiliario desde cero.",
    category: "Inversiones",
    image: "https://images.unsplash.com/photo-1560520653-9e180e2f8c1e?w=1200&q=80",
    date: "15 Mar 2026",
    readTime: "8 min",
    author: "Milton Catalan",
    content: `
      <p class="mb-6">El mercado inmobiliario en Argentina está experimentando una transformación significativa en 2026. Con la estabilización económica y el crecimiento del turismo en la Patagonia, ahora es el momento ideal para considerar inversiones en bienes raíces.</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">¿Por qué invertir en bienes raíces?</h2>
      <p class="mb-6">Los bienes raíces han demostrado históricamente ser una de las inversiones más estables y seguras. A diferencia de otros instrumentos financieros, la propiedad física ofrece:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Protección contra la inflación</li>
        <li>Generación de ingresos pasivos mediante alquileres</li>
        <li>Valorización a largo plazo</li>
        <li>Control directo sobre tu inversión</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Pasos para comenzar</h2>
      <p class="mb-6"><strong>1. Define tu objetivo:</strong> ¿Buscas alquiler temporal, alquiler tradicional o apreciación del capital?</p>
      <p class="mb-6"><strong>2. Establece tu presupuesto:</strong> Considera no solo el precio de compra, sino también impuestos, mantenimiento y gastos de cierre.</p>
      <p class="mb-6"><strong>3. Investiga la ubicación:</strong> La ubicación es el factor más importante. Busca zonas con potencial de crecimiento, servicios cercanos y buena conectividad.</p>
      <p class="mb-6"><strong>4. Analiza el mercado de alquileres:</strong> Asegúrate de que la demanda de alquiler en la zona sea suficiente para generar rentabilidad.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">La Patagonia como opción de inversión</h2>
      <p class="mb-6">San Martín de los Andes se ha consolidado como uno de los destinos más atractivos para inversores inmobiliarios. El crecimiento del turismo, la falta de oferta de alquileres y la escasez de tierra disponible han impulsado una valorización sostenida en los últimos años.</p>
      <p class="mb-6">Las propiedades en zonas céntricas y cercanas a centros de ski tienen un potencial de rendimiento especialmente interesante para alquileres temporarios.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Conclusión</h2>
      <p class="mb-6">Invertir en bienes raíces requiere análisis cuidadoso y planificación. Sin embargo, con la orientación adecuada y una estrategia clara, puede ser una de las inversiones más gratificantes y seguras a largo plazo.</p>
    `
  },
  {
    id: 2,
    title: "El mercado inmobiliario en la Patagonia: Análisis y perspectivas",
    excerpt: "El crecimiento exponencial de San Martín de los Andes y por qué todos miran al sur.",
    category: "Mercado",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    date: "10 Mar 2026",
    readTime: "12 min",
    author: "Milton Catalan",
    content: `
      <p class="mb-6">La Patagonia argentina está viviendo un boom inmobiliario sin precedentes. San Martín de los Andes, en particular, se ha convertido en el destino favorito de inversores de todo el país.</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Factores que impulsan el crecimiento</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Turismo en auge:</strong> El turismo interno e internacional en la región se ha triplicado en la última década.</li>
        <li><strong>Escasez de oferta:</strong> La demanda supera ampliamente la oferta disponible.</li>
        <li><strong>Inversiones en infraestructura:</strong> Nuevas rutas, mejoras en servicios y desarrollo de centros turísticos.</li>
        <li><strong>Cambio de estilo de vida:</strong> La pandemia aceleró el fenómeno de personas buscando espacios abiertos y naturaleza.</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Proyecciones futuras</h2>
      <p class="mb-6">Los expertos proyectan que los precios en la región seguirán en ascenso durante los próximos 5-10 años, impulsados por la limitación geográfica (escasez de tierra) y la creciente demanda.</p>
    `
  },
  {
    id: 3,
    title: "Top 7 barrios para invertir en Argentina",
    excerpt: "Las zonas con mayor potencial de rendimiento hoy.",
    category: "Tendencias",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    date: "5 Mar 2026",
    readTime: "6 min",
    author: "Catalan Propiedades",
    content: `
      <p class="mb-6">Elegir la ubicación correcta es fundamental para el éxito de tu inversión inmobiliaria. Aquí te presentamos los barrios con mayor potencial en Argentina, considerando rentabilidad, apreciación y demanda de alquiler.</p>
      
      <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80" alt="San Martín de los Andes" class="w-full h-64 object-cover rounded-xl mb-8" />
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. San Martín de los Andes, Neuquén</h2>
      <p class="mb-6">El boom del turismo en la Patagonia lo convierte en el destino más prometedor del país. Con una appreciateción del 15% anual promedio y alquileres temporales que rentan hasta 8% bruto, lidera el ranking.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Villa La Angostura</h2>
      <p class="mb-6">Complementaria a San Martín, ofrece oportunidades en un entorno más íntimo. Los precios son un 20% menores pero con potencial de crecimiento similar.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Bariloche</h2>
      <p class="mb-6">El destino más consolidado de la Patagonia, con infraestructura desarrollada y demanda estable todo el año.</p>
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Buenos Aires ( Palermo, Belgrano)</h2>
      <p class="mb-6">Zonas premium con alta demanda de alquiler tradicional y potencial de apreciación a largo plazo.</p>
    `
  },
  {
    id: 4,
    title: "Guía completa para comprar tu primera propiedad",
    excerpt: "Todo lo que necesitas saber antes de dar el paso.",
    category: "Guía",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa0?w=1200&q=80",
    date: "1 Mar 2026",
    readTime: "15 min",
    author: "Milton Catalan",
    content: `
      <p class="mb-6">Comprar una propiedad es una de las decisiones financieras más importantes de tu vida. Esta guía te ayudará a navegar el proceso paso a paso.</p>
      
      <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa0?w=1200&q=80" alt="Casa nueva" class="w-full h-64 object-cover rounded-xl mb-8" />
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Preparación financiera</h2>
      <p class="mb-6">Antes de buscar propiedades, asegurate de tener:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Ahorro para la inicial (generalmente 20-30%)</li>
        <li>Historial crediticio saludable</li>
        <li>Estabilidad laboral (mínimo 2 años)</li>
        <li>Reserva para gastos de cierre (3-5% adicional)</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Definir presupuesto</h2>
      <p class="mb-6">Calculá cuánto podés pagar mensualmente. Una regla clásica es que la cuota no supere el 30% de tus ingresos netos.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Buscar propiedades</h2>
      <p class="mb-6">Considerá ubicación, estado de la propiedad, potencial de valorización y facilidad de alquiler si es para inversión.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">4. Negociación y cierre</h2>
      <p class="mb-6">Una vez elegida la propiedad, viene la negociación de precio, firma del boleto y finalmente la escritura.</p>
    `
  },
  {
    id: 5,
    title: "Por qué la Patagonia es el nuevo hotspot inmobiliario",
    excerpt: "Inversores de todo el país miran hacia el sur.",
    category: "Mercado",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    date: "25 Feb 2026",
    readTime: "7 min",
    author: "Milton Catalan",
    content: `
      <p class="mb-6">La Patagonia se ha convertido en el centro de atención para inversores inmobiliarios de todo el país. San Martín de los Andes lidera esta revolución con números que sorprenden al mercado.</p>
      
      <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80" alt="Patagonia" class="w-full h-64 object-cover rounded-xl mb-8" />
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">Números que speak</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Valorización promedio: 15% anual en los últimos 5 años</li>
        <li>Rendimiento de alquiler temporal: hasta 8% bruto anual</li>
        <li>Tasa de ocupación turística: 85% en temporada alta</li>
        <li>Escasez de oferta: 3 propiedades disponibles por cada 100 demandantes</li>
      </ul>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Por qué invierten</h2>
      <p class="mb-6">Los inversores buscan diversificación geográfica, protección contra la inflación y rendimientos superiores a los del mercado tradicional.</p>
    `
  },
  {
    id: 6,
    title: "Estrategias para maximizar tu inversión inmobiliaria",
    excerpt: "Cómo sacarle el mayor provecho a tu capital.",
    category: "Inversiones",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c7d910?w=1200&q=80",
    date: "20 Feb 2026",
    readTime: "5 min",
    author: "Milton Catalan",
    content: `
      <p class="mb-6">Conoce las estrategias que los inversores experimentados usan para maximizar sus retornos en el mercado inmobiliario.</p>
      
      <img src="https://images.unsplash.com/photo-1560448204-e02f11c7d910?w=1200&q=80" alt="Inversión" class="w-full h-64 object-cover rounded-xl mb-8" />
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Compra undervalued, vende en valor</h2>
      <p class="mb-6">Busca propiedades que necesiten mejoras menores. La diferencia entre el precio de compra y el valor de mercado post-renaovación es tu ganancia.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Airbnb vs tradicional</h2>
      <p class="mb-6">El alquiler temporal puede generar 40-60% más ingresos que el tradicional, aunque requiere más gestión.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Diversificación por zonas</h2>
      <p class="mb-6">No pongas todos los huevos en la misma canasta. Distribuye inversiones entre diferentes zonas y tipos de propiedad.</p>
    `
  },
  {
    id: 7,
    title: "Sectores emergentes en la Patagonia que debes conocer",
    excerpt: "Nuevas zonas de inversión en auge.",
    category: "Tendencias",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    date: "18 Feb 2026",
    readTime: "4 min",
    author: "Catalan Propiedades",
    content: `
      <p class="mb-6">Más allá de San Martín de los Andes, hay otras zonas en plena expansión que ofrecen oportunidades interesantes.</p>
      
      <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80" alt="Sector emergentes" class="w-full h-64 object-cover rounded-xl mb-8" />
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Chapelco</h2>
      <p class="mb-6">La zona del centro de ski ofrece propiedades de alta gama con demanda constante de alquiler temporario.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Lago Lácar</h2>
      <p class="mb-6">Costas del lago con vista privilegiada, cada vez más demandadas por quienes buscan naturaleza.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Centro cívico</h2>
      <p class="mb-6">Zona en desarrollo con precios accesibles y gran potencial de apreciación.</p>
    `
  },
  {
    id: 8,
    title: "Crédito hipotecario: Opciones disponibles en Argentina",
    excerpt: "Comparativa de opciones de financiamiento.",
    category: "Guía",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    date: "15 Feb 2026",
    readTime: "9 min",
    author: "Catalan Propiedades",
    content: `
      <p class="mb-6">El financiamiento es clave para muchos compradores. Conoce las opciones disponibles en Argentina para comprar tu propiedad.</p>
      
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" alt="Crédito hipotecario" class="w-full h-64 object-cover rounded-xl mb-8" />
      
      <h2 class="text-2xl font-semibold mt-8 mb-4">1. Banco Nación - Crédito UVA</h2>
      <p class="mb-6">Una de las opciones más populares. Ajusta capital por UVA (Unidad de Valor Adquisitivo), lo que sigue a la inflación. Cuotas que starts en 25% del ingreso familiar.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">2. Bancos privados</h2>
      <p class="mb-6">HSBC, Santander, Macro ofrecen créditos con tasasfixas o variables. Generalmente requieren mayor ingreso y buen score crediticio.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">3. Créditos prendarios</h2>
      <p class="mb-6">Para comprar propiedad con terreno o construir, hay opciones de financieras con plazos de hasta 20 años.</p>

      <h2 class="text-2xl font-semibold mt-8 mb-4">Requisitos típicos</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Antigüedad laboral mínima de 2 años</li>
        <li>Ingresos demostrables</li>
        <li>No tener antecedentes financieros negativos</li>
        <li>Ahorro para inicial (20-30%)</li>
      </ul>
    `
  }
];

export default function BlogPost() {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline">Volver al blog</Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(a => a.id !== article.id && (a.category === article.category || Math.random() > 0.5))
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareText = encodeURIComponent(article.title);

  return (
    <div className="min-h-screen bg-white font-dm">
      <div className="fixed top-20 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gray-800">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto w-full">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              ← Volver al blog
            </Link>
            <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-semibold text-white font-jakarta leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">
                {article.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{article.author}</p>
              <p className="text-sm text-gray-500">{article.date} · {article.readTime} de lectura</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">Compartir:</span>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Compartir en Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Compartir en Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Compartir por WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </div>

        <div 
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 font-jakarta">Artículos relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(related => (
                <Link 
                  key={related.id}
                  to={`/blog/${related.id}`}
                  className="group"
                >
                  <div className="relative h-40 overflow-hidden rounded-xl mb-4 bg-gray-200">
                    <ImageWithSkeleton
                      src={related.image}
                      alt={related.title}
                      className="rounded-xl"
                      aspectRatio="aspect-[4/3]"
                    />
                    <span className="absolute top-2 left-2 px-2 py-1 bg-white/95 rounded-full text-xs font-medium">
                      {related.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{related.readTime} de lectura</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-50 border-t border-gray-200 py-12 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">¿Querés saber más sobre inversiones?</h2>
          <p className="text-gray-500 mb-6">Nuestro equipo está disponible para ayudarte a encontrar la mejor opción.</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/contacto"
              className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Contactanos
            </Link>
            <Link
              to="/inversiones"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Ver inversiones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
