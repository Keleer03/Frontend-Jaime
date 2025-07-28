import React, { useState } from 'react';
import '../styles/pedidos.css';
import { PlusCircle, Trash2 } from 'lucide-react';

const productosEjemplo = [
  { id: 'p1', nombre: 'Producto 1' },
  { id: 'p2', nombre: 'Producto 2' },
  { id: 'p3', nombre: 'Producto 3' },
];

const proveedoresEjemplo = [
  { id: 'prov1', nombre: 'Proveedor A' },
  { id: 'prov2', nombre: 'Proveedor B' },
  { id: 'prov3', nombre: 'Proveedor C' },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(null);

  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: '',
    productos: [crearProductoVacio()],
  });

  function crearProductoVacio() {
    return {
      idProducto: '',
      descripcion: '',
      proveedor: '',
      cantidad: '',
      unidades: '',
      costoUnitario: '',
      total: '',
    };
  }

  const agregarProducto = () => {
    setNuevoPedido((prev) => ({
      ...prev,
      productos: [...prev.productos, crearProductoVacio()],
    }));
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...nuevoPedido.productos];
    if (campo === 'cantidad' || campo === 'costoUnitario') {
      if (!/^\d*\.?\d*$/.test(valor)) return;
    }
    nuevosProductos[index][campo] = valor;

    if (campo === 'cantidad' || campo === 'costoUnitario') {
      const cantidad = parseFloat(nuevosProductos[index].cantidad) || 0;
      const costoUnitario = parseFloat(nuevosProductos[index].costoUnitario) || 0;
      nuevosProductos[index].total = (cantidad * costoUnitario).toFixed(2);
    }

    setNuevoPedido({ ...nuevoPedido, productos: nuevosProductos });
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = [...nuevoPedido.productos];
    nuevosProductos.splice(index, 1);
    setNuevoPedido({ ...nuevoPedido, productos: nuevosProductos });
  };

  const guardarPedido = () => {
    if (!nuevoPedido.cliente.trim()) {
      alert('Por favor ingresa el nombre del cliente.');
      return;
    }

    const nuevo = {
      ...nuevoPedido,
      numeroOrden: pedidos.length + 1,
    };

    setPedidos([...pedidos, nuevo]);
    setNuevoPedido({ cliente: '', productos: [crearProductoVacio()] });
    setMostrarModal(false);
  };

  const confirmarEliminarPedido = (index) => {
    setConfirmarEliminacion(index);
  };

  const eliminarPedido = () => {
    const copia = [...pedidos];
    copia.splice(confirmarEliminacion, 1);
    setPedidos(copia);
    setConfirmarEliminacion(null);
  };

  return (
    <div className="pedidos-wrapper">
      <header className="pedidos-header">
        <h1>Gestión de Pedidos</h1>
        <p>Registra nuevos pedidos y revisa el historial.</p>
      </header>

      <button className="btn-agregar-prod" onClick={() => setMostrarModal(true)}>
        <PlusCircle size={18} style={{ marginRight: '8px' }} />
        Nuevo pedido
      </button>

      <section className="pedidos-tabla">
        <h2>Pedidos Registrados</h2>
        {pedidos.length === 0 && <p>No hay pedidos registrados.</p>}

        {pedidos.map((pedido, idx) => (
          <div key={idx} className="pedido-item">
            <h3>Pedido #{pedido.numeroOrden}</h3>
            <div className="pedido-detalle">
              <div><strong>Cliente:</strong> {pedido.cliente}</div>
              <div><strong>Número de orden:</strong> {pedido.numeroOrden}</div>
            </div>
            <div className="pedido-detalle">
              {pedido.productos.map((p, i) => (
                <div key={i} className="producto-detalle">
                  <span><strong>ID:</strong> {p.idProducto}</span>
                  <span><strong>Desc:</strong> {p.descripcion}</span>
                  <span><strong>Proveedor:</strong> {p.proveedor}</span>
                  <span><strong>Cant:</strong> {p.cantidad}</span>
                  <span><strong>Unid:</strong> {p.unidades}</span>
                  <span><strong>Costo Unit.:</strong> {p.costoUnitario}</span>
                  <span><strong>Total:</strong> {p.total}</span>
                </div>
              ))}
            </div>
            <button className="btn-eliminar-pedido" onClick={() => confirmarEliminarPedido(idx)}>
              <Trash2 size={16} /> Eliminar pedido
            </button>
          </div>
        ))}
      </section>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Nuevo Pedido</h2>
              <button className="cerrar-modal" onClick={() => setMostrarModal(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="cliente-input">
                <label>Cliente</label>
                <input
                  className="input-cliente"
                  type="text"
                  placeholder="Nombre del cliente"
                  value={nuevoPedido.cliente}
                  onChange={(e) => setNuevoPedido({ ...nuevoPedido, cliente: e.target.value })}
                />
              </div>

              {nuevoPedido.productos.map((prod, i) => (
                <div key={i} className="producto-linea">
                  <select
                    value={prod.idProducto}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const prodSeleccionado = productosEjemplo.find(p => p.id === selectedId);
                      actualizarProducto(i, 'idProducto', selectedId);
                      actualizarProducto(i, 'descripcion', prodSeleccionado?.nombre || '');
                    }}
                  >
                    <option value="">Seleccione producto</option>
                    {productosEjemplo.map((p) => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>

                  <select
                    value={prod.proveedor}
                    onChange={(e) => actualizarProducto(i, 'proveedor', e.target.value)}
                  >
                    <option value="">Seleccione proveedor</option>
                    {proveedoresEjemplo.map((prov) => (
                      <option key={prov.id} value={prov.nombre}>{prov.nombre}</option>
                    ))}
                  </select>

                  <div className="grupo-cantidad">
                    <input
                      type="text"
                      placeholder="Cantidad"
                      value={prod.cantidad}
                      onChange={(e) => actualizarProducto(i, 'cantidad', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Unidades"
                      value={prod.unidades}
                      onChange={(e) => actualizarProducto(i, 'unidades', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Costo unitario (USD)"
                      value={prod.costoUnitario}
                      onChange={(e) => actualizarProducto(i, 'costoUnitario', e.target.value)}
                    />
                  </div>

                  {nuevoPedido.productos.length > 1 && (
                    <button
                      type="button"
                      className="btn-eliminar-prod"
                      onClick={() => eliminarProducto(i)}
                      title="Eliminar producto"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <div className="botones-pedido">
                <button type="button" className="btn-agregar-prod" onClick={agregarProducto}>
                  Agregar producto
                </button>
                <button type="button" className="btn-guardar-pedido" onClick={guardarPedido}>
                  Guardar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmarEliminacion !== null && (
        <div className="modal-overlay">
          <div className="modal confirmacion">
            <h3>¿Eliminar este pedido?</h3>
            <p>Esta acción no se puede deshacer.</p>
            <div className="botones-pedido">
              <button className="btn-agregar-prod" onClick={() => setConfirmarEliminacion(null)}>
                Cancelar
              </button>
              <button className="btn-eliminar-pedido" onClick={eliminarPedido}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
