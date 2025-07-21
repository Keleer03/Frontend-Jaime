import React, { useState } from 'react';
import '../styles/productos.css';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const abrirModalEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = () => {
    setProductos(prev => prev.filter(p => p.id !== productoAEliminar.id));
    setMostrarModalEliminar(false);
    setProductoAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setProductoAEliminar(null);
  };

  const [formulario, setFormulario] = useState({
    idProveedor: '',
    nombre: '',
    descripcion: '',
    peso: '',
    volumen: '',
    precioUnitario: ''
  });

  const abrirModal = (producto = null) => {
    if (producto) {
      setProductoEnEdicion(producto);
      setFormulario({ ...producto });
    } else {
      setProductoEnEdicion(null);
      setFormulario({
        idProveedor: '',
        nombre: '',
        descripcion: '',
        peso: '',
        volumen: '',
        precioUnitario: ''
      });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoEnEdicion(null);
    setFormulario({
      idProveedor: '',
      nombre: '',
      descripcion: '',
      peso: '',
      volumen: '',
      precioUnitario: ''
    });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.precioUnitario || !formulario.idProveedor) {
      alert('Por favor completa los campos obligatorios: nombre, proveedor y precio unitario.');
      return;
    }

    const nuevoProducto = {
      ...formulario,
      peso: formulario.peso || null,
      volumen: formulario.volumen || null,
      descripcion: formulario.descripcion || null,
      precioUnitario: parseFloat(formulario.precioUnitario)
    };

    if (productoEnEdicion) {
      setProductos(prev => prev.map(p => p.id === productoEnEdicion.id ? { ...p, ...nuevoProducto } : p));
    } else {
      setProductos(prev => [
        ...prev,
        { id: prev.length + 1, ...nuevoProducto }
      ]);
    }

    cerrarModal();
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-wrapper">
      <header className="productos-header">
        <h1>Gestión de Productos</h1>
        <p>Consulta, registra o modifica productos del inventario.</p>
      </header>

      <section className="productos-controls">
        <button className="btn-agregar" onClick={() => abrirModal()}>
          <PlusCircle size={18} style={{ marginRight: '8px' }} />
          Agregar producto
        </button>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </section>

      <section className="productos-tabla">
        {productosFiltrados.length > 0 ? (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Peso (kg)</th>
                <th>Volumen (m³)</th>
                <th>Precio Unitario</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.nombre}</td>
                  <td>{prod.descripcion || '-'}</td>
                  <td>{prod.peso || '-'}</td>
                  <td>{prod.volumen || '-'}</td>
                  <td>₡{prod.precioUnitario.toLocaleString()}</td>
                  <td>{prod.idProveedor}</td>
                  <td>
                    <button className="btn-accion editar" onClick={() => abrirModal(prod)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-accion eliminar" onClick={() => abrirModalEliminar(prod)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>
            No hay productos registrados.
          </p>
        )}
      </section>

      {/* Modal Agregar/Editar */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{productoEnEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h2>
              <button className="cerrar-modal" onClick={cerrarModal}>×</button>
            </div>
            <form onSubmit={manejarEnvio}>
              <div className="modal-body">
                <input name="nombre" placeholder="Nombre del producto *" value={formulario.nombre} onChange={manejarCambio} />
                <input name="descripcion" placeholder="Descripción (opcional)" value={formulario.descripcion} onChange={manejarCambio} />
                <input name="peso" type="number" step="0.01" placeholder="Peso en kg (opcional)" value={formulario.peso} onChange={manejarCambio} />
                <input name="volumen" type="number" step="0.01" placeholder="Volumen en m³ (opcional)" value={formulario.volumen} onChange={manejarCambio} />
                <input name="precioUnitario" type="number" placeholder="Precio unitario *" value={formulario.precioUnitario} onChange={manejarCambio} />
                <input name="idProveedor" placeholder="ID del proveedor *" value={formulario.idProveedor} onChange={manejarCambio} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
                <button type="submit" className="btn-agregar">
                  {productoEnEdicion ? 'Guardar cambios' : 'Registrar producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Confirmación de Eliminación */}
      {mostrarModalEliminar && (
        <div className="modal-eliminar">
          <div className="modal-contenido">
            <h2>¿Estás seguro?</h2>
            <p>¿Deseas eliminar el producto <strong>{productoAEliminar.nombre}</strong>?</p>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={cancelarEliminacion}>Cancelar</button>
              <button className="btn-confirmar" onClick={confirmarEliminacion}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;
