import React from "react";
import Sidebar from "./Sidebar.jsx";

const DISCIPLINAS = [
  { nome: "Matemática", professor: "Prof. Bernardo", nota: 9.2, cor: "#00e676" },
  { nome: "Banco de Dados", professor: "Prof. Daminar", nota: 10.0, cor: "#00b0ff" },
  { nome: "Web Design", professor: "Prof. Daminar", nota: 7.5, cor: "#ffd600" },
  { nome: "PI II", professor: "Prof. Guilherme, Daminar", nota: 5.9, cor: "#ff1744" }
];

export default function DashboardPage() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <header className="topbar">
          <div className="topbar-right">
            <span>Turma 2G - 2° Ano</span>
            <div className="avatar" />
          </div>
        </header>

        <section className="cards-row">
          <div className="info-card">
            <span>Média Geral</span>
            <strong>8.7</strong>
            <small>+0.8 este trimestre</small>
          </div>
          <div className="info-card">
            <span>Frequência</span>
            <strong>94%</strong>
            <small>4 faltas esse mês</small>
          </div>
          <div className="info-card">
            <span>Tarefas</span>
            <strong>5 pendentes</strong>
            <small>1 atrasada</small>
          </div>
          <div className="info-card">
            <span>Ranking</span>
            <strong>3°</strong>
            <small>na turma</small>
          </div>
        </section>

        <section className="grid-2">
          <div className="panel">
            <div className="panel-header">
              <h3>Notas por disciplina</h3>
              <button className="link-button">Ver todas</button>
            </div>
            <div className="panel-body">
              {DISCIPLINAS.map((d) => (
                <div key={d.nome} className="disciplina-row">
                  <div className="disciplina-info">
                    <strong>{d.nome}</strong>
                    <span>{d.professor}</span>
                  </div>
                  <div className="disciplina-bar">
                    <div
                      className="disciplina-bar-fill"
                      style={{ width: `${(d.nota / 10) * 100}%`, backgroundColor: d.cor }}
                    />
                  </div>
                  <div className="disciplina-nota">{d.nota.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel side">
            <div className="panel-block">
              <h3>Próximas atividades</h3>
              <ul className="atividades-list">
                <li className="tag red">
                  <strong>Prova de química</strong>
                  <span>Amanhã 14:30 • Urgente</span>
                </li>
                <li className="tag orange">
                  <strong>Entrega de PI</strong>
                  <span>4 de novembro • 7 dias</span>
                </li>
                <li className="tag purple">
                  <strong>Lista de Matemática</strong>
                  <span>10 de novembro • 15 dias</span>
                </li>
              </ul>
            </div>

            <div className="panel-block">
              <h3>Mensagens</h3>
              <div className="mensagem-card">
                <strong>Prof. H. Romeu Pinto</strong>
                <span>Revisar conteúdo de funções para a prova.</span>
              </div>
            </div>

            <div className="panel-block">
              <h3>Conquistas</h3>
              <ul className="badges-list">
                <li className="badge gold">Nota máxima • Matemática - Prova 1</li>
                <li className="badge blue">Frequência perfeita • Outubro 2025</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
