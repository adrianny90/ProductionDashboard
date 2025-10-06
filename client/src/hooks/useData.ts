const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
type ChartType = string | undefined;
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export const getData = async (chartType: ChartType) => {
  const res = await fetch(`${baseURL}/charts/${chartType}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || "An error occurred while fetching chart data"
    );
  }
  const data = await res.json();
  return data;
};

export const getUsers = async () => {
  const res = await fetch(`${baseURL}/users/all`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || "An error occurred while fetching users"
    );
  }
  const data = await res.json();
  return data;
};

export const updateUsers = async (id: string, payload: User) => {
  const res = await fetch(`${baseURL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while updating user");
  }
  const data = await res.json();
  return data;
};
