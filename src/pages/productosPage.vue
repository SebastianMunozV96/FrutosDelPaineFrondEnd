<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Treats"
      :rows="productosRow"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios, { api } from '../boot/axios';

interface Producto {
  id: number;
  descripcion: string | null;
  peso_gramos: number | null;
  precio_neto: number | null;
  stock: number | null;
  cod_barras: string | null;
  Categorias_id: number;
}

const columns = ref();

const getProductos = async () => {
  const productos = await api.get<Producto[]>('/productos');
  return productos.data;
};

const productosRow = ref<Producto[]>([]);

onMounted(async () => {
  productosRow.value = await getProductos();
  columns.value = Object.keys(productosRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
