import {
  DetallePago,
  CreateDetallePago,
  UpdateDetallePago,
  MetodoPago,
  UpdatMetodoPago,
  CreateMetodoPago,
} from 'src/models/detalle-pago.model';
import { api } from 'src/boot/axios';

export const getDetallePago = async () => {
  const detallePagos = await api.get<DetallePago[]>('/detalle-pago');
  return detallePagos.data;
};

export const createDetallePago = async (detallePago: CreateDetallePago) => {
  const detallePagos = await api.post<DetallePago>(
    '/detalle-pago',
    detallePago
  );
  return detallePagos.data;
};

export const updateDetallePago = async (
  id: number,
  dato: UpdateDetallePago
) => {
  const detallePago = await api.put<DetallePago[]>(`/detalle-pago/${id}`, dato);
  return detallePago.data;
};

export const deleteDetallPAgo = async (id: number) => {
  const result = await api.delete<{ id: number }>(`/detalle-pago/${id}`);
  return result.data;
};

//------------------------------------------------------------------------------//
//-----------------MetdodoPago ----------------------------------------///

export const getMetodoPago = async () => {
  const metodoPago = await api.get<MetodoPago[]>('');
  return metodoPago.data;
};

export const createMetodoPago = async (metodoPago: CreateMetodoPago) => {
  const result = await api.post<MetodoPago[]>('/metodo-pago', metodoPago);
  return result.data;
};

export const updateMetodoPAgo = async (id: number, dato: UpdatMetodoPago) => {
  const result = await api.put<MetodoPago[]>(`/metodo-pago/${id}`, dato);
  return result.data;
};

export const deleteMetodoPago = async (id: number) => {
  const metodoPago = await api.delete<{ id: number }>(`/metodo-pago/${id}`);
  return metodoPago.data;
};
