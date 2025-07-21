import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../assets/granittore.png';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo Granittore" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li><NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>Inicio</NavLink></li>
            <li><NavLink to="/dashboard/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>Pedidos</NavLink></li>
            <li><NavLink to="/dashboard/productos" className={({ isActive }) => isActive ? 'active' : ''}>Productos</NavLink></li>
            <li><NavLink to="/dashboard/proveedores" className={({ isActive }) => isActive ? 'active' : ''}>Proveedores</NavLink></li>
            <li><NavLink to="/dashboard/reportes" className={({ isActive }) => isActive ? 'active' : ''}>Reportes</NavLink></li>
            <li><NavLink to="/dashboard/historial" className={({ isActive }) => isActive ? 'active' : ''}>Historial</NavLink></li>
            <li><NavLink to="/dashboard/costeo" className={({ isActive }) => isActive ? 'active' : ''}>Costeo</NavLink></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="welcome-message">
            <h1>Bienvenido</h1>
            <p>Organiza y automatiza tu facturación con eficiencia.</p>
          </div>
          <div className="user-profile">
            <span className="user-initial">G</span>
          </div>
        </header>

        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
