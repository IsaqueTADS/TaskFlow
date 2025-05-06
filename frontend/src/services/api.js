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
    options.body = JSON.stringify(body);
  }

  const token = localStorage.getItem("token");
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${apiUrl}${endpoint}`, options);

  // if (response.status === 401) {
  //   let errorData;
  //   errorData = await response.json();
  //   console.log(errorData);
  //   if (errorData.error === "Token inválido") localStorage.removeItem("token");
  // }

  if (!response.ok) {
    let errorData;
    errorData = await response.json();
    throw new Error(errorData.error || "Ai deu o carai mesmo");
  }

  return response.json();
}
