import { Routes, Route, Navigate } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const login = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


export default function App() {
  return (
    <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
    </AuthProvider>
  );
}

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
