import React from 'react';
import '../../Styles/componentsStyles/BotonRegistrar.css';

function BotonRegistrar({ onClick, label = 'Registrar', type = 'button' }) {
  return (
    <button className="btn-registrar" onClick={onClick} type={type}>
      {label}
    </button>
  );
}

export default BotonRegistrar;