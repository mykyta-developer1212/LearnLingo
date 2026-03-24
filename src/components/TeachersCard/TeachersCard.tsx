import { useState } from "react";
import type { Teacher } from "../../types/teacher";
import style from "./TeachersCard.module.css";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";

type Props = {
  teacher: Teacher;
  onContact: (teacher: Teacher) => void;
  selectedLevel: string;
  
  onToggleFavorite: (teacher: Teacher) => void;
  isFavorite: boolean;
};

export default function TeachersCard({
  teacher,
  onContact,
  selectedLevel,
  onToggleFavorite,
  isFavorite,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { user, openLoginModal } = useAuth();

  return (
    <article className={style.articles}>
      <div className={style.card}>
        <div className={style.cardWrapper}>
          
          <div className={style.teacherAvatarWrapper}>
            <img
              className={style.teacherAvatar}
              src={teacher.avatar_url}
              alt={teacher.name}
            />
          </div>

          <div className={style.teacherContent}>
            <header className={style.cardHeader}>
              
              <div className={style.tutorHeader}>
                <h3>Languages</h3>
                <h2>
                  {teacher.name} {teacher.surname}
                </h2>
              </div>

              <ul className={style.teacherStatistic}>
                <li className={style.itemLesson}>
                  <svg width="16" height="16">
                  <use href="/images/teacherslogo.svg#icon-book-open"></use>
                </svg>
                  <span>Lessons online</span>
                </li>

                <li>
                  <span>Lessons done: {teacher.lessons_done}</span>
                </li>

                <li className={style.itemRating}>
                  <svg className={style.iconStar}>
                            <use href="/images/teacherslogo.svg#icon-star"></use>
                          </svg>
                  <span>Rating: {teacher.rating}</span>
                </li>

                <li>
                  <span>
                    Price / 1 hour:{" "}
                    <span className={style.thirtyMoneyValue}>
                      {teacher.price_per_hour}$
                    </span>
                  </span>
                </li>
              </ul>

              <div
                className={style.heartWrapper}
                onClick={() => {
                  if (!user) {
                    toast.info(
                      "The feature is only available to registered users",
                    );
                    openLoginModal();
                    return;
                  }
                  onToggleFavorite(teacher);
                }}
              >
                <svg
                  width="26"
                  height="26"
                  className={`${style.iconHeart} ${
                    isFavorite ? style.activeHeart : ""
                  }`}
                >
                  <use href="/images/teacherslogo.svg#icon-heart"></use>
                </svg>
              </div>
            </header>

            <div className={style.teacherInfo}>
              <ul>
                <li>
                  <span className={style.infoLabel}>Speaks:</span>{" "}
                  <span className={style.infoValue}>
                    {teacher.languages.join(", ")}
                  </span>
                </li>

                <li>
                  <span className={style.infoLabel}>Lesson Info:</span>{" "}
                  <span className={style.infoValue}>
                    {teacher.lesson_info}
                  </span>
                </li>

                <li>
                  <span className={style.infoLabel}>Conditions:</span>{" "}
                  <span className={style.infoValue}>
                    {teacher.conditions.join(" ")}
                  </span>
                </li>
              </ul>

              {!isOpen && (
                <button
                  className={style.readMoreBtn}
                  onClick={() => setIsOpen(true)}
                >
                  Read more
                </button>
              )}

              {isOpen && (
                <>
                  <p className={style.experienceInfo}>
                    {teacher.experience}
                  </p>

                  <ul className={style.reviewList}>
                    {teacher.reviews.map((review, index) => (
                      <li key={index} className={style.reviewItem}>
                        <span className={style.reviewName}>
                          {review.reviewer_name}
                        </span>

                        <div className={style.ratingWrapper}>
                          <svg className={style.iconStar}>
                            <use href="/images/teacherslogo.svg#icon-star"></use>
                          </svg>
                          <span>{teacher.rating}</span>
                        </div>

                        <p className={style.commentReview}>
                          {review.comment}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <ul className={style.teacherLevelList}>
                {teacher.levels.map((level, index) => {
                  const isActive = level === selectedLevel;

                  return (
                    <li
                      key={index}
                      className={`${style.teacherLevel} ${
                        isActive ? style.activeLevel : ""
                      }`}
                    >
                      #{level}
                    </li>
                  );
                })}
              </ul>

              {isOpen && (
                <button
                  className={style.bookLessonBtn}
                  onClick={() => {
                    onContact(teacher);
                  }}
                >
                  Book trial lesson
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}