import { useEffect, useState } from "react";
import TeachersCard from "./TeachersCard/TeachersCard";
import style from "./TeachersList.module.css";
import type { Teacher } from "../types/teacher";
import { db } from "../firebase/firebase";
import { ref, onValue } from "firebase/database";

type FiltersState = {
  language: string;
  level: string;
  price: string;
};

type Props = {
  filters: FiltersState;
  onContact: (teacher: Teacher) => void;
};

export default function TeachersList({ filters, onContact }: Props) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem("favoriteTeachers");
    return saved ? JSON.parse(saved) : [];
  });

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const teachersRef = ref(db, "/");

    const unsubscribe = onValue(
      teachersRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const teachersArray: Teacher[] = Object.entries(data).map(
            ([id, value]) => ({
              id,
              ...(value as Omit<Teacher, "id">),
            })
          );

          setTeachers(teachersArray);
        } else {
          setTeachers([]);
        }

      },

    );

    return () => unsubscribe();
  }, []);

  const toggleFavorite = (teacher: Teacher) => {
    const exists = favorites.find((t) => t.id === teacher.id);

    const updated = exists
      ? favorites.filter((t) => t.id !== teacher.id)
      : [...favorites, teacher];

    localStorage.setItem("favoriteTeachers", JSON.stringify(updated));
    setFavorites(updated);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const languageMatch = filters.language
      ? teacher.languages?.includes(filters.language)
      : true;

    const levelMatch = filters.level
      ? teacher.levels?.includes(filters.level)
      : true;

    const priceMatch = filters.price
      ? teacher.price_per_hour === Number(filters.price.replace(" $", ""))
      : true;

    return languageMatch && levelMatch && priceMatch;
  });

  const showMore = () => setVisibleCount((prev) => prev + 4);

  return (
    <div>
      <div className={style.cardWrapper}>
        {filteredTeachers.slice(0, visibleCount).map((teacher) => (
          <TeachersCard
            key={teacher.id}
            teacher={teacher}
            onContact={onContact}
            selectedLevel={filters.level}

            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.some((t) => t.id === teacher.id)}
          />
        ))}
      </div>

      {visibleCount < filteredTeachers.length && (
        <div className={style.loadMoreWrapper}>
          <button className={style.loadMoreBtn} onClick={showMore}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}