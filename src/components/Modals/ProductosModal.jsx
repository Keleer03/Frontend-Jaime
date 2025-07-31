import React, { useState, useEffect } from 'react';
import '../../Styles/componentsStyles/ProductosModal.css';
import BotonCancelar from '../../components/Buttons/BotonCancelar';
import BotonRegistrar from '../../components/Buttons/botonRegistrar';

function ProductosModal({ show, onClose, producto, setProductos }) {
  const [formulario, setFormulario] = useState({
    idProveedor: [],
    nombre: '',
    descripcion: '',
    peso: '',
    volumen: '',
    precioUnitario: '',
    codigoProducto: '',
    comentarios: '',
    moneda: '₡',
  });

  useEffect(() => {
    if (producto) {
      setFormulario({
        idProveedor: Array.isArray(producto.idProveedor) ? producto.idProveedor : [producto.idProveedor],
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        peso: producto.peso || '',
        volumen: producto.volumen || '',
        precioUnitario: producto.precioUnitario || '',
        codigoProducto: producto.codigoProducto || '',
        comentarios: producto.comentarios || '',
        moneda: producto.moneda || '₡',
      });
    } else {
      setFormulario({
        idProveedor: [],
        nombre: '',
        descripcion: '',
        peso: '',
        volumen: '',
        precioUnitario: '',
        codigoProducto: '',
        comentarios: '',
        moneda: '₡',
      });
    }
  }, [producto]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'idProveedor') {
      setFormulario((prev) => ({
        ...prev,
        [name]: value.split(',').map((v) => v.trim()).filter((v) => v),
      }));
    } else {
      setFormulario((prev) => ({ ...prev, [name]: value }));
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const requiredFields = { nombre: true, precioUnitario: true, idProveedor: true };
    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formulario[key] || (Array.isArray(formulario[key]) && !formulario[key].length))
      .map(([key]) => key);

    if (missingFields.length > 0) {
      alert(`Por favor completa los campos obligatorios: ${missingFields.join(', ')}.`);
      return;
    }

    const nuevoProducto = {
      ...formulario,
      peso: formulario.peso || null,
      volumen: formulario.volumen || null,
      precioUnitario: parseFloat(formulario.precioUnitario) || 0,
      id: producto ? producto.id : Date.now(),
    };

    setProductos((prev) => {
      if (producto) {
        return prev.map((p) => (p.id === producto.id ? nuevoProducto : p));
      }
      return [...prev, nuevoProducto];
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{producto ? 'Editar producto' : 'Agregar nuevo producto'}</h2>
          <button className="cerrar-modal" onClick={onClose}>×</button>
        </div>
        <form onSubmit={manejarEnvio}>
          <div className="modal-body">
            <input
              name="codigoProducto"
              placeholder="Código del producto"
              value={formulario.codigoProducto}
              onChange={manejarCambio}
            />
            <input
              name="nombre"
              placeholder="Nombre del producto *"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />
            <input
              name="descripcion"
              placeholder="Descripción (opcional)"
              value={formulario.descripcion}
              onChange={manejarCambio}
            />
            <input
              name="peso"
              type="number"
              step="0.01"
              placeholder="Peso en kg (opcional)"
              value={formulario.peso}
              onChange={manejarCambio}
            />
            <input
              name="volumen"
              type="number"
              step="0.01"
              placeholder="Volumen en m³ (opcional)"
              value={formulario.volumen}
              onChange={manejarCambio}
            />
            <input
              name="precioUnitario"
              type="number"
              step="0.01"
              placeholder="Precio unitario *"
              value={formulario.precioUnitario}
              onChange={manejarCambio}
              required
            />
            <select
              name="moneda"
              value={formulario.moneda}
              onChange={manejarCambio}
            >
              <option value="₡">CRC (Colones)</option>
              <option value="$">USD (Dólares)</option>
              <option value="€">EUR (Euros)</option>
            </select>
            <input
              name="idProveedor"
              placeholder="Códigos de proveedor(s) (separados por coma)"
              value={formulario.idProveedor.join(', ')}
              onChange={manejarCambio}
              required
            />
            <input
              name="comentarios"
              placeholder="Comentarios (opcional)"
              value={formulario.comentarios}
              onChange={manejarCambio}
            />
          </div>
          <div className="modal-footer">
            <BotonCancelar onClick={onClose} />
            <BotonRegistrar type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductosModal;