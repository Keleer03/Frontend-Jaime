import React, { useState } from "react";
import "../index.css";
import logo from "../assets/vadibarot.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Correo requerido";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Formato de correo inválido";
    if (!password) newErrors.password = "Contraseña requerida";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password, remember });
      navigate("/dashboard");
    }
  };

  return (
    <div className="wrapper wrapper--flex">
      <div className="login-left">
        <img src={logo} alt="Logo Granittore" className="logo" />
        <h1>Bienvenido al sistema Vadibarot</h1>
        <p>Accede para gestionar tus operaciones con eficiencia.</p>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="formulario">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className={errors.email ? "input input--full input--error" : "input input--full"}
              />
              {errors.email && (
                <span className="error-text">{errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={errors.password ? "input input--full input--error" : "input input--full"}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-remember">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              <label htmlFor="remember">Recordarme</label>
            </div>

            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>

          <div className="footer-links">
            <a onClick={() => navigate("/registro")}>
              ¿No tienes una cuenta? Regístrate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;