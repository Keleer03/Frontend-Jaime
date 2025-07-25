import React, { useState } from "react";
import "../styles/pedidos.css";

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

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState({
    cliente: "",
    productos: [crearProductoVacio()],
  });

  function crearProductoVacio() {
    return {
      idProducto: "",
      descripcion: "",
      proveedor: "",
      cantidad: "",
      unidades: "",
      costoUnitario: "",
      total: "",
    };
  }

  const agregarProducto = () => {
    setNuevoPedido({
      ...nuevoPedido,
      productos: [...nuevoPedido.productos, crearProductoVacio()],
    });
  };

  const actualizarProducto = (index, campo, valor) => {
    const nuevosProductos = [...nuevoPedido.productos];
    nuevosProductos[index][campo] = valor;
    setNuevoPedido({ ...nuevoPedido, productos: nuevosProductos });
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = [...nuevoPedido.productos];
    nuevosProductos.splice(index, 1);
    setNuevoPedido({ ...nuevoPedido, productos: nuevosProductos });
  };

  const guardarPedido = () => {
    if (!nuevoPedido.cliente.trim()) {
      alert("Por favor ingresa el nombre del cliente.");
      return;
    }
    // Aquí van las validaciones...

    const nuevo = {
      ...nuevoPedido,
      numeroOrden: pedidos.length + 1,
      productos: nuevoPedido.productos.map((p) => ({
        ...p,
        total: p.total || "",
      })),
    };
    setPedidos([...pedidos, nuevo]);
    setNuevoPedido({ cliente: "", productos: [crearProductoVacio()] });
    setMostrarFormulario(false);
  };

  return (
    <div className="pedidos-wrapper">
      <header className="pedidos-header">
        <h1>Gestión de Pedidos</h1>
        <p>Registra nuevos pedidos y revisa el historial.</p>
      </header>

      <button
        className="btn-mostrar-formulario"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? "Cancelar" : "Nuevo pedido"}
      </button>

      {mostrarFormulario && (
        <section className="nuevo-pedido">
          <input
            type="text"
            placeholder="Nombre del cliente"
            value={nuevoPedido.cliente}
            onChange={(e) =>
              setNuevoPedido({ ...nuevoPedido, cliente: e.target.value })
            }
          />

          {nuevoPedido.productos.map((prod, i) => (
            <div key={i} className="producto-linea">
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
                    prodSeleccionado ? prodSeleccionado.nombre : ""
                  );
                }}
              >
                <option value="">Seleccione producto</option>
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
              >
                <option value="">Seleccione proveedor</option>
                {proveedoresEjemplo.map((prov) => (
                  <option key={prov.id} value={prov.nombre}>
                    {prov.nombre}
                  </option>
                ))}
              </select>

              <div className="grupo-cantidad">
                <input
                  type="text"
                  placeholder="Cantidad"
                  value={prod.cantidad}
                  onChange={(e) =>
                    actualizarProducto(i, "cantidad", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Unidades"
                  value={prod.unidades}
                  onChange={(e) =>
                    actualizarProducto(i, "unidades", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder="Costo unitario (USD)"
                  value={prod.costoUnitario}
                  onChange={(e) =>
                    actualizarProducto(i, "costoUnitario", e.target.value)
                  }
                />
              </div>

              <button
                type="button"
                className="btn-eliminar-prod"
                onClick={() => eliminarProducto(i)}
                title="Eliminar producto"
              >
                &times;
              </button>
            </div>
          ))}

          <div className="botones-pedido">
            <button
              type="button"
              className="btn-agregar-prod"
              onClick={agregarProducto}
            >
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
        </section>
      )}

      <section className="historial-pedidos">
        <h2>Pedidos Registrados</h2>
        {pedidos.length === 0 && <p>No hay pedidos registrados.</p>}

        {pedidos.map((pedido, idx) => (
          <div key={idx} className="pedido-item">
            <h3>Pedido #{pedido.numeroOrden || idx + 1}</h3>
            <div className="pedido-detalle">
              <div>
                <strong>Cliente:</strong> {pedido.cliente}
              </div>
              <div>
                <strong>Número de orden:</strong>{" "}
                {pedido.numeroOrden || "Pendiente"}
              </div>
            </div>
            <div className="pedido-detalle">
              {pedido.productos.map((p, i) => (
                <div key={i} className="producto-detalle">
                  <span>
                    <strong>ID:</strong> {p.idProducto || "-"}
                  </span>
                  <span>
                    <strong>Desc:</strong> {p.descripcion || "-"}
                  </span>
                  <span>
                    <strong>Proveedor:</strong> {p.proveedor || "-"}
                  </span>
                  <span>
                    <strong>Cant:</strong> {p.cantidad || "-"}
                  </span>
                  <span>
                    <strong>Unid:</strong> {p.unidades || "-"}
                  </span>
                  <span>
                    <strong>Costo Unit.:</strong> {p.costoUnitario || "-"}
                  </span>
                  <span>
                    <strong>Total:</strong> {p.total || "-"}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn-eliminar-pedido"
              onClick={() => {
                const nuevosPedidos = [...pedidos];
                nuevosPedidos.splice(idx, 1);
                setPedidos(nuevosPedidos);
              }}
            >
              Eliminar pedido
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
