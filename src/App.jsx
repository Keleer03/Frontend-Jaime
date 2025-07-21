import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Productos from './pages/Productos';
import Pedidos from './pages/Pedidos';
import Proveedores from './pages/Proveedores';
import Reportes from './pages/Reportes';
import Historial from './pages/Historial';
import Costeo from './pages/Costeo';
import DashboardHome from './pages/DashboardHome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="productos" element={<Productos />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="historial" element={<Historial />} />
          <Route path="costeo" element={<Costeo />} />
        </Route>
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
