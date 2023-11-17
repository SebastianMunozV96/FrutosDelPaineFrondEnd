<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Pedido">

</q-btn>
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Pedidos"
      :rows="ventasRow"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios, { api } from '../boot/axios';

interface Venta {
  id: number;
  neto: number;
  iva: number;
  total: number | null;
  fecha: string;
  Usuario_id: number | null;
  Cliente_id: number | null;
  Estado_PAgo_id: number | null;
}

const columns = ref();

const getVentas = async () => {
  const ventas = await api.get<Venta[]>('/pedidos');
  return ventas.data;
};

const ventasRow = ref<Venta[]>([]);

onMounted(async () => {
  ventasRow.value = await getVentas();
  columns.value = Object.keys(ventasRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
