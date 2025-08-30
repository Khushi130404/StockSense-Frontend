import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const MiniChart = ({ ticker }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`http://localhost:8001/get_chart_data/${ticker}`);
        const response = await fetch(
          `http://localhost:8001/forecast_chart_data/${ticker}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setChartData(data.chartData);
      } catch (e) {
        console.error("Fetch error:", e);
        setError("Error: Could not retrieve chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [ticker]);

  if (loading) {
    return <div className="p-4 text-center">Loading chart...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="predicted"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="signal"
          stroke="transparent"
          dot={({ cx, cy, stroke, payload }) => {
            if (payload.signal) {
              const color = payload.signal === "buy" ? "green" : "red";
              return (
                <g>
                  <circle cx={cx} cy={cy} r={6} fill={color} />
                  <title>
                    {payload.signal.toUpperCase()} Signal: {payload.date}
                  </title>
                </g>
              );
            }
            return null;
          }}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
