import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import "../assets/styles/index.css";
import fotoLogin from "../assets/img/foto-register.png";

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
    <div className="register-container">
      <div className="register-content">
        <div className="title-register">
          <h2>Cadastre-se</h2>
          <p>Cadastre-se no nosso site para fazer suas tasks</p>
        </div>
        <div className="register-error">{error && <p style={{ color: "red" }}>{error}</p>}</div>
        <form onSubmit={handleSubmit} className="form-register">
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
          <button type="submit">Cadastrar</button>
          <p>
            Já tem conta?{" "}
            <a
              onClick={(event) => {
                event.preventDefault();
                navigate("/");
              }}
            >
              Faça login
            </a>
          </p>
        </form>
      </div>
      <div className="container-img-register">
        <img src={fotoLogin} alt="" />
      </div>
    </div>
  );
};

export default Register;
