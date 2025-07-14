import React, { useState } from 'react';
import '../styles/login.css';
import logo from '../assets/granittore.png';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Correo requerido';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Formato de correo inválido';
    if (!password) newErrors.password = 'Contraseña requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log({ email, password, remember });
      navigate('/dashboard');
    }
  };


  return (
    <div className="login-wrapper">
      <div className="login-left">
        <img src={logo} alt="Logo Granittore" className="logo" />
        <h1>Bienvenido a Granittore</h1>
        <p>Automatiza y organiza tu facturación de manera profesional.</p>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
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

            <button type="submit" className="login-button">Entrar</button>
          </form>

          <div className="footer-links">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
