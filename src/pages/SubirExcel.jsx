import React, { useState } from 'react';
import '../styles/subirExcel.css';
import MensajeDescarga from '../components/Messages/MensajeDescarga';

function SubirExcel() {
  const [archivo, setArchivo] = useState(null);
  const [tipoPlantilla, setTipoPlantilla] = useState('');
  const [mensajeEmergente, setMensajeEmergente] = useState(null); 

  const mostrarMensaje = (tipo, texto) => {
    setMensajeEmergente({ tipo, texto });
  };

  const manejarArchivo = (e) => {
    setArchivo(e.target.files[0]);
  };

  const quitarArchivo = () => {
    setArchivo(null);
  };

  const subirArchivo = () => {
    if (archivo && tipoPlantilla) {
      console.log(`Archivo para subir: ${archivo.name}, tipo: ${tipoPlantilla}`);
      mostrarMensaje('success', '✅ Archivo cargado correctamente: ' + archivo.name);
    } else if (!tipoPlantilla) {
      mostrarMensaje('error', '⚠️ Por favor selecciona un tipo de plantilla.');
    } else {
      mostrarMensaje('error', '⚠️ Por favor selecciona un archivo primero.');
    }
  };

  const descargarPlantilla = () => {
    if (tipoPlantilla) {
      mostrarMensaje('success', `📥 Descargando plantilla para: ${tipoPlantilla}`);
    }
  };

  return (
    <div className="subirexcel-wrapper">
      <h2>Subir archivo Excel</h2>
      <p className="descripcion">
        Importa datos desde una plantilla Excel (.xlsx). Primero elige qué tipo de datos vas a subir.
      </p>

      <div className="formulario-subida">
        <label htmlFor="tipoPlantilla">Seleccionar tipo de plantilla:</label>
        <select
          id="tipoPlantilla"
          value={tipoPlantilla}
          onChange={(e) => setTipoPlantilla(e.target.value)}
          className="select-tipo"
        >
          <option value="">-- Seleccionar --</option>
          <option value="productos">Productos</option>
          <option value="proveedores">Proveedores</option>
          <option value="pedidos">Pedidos</option>
          <option value="cotizaciones">Cotizaciones</option>
        </select>

        {tipoPlantilla && (
          <div className="boton-descarga">
            <button type="button" className="boton-subir" onClick={descargarPlantilla}>
              Descargar plantilla de {tipoPlantilla}
            </button>
          </div>
        )}

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
      </div>

      {mensajeEmergente && ( 
        <MensajeDescarga
          tipo={mensajeEmergente.tipo}
          texto={mensajeEmergente.texto}
          onClose={() => setMensajeEmergente(null)}
        />
      )}
    </div>
  );
}

export default SubirExcel;
