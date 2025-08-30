import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketIndices } from '../../data/mockData';

export const MarketIndices: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {marketIndices.map((index) => (
        <div key={index.name} className="glass-card rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{index.name}</h3>
              <p className="text-2xl font-bold text-foreground">{index.value.toLocaleString()}</p>
            </div>
            <div className={`flex items-center space-x-1 ${
              index.change >= 0 ? 'text-profit' : 'text-loss'
            }`}>
              {index.change >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
              </span>
              <span className="text-xs">
                ({index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};