import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./App.jsx";

export default function LoginPage() {
  const [tipo, setTipo] = useState("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // aqui você faria requisição à API
    login(tipo);
    navigate("/");
  };

  return (
    <div className="login-root">
      <div className="login-card-outer">
        <div className="login-logo">
          <div className="logo-hat">EM</div>
        </div>

        <div className="login-tabs">
          <button
            className={tipo === "aluno" ? "tab active" : "tab"}
            onClick={() => setTipo("aluno")}
          >
            Aluno
          </button>
          <button
            className={tipo === "professor" ? "tab active" : "tab"}
            onClick={() => setTipo("professor")}
          >
            Professor
          </button>
        </div>

        <div className="login-card-inner">
          <h2>Faça Login</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Senha:
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
