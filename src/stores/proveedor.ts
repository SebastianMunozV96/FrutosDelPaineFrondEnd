import { ref, computed } from 'vue';
import { api } from 'src/boot/axios';
import { defineStore } from 'pinia';
import {
  Proveedor,
  ProveedorInsert,
  ProveedorUpdate,
} from 'src/models/proveedor.model';

export const useProveedorStore = defineStore('counter', () => {
  const proveedores = ref<Proveedor[]>([]);

  const countProveedores = computed(() => proveedores.value.length);

  async function getProveedores() {
    const { data } = await api.get<Proveedor[]>('/proveedores');
    proveedores.value = data;
  }

  async function crearProveedor(
    proveedor: ProveedorInsert
  ): Promise<Proveedor> {
    const result = await api.post<Proveedor>('/proveedores', proveedor);
    if (!result.data) console.log('crearProveedor Error', result.status);
    getProveedores();
    return result.data;
  }
  const updateProveedor = async (id: number, dato: ProveedorUpdate) => {
    const result = await api.put<Proveedor[]>(`/proveedores/${id}`, dato);
    if (!result.data) console.log('updateProveedor error : ', result);
    console.log('updateProveedor Actualizado ', result.data);
    getProveedores();
  };

  const deleteProveedor = async (id: number) => {
    const result = await api.delete<{ id: number }>(`/proveedores/${id}`);
    if (!result.data) console.log('deleteProveedor error ', result);
    console.log('updateProveedor eliminado: ', result.data);
    getProveedores();
  };

  return {
    proveedores,
    countProveedores,
    getProveedores,
    crearProveedor,
    updateProveedor,
    deleteProveedor,
  };
});
