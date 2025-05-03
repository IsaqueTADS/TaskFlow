const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  console.error("VITE_API_URL não está definida nas variáveis de ambiente");
}

export async function fetchAPI(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: {},
  };

  // Adiciona Content-Type se houver corpo
  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body); // Sempre converte para JSON
  }

  // Adiciona token se existir
  const token = localStorage.getItem("token");
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${apiUrl}${endpoint}`, options);

    // Verifica token expirado/inválido
    if (response.status === 401) {
      localStorage.removeItem("token");
      throw new Error("Sessão expirada. Faça login novamente.");
    }

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: await response.text() };
      }
      throw new Error(
        errorData.message || `Erro ${response.status}: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error; // Propaga o erro para quem chamou a função
  }
}
