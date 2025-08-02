import React, { useEffect, useState } from 'react';
import '../styles/notificaciones.css';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [busquedaPedido, setBusquedaPedido] = useState('');

  useEffect(() => {
    const datosEjemplo = [
      {
        id: 1,
        pedido: 'PED-123',
        factura: 'FAC-456',
        producto: 'Producto X',
        deadline: '2025-08-10T14:00:00Z',
        tipo: 'Nota',
        mensaje: 'Se debe revisar el stock antes del envío'
      },
      {
        id: 2,
        pedido: 'PED-124',
        factura: 'FAC-457',
        producto: 'Producto Y',
        deadline: '2025-08-12T10:00:00Z',
        tipo: 'Recordatorio',
        mensaje: 'Cliente pidió entrega urgente'
      },
      {
        id: 3,
        pedido: 'PED-125',
        factura: 'FAC-458',
        producto: 'Producto Z',
        deadline: '2025-08-15T09:00:00Z',
        tipo: 'Comentario',
        mensaje: 'Factura fue reenviada al cliente'
      }
    ];
    setNotificaciones(datosEjemplo);
  }, []);

  // Filtrar las notificaciones por el número de pedido ingresado
  const notificacionesFiltradas = notificaciones.filter(n =>
    n.pedido.toLowerCase().includes(busquedaPedido.toLowerCase())
  );

  return (
    <div className="notificaciones-wrapper">
      <h2>Historial de Notificaciones</h2>

      <div className="filtro">
        <label htmlFor="pedido">Buscar por número de pedido:</label>
        <input
          id="pedido"
          type="text"
          placeholder="Buscar por número de pedido..."
          value={busquedaPedido}
          onChange={(e) => setBusquedaPedido(e.target.value)}
        />
      </div>

      <ul className="lista-notificaciones">
        {notificacionesFiltradas.map((n) => (
          <li key={n.id} className={`notificacion-card ${n.tipo.toLowerCase()}`}>
            <div className="pedido-header">Pedido: <strong>{n.pedido}</strong></div>
            <div className="detalle-linea">
              <span>Factura: <strong>{n.factura}</strong></span> | 
              <span> Producto: <strong>{n.producto}</strong></span> | 
              <span> Entrega: <strong>{new Date(n.deadline).toLocaleDateString()}</strong></span>
            </div>
            <div className="mensaje">{n.mensaje}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notificaciones;
