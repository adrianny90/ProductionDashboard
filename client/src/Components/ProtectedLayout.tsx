import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedLayout;
