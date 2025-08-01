import React from 'react';
import '../../Styles/componentsStyles/botonAgregar.css';
import { PlusCircle } from 'lucide-react';

function BotonAgregar({ onClick, label = 'Agregar' }) {
  return (
    <button className="btn-agregar" onClick={onClick}>
      <PlusCircle size={18} style={{ marginRight: '8px' }} />
      {label}
    </button>
  );
}

export default BotonAgregar;