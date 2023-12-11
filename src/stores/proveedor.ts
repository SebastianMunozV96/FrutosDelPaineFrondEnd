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

  return {
    proveedores,
    countProveedores,
    getProveedores,
    crearProveedor,
  };
});
