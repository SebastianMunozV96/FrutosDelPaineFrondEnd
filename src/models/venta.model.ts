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

export type ventaCreate = Omit<Venta, 'id'>;

export type ventaUpdate = Venta;

export type ventaDelete = Venta;

//------------------------------------------------------------//
//-----------Tabla Estado_Pago--------------------------------///

export type Estadopago = {
  id: number;
  estado: string;
};

export type estadoPagoCreate = Omit<Estadopago, 'id'>;

export type estadoPagoUpdate = Estadopago;

export type estadoPagoDelete = Estadopago;

//------------------------------------------------------//
//-----------   Tabla Detalle Pago   ------------------//

export type DetallePago = {
  id: number;
  monto_pagado: string;
  fecha: string;
  Metodo_Pago_id: number;
};

export type detallePagoCreate = Omit<DetallePago, 'id'>;

export type detallePagoUpdate = DetallePago;

export type detallePagoDelete = DetallePago;

//------------------------------------------------------//
//-----------   Tabla Detalle Venta   ------------------//

export type DetalleVenta = {
  cantidad: number;
  precio_neto: number;
  precio_total_neto: number;
  Producto_id: number;
  Venta_id: number;
};

export type detalleVentaCreate = DetalleVenta;

export type detalleVentaUpdate = DetalleVenta;

export type detalleVentaDelete = DetalleVenta;
