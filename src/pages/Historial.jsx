import React, { useState } from 'react';
import '../Styles/historial.css';
import HistorialControles from '../components/Filters and tables/HistorialControles';
import HistorialTabla from '../components/Filters and tables/HistorialTabla';

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

function Historial() {
  const [tipo, setTipo] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [datos, setDatos] = useState([]);

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

  return (
    <div className="historial-wrapper">
      <header className="historial-header">
        <h1>Historial de Consultas</h1>
        <p>Consulta todos los registros de productos, pedidos o cotizaciones.</p>
      </header>

      <HistorialControles
        tipo={tipo}
        busqueda={busqueda}
        onTipoChange={handleTipoChange}
        onBusquedaChange={handleBusqueda}
      />

      <section className="historial-tabla-container">
        <HistorialTabla tipo={tipo} datos={datos} busqueda={busqueda} />
      </section>
    </div>
  );
}

export default Historial;