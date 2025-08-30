// Header.tsx
import React, { useState } from "react";
import {
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Star,
  CreditCard,
} from "lucide-react";
import { SearchBar } from "../Common/SearchBar";
import { ThemeToggle } from "../Common/ThemeToggle";
import { useAuth } from "../../context/AuthContext";
import stockSenseLogo from "../../assets/stocksense-logo.png";
import { NotificationPanel, Notification } from "../Common/NotificationPanel";
import { triggerSentimentAnalysis } from "../../services/sentiment_service";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  const handleBellClick = async () => {
    setShowNotifications((prev) => !prev);

    if (!showNotifications) {
      setLoading(true);
      try {
        const response = await triggerSentimentAnalysis();

        console.log("API response:", response); // This should log

        setNotifications([
          {
            id: 1,
            message: `${response.tweet} → Prediction: ${response.prediction}`,
            type: response.prediction === "sell" ? "critical" : "info",
          },
        ]);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <img
                src={stockSenseLogo}
                alt="StockSense"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-foreground">
                StockSense
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-sm font-medium text-muted-foreground hover:text-foreground smooth-transition"
              >
                About Us
              </a>
              <Link
                to="/live-news"
                className="text-sm font-medium text-muted-foreground hover:text-foreground smooth-transition"
              >
                Live Stock News
              </Link>
            </nav>
            <div className="w-64">
              <SearchBar />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Notification Bell */}
            <div className="relative">
              <button
                className="relative p-2 text-muted-foreground hover:text-foreground smooth-transition"
                onClick={handleBellClick}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary"></span>
              </button>

              {showNotifications && (
                <NotificationPanel
                  notifications={notifications}
                  loading={loading}
                />
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 rounded-lg border border-border bg-card px-3 py-2 hover:bg-accent smooth-transition"
              >
                <User className="h-4 w-4" />
                <span className="hidden md:block text-sm font-medium">
                  {user?.name}
                </span>
                <Menu className="h-4 w-4" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ID: {user?.id}
                    </p>
                  </div>

                  <div className="py-2">
                    <button className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent smooth-transition">
                      <User className="mr-3 h-4 w-4" />
                      Personal Information
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent smooth-transition">
                      <Star className="mr-3 h-4 w-4" />
                      Starred Stocks
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent smooth-transition">
                      <CreditCard className="mr-3 h-4 w-4" />
                      Deposit/Withdrawal
                    </button>
                    <button className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent smooth-transition">
                      <Settings className="mr-3 h-4 w-4" />
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-border py-2">
                    <button
                      onClick={logout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-accent smooth-transition"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
