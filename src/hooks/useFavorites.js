import { useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("propiaFavorites") || "[]");
    } catch {
      return [];
    }
  });

  const toggle = (id) => {
    const current = JSON.parse(localStorage.getItem("propiaFavorites") || "[]");
    const updated = current.includes(id)
      ? current.filter((f) => f !== id)
      : [...current, id];
    localStorage.setItem("propiaFavorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const isFavorite = (id) => favorites.includes(id);

  return { favorites, toggle, isFavorite };
}
