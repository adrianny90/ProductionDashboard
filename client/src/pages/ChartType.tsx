import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Pie,
  PieChart,
  Cell,
} from "recharts";
import { getData } from "../hooks/useData";

interface ChartData {
  id: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  steel?: number;
  lubricant?: number;
  anti_corrosion_Coating?: number;
  time_stamp: string | Date;
  value?: number;
}

interface ParsedChartData {
  time_stamp: Date;
  id: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  steel: number;
  lubricant?: number;
  anti_corrosion_Coating?: number;
  value?: number;
  final_product?: number;
}

const ChartType = () => {
  const { chartType } = useParams();
  const [fetchData, setFetchData] = useState<ChartData[] | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    setFetchData(undefined);
    // console.log(chartType, "chartType");

    const fetchAsyncData = async () => {
      try {
        const data = await getData(chartType);
        const parsedData = data
          .map(
            (item: ChartData) =>
              ({
                ...item,
                time_stamp: new Date(item.time_stamp),
              } as ParsedChartData)
          )
          .sort(
            (a: ParsedChartData, b: ParsedChartData) =>
              a.time_stamp.getTime() - b.time_stamp.getTime()
          )
          .slice(-25);
        if (chartType === "mixBar") {
          const randomFactor = Math.random();
          const calculatedFactor = 15 * randomFactor;
          const dataVisualize = parsedData.map((item: ParsedChartData) => ({
            ...item,
            final_product: (item.steel * (75 - calculatedFactor)) / 100,
          }));
          setFetchData(dataVisualize);
        } else {
          setFetchData(parsedData);
        }
      } catch (error) {
        console.error("Error while fetching chart data:", error);
        navigate("/signin");
      }
    };

    fetchAsyncData();
  }, [chartType, navigate]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8284d8"];
  // console.log(fetchData, "data");

  if (!fetchData) {
    return (
      <div className="min-h-screen bg-black font-sans flex items-center justify-center text-white text-lg">
        Waiting for data...
      </div>
    );
  }

  const chartTitles = {
    bar: "Raw Material Status",
    line: "Environmental Conditions",
    pie: "Environmental Impact",
    mixBar: "Raw Material vs Product",
  };

  return (
    <div className="min-h-fit bg-black  bg-gradient-to-r from-black via-purple-950 to-black font-sans flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl bg-black rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {chartTitles[chartType as keyof typeof chartTitles] ||
            "Unknown Chart"}
        </h1>
        {chartType === "bar" && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={fetchData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time_stamp"
                tickFormatter={(date: Date) => date.toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Bar
                dataKey="steel"
                fill="#8884d8"
                activeBar={<Rectangle fill="#f472b6" stroke="#3b82f6" />}
              />
              <Bar
                dataKey="lubricant"
                fill="#82ca9d"
                activeBar={<Rectangle fill="#facc15" stroke="#9333ea" />}
              />
              <Bar
                name="anti corrosion coating"
                dataKey="anti_corrosion_Coating"
                fill="#d4d884"
                activeBar={<Rectangle fill="#ef4444" stroke="#9333ea" />}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartType === "line" && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={fetchData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time_stamp"
                tickFormatter={(date: Date) => date.toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8284d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="pressure"
                stroke="#d4d884"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        {chartType === "pie" && (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={fetchData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {fetchData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}{" "}
        {chartType === "mixBar" && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={fetchData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time_stamp"
                tickFormatter={(date: Date) => date.toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                }}
              />
              <Legend />
              <Bar
                name="raw steel in tones"
                dataKey="steel"
                fill="#f884d8"
                activeBar={<Rectangle fill="#f472b6" stroke="#3b82f6" />}
              />
              <Bar
                name="final product in tones"
                dataKey="final_product"
                fill="#f2ca9d"
                activeBar={<Rectangle fill="#facc15" stroke="#9333ea" />}
                // <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              />
            </BarChart>
          </ResponsiveContainer>
        )}
        {chartType !== "bar" &&
          chartType !== "line" &&
          chartType !== "pie" &&
          chartType !== "mixBar" && (
            <div className="text-center text-white text-lg">Unknown Chart</div>
          )}
      </div>
    </div>
  );
};

export default ChartType;
