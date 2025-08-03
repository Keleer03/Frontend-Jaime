import React from 'react';

function HistorialControles({ tipo, busqueda, onTipoChange, onBusquedaChange }) {
  return (
    <section className="historial-controls">
      <div className="filtros-historial">
        <label htmlFor="tipo" className="filtro-label">
          Selecciona el tipo de consulta:
        </label>
        <select
          id="tipo"
          value={tipo}
          onChange={onTipoChange}
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
          onChange={onBusquedaChange}
          disabled={!tipo}
        />
      </div>
    </section>
  );
}

export default HistorialControles;