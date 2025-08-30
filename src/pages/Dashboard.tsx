import React, { useState } from "react";
import { Header } from "../components/Dashboard/Header";
import { MarketIndices } from "../components/Dashboard/MarketIndices";
import { PortfolioGrid } from "../components/Dashboard/PortfolioGrid";
import { AIInsights } from "../components/Dashboard/AIInsights";
import { Footer } from "../components/Common/Footer";
import { MiniChart } from "../components/Charts/MiniChart";

function Dashboard() {
  const [ticker, setTicker] = useState("AAPL"); // State to hold the selected ticker

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-sans flex flex-col items-center p-4">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold mb-4">Stock Chart: {ticker}</h1>
              <MiniChart ticker={ticker} />
            </div>
            <MarketIndices />
            <PortfolioGrid />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <AIInsights ticker={ticker} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
