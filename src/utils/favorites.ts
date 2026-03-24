import type { Teacher } from "../types/teacher";

export const getFavorites = (): Teacher[] => {
  const saved = localStorage.getItem("favoriteTeachers");
  return saved ? JSON.parse(saved) : [];
};

export const toggleFavoriteStorage = (teacher: Teacher): Teacher[] => {
  const favorites = getFavorites();

  const exists = favorites.find((t) => t.id === teacher.id);

  const updated = exists
    ? favorites.filter((t) => t.id !== teacher.id)
    : [...favorites, teacher];

  localStorage.setItem("favoriteTeachers", JSON.stringify(updated));

  return updated;
};