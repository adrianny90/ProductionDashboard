import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { signOut, me } from "../hooks/auth";
interface User {
  firstName: string;
  user_exists: boolean;
  role: string;
}
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    firstName: "",
    user_exists: false,
    role: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await me();

        if (userData.user_exists) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const logOut = async () => {
    try {
      await signOut();
      setUser({ firstName: "", user_exists: false, role: "" });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const values = {
    user,
    setUser,
    logOut,
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
