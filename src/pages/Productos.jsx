import React, { useState } from 'react';
import '../styles/productos.css';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

//-------------------------------------------------------------------------------------------

const productosEjemplo = [
  {
    id: 1,
    codigo: 'PRD001',
    nombre: 'Granito Blanco',
    descripcion: 'Piedra natural para pisos',
    categoria: 'Granito',
    precio: 45000,
    cantidad: 20,
    proveedor: 'Mármoles S.A.',
    fechaIngreso: '2024-05-12',
    peso: 35,
    volumen: 2.5,
    permisosEspeciales: ['Ninguno'],
  },
  {
    id: 2,
    codigo: 'PRD002',
    nombre: 'Mármol Gris',
    descripcion: 'Mármol pulido para interiores',
    categoria: 'Mármol',
    precio: 62000,
    cantidad: 12,
    proveedor: 'Decorstone Ltda.',
    fechaIngreso: '2024-06-01',
    peso: 28,
    volumen: 1.8,
    permisosEspeciales: ['Transporte químico'],
  }
];
//-------------------------------------------------------------------------------------------

function Productos() {
  const [busqueda, setBusqueda] = useState('');
  const [proveedorFiltro, setProveedorFiltro] = useState('');
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [orden, setOrden] = useState('');

  const proveedoresUnicos = [...new Set(productosEjemplo.map(p => p.proveedor))];
  const nombresUnicos = [...new Set(productosEjemplo.map(p => p.nombre))];

  // Aplicamos filtros
  let productosFiltrados = productosEjemplo.filter((prod) => {
    const query = busqueda.toLowerCase();

    return (
      (prod.nombre.toLowerCase().includes(query) || prod.codigo.toLowerCase().includes(query)) &&
      (proveedorFiltro === '' || prod.proveedor === proveedorFiltro) &&
      (nombreFiltro === '' || prod.nombre === nombreFiltro)
    );
  });

  // Aplicamos ordenamiento
  productosFiltrados.sort((a, b) => {
    if (!orden) return 0;
    if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
    if (orden === 'precio') return a.precio - b.precio;
    if (orden === 'fecha') return new Date(a.fechaIngreso) - new Date(b.fechaIngreso);
    return 0;
  });

  return (
    <div className="productos-wrapper">
      <header className="productos-header">
        <h1>Gestión de Productos</h1>
        <p>Aquí puedes ver, agregar, editar o eliminar tus productos registrados.</p>
      </header>

      <section className="productos-controls">
        <button className="btn-agregar">
          <PlusCircle size={18} style={{ marginRight: '8px' }} />
          Agregar producto
        </button>

        <div className="busqueda-filtros">
          <input
            type="text"
            placeholder="Buscar por nombre o código..."
            className="input-busqueda"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            value={proveedorFiltro}
            onChange={(e) => setProveedorFiltro(e.target.value)}
            className="select-filtro"
          >
            <option value="">Todos los proveedores</option>
            {proveedoresUnicos.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>

          <select
            value={nombreFiltro}
            onChange={(e) => setNombreFiltro(e.target.value)}
            className="select-filtro"
          >
            <option value="">Todos los nombres</option>
            {nombresUnicos.map((nombre) => (
              <option key={nombre} value={nombre}>{nombre}</option>
            ))}
          </select>

          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="select-filtro"
          >
            <option value="">Ordenar por...</option>
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="fecha">Fecha de ingreso</option>
          </select>
        </div>
      </section>

      <section className="productos-tabla">
        {productosFiltrados.length > 0 ? (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Peso (kg)</th>
                <th>Volumen (m²)</th>
                <th>Permisos</th>
                <th>Proveedor</th>
                <th>Fecha ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.codigo}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>
                  <td>₡{prod.precio.toLocaleString()}</td>
                  <td>{prod.cantidad}</td>
                  <td>{prod.peso}</td>
                  <td>{prod.volumen}</td>
                  <td>{prod.permisosEspeciales.join(', ')}</td>
                  <td>{prod.proveedor}</td>
                  <td>{prod.fechaIngreso}</td>
                  <td>
                    <button className="btn-accion editar">
                      <Edit size={16} />
                    </button>
                    <button className="btn-accion eliminar">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>
            No se encontraron productos.
          </p>
        )}
      </section>
    </div>
  );
}

export default Productos;
