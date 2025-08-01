import React, { useState } from "react";
import "../styles/pedidos.css";
import { PlusCircle, Trash2 } from "lucide-react";

const productosEjemplo = [
  { id: "p1", nombre: "Producto 1" },
  { id: "p2", nombre: "Producto 2" },
  { id: "p3", nombre: "Producto 3" },
];

const proveedoresEjemplo = [
  { id: "prov1", nombre: "Proveedor A" },
  { id: "prov2", nombre: "Proveedor B" },
  { id: "prov3", nombre: "Proveedor C" },
];

const monedas = [
  { id: "USD", nombre: "USD" },
  { id: "EUR", nombre: "EUR" },
  { id: "CRC", nombre: "CRC" },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(null);
  const [mostrarError, setMostrarError] = useState(false);

  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: "",
    productos: [
      {
        idProducto: "",
        descripcion: "",
        proveedor: "",
        cantidad: "",
        unidades: "",
        costoUnitario: "",
        moneda: "USD",
        total: "",
        notas: "",
      },
    ],
  });

  const abrirModal = () => {
    setNuevoPedido({
      cliente: "",
      productos: [
        {
          idProducto: "",
          descripcion: "",
          proveedor: "",
          cantidad: "",
          unidades: "",
          costoUnitario: "",
          moneda: "USD",
          total: "",
          notas: "",
        },
      ],
    });
    setMostrarModal(true);
  };

  const agregarProducto = () => {
    setNuevoPedido((prev) => ({
      ...prev,
      productos: [
        ...prev.productos,
        {
          idProducto: "",
          descripcion: "",
          proveedor: "",
          cantidad: "",
          unidades: "",
          costoUnitario: "",
          moneda: "USD",
          total: "",
          notas: "",
        },
      ],
    }));
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...nuevoPedido.productos];
    if (campo === "cantidad" || campo === "costoUnitario") {
      if (!/^\d*\.?\d*$/.test(valor)) return;
    }
    nuevosProductos[index][campo] = valor;

    if (campo === "cantidad" || campo === "costoUnitario") {
      const cantidad = parseFloat(nuevosProductos[index].cantidad) || 0;
      const costoUnitario =
        parseFloat(nuevosProductos[index].costoUnitario) || 0;
      nuevosProductos[index].total = (cantidad * costoUnitario).toFixed(2);
    }

    setNuevoPedido({ ...nuevoPedido, productos: nuevosProductos });
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = [...nuevoPedido.productos];
    nuevosProductos.splice(index, 1);
    setNuevoPedido({
      ...nuevoPedido,
      productos: nuevosProductos.length
        ? nuevosProductos
        : [
            {
              idProducto: "",
              descripcion: "",
              proveedor: "",
              cantidad: "",
              unidades: "",
              costoUnitario: "",
              moneda: "USD",
              total: "",
              notas: "",
            },
          ],
    });
  };

  const guardarPedido = () => {
    if (!nuevoPedido.cliente.trim()) {
      setMostrarError("Por favor ingresa el nombre del cliente.");
      return;
    }

    const todosValidos = nuevoPedido.productos.every(
      (p) =>
        p.idProducto &&
        p.descripcion &&
        p.proveedor &&
        p.cantidad &&
        p.unidades &&
        p.costoUnitario &&
        p.moneda
    );
    if (!todosValidos) {
      setMostrarError(
        "Todos los campos de los productos son obligatorios, incluyendo la moneda."
      );
      return;
    }

    const nuevo = {
      ...nuevoPedido,
      numeroOrden: pedidos.length + 1,
      productos: nuevoPedido.productos.map((p) => ({
        ...p,
        cantidad: parseFloat(p.cantidad),
        costoUnitario: parseFloat(p.costoUnitario),
        total: parseFloat(p.total),
      })),
    };

    setPedidos([...pedidos, nuevo]);
    setMostrarModal(false);
    setNuevoPedido({
      cliente: "",
      productos: [
        {
          idProducto: "",
          descripcion: "",
          proveedor: "",
          cantidad: "",
          unidades: "",
          costoUnitario: "",
          moneda: "USD",
          total: "",
          notas: "",
        },
      ],
    });
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

  const cerrarError = () => {
    setMostrarError(false);
  };

  return (
    <div className="pedidos-wrapper">
      <header className="pedidos-header">
        <h1>Gestión de Pedidos</h1>
        <p>Registra nuevos pedidos y revisa el historial.</p>
      </header>

      <button className="btn-agregar-prod" onClick={abrirModal}>
        <PlusCircle size={18} style={{ marginRight: "8px" }} />
        Nuevo pedido
      </button>

      <section className="pedidos-tabla">
        <h2>Pedidos Registrados</h2>
        {pedidos.length === 0 && <p>No hay pedidos registrados.</p>}

        {pedidos.map((pedido, idx) => (
          <div key={idx} className="pedido-item">
            <h3>Pedido #{pedido.numeroOrden}</h3>
            <div className="pedido-detalle">
              <div>
                <strong>Cliente:</strong> {pedido.cliente}
              </div>
              <div>
                <strong>Número de orden:</strong> {pedido.numeroOrden}
              </div>
            </div>
            <div className="pedido-detalle">
              {pedido.productos.map((p, i) => (
                <div key={i} className="producto-detalle">
                  <span>
                    <strong>ID:</strong> {p.idProducto}
                  </span>
                  <span>
                    <strong>Desc:</strong> {p.descripcion}
                  </span>
                  <span>
                    <strong>Proveedor:</strong> {p.proveedor}
                  </span>
                  <span>
                    <strong>Cant:</strong> {p.cantidad}
                  </span>
                  <span>
                    <strong>Unid:</strong> {p.unidades}
                  </span>
                  <span>
                    <strong>Costo Unit.:</strong> {p.costoUnitario} {p.moneda}
                  </span>
                  <span>
                    <strong>Total:</strong> {p.total} {p.moneda}
                  </span>
                  {p.notas && (
                    <span style={{ whiteSpace: "pre-wrap" }}>
                      <strong>Notas:</strong> {p.notas}
                    </span>
                  )}
                </div>
              ))}
            </div>
            <button
              className="btn-eliminar-pedido"
              onClick={() => confirmarEliminarPedido(idx)}
            >
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
              <button
                className="cerrar-modal"
                onClick={() => setMostrarModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-rows">
                <div className="form-row cliente-row">
                  <h2 className="field-label">Cliente</h2>
                  <input
                    className="input-cliente"
                    type="text"
                    placeholder="Nombre del cliente"
                    value={nuevoPedido.cliente}
                    onChange={(e) =>
                      setNuevoPedido({
                        ...nuevoPedido,
                        cliente: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="form-row product-header-row">
                  <span className="field-label">Producto</span>
                  <span className="field-label">Proveedor</span>
                  <span className="field-label">Cantidad</span>
                  <span className="field-label">Unidades</span>
                  <span className="field-label">Costo Unit.</span>
                  <span className="field-label">Moneda</span>
                  <span className="field-label">Notas</span>
                  <span className="field-label">Acción</span>
                </div>

                {nuevoPedido.productos.map((prod, i) => (
                  <div key={i} className="form-row producto-row">
                    <select
                      value={prod.idProducto}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const prodSeleccionado = productosEjemplo.find(
                          (p) => p.id === selectedId
                        );
                        actualizarProducto(i, "idProducto", selectedId);
                        actualizarProducto(
                          i,
                          "descripcion",
                          prodSeleccionado?.nombre || ""
                        );
                      }}
                      required
                    >
                      <option value="">Producto</option>
                      {productosEjemplo.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                    <select
                      value={prod.proveedor}
                      onChange={(e) =>
                        actualizarProducto(i, "proveedor", e.target.value)
                      }
                      required
                    >
                      <option value="">Proveedor</option>
                      {proveedoresEjemplo.map((prov) => (
                        <option key={prov.id} value={prov.nombre}>
                          {prov.nombre}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Cantidad"
                      value={prod.cantidad}
                      onChange={(e) =>
                        actualizarProducto(i, "cantidad", e.target.value)
                      }
                      required
                    />
                    <input
                      type="text"
                      placeholder="Unidades"
                      value={prod.unidades}
                      onChange={(e) =>
                        actualizarProducto(i, "unidades", e.target.value)
                      }
                      required
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Costo unitario"
                      value={prod.costoUnitario}
                      onChange={(e) =>
                        actualizarProducto(i, "costoUnitario", e.target.value)
                      }
                      required
                    />
                    <select
                      value={prod.moneda}
                      onChange={(e) =>
                        actualizarProducto(i, "moneda", e.target.value)
                      }
                      required
                    >
                      {monedas.map((moneda) => (
                        <option key={moneda.id} value={moneda.id}>
                          {moneda.nombre}
                        </option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Notas o comentarios"
                      value={prod.notas}
                      onChange={(e) =>
                        actualizarProducto(i, "notas", e.target.value)
                      }
                    />
                    <button
                      className="btn-eliminar-producto"
                      onClick={() => eliminarProducto(i)}
                      title="Eliminar producto"
                    >
                      ×
                    </button>
                  </div>
                ))}

                <div className="form-row button-row">
                  <div className="botones-pedido">
                    <button
                      type="button"
                      className="btn-agregar-prod"
                      onClick={agregarProducto}
                    >
                      <PlusCircle size={18} style={{ marginRight: "8px" }} />
                      Agregar producto
                    </button>
                    <button
                      type="button"
                      className="btn-guardar-pedido"
                      onClick={guardarPedido}
                    >
                      Guardar pedido
                    </button>
                  </div>
                </div>
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
              <button
                className="btn-agregar-prod"
                onClick={() => setConfirmarEliminacion(null)}
              >
                Cancelar
              </button>
              <button className="btn-eliminar-pedido" onClick={eliminarPedido}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarError && (
        <div className="modal-overlay">
          <div className="modal confirmacion">
            <h3>Error</h3>
            <p>{mostrarError}</p>
            <div className="botones-pedido">
              <button className="btn-agregar-prod" onClick={cerrarError}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
