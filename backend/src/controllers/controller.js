const pool = require("../config/db");

// =============== ALUNOS ===============

// GET - Todos os alunos
exports.alunoListar = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alunos ORDER BY id_aluno ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar alunos." });
  }
};

// GET - Aluno por ID
exports.alunoBuscar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM alunos WHERE id_aluno = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Aluno não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar aluno." });
  }
};

// POST - Criar aluno
exports.alunoCriar = async (req, res) => {
  try {
    const { nome, email, idade } = req.body;
    const result = await pool.query(
      "INSERT INTO alunos (nome, email, idade) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, idade]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar aluno." });
  }
};

// PUT - Atualizar aluno
exports.alunoAtualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, idade } = req.body;
    const result = await pool.query(
      "UPDATE alunos SET nome = $1, email = $2, idade = $3 WHERE id_aluno = $4 RETURNING *",
      [nome, email, idade, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Aluno não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar aluno." });
  }
};

// DELETE - Remover aluno
exports.alunoDeletar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM alunos WHERE id_aluno = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Aluno não encontrado." });
    res.json({ message: "Aluno removido com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover aluno." });
  }
};

// =============== PROFESSORES ===============

// GET - Todos os professores
exports.profListar = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM professores ORDER BY id_professor ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar professores." });
  }
};

// GET - Professor por ID
exports.profBuscar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM professores WHERE id_professor = $1",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Professor não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar professor." });
  }
};

// POST - Criar professor
exports.profCriar = async (req, res) => {
  try {
    const { nome, materia } = req.body;
    const result = await pool.query(
      "INSERT INTO professores (nome, materia) VALUES ($1, $2) RETURNING *",
      [nome, materia]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar professor." });
  }
};

// PUT - Atualizar professor
exports.profAtualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, materia } = req.body;
    const result = await pool.query(
      "UPDATE professores SET nome = $1, materia = $2 WHERE id_professor = $3 RETURNING *",
      [nome, materia, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Professor não encontrado." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar professor." });
  }
};

// DELETE - Remover professor
exports.profDeletar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM professores WHERE id_professor = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Professor não encontrado." });
    res.json({ message: "Professor removido com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover professor." });
  }
};

// =============== NOTAS ===============

// GET - Todas as notas
exports.notaListar = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        n.id_nota,
        n.nota,
        a.nome AS aluno,
        p.nome AS professor
      FROM notas n
      JOIN alunos a ON n.aluno_id = a.id_aluno
      JOIN professores p ON n.professor_id = p.id_professor
      ORDER BY n.id_nota ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar notas." });
  }
};

// GET - Nota por ID
exports.notaBuscar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      SELECT 
        n.id_nota,
        n.nota,
        a.nome AS aluno,
        p.nome AS professor
      FROM notas n
      JOIN alunos a ON n.aluno_id = a.id_aluno
      JOIN professores p ON n.professor_id = p.id_professor
      WHERE n.id_nota = $1
      `,
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Nota não encontrada." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar nota." });
  }
};

// POST - Criar nota
exports.notaCriar = async (req, res) => {
  try {
    const { aluno_id, professor_id, nota } = req.body;
    const result = await pool.query(
      "INSERT INTO notas (aluno_id, professor_id, nota) VALUES ($1, $2, $3) RETURNING *",
      [aluno_id, professor_id, nota]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar nota." });
  }
};

// PUT - Atualizar nota
exports.notaAtualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { aluno_id, professor_id, nota } = req.body;
    const result = await pool.query(
      "UPDATE notas SET aluno_id = $1, professor_id = $2, nota = $3 WHERE id_nota = $4 RETURNING *",
      [aluno_id, professor_id, nota, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Nota não encontrada." });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar nota." });
  }
};

// DELETE - Remover nota
exports.notaDeletar = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM notas WHERE id_nota = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Nota não encontrada." });
    res.json({ message: "Nota removida com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover nota." });
  }
};
