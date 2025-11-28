const db = require('../config/db');

const Aluno = {
  async getAll() {
    const { rows } = await db.query('SELECT * FROM alunos ORDER BY id_aluno');
    return rows;
  },

  async getById(id) {
    const { rows } = await db.query('SELECT * FROM alunos WHERE id_aluno = $1', [id]);
    return rows[0];
  },

  async create(aluno) {
    const { matricula, cpf, nome, email, data_nascimento} = aluno;
    const { rows } = await db.query(
      `INSERT INTO alunos (nome, matricula, email, data_nascimento)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [nome, matricula, email, data_nascimento]
    );
    return rows[0];
  },

  async delete(id) {
    await db.query('DELETE FROM alunos WHERE id_aluno = $1', [id]);
  }
};

module.exports = Aluno;
