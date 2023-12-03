import { api } from 'src/boot/axios';
import { Proveedor, ProveedorUpdate } from 'src/models/proveedor.model';

export const getProveedores = async () => {
  const proveedores = await api.get<Proveedor[]>('/proveedores');
  return proveedores.data;
};

export const EditarCol = async (id: number, dato: ProveedorUpdate) => {
  const proveedor = await api.put<Proveedor>(`/proveedores/${id}`, dato);
  return proveedor.data;
};

export const EliminarCol = async (id: number) => {
  const proveedor = await api.delete<Proveedor>(`/proveedores/${id}`);
  return proveedor.data;
};
