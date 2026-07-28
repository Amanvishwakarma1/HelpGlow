import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('helpglow_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('helpglow_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const isLoggedIn = !!user && !!token;

  useEffect(() => {
    try {
      if (user && token) {
        localStorage.setItem('helpglow_user', JSON.stringify(user));
        localStorage.setItem('helpglow_token', token);
      } else {
        localStorage.removeItem('helpglow_user');
        localStorage.removeItem('helpglow_token');
      }
    } catch (e) {
      console.error("Failed to update auth in localStorage", e);
    }
  }, [user, token]);

  // Check email existence in database
  const checkEmailExists = async (email) => {
    const res = await fetch(`${API_BASE_URL}/check-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to check email');
    return data.exists;
  };

  // Send OTP
  const sendOtp = async (email, purpose = 'register') => {
    const res = await fetch(`${API_BASE_URL}/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, purpose })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send OTP code');
    return data;
  };

  // Verify OTP
  const verifyOtp = async (email, otp) => {
    const res = await fetch(`${API_BASE_URL}/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to verify OTP code');
    return data;
  };

  // Register
  const registerUser = async (username, email, password) => {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    
    if (data.token && data.user) {
      const formattedUser = {
        ...data.user,
        name: data.user.username || data.user.name || data.user.email,
        avatar: data.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.user.username || data.user.email)}`
      };
      setToken(data.token);
      setUser(formattedUser);
    }
    return data;
  };

  // Login
  const loginUser = async (email, password) => {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');

    if (data.token && data.user) {
      const formattedUser = {
        ...data.user,
        name: data.user.username || data.user.name || data.user.email,
        avatar: data.user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.user.username || data.user.email)}`
      };
      setToken(data.token);
      setUser(formattedUser);
    }
    return data;
  };

  // Forgot Password
  const resetPassword = async (email, otp, newPassword) => {
    const res = await fetch(`${API_BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to reset password');
    return data;
  };

  // Mock Google Login fallback
  const loginWithGoogle = () => {
    const googleUser = {
      email: "sponsor.user@gmail.com",
      username: "Ankit (Google User)",
      role: "user"
    };
    setToken("mock_google_jwt_token");
    setUser(googleUser);
    return googleUser;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('helpglow_user');
    localStorage.removeItem('helpglow_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoggedIn,
      checkEmailExists,
      sendOtp,
      verifyOtp,
      registerUser,
      loginUser,
      resetPassword,
      loginWithGoogle,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
