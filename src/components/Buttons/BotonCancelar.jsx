import React from 'react';
import '../../Styles/componentsStyles/botonCancelar.css';

function BotonCancelar({ onClick, label = 'Cancelar' }) {
  return (
    <button className="btn-cancelar" onClick={onClick}>
      {label}
    </button>
  );
}

export default BotonCancelar;