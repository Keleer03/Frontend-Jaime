import React, { useState } from 'react';
import '../styles/subirExcel.css';

function SubirExcel() {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
    setMensaje('');
  };

  const quitarArchivo = () => {
    setArchivo(null);
    setMensaje('');
  };

  const subirArchivo = () => {
    if (archivo) {
// logica
        console.log('Archivo listo para subir:', archivo.name);
      setMensaje('✅ Archivo cargado correctamente: ' + archivo.name);
    } else {
      setMensaje('⚠️ Por favor selecciona un archivo primero.');
    }
  };

  return (
    <div className="subirexcel-wrapper">
      <h2>Subir archivo Excel</h2>
      <p className="descripcion">Importa datos de cotizaciones, productos, proveedores o pedidos desde un archivo Excel (.xlsx).</p>

      <div className="formulario-subida">
        <input
          type="file"
          accept=".xlsx"
          onChange={manejarArchivo}
        />
        {archivo && (
          <div className="archivo-info">
            <span>{archivo.name}</span>
            <button type="button" onClick={quitarArchivo} className="boton-quitar">Quitar</button>
          </div>
        )}
        <div className="boton-subir-contenedor">
          <button type="button" onClick={subirArchivo} className="boton-subir">
            Subir archivo
          </button>
        </div>
        {mensaje && <div className="mensaje-subida">{mensaje}</div>}
      </div>
    </div>
  );
}

export default SubirExcel;
