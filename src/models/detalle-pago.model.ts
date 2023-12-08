export type DetallePago = {
  id: number;
  monto_pagado: string;
  fecha: string;
  Metodo_Pago_id: number;
};

export type CreateDetallePago = Omit<DetallePago, 'id'>;

export type UpdateDetallePago = DetallePago;

export type DeleteDetallePago = DetallePago;

//-------------------------------------------------------///
//-------- Tabla Metodo De pago ----------------------------//

export type MetodoPago = {
  id: number;
  metodo: string;
};

export type CreateMetodoPago = Omit<MetodoPago, 'id'>;

export type UpdatMetodoPago = CreateMetodoPago;

export type DeleteMetodoPago = MetodoPago;
