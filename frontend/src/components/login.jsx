import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../App.jsx";

export default function Login() {
  const [userType, setUserType] = useState("aluno");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const switchTab = (type) => {
    setUserType(type);
    setMessage("");
    setMessageType("");
    setNome("");
    setEmail("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!nome || !email) {
      setMessage("Por favor, preencha todos os campos.");
      setMessageType("error");
      return;
    }

    if (email.length < 5 || !email.includes("@")) {
      setMessage("Email inválido.");
      setMessageType("error");
      return;
    }

    try {
      const baseURL = "http://localhost:5000";
      let usuarioEncontrado = null;

      if (userType === "professor") {
        const res = await fetch(`${baseURL}/api/professores`);
        if (!res.ok) throw new Error("Erro ao buscar professores");
        const professores = await res.json();

        usuarioEncontrado = professores.find(
          (p) =>
            p.nome.toLowerCase() === nome.toLowerCase() &&
            p.email.toLowerCase() === email.toLowerCase()
        );
      } else {
        const res = await fetch(`${baseURL}/api/alunos`);
        if (!res.ok) throw new Error("Erro ao buscar alunos");
        const alunos = await res.json();

        usuarioEncontrado = alunos.find(
          (a) =>
            a.nome.toLowerCase() === nome.toLowerCase() &&
            a.email.toLowerCase() === email.toLowerCase()
        );
      }

      if (!usuarioEncontrado) {
        setMessage(
          `${
            userType === "professor" ? "Professor" : "Aluno"
          } não encontrado com esse nome e email.`
        );
        setMessageType("error");
        return;
      }

      setMessage(
        `Login realizado com sucesso! Bem-vindo, ${usuarioEncontrado.nome}!`
      );
      setMessageType("success");

      // Chama a função login do contexto
      login(userType, usuarioEncontrado);

      // Redireciona para o dashboard
      setTimeout(() => {
        navigate("/");
      }, 600);
    } catch (err) {
      console.error("Erro ao verificar usuário:", err);
      setMessage("Erro ao conectar com o servidor. Tente novamente.");
      setMessageType("error");
    }
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
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

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