import React, { useState } from 'react';
import '../styles/subirExcel.css';

function SubirExcel() {
  const [archivo, setArchivo] = useState(null);

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const subirArchivo = () => {
    if (archivo) {
      console.log('Archivo listo para subir:', archivo.name);
      alert('Archivo cargado correctamente');
// logica
    } else {
      alert('Por favor selecciona un archivo primero.');
    }
  };

  return (
    <div className="contenedor-excel">
      <h2>Subir archivo Excel</h2>
      <p>Selecciona un archivo .xlsx para importar datos de cotizaciones, productos, proveedores o pedidos.</p>
      <input type="file" accept=".xlsx" onChange={manejarArchivo} />
      <button onClick={subirArchivo}>Subir</button>
    </div>
  );
}

export default SubirExcel;
