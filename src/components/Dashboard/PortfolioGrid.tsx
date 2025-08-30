import React from 'react';
import { StockCard } from './StockCard';
import { mockPortfolio } from '../../data/mockData';

export const PortfolioGrid: React.FC = () => {
  const totalPnL = mockPortfolio.reduce((sum, stock) => sum + stock.totalPnL, 0);
  const totalDayPnL = mockPortfolio.reduce((sum, stock) => sum + stock.dayPnL, 0);
  const totalInvestment = mockPortfolio.reduce((sum, stock) => sum + (stock.purchasePrice * stock.quantity), 0);
  const totalPnLPercent = (totalPnL / totalInvestment) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Portfolio Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Investment</p>
            <p className="text-lg font-semibold text-foreground">₹{totalInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="text-lg font-semibold text-foreground">₹{(totalInvestment + totalPnL).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Today's P&L</p>
            <p className={`text-lg font-semibold ${totalDayPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
              {totalDayPnL >= 0 ? '+' : ''}₹{totalDayPnL.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total P&L</p>
            <div>
              <p className={`text-lg font-semibold ${totalPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
                {totalPnL >= 0 ? '+' : ''}₹{totalPnL.toLocaleString()}
              </p>
              <p className={`text-sm ${totalPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
                ({totalPnL >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">My Holdings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPortfolio.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
};