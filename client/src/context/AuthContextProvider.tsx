// import { createContext, useEffect, useState, type ReactNode } from "react";
// import { type Dispatch, type SetStateAction } from "react";
// import { signOut, me } from "../hooks/auth";
// // poprawic typescript
// interface AuthContextType {
//   user: string | null;
//   setUser: Dispatch<SetStateAction<String | null>>;
//   logOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   setUser: () => {},
//   logOut: async () => {},
// });

// const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<String | null>(null);
//   console.log("User: ", user);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const userData = await me();
//         setUser(userData);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUser();
//   }, []);

//   const logOut = async () => {
//     try {
//       await signOut(); //Cookie will be deleted
//       setUser(null); //User data will be deleted
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const values = {
//     // user,
//     // setUser,
//     logOut,
//   };

//     return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;

// };

// export { AuthContextProvider, AuthContext };
