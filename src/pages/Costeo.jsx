import React, { useState } from "react";
import "../styles/costeo.css";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

function Costeo() {
  const [costeos, setCosteos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [costeoEnEdicion, setCosteoEnEdicion] = useState(null);
  const [costeoAEliminar, setCosteoAEliminar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [formulario, setFormulario] = useState({
    numeroPedido: "",
    cartaReporte: "",
    fechaArribo: "",
    almacenFiscal: "",
    dua: "",
    lineasCosteo: [],
  });
  const [nuevaLinea, setNuevaLinea] = useState({
    costoFabrica: "",
    moneda: "USD",
    numeroFactura: "",
    modeloMercancia: "",
    descripcion: "",
    cantidad: "",
    utilidadDeseada: "",
  });

  const abrirModalEliminar = (costeo) => {
    setCosteoAEliminar(costeo);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = () => {
    setCosteos((prev) =>
      prev.filter((c) => c.numeroPedido !== costeoAEliminar.numeroPedido)
    );
    setMostrarModalEliminar(false);
    setCosteoAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setCosteoAEliminar(null);
  };

  const abrirModal = (costeo = null) => {
    if (costeo) {
      setCosteoEnEdicion(costeo);
      setFormulario({ ...costeo });
    } else {
      setCosteoEnEdicion(null);
      setFormulario({
        numeroPedido: "",
        cartaReporte: "",
        fechaArribo: "",
        almacenFiscal: "",
        dua: "",
        lineasCosteo: [],
      });
    }
    setNuevaLinea({
      costoFabrica: "",
      moneda: "USD",
      numeroFactura: "",
      modeloMercancia: "",
      descripcion: "",
      cantidad: "",
      utilidadDeseada: "",
    });
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCosteoEnEdicion(null);
    setFormulario({
      numeroPedido: "",
      cartaReporte: "",
      fechaArribo: "",
      almacenFiscal: "",
      dua: "",
      lineasCosteo: [],
    });
    setNuevaLinea({
      costoFabrica: "",
      moneda: "USD",
      numeroFactura: "",
      modeloMercancia: "",
      descripcion: "",
      cantidad: "",
      utilidadDeseada: "",
    });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarCambioLinea = (e) => {
    const { name, value } = e.target;
    setNuevaLinea({ ...nuevaLinea, [name]: value });
  };

  const agregarLineaCosteo = () => {
    if (
      !nuevaLinea.costoFabrica ||
      !nuevaLinea.numeroFactura ||
      !nuevaLinea.cantidad ||
      !nuevaLinea.modeloMercancia ||
      !nuevaLinea.descripcion ||
      !nuevaLinea.utilidadDeseada
    ) {
      alert(
        "Por favor completa todos los campos obligatorios de la línea de costeo: Costo Fábrica, Número de Factura, Modelo Mercancía, Descripción, Cantidad y Utilidad Deseada."
      );
      return;
    }

    const cantidad = parseInt(nuevaLinea.cantidad);
    const utilidadDeseada = parseFloat(nuevaLinea.utilidadDeseada);
    if (cantidad <= 0 || utilidadDeseada <= 0) {
      alert("La Cantidad y la Utilidad Deseada deben ser mayores a 0.");
      return;
    }

    setFormulario((prev) => ({
      ...prev,
      lineasCosteo: [
        ...prev.lineasCosteo,
        { ...nuevaLinea, id: prev.lineasCosteo.length + 1 },
      ],
    }));

    setNuevaLinea({
      costoFabrica: "",
      moneda: "USD",
      numeroFactura: "",
      modeloMercancia: "",
      descripcion: "",
      cantidad: "",
      utilidadDeseada: "",
    });
  };

  const eliminarLineaCosteo = (id) => {
    setFormulario((prev) => ({
      ...prev,
      lineasCosteo: prev.lineasCosteo.filter((linea) => linea.id !== id),
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (
      !formulario.numeroPedido ||
      !formulario.fechaArribo ||
      !formulario.lineasCosteo.length
    ) {
      alert(
        "Por favor completa los campos obligatorios: número de pedido, fecha de arribo y al menos una línea de costeo."
      );
      return;
    }

    const nuevoCosteo = {
      ...formulario,
      lineasCosteo: formulario.lineasCosteo.map((linea) => ({
        ...linea,
        costoFabrica: parseFloat(linea.costoFabrica) || 0,
        cantidad: parseInt(linea.cantidad) || 0,
        utilidadDeseada: parseFloat(linea.utilidadDeseada) || 0,
        costoUnitario: parseFloat(linea.costoFabrica) || 0,
        valorTotal:
          parseFloat(linea.costoFabrica) * parseInt(linea.cantidad) || 0,
        pesoPorcentual: 0,
        fleteInterno: 0,
        fleteTransporte: 0,
        valorCIF: 0,
        tramiteAduana: 0,
        transporteCR: 0,
        costoCR: 0,
        costoIVA: 0,
        precioVenta:
          parseFloat(linea.costoFabrica) *
            (1 + parseFloat(linea.utilidadDeseada) / 100) || 0,
      })),
      costoFleteOrigen: 0,
      costoFleteCR: 0,
      costoTramiteAduana: 0,
      impuestosAduana: 0,
    };

    if (costeoEnEdicion) {
      setCosteos((prev) =>
        prev.map((c) =>
          c.numeroPedido === costeoEnEdicion.numeroPedido ? nuevoCosteo : c
        )
      );
    } else {
      setCosteos((prev) => [
        ...prev,
        { ...nuevoCosteo, numeroPedido: `COST-${prev.length + 1}` },
      ]);
    }

    cerrarModal();
  };

  const costeosFiltrados = costeos.filter((c) =>
    c.numeroPedido.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="costeo-wrapper">
      <header className="costeo-header">
        <h1>Gestión de Costeos</h1>
        <p>Consulta, registra o modifica costeos.</p>
      </header>

      <section className="costeo-controls">
        <button className="btn-agregar" onClick={() => abrirModal()}>
          <PlusCircle size={18} style={{ marginRight: "8px" }} />
          Agregar Costeo
        </button>
        <input
          type="text"
          placeholder="Buscar por número de pedido..."
          className="input-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </section>

      <section className="costeo-tabla">
        {costeosFiltrados.length > 0 ? (
          <table className="tabla-costeos">
            <thead>
              <tr>
                <th>Nº Pedido</th>
                <th>Carta Reporte</th>
                <th>Fecha Arribo</th>
                <th>Almacén Fiscal</th>
                <th>DUA</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {costeosFiltrados.map((cost) => (
                <tr key={cost.numeroPedido}>
                  <td>{cost.numeroPedido}</td>
                  <td>{cost.cartaReporte || "-"}</td>
                  <td>{cost.fechaArribo}</td>
                  <td>{cost.almacenFiscal || "-"}</td>
                  <td>{cost.dua || "-"}</td>
                  <td>
                    <button
                      className="btn-accion editar"
                      onClick={() => abrirModal(cost)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-accion eliminar"
                      onClick={() => abrirModalEliminar(cost)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: "center", marginTop: "30px" }}>
            No hay costeos registrados.
          </p>
        )}
      </section>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{costeoEnEdicion ? "Editar Costeo" : "Nuevo Costeo"}</h2>
              <button className="cerrar-modal" onClick={cerrarModal}>
                ×
              </button>
            </div>
            <form onSubmit={manejarEnvio}>
              <div className="modal-body">
                <input
                  name="numeroPedido"
                  placeholder="Número de Pedido *"
                  value={formulario.numeroPedido}
                  onChange={manejarCambio}
                />
                <input
                  name="cartaReporte"
                  placeholder="Carta Reporte (opcional)"
                  value={formulario.cartaReporte}
                  onChange={manejarCambio}
                />
                <div className="flex items-center gap-2">
                  <label htmlFor="fechaArribo">Fecha de arribo a CR</label>
                  <input
                    id="fechaArribo"
                    name="fechaArribo"
                    type="date"
                    value={formulario.fechaArribo}
                    onChange={manejarCambio}
                  />
                </div>
                <input
                  name="almacenFiscal"
                  placeholder="Almacén Fiscal (opcional)"
                  value={formulario.almacenFiscal}
                  onChange={manejarCambio}
                />
                <input
                  name="dua"
                  placeholder="DUA (opcional)"
                  value={formulario.dua}
                  onChange={manejarCambio}
                />
              </div>

              <div className="linea-costeo-section">
                <h3>Línea de Costeo</h3>
                <div className="modal-body">
                  <input
                    name="costoFabrica"
                    type="number"
                    step="0.01"
                    placeholder="Costo Fábrica *"
                    value={nuevaLinea.costoFabrica}
                    onChange={manejarCambioLinea}
                  />
                  <select
                    name="moneda"
                    value={nuevaLinea.moneda}
                    onChange={manejarCambioLinea}
                  >
                    <option value="USD">USD</option>
                    <option value="CRC">CRC</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <input
                    name="numeroFactura"
                    placeholder="Número de Factura *"
                    value={nuevaLinea.numeroFactura}
                    onChange={manejarCambioLinea}
                  />
                  <input
                    name="modeloMercancia"
                    placeholder="Modelo Mercancía *"
                    value={nuevaLinea.modeloMercancia}
                    onChange={manejarCambioLinea}
                  />
                  <input
                    name="descripcion"
                    placeholder="Descripción *"
                    value={nuevaLinea.descripcion}
                    onChange={manejarCambioLinea}
                  />
                  <input
                    name="cantidad"
                    type="number"
                    min="1"
                    placeholder="Cantidad *"
                    value={nuevaLinea.cantidad}
                    onChange={manejarCambioLinea}
                  />
                  <input
                    name="utilidadDeseada"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="Utilidad Deseada % *"
                    value={nuevaLinea.utilidadDeseada}
                    onChange={manejarCambioLinea}
                  />
                </div>
                <button
                  type="button"
                  className="btn-agregar-linea"
                  onClick={agregarLineaCosteo}
                >
                  Agregar Línea
                </button>
                {formulario.lineasCosteo.length > 0 && (
                  <table className="linea-costeo-table">
                    <thead>
                      <tr>
                        <th>Costo Fábrica</th>
                        <th>Moneda</th>
                        <th>Nº Factura</th>
                        <th>Modelo</th>
                        <th>Descripción</th>
                        <th>Cantidad</th>
                        <th>Utilidad %</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formulario.lineasCosteo.map((linea) => (
                        <tr key={linea.id}>
                          <td>{linea.costoFabrica}</td>
                          <td>{linea.moneda}</td>
                          <td>{linea.numeroFactura}</td>
                          <td>{linea.modeloMercancia || "-"}</td>
                          <td>{linea.descripcion || "-"}</td>
                          <td>{linea.cantidad}</td>
                          <td>{linea.utilidadDeseada || "-"}</td>
                          <td>
                            <button
                              type="button"
                              className="btn-accion eliminar"
                              onClick={() => eliminarLineaCosteo(linea.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancelar"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-agregar">
                  {costeoEnEdicion ? "Guardar Cambios" : "Registrar Costeo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarModalEliminar && (
        <div className="modal-eliminar">
          <div className="modal-contenido">
            <h2>¿Estás seguro?</h2>
            <p>
              ¿Deseas eliminar el costeo{" "}
              <strong>{costeoAEliminar.numeroPedido}</strong>?
            </p>
            <div className="modal-botones">
              <button className="btn-cancelar" onClick={cancelarEliminacion}>
                Cancelar
              </button>
              <button className="btn-confirmar" onClick={confirmarEliminacion}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Costeo;
