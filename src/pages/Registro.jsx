import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/vadibarot.png";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Nombre requerido";
    if (!email) newErrors.email = "Correo requerido";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Formato de correo inválido";
    if (!password) newErrors.password = "Contraseña requerida";
    if (password && password.length < 6)
      newErrors.password = "Mínimo 6 caracteres";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ name, email, password });
      navigate("/dashboard"); 
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={logo} alt="Logo Granittore" className="logo" />
        <h1>Regístrate en Vadibarot</h1>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Crear cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className={errors.email ? "input-error" : ""}
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
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={errors.confirmPassword ? "input-error" : ""}
              />
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
            </div>

            <button type="submit" className="login-button">
              Registrarse
            </button>
          </form>

          <div className="footer-links">
            <a onClick={() => navigate("/")} className="link-button">
              ¿Ya tienes cuenta? Inicia sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
