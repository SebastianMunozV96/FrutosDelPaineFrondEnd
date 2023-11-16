<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Clientes"
      :rows="clientesRow"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios, { api } from '../boot/axios';

interface Cliente {
  id: number;
  rut: string | null;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  direccion_id: number | null;
}

const columns = ref();

const getClientes = async () => {
  const clientes = await api.get<Cliente[]>('/clientes');
  return clientes.data;
};
const clientesRow = ref<Cliente[]>([]);

onMounted(async () => {
  clientesRow.value = await getClientes();
  columns.value = Object.keys(clientesRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
