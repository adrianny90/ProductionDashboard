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
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/users`;
export const signUp = async (formData: FormData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  console.log(formData, "formdata");
  console.log("Response", res);
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
  });
  console.log(loginData, "logindata");
  console.log("Response", res);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }

  const data = await res.json();
  return data;
};
