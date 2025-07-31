import React, { useState, useEffect } from 'react';
import '../Styles/Productos.css';
import ProductosModal from '../components/Modals/ProductosModal';
import MensajeEliminar from '../components/Messages/mensajeEliminar';
import BotonAgregar from '../components/Buttons/botonAgregar';
import { Edit, Trash2 } from 'lucide-react';

function Productos() {
  const [productos, setProductos] = useState(() => {
    const saved = localStorage.getItem('productos');
    const initialProductos = saved ? JSON.parse(saved) : [];
    return Array.isArray(initialProductos) ? initialProductos : [];
  });
  const [busqueda, setBusqueda] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const productosFiltrados = productos.filter((p) =>
    Object.values(p).some((val) =>
      val?.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  const handleEliminar = (producto) => {
    setProductoAEliminar(producto);
    setMostrarEliminar(true);
  };

  const confirmarEliminacion = () => {
    setProductos((prev) => prev.filter((p) => p.id !== productoAEliminar.id));
    setMostrarEliminar(false);
    setProductoAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarEliminar(false);
    setProductoAEliminar(null);
  };

  return (
    <div className="productos-wrapper">
      <header className="productos-header">
        <h1>Gestión de Productos</h1>
        <p>Consulta, registra o modifica productos del inventario.</p>
      </header>
      <section className="productos-controls">
        <BotonAgregar onClick={() => setMostrarModal(true)} />
        <input
          type="text"
          placeholder="Buscar por cualquier campo..."
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </section>
      <section className="productos-tabla">
        {productosFiltrados.length > 0 ? (
          <div className="tabla-contenedor">
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Peso (kg)</th>
                  <th>Volumen (m³)</th>
                  <th>Precio Unitario</th>
                  <th>Proveedor(s)</th>
                  <th>Comentarios</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.codigoProducto || '-'}</td>
                    <td>{prod.nombre || '-'}</td>
                    <td>{prod.descripcion || '-'}</td>
                    <td>{prod.peso || '-'}</td>
                    <td>{prod.volumen || '-'}</td>
                    <td>{prod.moneda || ''}{prod.precioUnitario?.toLocaleString() || '0'}</td>
                    <td>{Array.isArray(prod.idProveedor) ? prod.idProveedor.join(', ') : '-'}</td>
                    <td>{prod.comentarios || '-'}</td>
                    <td>
                      <button
                        className="btn-accion editar"
                        onClick={() => {
                          setProductoEnEdicion(prod);
                          setMostrarModal(true);
                        }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn-accion eliminar"
                        onClick={() => handleEliminar(prod)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-productos">No hay productos registrados.</p>
        )}
      </section>
      <ProductosModal
        show={mostrarModal}
        onClose={() => {
          setMostrarModal(false);
          setProductoEnEdicion(null);
        }}
        producto={productoEnEdicion}
        setProductos={setProductos}
      />
      <MensajeEliminar
        show={mostrarEliminar}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
        mensaje={`¿Deseas eliminar el producto ${productoAEliminar?.nombre || ''}?`}
      />
    </div>
  );
}

export default Productos;