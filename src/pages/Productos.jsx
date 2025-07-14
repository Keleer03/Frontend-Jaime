import React, { useState } from 'react';
import '../styles/productos.css';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const productosEjemplo = [
  {
    id: 1,
    codigo: 'PRD001',
    nombre: 'Granito Blanco',
    precio: 45000,
    cantidad: 20,
    peso: 35,
    volumen: 2.5,
    permisosEspeciales: ['Ninguno'],
  },
  {
    id: 2,
    codigo: 'PRD002',
    nombre: 'Mármol Gris',
    precio: 62000,
    cantidad: 12,
    peso: 28,
    volumen: 1.8,
    permisosEspeciales: ['Transporte químico'],
  }
];

function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [orden, setOrden] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [productos, setProductos] = useState(productosEjemplo);
  const [formulario, setFormulario] = useState({
    codigo: '',
    nombre: '',
    precio: '',
    cantidad: '',
    peso: '',
    volumen: '',
    permisosEspeciales: ''
  });

  const nombresUnicos = [...new Set(productos.map(p => p.nombre))];

  let productosFiltrados = productos.filter((prod) => {
    const query = busqueda.toLowerCase();
    return (
      (prod.nombre.toLowerCase().includes(query) || prod.codigo.toLowerCase().includes(query)) &&
      (nombreFiltro === '' || prod.nombre === nombreFiltro)
    );
  });

  productosFiltrados.sort((a, b) => {
    if (!orden) return 0;
    if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
    if (orden === 'precio') return a.precio - b.precio;
    return 0;
  });

  const abrirModal = (producto = null) => {
    if (producto) {
      setProductoEnEdicion(producto);
      setFormulario({
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        peso: producto.peso,
        volumen: producto.volumen,
        permisosEspeciales: producto.permisosEspeciales.join(', ')
      });
    } else {
      setFormulario({
        codigo: '',
        nombre: '',
        precio: '',
        cantidad: '',
        peso: '',
        volumen: '',
        permisosEspeciales: ''
      });
      setProductoEnEdicion(null);
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setFormulario({
      codigo: '',
      nombre: '',
      precio: '',
      cantidad: '',
      peso: '',
      volumen: '',
      permisosEspeciales: ''
    });
    setProductoEnEdicion(null);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!formulario.codigo || !formulario.nombre || !formulario.precio) {
      alert('Los campos Código, Nombre y Precio son obligatorios.');
      return;
    }

    const productoProcesado = {
      ...formulario,
      precio: parseFloat(formulario.precio),
      cantidad: parseInt(formulario.cantidad),
      peso: parseFloat(formulario.peso),
      volumen: parseFloat(formulario.volumen),
      permisosEspeciales: formulario.permisosEspeciales.split(',').map(p => p.trim())
    };

    if (productoEnEdicion) {
      setProductos(prev => prev.map(p => p.id === productoEnEdicion.id ? { ...p, ...productoProcesado } : p));
    } else {
      const nuevoProducto = {
        id: productos.length + 1,
        ...productoProcesado
      };
      setProductos([...productos, nuevoProducto]);
    }

    cerrarModal();
  };

  const confirmarEliminar = (producto) => {
    setProductoAEliminar(producto);
  };

  const eliminarProductoConfirmado = () => {
    setProductos(prev => prev.filter(p => p.id !== productoAEliminar.id));
    setProductoAEliminar(null);
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null);
  };

  return (
    <div className="productos-wrapper">
      <header className="productos-header">
        <h1>Gestión de Productos</h1>
        <p>Aquí puedes ver, agregar, editar o eliminar tus productos registrados.</p>
      </header>

      <section className="productos-controls">
        <button className="btn-agregar" onClick={() => abrirModal()}>
          <PlusCircle size={18} style={{ marginRight: '8px' }} />
          Agregar producto
        </button>

        <div className="busqueda-filtros">
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            className="input-busqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
            className="select-filtro"
          >
            <option value="">Todos los nombres</option>
            {nombresUnicos.map((nombre) => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </select>

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="select-filtro"
          >
            <option value="">Ordenar por...</option>
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
          </select>
        </div>
      </section>

      <section className="productos-tabla">
        {productosFiltrados.length > 0 ? (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Peso (kg)</th>
                <th>Volumen (m²)</th>
                <th>Permisos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.codigo}</td>
                  <td>{prod.nombre}</td>
                  <td>₡{prod.precio.toLocaleString()}</td>
                  <td>{prod.cantidad}</td>
                  <td>{prod.peso}</td>
                  <td>{prod.volumen}</td>
                  <td>{prod.permisosEspeciales.join(', ')}</td>
                  <td>
                    <button className="btn-accion editar" onClick={() => abrirModal(prod)}>
                      <Edit size={16} />
                    </button>
                    <button className="btn-accion eliminar" onClick={() => confirmarEliminar(prod)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>
            No se encontraron productos.
          </p>
        )}
      </section>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{productoEnEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h2>
              <button className="cerrar-modal" onClick={cerrarModal}>×</button>
            </div>
            <form onSubmit={manejarEnvio}>
              <div className="modal-body">
                <input name="codigo" placeholder="Código *" value={formulario.codigo} onChange={manejarCambio} />
                <input name="nombre" placeholder="Nombre *" value={formulario.nombre} onChange={manejarCambio} />
                <input name="precio" type="number" placeholder="Precio *" value={formulario.precio} onChange={manejarCambio} />
                <input name="cantidad" type="number" placeholder="Cantidad" value={formulario.cantidad} onChange={manejarCambio} />
                <input name="peso" type="number" placeholder="Peso (kg)" value={formulario.peso} onChange={manejarCambio} />
                <input name="volumen" type="number" placeholder="Volumen (m²)" value={formulario.volumen} onChange={manejarCambio} />
                <input name="permisosEspeciales" placeholder="Permisos especiales (separados por coma)" value={formulario.permisosEspeciales} onChange={manejarCambio} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>Cancelar</button>
                <button type="submit" className="btn-agregar">{productoEnEdicion ? 'Guardar cambios' : 'Guardar producto'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {productoAEliminar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirmar eliminación</h2>
              <button className="cerrar-modal" onClick={cancelarEliminar}>×</button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el producto <strong>{productoAEliminar.nombre}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cancelarEliminar}>Cancelar</button>
              <button className="btn-agregar" onClick={eliminarProductoConfirmado}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;
