<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Pedido" />

    <q-table
      style="height: 700px"
      flat
      bordered
      title="Tabla de ventas"
      no-data-label="No se encontro ningun pedido"
      :rows="pedidoRow"
      row-key="name"
    >
    </q-table>
  </div>
</template>

<script setup lang="ts">
import { Venta } from 'src/models/venta.model';
import { onMounted, ref } from 'vue';
import { useVentasStore } from '../stores/ventas';

const ventasStore = useVentasStore()

const pedidoRow = ref();

const columns = [
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
];

onMounted(() => {
  ventasStore.getAllVentas().then((response) => {
    pedidoRow.value = response
    console.log(response)
  })
})
</script>
