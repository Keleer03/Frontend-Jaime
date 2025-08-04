import React, { useState } from 'react';
import '../index.css';
import BotonAgregar from '../components/Buttons/botonAgregar';
import { Edit, Trash2 } from 'lucide-react';
import ProveedorModal from '../components/Modals/ProveedorModal';
import MensajeEliminar from '../components/Messages/mensajeEliminar';

const paises = [
  { id: 'AR', nombre: 'Argentina' },
  { id: 'BR', nombre: 'Brasil' },
  { id: 'CL', nombre: 'Chile' },
  { id: 'CO', nombre: 'Colombia' },
  { id: 'MX', nombre: 'México' },
  { id: 'US', nombre: 'Estados Unidos' },
];

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorEnEdicion, setProveedorEnEdicion] = useState(null);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const abrirModalEliminar = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = () => {
    setProveedores((prev) => prev.filter((p) => p.id !== proveedorAEliminar.id));
    setMostrarModalEliminar(false);
    setProveedorAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setProveedorAEliminar(null);
  };

  const abrirModal = (proveedor = null) => {
    if (proveedor) {
      setProveedorEnEdicion(proveedor);
    } else {
      setProveedorEnEdicion(null);
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProveedorEnEdicion(null);
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="wrapper">
      <header className="header">
        <h1>Gestión de Proveedores</h1>
        <p>Consulta, registra o modifica proveedores asociados.</p>
      </header>
      <section className="controls">
        <BotonAgregar onClick={() => abrirModal()} label="Agregar proveedor" />
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </section>
      <section className="tabla">
        {proveedoresFiltrados.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Direcciones</th>
                <th>País</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.map((prov) => (
                <tr key={prov.id}>
                  <td>{prov.nombre}</td>
                  <td>{prov.telefono}</td>
                  <td>{prov.correo}</td>
                  <td>{prov.direcciones.join('; ') || prov.direccion1}</td>
                  <td>
                    {paises.find((p) => p.id === prov.idPais)?.nombre || prov.idPais}
                  </td>
                  <td>
                    <button className="btn-accion editar" onClick={() => abrirModal(prov)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-accion eliminar" onClick={() => abrirModalEliminar(prov)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No hay proveedores registrados.</p>
        )}
      </section>
      <ProveedorModal
        show={mostrarModal}
        onClose={cerrarModal}
        proveedor={proveedorEnEdicion}
        paises={paises}
        onSubmit={(formData) => {
          const nuevoProveedor = {
            ...formData,
            direcciones: [
              formData.direccion1,
              formData.direccion2 || null,
              formData.direccion3 || null,
            ].filter((dir) => dir),
          };
          if (proveedorEnEdicion) {
            setProveedores((prev) =>
              prev.map((p) => (p.id === proveedorEnEdicion.id ? { ...p, ...nuevoProveedor } : p))
            );
          } else {
            setProveedores((prev) => [...prev, { id: prev.length + 1, ...nuevoProveedor }]);
          }
          cerrarModal();
        }}
      />
      <MensajeEliminar
        show={mostrarModalEliminar}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
        mensaje={`¿Deseas eliminar al proveedor ${proveedorAEliminar?.nombre || ''}?`}
      />
    </div>
  );
}

export default Proveedores;