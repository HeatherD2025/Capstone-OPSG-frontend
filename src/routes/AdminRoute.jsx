import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, isAuthLoading } = useSelector((state) => state.auth);

  if (isAuthLoading) {
    return <p>Loading...</p>;
  }
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
