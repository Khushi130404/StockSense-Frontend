import React from 'react';
import { Header } from '../components/Dashboard/Header';
import { MarketIndices } from '../components/Dashboard/MarketIndices';
import { PortfolioGrid } from '../components/Dashboard/PortfolioGrid';
import { AIInsights } from '../components/Dashboard/AIInsights';
import { Footer } from '../components/Common/Footer';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <MarketIndices />
            <PortfolioGrid />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AIInsights />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;