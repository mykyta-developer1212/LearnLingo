import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, openLoginModal } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    openLoginModal(); 
    return <Navigate to="/" replace />;
  }

  return children;
}