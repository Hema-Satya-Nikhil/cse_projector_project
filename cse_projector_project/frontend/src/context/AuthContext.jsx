import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const persistSession = useCallback((token, profile) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(profile));
    setUser(profile);
    setIsAuthenticated(true);
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await authAPI.getMe();
      if (response.data?.user) {
        persistSession(token, response.data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async ({ email, name }) => {
    try {
      const response = await authAPI.requestOtp({ email, name });
      return {
        success: true,
        message: response.data?.message || 'OTP sent successfully',
        expiresIn: response.data?.expiresIn || 600
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP',
      };
    }
  };

  const verifyOtp = async ({ email, otp, name }) => {
    try {
      const response = await authAPI.verifyOtp({ email, otp, name });

      const { token, user: profile, credentials } = response.data;

      if (token && profile) {
        persistSession(token, profile);
      }

      return {
        success: true,
        user: profile,
        credentials: credentials || null,
        message: response.data?.message || 'OTP verified successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to verify OTP'
      };
    }
  };

  const loginWithPassword = async (credentials) => {
    try {
      const payload = {
        identifier: credentials.identifier,
        email: credentials.identifier,
        password: credentials.password
      };

      const response = await authAPI.login(payload);
      const { token, user: profile } = response.data;

      persistSession(token, profile);

      return { success: true, user: profile };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    requestOtp,
    verifyOtp,
    loginWithPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
