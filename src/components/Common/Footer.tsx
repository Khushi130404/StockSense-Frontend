import React from 'react';
import { Mail, Phone, Twitter, Linkedin, Github } from 'lucide-react';
import stockSenseLogo from '../../assets/stocksense-logo.png';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src={stockSenseLogo} alt="StockSense" className="h-8 w-auto" />
              <span className="text-lg font-bold text-foreground">StockSense</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered stock trading platform helping investors make smarter decisions with real-time insights and automated trading capabilities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">How It Works</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">Pricing</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">API Documentation</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground smooth-transition">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@stocksense.ai</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-4 mt-4">
                <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 StockSense. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Made by Hackolics
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};