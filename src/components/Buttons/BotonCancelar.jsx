import React from 'react';
import '../../Styles/componentsStyles/BotonCancelar.css';

function BotonCancelar({ onClick, label = 'Cancelar' }) {
  return (
    <button className="btn-cancelar" onClick={onClick}>
      {label}
    </button>
  );
}

export default BotonCancelar;