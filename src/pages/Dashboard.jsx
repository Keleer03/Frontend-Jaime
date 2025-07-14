import React from 'react';
import logo from '../assets/granittore.png';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar de navegación */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo Granittore" className="sidebar-logo" />
          
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Inicio</li>
            <li>Pedidos</li>
            <li>Productos</li>
            <li>Proveedores</li>
            <li>Reportes</li>
            <li>Historial</li>
            <li>Costeo</li>
          </ul>
        </nav>
      </aside>

      {/* Área de contenido principal */}
      <main className="main-content">
        <header className="main-header">
          <div className="welcome-message">
            <h1>Bienvenido</h1>
            <p>Organiza y automatiza tu facturación con eficiencia.</p>
          </div>
          <div className="user-profile">
            <span className="user-initial">G</span>
            {/* Aquí luego se puede agregar el nombre del usuario */}
          </div>
        </header>

        <section className="content">
          <p>Este es tu panel principal. Aquí puedes visualizar el resumen general, estadísticas, alertas o accesos rápidos.</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
