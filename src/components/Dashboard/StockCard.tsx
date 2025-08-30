import React from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import { Stock } from '../../data/mockData';
import { MiniChart } from '../Charts/MiniChart';

interface StockCardProps {
  stock: Stock;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const isPositive = stock.change >= 0;
  const isProfitable = stock.totalPnL >= 0;

  return (
    <div className="glass-card rounded-lg p-4 hover:shadow-lg smooth-transition chart-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-foreground">{stock.symbol}</h3>
            <button className="text-muted-foreground hover:text-yellow-500 smooth-transition">
              <Star className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">{stock.name}</p>
        </div>
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-profit' : 'text-loss'}`}>
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
      </div>

      <div className="mb-3">
        <MiniChart data={stock.chartData} isPositive={isPositive} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Current Price</span>
          <span className="font-semibold text-foreground">₹{stock.currentPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Purchase Price</span>
          <span className="text-sm text-muted-foreground">₹{stock.purchasePrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Day P&L</span>
          <span className={`text-sm font-medium ${stock.dayPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
            {stock.dayPnL >= 0 ? '+' : ''}₹{stock.dayPnL.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-border">
          <span className="text-sm font-medium text-muted-foreground">Total P&L</span>
          <div className="text-right">
            <span className={`text-sm font-bold ${isProfitable ? 'text-profit' : 'text-loss'}`}>
              {isProfitable ? '+' : ''}₹{stock.totalPnL.toFixed(2)}
            </span>
            <div className={`text-xs ${isProfitable ? 'text-profit' : 'text-loss'}`}>
              ({isProfitable ? '+' : ''}{((stock.totalPnL / (stock.purchasePrice * stock.quantity)) * 100).toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};