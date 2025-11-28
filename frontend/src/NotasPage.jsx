import React from "react";
import Sidebar from "./Sidebar.jsx";

const DISCIPLINAS = [
  "Artes",
  "Banco de Dados",
  "Biologia",
  "Desenvolvimento Web I",
  "Educação física",
  "Filosofia",
  "Física",
  "Geografia",
  "História",
  "Língua portuguesa e Literatura",
  "Matemática",
  "Projeto de Software",
  "Projeto Integrador II",
  "Química",
  "Sociologia",
  "Web Design"
];

function LinhaDisciplina({ nome }) {
  const trimestres = [
    { label: "T1", cor: "#80d8ff" },
    { label: "T2", cor: "#ffe57f" },
    { label: "T3", cor: "#ff8a80" }
  ];
  return (
    <div className="linha-disciplina">
      <div className="linha-titulo">{nome}</div>
      <div className="linha-trimestres">
        {trimestres.map((t) => (
          <span
            key={t.label}
            className="chip-trimestre"
            style={{ background: t.cor }}
          >
            {t.label} 8.7
          </span>
        ))}
      </div>
    </div>
  );
}

export default function NotasPage() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <header className="topbar">
          <h2>Notas</h2>
        </header>

        <section className="notas-header-row">
          <button className="btn-outline">Filtros</button>
          <div className="media-geral-card">
            <span>Média geral</span>
            <strong>8.7</strong>
          </div>
          <button className="btn-outline">Selecionar por ano</button>
        </section>

        <section className="panel">
          <h3>Médias particulares</h3>
          <div className="lista-disciplinas">
            {DISCIPLINAS.map((d) => (
              <LinhaDisciplina key={d} nome={d} />
            ))}
          </div>
        </section>

        <aside className="notas-sidebar-info">
          <h4>Conquistas dessa página</h4>
          <p>Nota máxima em: Banco de Dados, Educação Física.</p>
          <p>Maior nota da turma em: Matemática.</p>
        </aside>
      </main>
    </div>
  );
}
