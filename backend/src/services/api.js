const API_BASE_URL = "http://localhost:5000/api";

// Função auxiliar para requisições
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // envia cookies (JWT) junto
  };

  const response = await fetch(url, config);

  let data = null;
  try {
    data = await response.json();
  } catch (e) {
    // pode ser resposta sem body
  }

  if (!response.ok) {
    const message = data?.error || data?.message || `Erro ${response.status}`;
    throw new Error(message);
  }

  return data;
};

// =============== AUTENTICAÇÃO ===============
export const authService = {
  // POST /api/auth/login
  login: (email, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // POST /api/auth/register (se quiser usar depois)
  register: (email, password) =>
    apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

// =============== PROFESSORES ===============
export const professoresService = {
  listar: () => apiCall("/professores"),
  buscar: (id) => apiCall(`/professores/${id}`),
  criar: (dados) =>
    apiCall("/professores", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  atualizar: (id, dados) =>
    apiCall(`/professores/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
  deletar: (id) =>
    apiCall(`/professores/${id}`, {
      method: "DELETE",
    }),
};

// =============== ALUNOS ===============
export const alunosService = {
  listar: () => apiCall("/alunos"),
  buscar: (id) => apiCall(`/alunos/${id}`),
  criar: (dados) =>
    apiCall("/alunos", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  atualizar: (id, dados) =>
    apiCall(`/alunos/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
  deletar: (id) =>
    apiCall(`/alunos/${id}`, {
      method: "DELETE",
    }),
};

// =============== NOTAS ===============
export const notasService = {
  listar: () => apiCall("/notas"),
  buscar: (id) => apiCall(`/notas/${id}`),
  criar: (dados) =>
    apiCall("/notas", {
      method: "POST",
      body: JSON.stringify(dados),
    }),
  atualizar: (id, dados) =>
    apiCall(`/notas/${id}`, {
      method: "PUT",
      body: JSON.stringify(dados),
    }),
  deletar: (id) =>
    apiCall(`/notas/${id}`, {
      method: "DELETE",
    }),
};
