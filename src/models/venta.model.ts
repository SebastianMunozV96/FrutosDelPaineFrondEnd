export type Venta = {
  id: number;
  neto: number;
  iva: number;
  total: number;
  fecha: string;
  Usuarios_id: number;
  Clientes_id: number;
  Estado_Pago_id: number;
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
//-----------   Tabla Detalle Pago   ------------------//

export type DetallePago = {
  id: number;
  monto_pagado: string;
  fecha: string;
  Metodo_Pago_id: number;
};

export type DetallePagoCreate = Omit<DetallePago, 'id'>;

export type DetallePagoUpdate = DetallePago;

export type DetallePagoDelete = DetallePago;

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
