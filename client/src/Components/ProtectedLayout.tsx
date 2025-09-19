import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const ProtectedLayout = () => {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedLayout;
