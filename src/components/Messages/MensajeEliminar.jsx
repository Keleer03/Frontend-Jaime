import React from 'react';
import '../../Styles/componentsStyles/MensajeEliminar.css';
import BotonCancelar from '../Buttons/BotonCancelar';
import BotonRegistrar from '../Buttons/botonRegistrar';

function MensajeEliminar({ show, onConfirm, onCancel, mensaje }) {
  if (!show) return null;

  return (
    <div className="mensaje-modal-overlay">
      <div className="mensaje-modal">
        <div className="mensaje-modal-header">
          <h2 className="mensaje-modal-title">Confirmación</h2>
          <button className="mensaje-close-button" onClick={onCancel}>×</button>
        </div>
        <div className="mensaje-modal-body">
          <p>{mensaje}</p>
        </div>
        <div className="mensaje-modal-footer">
          <BotonCancelar onClick={onCancel} label="Cancelar" />
          <BotonRegistrar onClick={onConfirm} label="Confirmar" type="button" />
        </div>
      </div>
    </div>
  );
}

export default MensajeEliminar;
