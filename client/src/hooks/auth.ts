// import { v4 as uuidv4 } from 'uuid';
interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
const baseURL = "http://localhost:8000/users";
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
