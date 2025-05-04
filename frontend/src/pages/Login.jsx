import React from "react";
import "../assets/styles/index.css";
import fotoLogin from "../assets/img/foto-login.png";

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
    <div className="login-container">
      <div className="login-content">
        <div className="title-login">
          <h2>login</h2>
          <p>Acesse sua conta e comece já.</p>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="form-login">
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
            <a
              onClick={(event) => {
                event.preventDefault();
                navigate("/register");
              }}
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
      <div className="container-img-login">
        <img src={fotoLogin} alt="" />
      </div>
    </div>
  );
};

export default Login;
