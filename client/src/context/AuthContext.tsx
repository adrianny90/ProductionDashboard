import { createContext, type Dispatch, type SetStateAction } from "react";

interface AuthContextType {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  logOut: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logOut: async () => {},
  loading: false,
});
