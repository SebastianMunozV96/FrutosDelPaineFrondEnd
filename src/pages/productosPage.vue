<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Producto" @click="openDialog">

    </q-btn>
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Productos"
      :rows="productosRow"
      :columns="columns"
    />
    <CrearProducto
    :dialogVisible="dialogVisible"
    @update:dialogVisible="updateDialogVisible"
    />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import  { api } from '../boot/axios';
import CrearProducto from 'src/components/crearProducto.vue';
import { Producto } from 'src/models/producto.model';




const dialogVisible = ref <boolean>(false);

const openDialog= () =>{
dialogVisible.value= true;
};

const updateDialogVisible = async (value :boolean) => {
  dialogVisible.value = value;
}

const columns = ref();

const getProductos = async () => {
  const productos = await api.get<Producto[]>('/productos');
  return productos.data;
};

const productosRow = ref<Producto[]>([]);

onMounted(async () => {
  getProductos()
   .then((response)=>{
    productosRow.value=response;
    console.log(productosRow.value)
   })
   .catch((error)=> console.log('error al obtener datos',error));

  productosRow.value = await getProductos();
  columns.value = Object.keys(productosRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
