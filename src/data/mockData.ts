export interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  purchasePrice: number;
  quantity: number;
  change: number;
  changePercent: number;
  dayPnL: number;
  totalPnL: number;
  chartData: Array<{ time: string; price: number }>;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface AIInsight {
  symbol: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  timeFrame: string;
  reason: string;
  targetPrice?: number;
  stopLoss?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  timestamp: string;
  impact: 'positive' | 'negative' | 'neutral';
}

// Mock data for demonstration
export const mockPortfolio: Stock[] = [
  {
    symbol: 'APPLE',
    name: 'Apple Inc',
    currentPrice: 2485.50,
    purchasePrice: 2350.00,
    quantity: 25,
    change: 12.30,
    changePercent: 0.50,
    dayPnL: 307.50,
    totalPnL: 3387.50,
    chartData: [
      { time: '09:15', price: 2473.20 },
      { time: '10:00', price: 2478.90 },
      { time: '11:00', price: 2482.40 },
      { time: '12:00', price: 2485.50 },
      { time: '13:00', price: 2480.20 },
      { time: '14:00', price: 2485.50 }
    ]
  },
  {
    symbol: 'GOOGLE',
    name: 'GOOGL',
    currentPrice: 3542.75,
    purchasePrice: 3680.00,
    quantity: 15,
    change: -8.25,
    changePercent: -0.23,
    dayPnL: -123.75,
    totalPnL: -2058.75,
    chartData: [
      { time: '09:15', price: 3551.00 },
      { time: '10:00', price: 3545.30 },
      { time: '11:00', price: 3542.75 },
      { time: '12:00', price: 3540.20 },
      { time: '13:00', price: 3544.85 },
      { time: '14:00', price: 3542.75 }
    ]
  },
  {
    symbol: 'MICROSOFT',
    name: 'Microsoft Corp',
    currentPrice: 1642.30,
    purchasePrice: 1580.00,
    quantity: 30,
    change: 5.70,
    changePercent: 0.35,
    dayPnL: 171.00,
    totalPnL: 1869.00,
    chartData: [
      { time: '09:15', price: 1636.60 },
      { time: '10:00', price: 1639.85 },
      { time: '11:00', price: 1642.30 },
      { time: '12:00', price: 1644.10 },
      { time: '13:00', price: 1640.75 },
      { time: '14:00', price: 1642.30 }
    ]
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    currentPrice: 1789.45,
    purchasePrice: 1820.00,
    quantity: 20,
    change: -2.85,
    changePercent: -0.16,
    dayPnL: -57.00,
    totalPnL: -611.00,
    chartData: [
      { time: '09:15', price: 1792.30 },
      { time: '10:00', price: 1790.15 },
      { time: '11:00', price: 1789.45 },
      { time: '12:00', price: 1787.20 },
      { time: '13:00', price: 1791.60 },
      { time: '14:00', price: 1789.45 }
    ]
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Limited',
    currentPrice: 1178.90,
    purchasePrice: 1150.00,
    quantity: 40,
    change: 4.20,
    changePercent: 0.36,
    dayPnL: 168.00,
    totalPnL: 1156.00,
    chartData: [
      { time: '09:15', price: 1174.70 },
      { time: '10:00', price: 1176.50 },
      { time: '11:00', price: 1178.90 },
      { time: '12:00', price: 1180.25 },
      { time: '13:00', price: 1177.40 },
      { time: '14:00', price: 1178.90 }
    ]
  },
  {
    symbol: 'WIPRO',
    name: 'Wipro Limited',
    currentPrice: 452.35,
    purchasePrice: 480.00,
    quantity: 50,
    change: -1.25,
    changePercent: -0.28,
    dayPnL: -62.50,
    totalPnL: -1382.50,
    chartData: [
      { time: '09:15', price: 453.60 },
      { time: '10:00', price: 452.85 },
      { time: '11:00', price: 452.35 },
      { time: '12:00', price: 451.70 },
      { time: '13:00', price: 453.10 },
      { time: '14:00', price: 452.35 }
    ]
  }
];

export const marketIndices: MarketIndex[] = [
  {
    name: 'Nifty 50',
    value: 19674.25,
    change: 89.45,
    changePercent: 0.46
  },
  {
    name: 'Sensex',
    value: 65953.48,
    change: 298.67,
    changePercent: 0.45
  },
  {
    name: 'Bank Nifty',
    value: 44521.30,
    change: 156.75,
    changePercent: 0.35
  }
];

export const aiInsights: AIInsight[] = [
  {
    symbol: 'APPLE',
    action: 'BUY',
    confidence: 85,
    timeFrame: '1-3 days',
    reason: 'Strong quarterly results and positive sector outlook',
    targetPrice: 2550.00,
    stopLoss: 2400.00
  },
  {
    symbol: 'GOOGLE',
    action: 'HOLD',
    confidence: 72,
    timeFrame: '1-2 weeks',
    reason: 'Consolidation phase, wait for clear breakout',
    targetPrice: 3650.00,
    stopLoss: 3450.00
  },
  {
    symbol: 'MICROSOFT',
    action: 'BUY',
    confidence: 78,
    timeFrame: '3-5 days',
    reason: 'Banking sector recovery and improved margins',
    targetPrice: 1700.00,
    stopLoss: 1600.00
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'RBI keeps repo rate unchanged at 6.5%',
    summary: 'Reserve Bank maintains accommodative stance amid inflation concerns',
    timestamp: '2 hours ago',
    impact: 'neutral'
  },
  {
    id: '2',
    title: 'IT sector shows strong Q3 earnings',
    summary: 'Major IT companies report better-than-expected results',
    timestamp: '4 hours ago',
    impact: 'positive'
  },
  {
    id: '3',
    title: 'Oil prices surge amid geopolitical tensions',
    summary: 'Crude oil futures jump 3% affecting energy sector stocks',
    timestamp: '6 hours ago',
    impact: 'negative'
  }
];