<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Proveedor" @click="openDialog">

</q-btn>
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Proveedores"
      :rows="proveedoresRow"
      :columns="columns"
      no-data-label="No se encontro ningun Proveedor"
    


    />

    <CrearProoveedo
    :dialog-visible="dialogVisiblePRo"
    @update:dialog-visible="updateDialogVisible"
    />
  </div>


</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import  { api } from '../boot/axios';
import { Proveedor } from 'src/models/proveedor.model';
import CrearProoveedor from 'src/components/crearProveedor.vue';




const dialogVisiblePRo =ref<boolean>(false);

const openDialog = () => {
  dialogVisiblePRo.value = true;
};

const updateDialogVisible = async (value: boolean) => {
  dialogVisiblePRo.value = value;
};

const columns = ref();

const getProveedores = async () => {
  const proveedores = await api.get<Proveedor[]>('/proveedores');
  return proveedores.data;
};

const proveedoresRow = ref<Proveedor[]>([]);

onMounted(async () => {
  getProveedores()
    .then((response)=>{
      proveedoresRow.value = response;
      console.log(proveedoresRow.value)
    })
    .catch((error)=> console.log('error al obtener los datos',error))
  proveedoresRow.value = await getProveedores();
  columns.value = Object.keys(proveedoresRow.value!).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});

</script>
