const API_BASE_URL = 'http://localhost:5000/api';

// Função auxiliar para fazer requisições
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Importante: envia cookies (JWT)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Erro ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// =============== ALUNOS ===============

export const alunosService = {
  // GET - Listar todos os alunos
  listar: async () => {
    return apiCall('/alunos');
  },

  // GET - Buscar aluno por ID
  buscar: async (id) => {
    return apiCall(`/alunos/${id}`);
  },

  // POST - Criar novo aluno
  criar: async (dados) => {
    return apiCall('/alunos', {
      method: 'POST',
      body: JSON.stringify(dados),
    });
  },

  // PUT - Atualizar aluno
  atualizar: async (id, dados) => {
    return apiCall(`/alunos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dados),
    });
  },

  // DELETE - Remover aluno
  deletar: async (id) => {
    return apiCall(`/alunos/${id}`, {
      method: 'DELETE',
    });
  },
};

// =============== PROFESSORES ===============

export const professoresService = {
  // GET - Listar todos os professores
  listar: async () => {
    return apiCall('/professores');
  },

  // GET - Buscar professor por ID
  buscar: async (id) => {
    return apiCall(`/professores/${id}`);
  },

  // POST - Criar novo professor
  criar: async (dados) => {
    return apiCall('/professores', {
      method: 'POST',
      body: JSON.stringify(dados),
    })
}};