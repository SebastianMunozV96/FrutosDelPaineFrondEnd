import { api } from 'src/boot/axios';

import {
  Venta,
  VentaUpdate,
  VentaCreate,
  Estadopago,
  EstadoPagoCreate,
  EstadoPagoUpdate,
  DetalleVenta,
  CreatedetalleVenta,
  UpdatedetalleVenta,
} from 'src/models/venta.model';

//--------------------------------------------------------//
//-- Service de Venta-----------------------------------------//

export const geVenta = async () => {
  const ventas = await api.get<Venta[]>('/ventas');
  return ventas.data;
};

export const updateVenta = async (id: number, dato: VentaUpdate) => {
  const venta = await api.put<Venta[]>(`/ventas/${id}`, dato);
  return venta.data;
};
export const deleteVenta = async (id: number) => {
  const venta = await api.delete<{ id: number }>(`/ventas/${id}`);
  return venta.data;
};

export const createVenta = async (venta: VentaCreate) => {
  const result = await api.post<Venta[]>('/ventas', venta);
  return result.data;
};

//---------------------------------------------------------//
//-----------------Service Estado Pago ----------------------------------------//

export const getEstadoPago = async () => {
  const estadoPagos = await api.get<Estadopago[]>('/estado-pago');
  return estadoPagos.data;
};

export const createEstadoPago = async (estadoPago: EstadoPagoCreate) => {
  const result = await api.post<Estadopago[]>('/estado-pago', estadoPago);
  return result.data;
};

export const updateEstadoPago = async (id: number, dato: EstadoPagoUpdate) => {
  const estadoPagos = await api.put<Estadopago[]>(`/estado-psgo/${id}`, dato);
  return estadoPagos.data;
};

export const deleteEstadoPago = async (id: number) => {
  const estadoPagos = await api.delete<{ id: number }>(`/estado-pago/${id}`);
  return estadoPagos.data;
};

//-----------------------------------------------///
//------Detalle Venta ----------------------------------------///

export const getDetalleVenta = async () => {
  const detalleVenta = await api.get<DetalleVenta[]>('/detalle-venta');
  return detalleVenta.data;
};

export const createDetalleVenta = async (detalleVenta: CreatedetalleVenta) => {
  const detalleVentas = await api.post<DetalleVenta>(
    '/detalle-venta',
    detalleVenta
  );
  return detalleVentas.data;
};

export const updateDetalleVenta = async (
  id: number,
  dato: UpdatedetalleVenta
) => {
  const detalleVenta = await api.put<DetalleVenta[]>(
    `/dellate-venta/${id}`,
    dato
  );
  return detalleVenta.data;
};

export const deleteDetalleVenta = async (id: number) => {
  const detalleVenta = await api.delete<{ id: number }>(`/detalle-venta/${id}`);
  return detalleVenta.data;
};
