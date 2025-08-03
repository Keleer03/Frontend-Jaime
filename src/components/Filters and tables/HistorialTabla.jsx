import React from 'react';

function HistorialTabla({ tipo, datos, busqueda }) {
  const renderTabla = () => {
    if (!tipo) {
      return (
        <p className="historial-vacio">
          Por favor seleccione la información por visualizar.
        </p>
      );
    }

    if (!datos.length) {
      return (
        <p className="historial-vacio">
          No hay datos disponibles para esta consulta.
        </p>
      );
    }

    const columnas = Object.keys(datos[0]);
    const datosFiltrados = datos.filter((item) =>
      item.nombre ? item.nombre.toLowerCase().includes(busqueda.toLowerCase()) : true
    );

    return (
      <div className="tabla-scroll-wrapper">
        <table className="tabla-historial">
          <thead>
            <tr>
              {columnas.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosFiltrados.map((fila, idx) => (
              <tr key={idx}>
                {columnas.map((col) => (
                  <td key={col}>{fila[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return <>{renderTabla()}</>;
}

export default HistorialTabla;