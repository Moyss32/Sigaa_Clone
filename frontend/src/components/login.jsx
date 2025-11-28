import { useState } from "react";
import "./login.css"; // vamos extrair o CSS pra um arquivo externo

export default function Login() {
  const [userType, setUserType] = useState("aluno");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const switchTab = (type) => {
    setUserType(type);
    setMessage("");
    setMessageType("");
    setEmail("");
    setSenha("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setMessage("Por favor, preencha todos os campos.");
      setMessageType("error");
      return;
    }

    if (email.length < 5) {
      setMessage("Email inválido.");
      setMessageType("error");
      return;
    }

    if (senha.length < 6) {
      setMessage("Senha deve ter no mínimo 6 caracteres.");
      setMessageType("error");
      return;
    }

    setMessage(
      `Login realizado com sucesso! Bem-vindo, ${userType === "aluno" ? "Aluno" : "Professor"}!`
    );
    setMessageType("success");

    setTimeout(() => {
      setEmail("");
      setSenha("");
    }, 1500);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">📚</div>

        <div className="tabs">
          <button
            className={`tab ${userType === "aluno" ? "active" : ""}`}
            onClick={() => switchTab("aluno")}
          >
            Aluno
          </button>

          <button
            className={`tab ${userType === "professor" ? "active" : ""}`}
            onClick={() => switchTab("professor")}
          >
            Professor
          </button>
        </div>
      </div>

      <div className="content">
        <h2 className="title">Faça Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          {message && (
            <div className={`message ${messageType}`}>{message}</div>
          )}
        </form>
      </div>
    </div>
  );
}
