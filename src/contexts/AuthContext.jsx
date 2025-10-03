
// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);

  // this effect checks localStorage for a logged-in user on initial load and sets the user state accordingly
  useEffect(() => {
    const storedUser = localStorage.getItem('tutorFinderUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('tutorFinderUser');
      }
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    // this is whereby one would normally call an API to verify credentials so that is simulated here, the purpose is to demonstrate the flow only
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split('@')[0],
            email: email,
            userType: 'student' 
          };
          setUser(newUser);
          localStorage.setItem('tutorFinderUser', JSON.stringify(newUser));
          setLoading(false);
          resolve({ success: true });
        } else {
          setLoading(false);
          resolve({ success: false, error: 'Invalid credentials' });
        }
      }, 1000);
    });
  };

  const signup = async (userData) => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (userData.email && userData.password && userData.name) {
          const newUser = {
            id: Math.random().toString(36).substr(2, 9),
            name: userData.name,
            email: userData.email,
            userType: userData.userType || 'student',
            campus: userData.campus,
            

            // this section conditionally adds tutor-specific fields if the user is a tutor
            ...(userData.userType === 'tutor' && {
              expertise: userData.expertise,
              bio: userData.bio,
              yearOfStudy: userData.yearOfStudy
            })
          };
          setUser(newUser);
          localStorage.setItem('tutorFinderUser', JSON.stringify(newUser));
          setLoading(false);
          resolve({ success: true });
        } else {
          setLoading(false);
          resolve({ success: false, error: 'All fields are required' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tutorFinderUser');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};