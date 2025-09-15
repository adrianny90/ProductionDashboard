const baseURL = "http://localhost:8000/charts";
type ChartType = string | undefined;

export const getData = async (chartType: ChartType) => {
  const res = await fetch(`${baseURL}/${chartType}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "An error occurred while fetching data");
  }

  const data = await res.json();
  console.log("Response", data);
  return data;
};
