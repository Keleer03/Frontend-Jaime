import React, { useState, useEffect } from 'react';
import '../../Styles/componentsStyles/proveedorModal.css';

function ProveedorModal({ show, onClose, proveedor, paises, onSubmit }) {
  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    direccion1: '',
    direccion2: '',
    direccion3: '',
    idPais: '',
  });

  useEffect(() => {
    if (proveedor) {
      setFormulario({
        nombre: proveedor.nombre || '',
        telefono: proveedor.telefono || '',
        correo: proveedor.correo || '',
        direccion1: proveedor.direcciones[0] || '',
        direccion2: proveedor.direcciones[1] || '',
        direccion3: proveedor.direcciones[2] || '',
        idPais: proveedor.idPais || '',
      });
    } else {
      setFormulario({
        nombre: '',
        telefono: '',
        correo: '',
        direccion1: '',
        direccion2: '',
        direccion3: '',
        idPais: '',
      });
    }
  }, [proveedor]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.telefono || !formulario.idPais || !formulario.direccion1) {
      alert('Por favor completa los campos obligatorios: nombre, teléfono, país y dirección principal.');
      return;
    }
    onSubmit(formulario);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{proveedor ? 'Editar proveedor' : 'Agregar nuevo proveedor'}</h2>
          <button className="cerrar-modal" onClick={onClose}>×</button>
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
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-registrar">
              {proveedor ? 'Guardar cambios' : 'Registrar proveedor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProveedorModal;