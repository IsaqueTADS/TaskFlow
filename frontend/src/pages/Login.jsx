import React from "react";

import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (element) => {
    element.preventDefault();
    try {
      const data = await fetchAPI("/auth/login", "POST", { email, password });
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        <button type="submit">Entrar</button>
        <p>
          Não tem uma conta?{" "}
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/register");
            }}
          >
            Registre de graça
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
