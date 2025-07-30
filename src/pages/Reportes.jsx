import React, { useState } from 'react';
import '../styles/reportes.css';
import { exportToExcel } from './excelReporte';

const encabezadosBonitos = {
  cliente: 'Cliente',
  cantidad: 'Cantidad',
  unidades: 'Unidades',
  precioUnitario: 'Precio Unitario',
  idProveedor: 'ID Proveedor',
  nombre: 'Nombre',
  descripcion: 'Descripción',
  peso: 'Peso',
  volumen: 'Volumen',
  dimensiones: 'Dimensiones',
  idUnidad: 'ID Unidad',
  codigoProveedor: 'Código Proveedor',
  pedidoNo: 'Pedido No',
  ordenAsociada: 'Orden Asociada',
  valorTotal: 'Valor Total',
  porcentajeGanancia: '% Ganancia',
  precioVenta: 'Precio Venta',
  cartaReporte: 'Carta Reporte',
  fechaArriboCR: 'Fecha Arribo CR',
  almacenFiscal: 'Almacén Fiscal',
  DUA: 'DUA',
  TCEuro: 'TC Euro',
  TCDolar: 'TC Dólar',
  fleteGastoInterno: 'Flete Gasto Interno',
  fleteMaritimoOAereo: 'Flete Marítimo/Aéreo',
  valorCIF: 'Valor CIF',
  tAduana: 'T. Aduana',
  tcr: 'TCR',
};

const datosSimulados = {
  pedidos: [
    { cliente: 'Carlos Soto', cantidad: 20, unidades: 'cajas', precioUnitario: 12.5, id: 'ped1' },
    { cliente: 'Ana Rivera', cantidad: 10, unidades: 'piezas', precioUnitario: 8.0, id: 'ped2' },
    { cliente: 'Luis Gómez', cantidad: 15, unidades: 'unidades', precioUnitario: 20.0, id: 'ped3' },
  ],
  productos: [
    {
      idProveedor: 'prov001',
      nombre: 'Producto A',
      descripcion: 'Electrodoméstico',
      peso: 2.5,
      volumen: 0.8,
      precioUnitario: 45.0,
      dimensiones: '30x20x10 cm',
      idUnidad: 'unidad1',
      codigoProveedor: 'PA-001',
      id: 'prod1',
    },
    {
      idProveedor: 'prov002',
      nombre: 'Producto B',
      descripcion: 'Herramienta',
      peso: 1.2,
      volumen: 0.4,
      precioUnitario: 30.0,
      dimensiones: '25x10x8 cm',
      idUnidad: 'unidad2',
      codigoProveedor: 'PB-002',
      id: 'prod2',
    },
    {
      idProveedor: 'prov003',
      nombre: 'Producto C',
      descripcion: 'Mueble',
      peso: 5.0,
      volumen: 1.0,
      precioUnitario: 100.0,
      dimensiones: '50x30x20 cm',
      idUnidad: 'unidad3',
      codigoProveedor: 'PC-003',
      id: 'prod3',
    },
  ],
  cotizaciones: [
    {
      pedidoNo: '001',
      ordenAsociada: 'A-01',
      valorTotal: 15000,
      porcentajeGanancia: 25,
      precioVenta: 18750,
      cartaReporte: 'CR-001',
      fechaArriboCR: '2025-08-01',
      almacenFiscal: 'Fiscal A',
      DUA: 'DUA123',
      TCEuro: 0.95,
      TCDolar: 540,
      fleteGastoInterno: 350,
      fleteMaritimoOAereo: 750,
      valorCIF: 12000,
      tAduana: 13,
      tcr: 550,
      id: 'cot1',
    },
    {
      pedidoNo: '002',
      ordenAsociada: 'A-02',
      valorTotal: 8000,
      porcentajeGanancia: 20,
      precioVenta: 9600,
      cartaReporte: 'CR-002',
      fechaArriboCR: '2025-08-05',
      almacenFiscal: 'Fiscal B',
      DUA: 'DUA124',
      TCEuro: 0.90,
      TCDolar: 535,
      fleteGastoInterno: 200,
      fleteMaritimoOAereo: 400,
      valorCIF: 7000,
      tAduana: 10,
      tcr: 300,
      id: 'cot2',
    },
  ],
};

function Reporte() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState('pedidos');
  const [busqueda, setBusqueda] = useState('');
  const [seleccionados, setSeleccionados] = useState([]);
  const [datosReporte, setDatosReporte] = useState([]);

  const handleSeleccionar = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBuscar = () => {
    const datosConsolidados = seleccionados.map((id) =>
      [...datosSimulados.pedidos, ...datosSimulados.productos, ...datosSimulados.cotizaciones].find((item) => item.id === id)
    ).filter((item) => item !== undefined);
    setDatosReporte(datosConsolidados);
  };

  const handleExportar = () => {
    if (!datosReporte.length) return;
    exportToExcel(datosReporte, `Reporte_${new Date().toISOString().split('T')[0]}`);
  };

  const filtrarDatos = (datos) => {
    return datos.filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
  };

  return (
    <div className="reporte-wrapper">
      <h1>Generar Reporte</h1>

      <div className="filtros-section">
        <input
          type="text"
          placeholder="Buscar por nombre o dato..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-busqueda"
        />
        <select
          value={tipoSeleccionado}
          onChange={(e) => setTipoSeleccionado(e.target.value)}
          className="select-filtro"
        >
          <option value="pedidos">Pedidos</option>
          <option value="productos">Productos</option>
          <option value="cotizaciones">Cotizaciones</option>
        </select>
      </div>

      <div className="seleccion-section">
        <h2>Seleccionar {tipoSeleccionado.charAt(0).toUpperCase() + tipoSeleccionado.slice(1)}</h2>
        <ul>
          {filtrarDatos(datosSimulados[tipoSeleccionado]).map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                checked={seleccionados.includes(item.id)}
                onChange={() => handleSeleccionar(item.id)}
              />
              {Object.entries(item)
                .filter(([key]) => ['id', 'nombre', 'cliente', 'pedidoNo'].includes(key))
                .map(([key, val]) => `${encabezadosBonitos[key] || key}: ${val}`).join(' | ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="filtros-section">
        <button onClick={handleBuscar}>Generar Reporte</button>
        <button onClick={handleExportar} disabled={!datosReporte.length}>
          Exportar Excel
        </button>
      </div>

      <div className="tabla-contenedor">
        {datosReporte.length ? (
          <table className="tabla-reporte">
            <thead>
              <tr>
                {Object.keys(datosReporte.reduce((acc, curr) => ({ ...acc, ...curr }), {})).map((key) => (
                  <th key={key}>{encabezadosBonitos[key] || key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datosReporte.map((fila, i) => (
                <tr key={i}>
                  {Object.keys(datosReporte.reduce((acc, curr) => ({ ...acc, ...curr }), {})).map((key) => (
                    <td key={key}>{fila[key] !== undefined ? fila[key] : ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay resultados para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default Reporte;