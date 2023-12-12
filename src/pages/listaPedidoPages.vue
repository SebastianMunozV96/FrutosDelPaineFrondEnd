<template>
 <div class="q-pa-md">
  <q-btn
  unelevated
  color="primary"
  label="Crear Pedido" />

  <q-table
    style="height:700px ;"
    flat
    bordered
    title="Tabla de Pedidos"
    no-data-label="No se encontro ningun pedido"
    :rows="pedidoRow"
    :columns="columns"
  >

  <template #body="props">
    <q-tr :props="props">


    </q-tr>












  </template>
  </q-table>


 </div>

</template>


<script setup lang="ts">
import { Venta } from 'src/models/venta.model';
import { onMounted,ref } from 'vue';

const pedidoRow = ref<Venta[]>();

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












]








</script>
