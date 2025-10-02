import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user.user_exists ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedLayout;
