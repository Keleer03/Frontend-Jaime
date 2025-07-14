import React, { useState } from 'react';
import '../styles/proveedores.css';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const proveedoresEjemplo = [
  {
    id: 1,
    nombre: 'Mármoles S.A.',
    direccion: 'San José, Costa Rica',
    telefono: '2222-3344',
    correo: 'contacto@marmoles.co.cr'
  },
  {
    id: 2,
    nombre: 'Decorstone Ltda.',
    direccion: 'Heredia, Costa Rica',
    telefono: '2233-4455',
    correo: 'info@decorstone.com'
  }
];

function Proveedores() {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [proveedorEditandoId, setProveedorEditandoId] = useState(null);
  const [proveedores, setProveedores] = useState(proveedoresEjemplo);
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  });

  const proveedoresFiltrados = proveedores.filter((prov) =>
    prov.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModal = () => {
    setModoEdicion(false);
    setFormulario({ nombre: '', direccion: '', telefono: '', correo: '' });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setModoEdicion(false);
    setFormulario({ nombre: '', direccion: '', telefono: '', correo: '' });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.telefono || !formulario.correo) {
      alert('Los campos Nombre, Teléfono y Correo son obligatorios.');
      return;
    }

    if (modoEdicion) {
      setProveedores(prev => prev.map(p =>
        p.id === proveedorEditandoId ? { ...p, ...formulario } : p
      ));
    } else {
      const nuevoProveedor = {
        id: proveedores.length + 1,
        ...formulario
      };
      setProveedores([...proveedores, nuevoProveedor]);
    }

    cerrarModal();
  };

  const confirmarEliminar = (proveedor) => {
    setProveedorAEliminar(proveedor);
  };

  const eliminarProveedorConfirmado = () => {
    setProveedores(prev => prev.filter(p => p.id !== proveedorAEliminar.id));
    setProveedorAEliminar(null);
  };

  const cancelarEliminar = () => {
    setProveedorAEliminar(null);
  };

  const manejarEditar = (proveedor) => {
    setFormulario({ ...proveedor });
    setModoEdicion(true);
    setProveedorEditandoId(proveedor.id);
    setMostrarModal(true);
  };

  return (
    <div className="proveedores-wrapper">
      <header className="proveedores-header">
        <h1>Gestión de Proveedores</h1>
        <p>Aquí puedes ver, agregar, editar o eliminar tus proveedores registrados.</p>
      </header>

      <section className="proveedores-controls">
        <button className="btn-agregar" onClick={abrirModal}>
          <PlusCircle size={18} style={{ marginRight: '8px' }} />
          Agregar proveedor
        </button>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </section>

      <section className="proveedores-tabla">
        {proveedoresFiltrados.length > 0 ? (
          <table className="tabla-proveedores">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.map((prov) => (
                <tr key={prov.id}>
                  <td>{prov.nombre}</td>
                  <td>{prov.direccion}</td>
                  <td>{prov.telefono}</td>
                  <td>{prov.correo}</td>
                  <td>
                    <button className="btn-accion editar" onClick={() => manejarEditar(prov)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-accion eliminar" onClick={() => confirmarEliminar(prov)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>
            No se encontraron proveedores.
          </p>
        )}
      </section>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{modoEdicion ? 'Editar proveedor' : 'Agregar nuevo proveedor'}</h2>
              <button className="cerrar-modal" onClick={cerrarModal}>×</button>
            </div>
            <form onSubmit={manejarEnvio}>
              <div className="modal-body">
                <input name="nombre" placeholder="Nombre *" value={formulario.nombre} onChange={manejarCambio} />
                <input name="direccion" placeholder="Dirección" value={formulario.direccion} onChange={manejarCambio} />
                <input name="telefono" placeholder="Teléfono *" value={formulario.telefono} onChange={manejarCambio} />
                <input name="correo" type="email" placeholder="Correo *" value={formulario.correo} onChange={manejarCambio} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
                <button type="submit" className="btn-agregar">
                  {modoEdicion ? 'Guardar cambios' : 'Guardar proveedor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {proveedorAEliminar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirmar eliminación</h2>
              <button className="cerrar-modal" onClick={cancelarEliminar}>×</button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el proveedor <strong>{proveedorAEliminar.nombre}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cancelarEliminar}>Cancelar</button>
              <button className="btn-agregar" onClick={eliminarProveedorConfirmado}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Proveedores;
