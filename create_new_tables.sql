
-- Tabla: Rol
CREATE TABLE Rol (
    id SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL
);

-- Tabla: Pais
CREATE TABLE Pais (
    IdPais SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL
);

-- Tabla: Usuarios
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Correo TEXT NOT NULL,
    Contraseña TEXT NOT NULL,
    IdRol INTEGER REFERENCES Rol(id)
);

-- Tabla: Clientes
CREATE TABLE Clientes (
    id SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Telefono TEXT,
    Correo TEXT,
    Direccion TEXT
);

-- Tabla: Proveedores
CREATE TABLE Proveedores (
    id SERIAL PRIMARY KEY,
    Nombre TEXT NOT NULL,
    Telefono TEXT,
    Correo TEXT,
    Direccion TEXT,
    IdPais INTEGER REFERENCES Pais(IdPais)
);

-- Tabla: Productos
CREATE TABLE Productos (
    id SERIAL PRIMARY KEY,
    IdProveedor INTEGER REFERENCES Proveedores(id),
    Nombre TEXT NOT NULL,
    Descripcion TEXT,
    Peso NUMERIC,
    Volumen NUMERIC,
    PrecioUnitario NUMERIC,
    Dimensiones TEXT,
    Unidad TEXT,
    codigoProveedor TEXT
);

-- Tabla: Pedidos
CREATE TABLE Pedidos (
    id SERIAL PRIMARY KEY,
    IdCliente INTEGER REFERENCES Clientes(id),
    Entregado BOOLEAN
);

-- Tabla: ProductosPorPedido
CREATE TABLE ProductosPorPedido (
    IdPedido INTEGER REFERENCES Pedidos(id),
    IdProducto INTEGER REFERENCES Productos(id),
    Cantidad INTEGER,
    PrecioUnitario NUMERIC,
    PRIMARY KEY (IdPedido, IdProducto)
);

-- Tabla: Agrupacion
CREATE TABLE Agrupacion (
    id SERIAL PRIMARY KEY
);

-- Tabla: AgrupacionesPorPedidos
CREATE TABLE AgrupacionesPorPedidos (
    IdAgrupacion INTEGER REFERENCES Agrupacion(id),
    IdPedido INTEGER REFERENCES Pedidos(id),
    PRIMARY KEY (IdAgrupacion, IdPedido)
);

-- Tabla: Cotizacion
CREATE TABLE Cotizacion (
    IdCotizacion SERIAL PRIMARY KEY,
    PedidoNo INTEGER,
    OrdenAsociada INTEGER,
    ValorTotal NUMERIC,
    PorcentajeGanancia NUMERIC,
    PrecioVenta NUMERIC,
    CartaReporte TEXT,
    FechaArriboCR DATE,
    AlmacenFiscal TEXT,
    DUA TEXT,
    TCEuro NUMERIC,
    TCDolar NUMERIC,
    FleteGastoInterno NUMERIC,
    FleteMaritimoOAereo NUMERIC,
    ValorCIF NUMERIC,
    TAduana NUMERIC,
    TCR NUMERIC
);

-- Tabla: OrdenAsociada
CREATE TABLE OrdenAsociada (
    IDOrdenAsociada SERIAL PRIMARY KEY,
    IDCotizacion INTEGER REFERENCES Cotizacion(IdCotizacion),
    IDPedido INTEGER REFERENCES Pedidos(id)
);

-- Tabla: CosteoLineal
CREATE TABLE CosteoLineal (
    IDPedido INTEGER PRIMARY KEY REFERENCES Pedidos(id),
    ValorTotal NUMERIC,
    PesoPorcentual NUMERIC,
    FleteInterno NUMERIC,
    FleteTransporte NUMERIC,
    ValorCIF NUMERIC,
    TAduana NUMERIC,
    TCR NUMERIC,
    CostoCR NUMERIC,
    CostoUnitario NUMERIC,
    CostoIVA NUMERIC,
    UD TEXT,
    PrecioVenta NUMERIC
);

-- Tabla: FabricacionPedido
CREATE TABLE FabricacionPedido (
    IdPedido INTEGER PRIMARY KEY REFERENCES Pedidos(id),
    FechaInicio DATE,
    FechaFinalizacion DATE,
    Costo NUMERIC
);

-- Tabla: RetiroPedido
CREATE TABLE RetiroPedido (
    IdPedido INTEGER PRIMARY KEY REFERENCES Pedidos(id),
    FechaInicio DATE,
    FechaFinalizacion DATE,
    Costo NUMERIC
);

-- Tabla: TrasladoNacionalPedido
CREATE TABLE TrasladoNacionalPedido (
    IdPedido INTEGER PRIMARY KEY REFERENCES Pedidos(id),
    FechaInicio DATE,
    FechaFinalizacion DATE,
    Costo NUMERIC
);

-- Tabla: TrasladoInternacionalPedido
CREATE TABLE TrasladoInternacionalPedido (
    IdPedido INTEGER PRIMARY KEY REFERENCES Pedidos(id),
    FechaInicio DATE,
    FechaFinalizacion DATE,
    Costo NUMERIC
);

-- Tabla: TrasladoExtranjeroPedido
CREATE TABLE TrasladoExtranjeroPedido (
    IdPedido INTEGER PRIMARY KEY REFERENCES Pedidos(id),
    FechaInicio DATE,
    FechaFinalizacion DATE,
    Costo NUMERIC
);
