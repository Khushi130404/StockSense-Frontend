import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  dematAccount: string;
  dateOfBirth: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { userId: string; password: string }) => Promise<boolean>;
  signup: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials: { userId: string; password: string }) => {
    // Mock authentication - in real app this would be an API call
    if (credentials.userId && credentials.password) {
      const mockUser: User = {
        id: credentials.userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        dematAccount: 'SS123456789',
        dateOfBirth: '1990-01-01'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Mock signup - generate user ID
    const newUser: User = {
      ...userData,
      id: `SS${Date.now()}`
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};