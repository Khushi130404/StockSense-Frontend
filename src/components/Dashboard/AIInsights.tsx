import React from 'react';
import { Brain, TrendingUp, TrendingDown, Minus, Target, Shield } from 'lucide-react';
import { aiInsights } from '../../data/mockData';

export const AIInsights: React.FC = () => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'BUY':
        return <TrendingUp className="h-4 w-4 text-profit" />;
      case 'SELL':
        return <TrendingDown className="h-4 w-4 text-loss" />;
      default:
        return <Minus className="h-4 w-4 text-warning" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY':
        return 'text-profit border-profit/20 bg-profit/5';
      case 'SELL':
        return 'text-loss border-loss/20 bg-loss/5';
      default:
        return 'text-warning border-warning/20 bg-warning/5';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">AI Trading Insights</h2>
      </div>

      <div className="space-y-3">
        {aiInsights.map((insight) => (
          <div key={insight.symbol} className="glass-card rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{insight.symbol}</h3>
                <p className="text-sm text-muted-foreground">{insight.timeFrame}</p>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getActionColor(insight.action)}`}>
                {getActionIcon(insight.action)}
                <span className="text-sm font-medium">{insight.action}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        insight.confidence >= 80 ? 'bg-profit' : 
                        insight.confidence >= 60 ? 'bg-warning' : 'bg-loss'
                      }`}
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{insight.confidence}%</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{insight.reason}</p>

              {insight.targetPrice && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Target</span>
                  </div>
                  <span className="text-sm font-medium text-profit">₹{insight.targetPrice}</span>
                </div>
              )}

              {insight.stopLoss && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Stop Loss</span>
                  </div>
                  <span className="text-sm font-medium text-loss">₹{insight.stopLoss}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-foreground mb-3">Auto-Trading Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Auto-Trading</span>
            <button className="theme-toggle bg-secondary">
              <span className="theme-toggle-thumb bg-primary translate-x-0"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Daily Limit</span>
            <span className="text-sm font-medium text-foreground">₹50,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk Level</span>
            <span className="text-sm font-medium text-warning">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// // ... in your AIInsights.jsx file
// import React, { useEffect, useState } from 'react';
// import forecastServices from '../../services/model_services';
// // ... other imports

// export const AIInsights = ({ ticker }) => {
//   const [insights, setInsights] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {
//     const fetchInsights = async () => {
//       try {
//         setLoading(true);
//         // const response = await fetch(`http://localhost:8001/get_chart_data/${ticker}`);
//         // const data = await response.json();

//         // Filter the chart data to find 'buy' or 'sell' signals
//         const data = await forecastServices.getForecastChartData(ticker);
//         const filteredInsights = data.chartData
//           .filter(d => d.signal === 'buy' || d.signal === 'sell')
//           // Map to a format suitable for your component
//           .map(d => ({
//             symbol: ticker.toUpperCase(),
//             timeFrame: 'Daily',
//             action: d.signal.toUpperCase(),
//             confidence: 85, // Use a static value for now
//             reason: `AI detected a signal on ${d.date}.`,
//             targetPrice: d.predicted,
//             stopLoss: null,
//           }));
//         setInsights(filteredInsights);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInsights();
//   }, [ticker]);

//   if (loading) return <div>Loading insights...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="space-y-4">
//       {/* ... rest of your component logic */}
//       <div className="space-y-3">
//         {insights.map((insight, index) => (
//           // Use the `insight` object to render the card
//           <div key={index} className="glass-card rounded-lg p-4">
//             {/* ... render card content using insight.symbol, insight.action, etc. */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };