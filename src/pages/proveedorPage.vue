<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Treats"
      :rows="proveedoresRow"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios, { api } from '../boot/axios';

interface Proveedor {
  id: number;
  rut: string | null;
  giro: number | null;
  nombre: string | null;
  telefono: number | null;
  correo: string | null;
  pagina_web: string | null;
  direcciones_id: number;
}

const columns = ref();

const getProveedores = async () => {
  const proveedores = await api.get<Proveedor[]>('/proveedores');
  return proveedores.data;
};

const proveedoresRow = ref<Proveedor[]>([]);

onMounted(async () => {
  proveedoresRow.value = await getProveedores();
  columns.value = Object.keys(proveedoresRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
