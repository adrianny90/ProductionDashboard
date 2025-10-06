import React from "react";
import {
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface State {
  data: { value: number; index: number }[];
  count: number;
  ws?: WebSocket;
  interval?: null;
}

class ChartWS extends React.Component {
  state: State = {
    data: [],
    count: 0,
    ws: undefined,
    interval: null,
  };

  componentDidMount() {
    const ws = new WebSocket(`${import.meta.env.VITE_API_BASE_URL}/ws`);
    ws.onmessage = this.onMessage;

    this.setState({
      ws: ws,
      interval: setInterval(() => ws.send("echo"), 1000),
    });
  }

  componentWillUnmount() {
    const { ws, interval } = this.state;
    if (ws) {
      ws.close();
    }
    if (interval) {
      clearInterval(interval);
    }
  }

  onMessage = (ev: MessageEvent) => {
    const recv = JSON.parse(ev.data);
    const { data, count } = this.state;
    let newData = [...data];
    if (count > 20) {
      newData = newData.slice(1);
    }
    newData.push({ value: recv.value, index: count });
    this.setState({ data: newData, count: count + 1 });
  };

  render() {
    return (
      <div className="min-h-screen bg-gray-100 font-sans flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Real time production capacity
          </h1>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart width={900} height={600} data={this.state.data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#33ff33" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#33ff33" stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <XAxis dataKey="index" />
              <YAxis />
              <CartesianGrid stroke="#666" strokeDasharray="5 5" />
              <Area
                name="production capacity in %"
                type="monotone"
                dataKey="value"
                stroke="#91003d "
                fill="url(#colorValue)"
                isAnimationActive={true}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fffe",
                  border: "1px solid #f5f7eb",
                  borderRadius: "4px",
                }}
              />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default ChartWS;
