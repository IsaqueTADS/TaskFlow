import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (element) => {
    element.preventDefault();
    try {
      await fetchAPI("/auth/register", "POST", { email, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
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
          Já tem conta?{" "}
          <button
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
            }}
          >
            Faça login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
