import style from "./TutorStats.module.css";

export default function TutorStats() {
  return (
    <div className={style.containerTutorStats}>
      <div className={style.wrapperTutorStats}>
        <svg
          viewBox="0 0 1312 142"
          preserveAspectRatio="none"
          className={style.border}
        >
          <path
            d="
      M 31 1
      H 1281
      A 30 30 0 0 1 1311 31
      V 111
      A 30 30 0 0 1 1281 141
      H 31
      A 30 30 0 0 1 1 111
      V 31
      A 30 30 0 0 1 31 1
      Z
    "
            fill="none"
            stroke="#f4c550"
            strokeWidth="2"
            strokeDasharray="16 15"
            strokeLinecap="butt"
          />
        </svg>
        <ul className={style.list}>
          <li>
            <span>32,000 +</span>
            <p>
              Experienced <br />
              tutors
            </p>
          </li>
          <li>
            <span>300,000 +</span>
            <p>
              5-star tutor <br />
              reviews
            </p>
          </li>
          <li>
            <span>120 +</span>
            <p>
              Subjects <br />
              taught
            </p>
          </li>
          <li>
            <span>200 +</span>
            <p>
              Tutor <br />
              nationalities
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
