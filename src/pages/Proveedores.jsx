import React, { useState } from "react";
import "../styles/proveedores.css";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

// Lista de países de ejemplo
const paises = [
  { id: "AR", nombre: "Argentina" },
  { id: "BR", nombre: "Brasil" },
  { id: "CL", nombre: "Chile" },
  { id: "CO", nombre: "Colombia" },
  { id: "MX", nombre: "México" },
  { id: "US", nombre: "Estados Unidos" },
];

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorEnEdicion, setProveedorEnEdicion] = useState(null);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const abrirModalEliminar = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = () => {
    setProveedores((prev) =>
      prev.filter((p) => p.id !== proveedorAEliminar.id)
    );
    setMostrarModalEliminar(false);
    setProveedorAEliminar(null);
  };

  const cancelarEliminacion = () => {
    setMostrarModalEliminar(false);
    setProveedorAEliminar(null);
  };

  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion1: "",
    direccion2: "",
    direccion3: "",
    idPais: "",
  });

  const abrirModal = (proveedor = null) => {
    if (proveedor) {
      setProveedorEnEdicion(proveedor);
      setFormulario({ ...proveedor });
    } else {
      setProveedorEnEdicion(null);
      setFormulario({
        nombre: "",
        telefono: "",
        correo: "",
        direccion1: "",
        direccion2: "",
        direccion3: "",
        idPais: "",
      });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProveedorEnEdicion(null);
    setFormulario({
      nombre: "",
      telefono: "",
      correo: "",
      direccion1: "",
      direccion2: "",
      direccion3: "",
      idPais: "",
    });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.telefono ||
      !formulario.idPais ||
      !formulario.direccion1
    ) {
      alert(
        "Por favor completa los campos obligatorios: nombre, teléfono, país y dirección principal."
      );
      return;
    }

    const nuevoProveedor = {
      ...formulario,
      // Filtrar direcciones vacías para no almacenarlas innecesariamente
      direcciones: [
        formulario.direccion1,
        formulario.direccion2 || null,
        formulario.direccion3 || null,
      ].filter((dir) => dir),
    };

    if (proveedorEnEdicion) {
      setProveedores((prev) =>
        prev.map((p) =>
          p.id === proveedorEnEdicion.id ? { ...p, ...nuevoProveedor } : p
        )
      );
    } else {
      setProveedores((prev) => [
        ...prev,
        { id: prev.length + 1, ...nuevoProveedor },
      ]);
    }

    cerrarModal();
  };

  const proveedoresFiltrados = proveedores.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="productos-wrapper">
      <header className="productos-header">
        <h1>Gestión de Proveedores</h1>
        <p>Consulta, registra o modifica proveedores asociados.</p>
      </header>

      <section className="productos-controls">
        <button className="btn-agregar" onClick={() => abrirModal()}>
          <PlusCircle size={18} style={{ marginRight: "8px" }} />
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

      <section className="productos-tabla">
        {proveedoresFiltrados.length > 0 ? (
          <table className="tabla-productos">
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
                  <td>{prov.direcciones.join("; ") || prov.direccion1}</td>
                  <td>
                    {paises.find((p) => p.id === prov.idPais)?.nombre ||
                      prov.idPais}
                  </td>
                  <td>
                    <button
                      className="btn-accion editar"
                      onClick={() => abrirModal(prov)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-accion eliminar"
                      onClick={() => abrirModalEliminar(prov)}
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
            No hay proveedores registrados.
          </p>
        )}
      </section>

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>
                {proveedorEnEdicion
                  ? "Editar proveedor"
                  : "Agregar nuevo proveedor"}
              </h2>
              <button className="cerrar-modal" onClick={cerrarModal}>
                ×
              </button>
            </div>
            <form onSubmit={manejarEnvio}>
              <div className="modal-body">
                <input
                  name="nombre"
                  placeholder="Nombre del proveedor *"
                  value={formulario.nombre}
                  onChange={manejarCambio}
                  required
                />
                <input
                  name="telefono"
                  placeholder="Teléfono *"
                  value={formulario.telefono}
                  onChange={manejarCambio}
                  required
                />
                <input
                  name="correo"
                  placeholder="Correo electrónico"
                  value={formulario.correo}
                  onChange={manejarCambio}
                />
                <input
                  name="direccion1"
                  placeholder="Dirección principal *"
                  value={formulario.direccion1}
                  onChange={manejarCambio}
                  required
                />
                <input
                  name="direccion2"
                  placeholder="Dirección secundaria (opcional)"
                  value={formulario.direccion2}
                  onChange={manejarCambio}
                />
                <input
                  name="direccion3"
                  placeholder="Dirección terciaria (opcional)"
                  value={formulario.direccion3}
                  onChange={manejarCambio}
                />
                <select
                  name="idPais"
                  value={formulario.idPais}
                  onChange={manejarCambio}
                  required
                >
                  <option value="">Seleccione un país *</option>
                  {paises.map((pais) => (
                    <option key={pais.id} value={pais.id}>
                      {pais.nombre}
                    </option>
                  ))}
                </select>
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
                  {proveedorEnEdicion
                    ? "Guardar cambios"
                    : "Registrar proveedor"}
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
              ¿Deseas eliminar al proveedor{" "}
              <strong>{proveedorAEliminar.nombre}</strong>?
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

export default Proveedores;
