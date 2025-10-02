import { createContext, type Dispatch, type SetStateAction } from "react";
interface User {
  firstName: string;
  user_exists: boolean;
  role: string;
}
interface AuthContextType {
  user: User;
  setUser: Dispatch<
    SetStateAction<
      | User
      | {
          firstName: "";
          user_exists: false;
          role: "";
        }
    >
  >;
  logOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: {
    firstName: "",
    user_exists: false,
    role: "",
  },
  setUser: () => {},
  logOut: async () => {},
  loading: false,
});
