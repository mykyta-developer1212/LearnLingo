import { useEffect, useState } from "react";
import TeachersFilter from "../../components/TeachersFilter/TeachersFilter";
import TeachersCard from "../../components/TeachersCard/TeachersCard";
import Modal from "../../components/Modal/Modal";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import type { Teacher } from "../../types/teacher";
import style from "./Favorites.module.css";

type FiltersState = {
  language: string;
  level: string;
  price: string;
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem("favoriteTeachers");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const [filters, setFilters] = useState<FiltersState>({
    language: "",
    level: "",
    price: "",
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("favoriteTeachers");
      setFavorites(saved ? JSON.parse(saved) : []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleFavorite = (teacher: Teacher) => {
    const exists = favorites.find((t) => t.id === teacher.id);

    const updated = exists
      ? favorites.filter((t) => t.id !== teacher.id)
      : [...favorites, teacher];

    localStorage.setItem("favoriteTeachers", JSON.stringify(updated));
    setFavorites(updated);
  };

  const filtered = favorites.filter((t) => {
    const lang = filters.language
      ? t.languages.includes(filters.language)
      : true;

    const level = filters.level ? t.levels.includes(filters.level) : true;

    const price = filters.price
      ? t.price_per_hour === Number(filters.price.replace(" $", ""))
      : true;

    return lang && level && price;
  });

  if (!favorites.length) return <p>No favorite teachers yet</p>;

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.container}>
            <TeachersFilter filters={filters} setFilters={setFilters}/>
            <div className={style.cardWrapper}>
              {filtered.map((teacher) => (
                <TeachersCard
                  key={teacher.id}
                  teacher={teacher}
                  selectedLevel={filters.level}
                  onContact={setSelectedTeacher}
                  onToggleFavorite={toggleFavorite}
                  isFavorite={favorites.some((t) => t.id === teacher.id)}
                />
              ))}
            </div>

            {selectedTeacher && (
              <Modal onClose={() => setSelectedTeacher(null)}>
                <TeacherModal
                  teacher={selectedTeacher}
                  onClose={() => setSelectedTeacher(null)}
                />
              </Modal>
            )}
          </div>
        </div>
    </>
  );
}
