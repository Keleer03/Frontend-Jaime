import React, { useState } from 'react';
import '../Styles/historial.css';

const datosSimulados = {
  productos: [
    {
      idProveedor: 'PRV001',
      nombre: 'Producto A',
      descripcion: 'Descripción A',
      peso: 12,
      volumen: 0.5,
      precioUnitario: 15.5,
      dimensiones: '30x20x10',
      idUnidad: 'U01',
      codigoProveedor: 'XYZ123'
    },
    // Agrega más si quieres probar scroll
  ],
  pedidos: [
    {
      nombreCliente: 'Juan Pérez',
      cantidad: 10,
      unidades: 'cajas',
      precioUnitario: 50,
      proveedor: 'Proveedor A',
      producto: 'Producto A'
    }
  ],
  cotizaciones: [
    {
      pedidoNo: 'CTZ001',
      ordenAsociada: 'ORD123',
      valorTotal: 1500,
      porcentajeGanancia: '20%',
      precioVenta: 1800,
      cartaReporte: 'Informe1',
      fechaArriboCR: '10 de julio de 2025',
      almacenFiscal: 'AF001',
      DUA: 'DUA456',
      TCEuro: 0.92,
      TCDolar: 1.12,
      fleteGastoInterno: 200,
      fleteMaritimoOAereo: 300,
      valorCIF: 1400,
      tAduana: 5.5,
      tcr: 650
    }
  ]
};

function Historial() {
  const [tipo, setTipo] = useState('productos');
  const [busqueda, setBusqueda] = useState('');

  const datos = datosSimulados[tipo] || [];

  const datosFiltrados = datos.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  return (
    <div className="historial-wrapper">
      <header className="historial-header">
        <h1>Historial de Consultas</h1>
        <p>Consulta todos los registros disponibles.</p>
      </header>

      <div className="historial-controls">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="select-filtro">
          <option value="productos">Productos</option>
          <option value="pedidos">Pedidos</option>
          <option value="cotizaciones">Cotizaciones</option>
        </select>
        <input
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
      </div>

      <div className="tabla-wrapper">
        {datosFiltrados.length > 0 ? (
          <div className="tabla-scroll">
            <table className="tabla-historial">
              <thead>
                <tr>
                  {Object.keys(datosFiltrados[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((fila, index) => (
                  <tr key={index}>
                    {Object.entries(fila).map(([key, val]) => (
                      <td key={key}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="historial-vacio">No hay resultados para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default Historial;
