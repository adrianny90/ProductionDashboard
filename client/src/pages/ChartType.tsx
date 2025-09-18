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
import { verifyToken } from "../hooks/auth";

interface ChartData {
  id: string;
  temperature: number;
  humidity: number;
  pressure: number;
  time_stamp: string | Date;
}

interface ParsedChartData {
  time_stamp: Date;
  id: string;
  temperature: number;
  humidity: number;
  pressure: number;
}

// const data1 = [
//   { name: "CO2 Emissions (t)", value: 10 },
//   { name: "Energy Consumption (MWh)", value: 14 },
//   { name: "Solid Waste (t)", value: 16 },
//   { name: "Water Usage (m³)", value: 21 },
//   { name: "NOx Emissions (kg)", value: 39 },
// ];

const ChartType = () => {
  const { chartType } = useParams();
  const [fetchData, setFetchData] = useState<ChartData[] | undefined>(
    undefined
  );
  const navigate = useNavigate();

  // console.log("typy chartow", chartType);
  useEffect(() => {
    setFetchData(undefined);
    const fetchAsyncData = async () => {
      const verify = await verifyToken();
      if (!verify) {
        navigate("/");
        throw Error("Verification failed");
      } else {
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

        setFetchData(parsedData);
      }
    };
    fetchAsyncData();
  }, [chartType]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8284d8"];
  // console.log(fetchData, "fetch");

  if (!fetchData) {
    return <div>Waiting for data...</div>;
  }

  if (chartType === "bar") {
    return (
      <div className="h-dvh w-4xl">
        <p className="text-center items-center text-3xl text-gray-700">
          Raw material status
        </p>
        <ResponsiveContainer width="100%" height="50%">
          <BarChart
            width={500}
            height={300}
            data={fetchData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time_stamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="steel"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="lubricant"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
            <Bar
              dataKey="anti_corrosion_Coating"
              fill="#d4d884"
              activeBar={<Rectangle fill="red" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  if (chartType === "line") {
    return (
      <div className="h-dvh w-4xl">
        <p className="text-center items-center text-3xl text-gray-700">
          Environmental conditions
        </p>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart
            width={500}
            height={300}
            data={fetchData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time_stamp" />
            <YAxis />
            <Tooltip />
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
      </div>
    );
  }
  if (chartType === "pie") {
    return (
      <div className="h-dvh w-4xl">
        <p className="text-center items-center text-3xl text-gray-700">
          Environmental impact
        </p>
        <ResponsiveContainer width="90%" height="50%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={fetchData}
              cx="50%"
              cy="50%"
              outerRadius={100}
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
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return <div> Unknown chart</div>;
  }
};

export default ChartType;
