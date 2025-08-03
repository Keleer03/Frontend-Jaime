import React, { useEffect } from 'react';
import '../../Styles/componentsStyles/mensajeDescarga.css';

const MensajeDescarga = ({ tipo, texto, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`mensaje-descarga ${tipo}`}>
      {texto}
    </div>
  );
};

export default MensajeDescarga;
