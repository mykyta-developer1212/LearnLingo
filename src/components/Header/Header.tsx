import { useEffect, useState } from "react";
import style from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Modal from "../Modal/Modal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { subscribeToAuth, logout } from "../../firebase/auth";
import type { User } from "firebase/auth";

export default function Header() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
     const unsubcribe = subscribeToAuth(setUser);
     return () => unsubcribe();
  }, []);
  return (
    <>
      <div className={style.headerContainer}>
        <header className={style.header}>
          <div className={style.logo}>
            <NavLink to="/" className={style.logoWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none"><g clipPath="url(#a)"><path fill="#ffda44" d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14"/><path fill="#338af3" d="M0 14C0 6.268 6.268 0 14 0s14 6.268 14 14"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h28v28H0z"/></clipPath></defs></svg>
            <span className={style.logoText}>LearnLingo</span>
            </NavLink>
          </div>

          <nav>
            <ul className={style.menuList}>
              <NavLink to="/"><li>Home</li></NavLink>
              <NavLink to="/teachers"><li>Teachers</li></NavLink>
            </ul>
          </nav>

          <ul className={style.buttonList}>
            {user ? (

              <li>
                <button onClick={logout} className={style.loginButton}>
                  Logout ({user.email})
                </button>
              </li>
            ) : (

              <div className={style.loginButtonWrapper}>
                <li>
                  <div className={style.logoLoginWrapper}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path stroke="#f4c550" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.5 2.5h1c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C17.5 4.4 17.5 5.1 17.5 6.5v7c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092c-.535.273-1.235.273-2.635.273h-1M8.333 5.833 12.5 10m0 0-4.167 4.167M12.5 10h-10"/></svg>
                  <button
                    className={style.loginButton}
                    onClick={() => setLoginOpen(true)}
                  >
                    
                    Log in
                  </button>
                  </div>
                </li>

                <li>
                  <button
                    className={style.registerButton}
                    onClick={() => setRegisterOpen(true)}
                  >
                    Registration
                  </button>
                </li>
             </div>
            )}
          </ul>
        </header>
      </div>

      {isLoginOpen && (
        <Modal onClose={() => setLoginOpen(false)}>
          <LoginModal onClose={() => setLoginOpen(false)} />
        </Modal>
      )}

      {isRegisterOpen && (
        <Modal onClose={() => setRegisterOpen(false)}>
          <RegisterModal onClose={() => setRegisterOpen(false)} />
        </Modal>
      )}
    </>
  );
}