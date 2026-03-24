import style from "./Hero.module.css";
import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className={style.heroContainer}>
        <div className={style.hero}>
          <div className={style.heroInfo}>
            <h1>Unlock your potential with the best <span>language</span> tutors</h1>
            <p>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
            <NavLink to="/teachers" className={style.heroButton}>Get started</NavLink>
          </div>

          <img src="./images/HeroImage.png" alt="HeroImage"></img>
        </div>
      </div>
    </>
  )
}
