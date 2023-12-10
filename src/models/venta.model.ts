export type Venta = {
  id: number;
  neto: number;
  iva: number;
  total: number | null;
  fecha: string;
  Usuario_id: number | null;
  Cliente_id: number | null;
  Estado_PAgo_id: number | null;
};

export type VentaCreate = Omit<Venta, 'id'>;

export type VentaUpdate = Venta;

export type VentaDelete = Venta;

//------------------------------------------------------------//
//-----------Tabla Estado_Pago--------------------------------///

export type Estadopago = {
  id: number;
  estado: string;
};

export type EstadoPagoCreate = Omit<Estadopago, 'id'>;

export type EstadoPagoUpdate = Estadopago;

export type EstadoPagoDelete = Estadopago;

//------------------------------------------------------//
//-----------   Tabla Detalle Venta   ------------------//

export type DetalleVenta = {
  cantidad: number;
  precio_neto: number;
  precio_total_neto: number;
  Producto_id: number;
  Venta_id: number;
};

export type CreatedetalleVenta = DetalleVenta;

export type UpdatedetalleVenta = DetalleVenta;

export type DeletedetalleVenta = DetalleVenta;
