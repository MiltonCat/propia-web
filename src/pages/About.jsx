export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Sobre Nosotros</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
            alt="Our team"
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Más de 20 años de experiencia
          </h2>
          <p className="text-gray-600 mb-4">
            PropIA es una inmobiliaria líder en el mercado peruano, fundada con la misión de 
            ayudar a las familias a encontrar el hogar de sus sueños. Con más de dos décadas de experiencia 
            en el mercado inmobiliario de Lima, hemos ayudado a más de 2,000 familias a encontrar 
            la propiedad perfecta.
          </p>
          <p className="text-gray-600">
            Nuestro equipo está compuesto por profesionales altamente capacitados que te 
            asesorarán en cada paso del proceso de compra o alquiler de tu propiedad.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
          <p className="text-gray-700 font-semibold">Propiedades Vendidas</p>
        </div>
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-4xl font-bold text-blue-600 mb-2">20+</p>
          <p className="text-gray-700 font-semibold">Años de Experiencia</p>
        </div>
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-4xl font-bold text-blue-600 mb-2">98%</p>
          <p className="text-gray-700 font-semibold">Clientes Satisfechos</p>
        </div>
      </div>
    </div>
  );
}