// import { v4 as uuidv4 } from 'uuid';
interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface LoginData {
  email: string;
  password: string;
}
const baseURL = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/users`
  : "https://productiondashboardserver.onrender.com/users";

// console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
// console.log("Base URL:", baseURL);

export const signUp = async (formData: FormData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  // console.log(formData, "formdata");
  // console.log("Response", res);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing up");
  }

  const data = await res.json();
  return data;
};

export const signIn = async (loginData: LoginData) => {
  const res = await fetch(`${baseURL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
    credentials: "include",
  });
  // console.log(loginData, "logindata");
  // console.log("Response", res);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }
  const data = await res.json();
  // localStorage.setItem("token", data.access_token);
  // console.log(data, "data log in");
  return data;
};

export const signOut = async () => {
  const res = await fetch(`${baseURL}/signout`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }

  const data = await res.json();
  return data;
};

export const me = async () => {
  const res = await fetch(`${baseURL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    // console.error("Fetch error:", errorData, res.status, res.statusText);
    throw new Error(errorData.error || "An error occurred while signing in");
  }
  const data = await res.json();
  // console.log("me data", data);
  return data;
};

// export const verifyToken = async () => {
//   const token = localStorage.getItem("token");

//   try {
//     const response = await fetch(`${baseURL}/verify-token/${token}`, {
//       method: "POST",
//     });
//     if (!response.ok) {
//       throw Error("Token verification failed");
//     }
//     // console.log(response, "res verify");
//     return true;
//   } catch (error) {
//     localStorage.removeItem("token");
//     window.alert("Token validation failed, please login.");
//     console.error(error);
//   }
// };
