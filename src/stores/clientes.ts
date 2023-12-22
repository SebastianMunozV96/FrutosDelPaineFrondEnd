import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import {
  Cliente,
  ClienteInsert,
  ClienteUpdate,
} from 'src/models/cliente.model';
import { useAuthStore } from './auth';

const authStore = useAuthStore();
export const useClientesStore = defineStore('clientes', () => {
  // state
  const clientes = ref<Cliente[]>([]);
  const token = ref<string | null>();

  // actions
  const getClientes = async () => {
    const result = await api.get<Cliente[]>('/clientes');
    if (!result.data) console.log('getClientes error: ', result);
    return result.data;
  };
  const updateCliente = async (id: number, dato: ClienteUpdate) => {
    const result = await api.put<Cliente[]>(`/clientes/${id}`, dato);
    if (!result.data) console.log('updateCliente error: ', result);
    console.log('updateCliente actualizado: ', result.data);
    getClientes();
  };

  const deleteCliente = async (id: number) => {
    const result = await api.delete<{ id: number }>(`/clientes/${id}`);
    if (!result.data) console.log('deleteCliente error: ', result);
    console.log('updateCliente eliminado: ', result.data);
    getClientes();
  };

  const createCliente = async (cliente: ClienteInsert) => {
    const result = await api.post<Cliente>('/clientes', cliente);
    if (!result.data) console.log('createCliente error: ', result);
    console.log('updateCliente eliminado: ', result.data);
    getClientes();
  };

  return {
    clientes,
    updateCliente,
    deleteCliente,
    getClientes,
    createCliente,
  };
});
