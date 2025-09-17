const baseURL = `${import.meta.env.VITE_API_BASE_URL}/charts`;
type ChartType = string | undefined;

export const getData = async (chartType: ChartType) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${baseURL}/${chartType}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while fetching data");
  }

  const data = await res.json();
  console.log("Response", data);
  return data;
};
