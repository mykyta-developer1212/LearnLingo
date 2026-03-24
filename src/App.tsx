import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Teachers from "./pages/Teachers/Teachers.tsx";
import FavoritesPage from "./pages/Favorites/Favorites.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer autoClose={2500} hideProgressBar />
    </>
  );
}
