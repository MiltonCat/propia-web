import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Inversiones from "./pages/Inversiones";
import CentroAyuda from "./pages/CentroAyuda";
import BlogPost from "./pages/BlogPost";
import Prensa from "./pages/Prensa";
import Terminos from "./pages/Terminos";
import Toast from "./components/Toast";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  const [showToast, setShowToast] = useState(true);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades" element={<Properties />} />
            <Route path="/propiedades/:id" element={<PropertyDetail />} />
            <Route path="/inversiones" element={<Inversiones />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/centro-ayuda" element={<CentroAyuda />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/prensa" element={<Prensa />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {showToast && (
          <Toast
            message="¿Buscando propiedades en la Patagonia? Tenemos las mejores opciones para vos."
            linkText="Ver propiedades"
            link="/propiedades"
            onClose={() => setShowToast(false)}
          />
        )}
        <WhatsAppFloat />
        <ChatBot />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;