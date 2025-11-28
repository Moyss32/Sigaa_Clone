import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../App.jsx";

export default function Sidebar() {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-hat-small">EM</div>
        <div className="logo-text">
          <strong>Dashboard</strong>
          <span>Bem vindo {user?.nome}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className="nav-item">
          Dashboard
        </NavLink>
        <NavLink to="/notas" className="nav-item">
          Notas
        </NavLink>
        <button className="nav-item disabled">Frequência</button>
        <button className="nav-item disabled">Mensagens</button>
        <button className="nav-item disabled">Atividades</button>
        <button className="nav-item disabled">Agenda</button>
        <button className="nav-item disabled">Ranking</button>
      </nav>

      <div className="sidebar-footer">
        <span>{user?.nome}</span>
        <button onClick={handleLogout} className="btn-logout">
          Sair
        </button>
      </div>
    </aside>
  );
}
