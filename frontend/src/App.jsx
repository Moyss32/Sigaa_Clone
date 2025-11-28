import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/login.jsx";
import DashboardPage from "./DashboardPage.jsx";
import NotasPage from "./GradesPage.jsx";

export const AuthContext = React.createContext(null);

function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const [user, setUser] = useState(null);

  const login = ({ nome, email }) => {
    // Na versão simples, armazenamos apenas o nome/email em memória
    setUser({ nome, email });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notas"
            element={
              <PrivateRoute>
                <NotasPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
