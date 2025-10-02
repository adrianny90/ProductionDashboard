const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;
type ChartType = string | undefined;

export const getData = async (chartType: ChartType) => {
  // const token = localStorage.getItem("token");
  const res = await fetch(`${baseURL}/charts/${chartType}`, {
    method: "GET",
    // headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while fetching data");
  }
  const data = await res.json();
  // console.log("Response", data);
  return data;
};

export const getUsers = async () => {
  const res = await fetch(`${baseURL}/users/all`, {
    method: "GET",
    // headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while fetching data");
  }
  const data = await res.json();
  // console.log("Response", data);
  return data;
};
