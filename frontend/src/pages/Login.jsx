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
        <div className="login-erro">
          <div className="register-error">
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
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
        <div className="login-credit-container">
          <p>
            Design original por{" "}
            <a
              href="https://www.figma.com/community/file/1256871498988476466/login-page-ui-design"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mohammed Jawed
            </a>{" "}
            para Figma, modificado por{" "}
            <a
              href="https://github.com/IsaqueTADS"
              target="_blank"
              rel="noopener noreferrer"
            >
              IsaqueTADS
            </a>
            . Licenciado sob a{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 4.0
            </a>
            .
          </p>
        </div>
      </div>
      <div className="container-img-login">
        <img src={fotoLogin} alt="" />
      </div>
    </div>
  );
};

export default Login;
