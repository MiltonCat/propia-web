import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Inversiones from "./pages/Inversiones";
import Toast from "./components/Toast";
import ChatBot from "./components/ChatBot";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const CentroAyuda = lazy(() => import("./pages/CentroAyuda"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Prensa = lazy(() => import("./pages/Prensa"));
const Terminos = lazy(() => import("./pages/Terminos"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-[#FF5A5F] rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const [showToast, setShowToast] = useState(true);

  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/propiedades" element={<Properties />} />
                <Route path="/alquileres" element={<Properties />} />
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
            </Suspense>
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
          <ChatBot />
          <ScrollToTop />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;