import React, { useEffect, useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Shield,
} from "lucide-react";

export const AIInsights = ({ ticker }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        // const response = await fetch(`http://localhost:8001/get_chart_data/${ticker}`);
        const response = await fetch(
          `http://localhost:8001/forecast_chart_data/${ticker}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch insights");
        }
        const data = await response.json();

        const filteredInsights = data.chartData
          .filter((d) => d.signal === "buy" || d.signal === "sell")
          .map((d) => ({
            symbol: ticker.toUpperCase(),
            timeFrame: "Daily",
            action: d.signal.toUpperCase(),
            confidence: 85,
            reason: `AI detected a signal based on price and sentiment.`,
            targetPrice: d.predicted,
            stopLoss: null,
          }));

        setInsights(filteredInsights);
      } catch (e) {
        console.error("Fetch error:", e);
        setError("Error: Could not retrieve insights.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [ticker]);

  const getActionIcon = (action) => {
    switch (action) {
      case "BUY":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "SELL":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case "BUY":
        return "text-green-500 border-green-500/20 bg-green-500/5";
      case "SELL":
        return "text-red-500 border-red-500/20 bg-red-500/5";
      default:
        return "text-gray-500 border-gray-500/20 bg-gray-500/5";
    }
  };

  if (loading)
    return <div className="p-4 text-center">Loading insights...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-bold">AI Trading Insights</h2>
      </div>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{insight.symbol}</h3>
                <p className="text-sm text-gray-500">{insight.timeFrame}</p>
              </div>
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getActionColor(
                  insight.action
                )}`}
              >
                {getActionIcon(insight.action)}
                <span className="text-sm font-medium">{insight.action}</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">{insight.reason}</p>
              {insight.targetPrice && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-500">Target</span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    ₹{insight.targetPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
