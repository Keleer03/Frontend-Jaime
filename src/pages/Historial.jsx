import React, { useState } from 'react';
import '../styles/historial.css';

function Historial() {
  const [tipo, setTipo] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [datos, setDatos] = useState([]);

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
        codigoProveedor: 'XYZ123',
      },
    ],
    pedidos: [
      {
        nombreCliente: 'Juan Pérez',
        cantidad: 10,
        unidades: 'cajas',
        precioUnitario: 50,
        proveedor: 'Proveedor A',
        producto: 'Producto A',
      },
    ],
    cotizaciones: [
      {
        pedidoNo: 'CTZ001',
        ordenAsociada: 'ORD123',
        valorTotal: 1500,
        porcentajeGanancia: '20%',
        precioVenta: 1800,
        cartaReporte: 'Reporte1',
        fechaArriboCR: '2025-07-10',
        almacenFiscal: 'AF001',
        DUA: 'DUA456',
        TCEuro: 0.92,
        TCDolar: 1.12,
        fleteGastoInterno: 200,
        fleteMaritimoOAereo: 300,
        valorCIF: 1400,
        tAduana: 5.5,
        tcr: 650,
      },
    ],
  };

  const handleTipoChange = (e) => {
    const seleccionado = e.target.value;
    setTipo(seleccionado);
    setBusqueda('');
    if (datosSimulados[seleccionado]) {
      setDatos(datosSimulados[seleccionado]);
    } else {
      setDatos([]);
    }
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

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
      item.nombre
        ? item.nombre.toLowerCase().includes(busqueda.toLowerCase())
        : true
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

  return (
    <div className="historial-wrapper">
      <header className="historial-header">
        <h1>Historial de Consultas</h1>
        <p>Consulta todos los registros de productos, pedidos o cotizaciones.</p>
      </header>

      <section className="historial-controls">
        <div className="filtros-historial">
          <label htmlFor="tipo">Selecciona el tipo de consulta:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={handleTipoChange}
            className="select-filtro"
          >
            <option value="">Seleccione una consulta</option>
            <option value="productos">Productos</option>
            <option value="pedidos">Pedidos</option>
            <option value="cotizaciones">Cotizaciones</option>
          </select>

          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="input-busqueda"
            value={busqueda}
            onChange={handleBusqueda}
            disabled={!tipo}
          />
        </div>
      </section>

      <section className="historial-tabla">
        {renderTabla()}
      </section>
    </div>
  );
}

export default Historial;