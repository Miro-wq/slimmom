import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const tokenStr = localStorage.getItem('sb-blckmkeqeanxvoiimwbq-auth-token');
  
  if (!tokenStr) {
    return <Navigate to="/login" />;
  }
  
  try {
    const tokenObj = JSON.parse(tokenStr);
    if (!tokenObj || !tokenObj.access_token) {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;

