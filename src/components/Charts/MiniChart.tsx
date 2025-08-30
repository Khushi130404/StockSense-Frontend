import React from 'react';
// import { fetchChartData } from "../services/chartService";

interface MiniChartProps {
  data: Array<{ time: string; price: number }>;
  isPositive: boolean;
}

async function fetchPrediction(ticker) {
  const response = await fetch("http://localhost:8000/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ticker })
  });

  const data = await response.json();
  console.log("Prediction:", data);
  return data;
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, isPositive }) => {
  const maxPrice = Math.max(...data.map(d => d.price));
  const minPrice = Math.min(...data.map(d => d.price));
  const priceRange = maxPrice - minPrice;

  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((maxPrice - d.price) / priceRange) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-16 w-full">
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={isPositive ? 'hsl(var(--profit))' : 'hsl(var(--loss))'}
          strokeWidth="2"
          points={points}
          className="smooth-transition"
        />
        <defs>
          <linearGradient id={`gradient-${isPositive ? 'profit' : 'loss'}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: isPositive ? 'hsl(var(--profit))' : 'hsl(var(--loss))', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: isPositive ? 'hsl(var(--profit))' : 'hsl(var(--loss))', stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <polygon
          fill={`url(#gradient-${isPositive ? 'profit' : 'loss'})`}
          points={`0,100 ${points} 100,100`}
        />
      </svg>
    </div>
  );
};

// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export const MiniChart = ({ ticker }) => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:8001/get_chart_data/${ticker}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setChartData(data.chartData);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChartData();
//   }, [ticker]);

//   if (loading) {
//     return <div>Loading chart data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <ResponsiveContainer width="100%" height={200}>
//       <LineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="actual" stroke="#8884d8" />
//         <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// export const MiniChart = ({ ticker }) => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://localhost:8001/get_chart_data/${ticker}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setChartData(data.chartData);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChartData();
//   }, [ticker]);

//   if (loading) {
//     return <div>Loading chart data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <ResponsiveContainer width="100%" height={200}>
//       <LineChart data={chartData}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="actual" stroke="#8884d8" />
//         <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };