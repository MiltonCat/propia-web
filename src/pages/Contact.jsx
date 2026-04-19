import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente. Nos pondremos en contacto pronto.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-gray-600 mb-8">
            ¿Tienes alguna pregunta sobre nuestras propiedades o necesitas asesoramiento? 
            Escríbenos y nuestro equipo te contactará en breve.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-4">📍</span>
              <div>
                <p className="font-semibold text-gray-800">Dirección</p>
                <p className="text-gray-600">Av. Principal 123, Lima, Perú</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">📞</span>
              <div>
                <p className="font-semibold text-gray-800">Teléfono</p>
                <p className="text-gray-600">+51 999 999 999</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">✉️</span>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">info@propia.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">🕐</span>
              <div>
                <p className="font-semibold text-gray-800">Horario de Atención</p>
                <p className="text-gray-600">Lun - Sáb: 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}