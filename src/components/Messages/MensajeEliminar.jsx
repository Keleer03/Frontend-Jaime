import React from 'react';
import '../../Styles/componentsStyles/MensajeEliminar.css';
import BotonCancelar from '../Buttons/BotonCancelar';
import BotonRegistrar from '../Buttons/botonRegistrar';

function MensajeEliminar({ show, onConfirm, onCancel, mensaje }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal modal-eliminar">
        <div className="modal-header">
          <h2>Confirmación</h2>
          <button className="cerrar-modal" onClick={onCancel}>×</button>
        </div>
        <div className="modal-body">
          <p>{mensaje}</p>
        </div>
        <div className="modal-footer">
          <BotonCancelar onClick={onCancel} />
          <BotonRegistrar onClick={onConfirm} label="Confirmar" type="button" />
        </div>
      </div>
    </div>
  );
}

export default MensajeEliminar;