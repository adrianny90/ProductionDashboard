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

export const signUp = async (formData: FormData) => {
  const res = await fetch(`${baseURL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
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
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while signing in");
  }
  const data = await res.json();
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
    throw new Error(errorData.error || "An error occurred while signing in");
  }
  const data = await res.json();
  return data;
};
