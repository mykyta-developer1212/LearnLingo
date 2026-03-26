import { NavLink, useNavigate } from "react-router-dom";
import style from "./Navigation.module.css";
import { useAuth } from "../../useAuth";
import { toast } from "react-toastify";

export default function Navigation() {
  const { user, openLoginModal } = useAuth();
  const navigate = useNavigate();

  const handleFavoritesClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault(); 
      toast.info("The feature is only available to registered users");
      openLoginModal();
      return;
    }

    navigate("/favorites");
  };

  return (
    <ul className={style.navigationList1}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/favorites" onClick={handleFavoritesClick}>
          Favorites
        </NavLink>
      </li>
    </ul>
  );
}