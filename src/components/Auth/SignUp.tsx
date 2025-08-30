import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff, Calendar, Mail, CreditCard } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import stockSenseLogo from '../../assets/stocksense-logo.png';

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    dematAccount: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedUserId, setGeneratedUserId] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const generateUserId = () => {
    const userId = `SS${Date.now()}`;
    setGeneratedUserId(userId);
    return userId;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      const userId = generateUserId();
      const success = await signup({
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        dematAccount: formData.dematAccount,
        password: formData.password
      });
      
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // Mock Google OAuth - in real app this would integrate with Google OAuth
    console.log('Google OAuth integration would happen here');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md">
        <div className="glass-card rounded-lg p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <img src={stockSenseLogo} alt="StockSense" className="h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground">Join StockSense and start trading smarter</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email with Google OAuth */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="space-y-3">
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                  placeholder="Enter your email"
                />
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 border border-border rounded-lg bg-background hover:bg-accent smooth-transition"
                >
                  <Mail className="h-5 w-5" />
                  <span>Sign up with Google</span>
                </button>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-foreground mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <input
                  id="dob"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Demat Account */}
            <div>
              <label htmlFor="demat" className="block text-sm font-medium text-foreground mb-2">
                Demat Account Number
              </label>
              <div className="relative">
                <input
                  id="demat"
                  type="text"
                  required
                  value={formData.dematAccount}
                  onChange={(e) => setFormData({ ...formData, dematAccount: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                  placeholder="Enter demat account number"
                />
                <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 smooth-transition"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground smooth-transition"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Generated User ID Display */}
            {generatedUserId && (
              <div className="glass-card rounded-lg p-4 bg-profit/5 border border-profit/20">
                <p className="text-sm text-profit font-medium">Your User ID: {generatedUserId}</p>
                <p className="text-xs text-muted-foreground mt-1">Save this ID for future logins</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full primary-gradient text-primary-foreground py-3 px-4 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 smooth-transition flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};