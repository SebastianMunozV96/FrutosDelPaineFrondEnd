import { api } from 'src/boot/axios';
import {
  Cliente,
  ClienteInsert,
  ClienteUpdate,
} from 'src/models/cliente.model';

export const EditarCol = async (id: number, dato: ClienteUpdate) => {
  const clientes = await api.put<Cliente[]>(`/clientes/${id}`, dato);
  return clientes.data;
};
export const eliminarCliente = async (id: number) => {
  const clientes = await api.delete<{id: number}>(`/clientes/${id}`);
  return clientes.data;
};

//trae la lista de clientes del backend
export const getClientes = async () => {
  const clientes = await api.get<Cliente[]>('/clientes');
  return clientes.data;
};

export const createCliente = async (cliente: ClienteInsert) => {
  const result = await api.post<Cliente>('/clientes', cliente);
  return result.data;
};
