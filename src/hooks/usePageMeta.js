import { useEffect } from "react";

const DEFAULTS = {
  title: "Catalán Propiedades - Venta y Alquiler de Propiedades",
  description: "Encontrá las mejores propiedades en San Martín de los Andes, Patagonia.",
  image: "/marca1.png",
};

function setMetaProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, image, url } = {}) {
  useEffect(() => {
    const resolvedTitle = title || DEFAULTS.title;
    const resolvedDesc = description || DEFAULTS.description;
    const resolvedImage = image || DEFAULTS.image;
    const resolvedUrl = url || window.location.href;

    document.title = resolvedTitle;

    setMetaProperty("og:title", resolvedTitle);
    setMetaProperty("og:description", resolvedDesc);
    setMetaProperty("og:image", resolvedImage);
    setMetaProperty("og:url", resolvedUrl);
    setMetaProperty("og:type", "website");

    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", resolvedTitle);
    setMetaName("twitter:description", resolvedDesc);
    setMetaName("twitter:image", resolvedImage);
    setMetaName("description", resolvedDesc);

    return () => {
      document.title = DEFAULTS.title;
      setMetaProperty("og:title", DEFAULTS.title);
      setMetaProperty("og:description", DEFAULTS.description);
      setMetaProperty("og:image", DEFAULTS.image);
      setMetaName("twitter:title", DEFAULTS.title);
      setMetaName("twitter:description", DEFAULTS.description);
      setMetaName("description", DEFAULTS.description);
    };
  }, [title, description, image, url]);
}
