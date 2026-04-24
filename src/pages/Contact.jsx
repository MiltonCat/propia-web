import { useState } from "react";
import emailjs from "@emailjs/browser";

const WHATSAPP_NUMBER = "542944301470";
const EMAIL = "ventascatalanprop@gmail.com";

const INITIAL = { name: "", email: "", phone: "", message: "" };

function validate(data) {
  const errs = {};
  if (!data.name.trim()) errs.name = "El nombre es requerido";
  if (!data.email.trim()) errs.email = "El email es requerido";
  else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = "Ingresá un email válido";
  if (!data.message.trim()) errs.message = "El mensaje es requerido";
  return errs;
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "No proporcionado",
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData(INITIAL);
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const fieldClass = (name) =>
    `w-full border rounded-lg px-4 py-2 outline-none transition focus:ring-2 ${
      errors[name]
        ? "border-red-400 focus:ring-red-200"
        : "border-gray-300 focus:ring-[#FF5A5F] focus:border-[#FF5A5F]"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contáctanos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Estamos aquí para ayudarte
          </h2>
          <p className="text-gray-600 mb-8">
            ¿Tenés alguna pregunta sobre nuestras propiedades o necesitás asesoramiento?
            Escribinos y te contactamos a la brevedad.
          </p>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-4">📍</span>
              <div>
                <p className="font-semibold text-gray-800">Ubicación</p>
                <p className="text-gray-600">San Martín de los Andes, Patagonia</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">📞</span>
              <div>
                <p className="font-semibold text-gray-800">WhatsApp</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF5A5F] hover:underline"
                >
                  +54 294 4301470
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">✉️</span>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[#FF5A5F] hover:underline"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-4">🕐</span>
              <div>
                <p className="font-semibold text-gray-800">Horario de Atención</p>
                <p className="text-gray-600">Lun – Sáb: 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-100 p-8 rounded-lg">

          {/* Success banner */}
          {status === "success" && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <p className="font-semibold text-green-800">¡Mensaje enviado!</p>
                <p className="text-green-700 text-sm">
                  Te contactaremos a la brevedad en <strong>{EMAIL}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Error banner */}
          {status === "error" && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <span className="text-red-500 text-xl">✕</span>
              <div>
                <p className="font-semibold text-red-800">Hubo un error al enviar</p>
                <p className="text-red-700 text-sm">
                  Por favor escribinos directamente a{" "}
                  <a href={`mailto:${EMAIL}`} className="underline">{EMAIL}</a>{" "}
                  o por{" "}
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="underline">
                    WhatsApp
                  </a>.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={fieldClass("name")}
                placeholder="Tu nombre"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={fieldClass("email")}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={fieldClass("phone")}
                placeholder="+54 294 ..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={fieldClass("message")}
                placeholder="¿En qué te podemos ayudar?"
              />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-[#FF5A5F] text-white py-3 rounded-lg font-semibold hover:bg-[#FF385C] transition flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                "Enviar Mensaje"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
