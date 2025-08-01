import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Productos";
import Pedidos from "./pages/Pedidos";
import Proveedores from "./pages/Proveedores";
import Reportes from "./pages/Reportes";
import Historial from "./pages/Historial";
import Costeo from "./pages/Costeo";
import DashboardHome from "./pages/DashboardHome";
import Registro from "./pages/Registro";
import SubirExcel from "./pages/SubirExcel";
import Notificaciones from "./Pages/Notificaciones";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="productos" element={<Productos />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="reportes" element={<Reportes />} />
          <Route path="historial" element={<Historial />} />
          <Route path="costeo" element={<Costeo />} />
          <Route path="notificaciones" element={<Notificaciones />} />
          <Route path="subir-excel" element={<SubirExcel />} />

        </Route>
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
