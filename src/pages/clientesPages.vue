<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Cliente" @click="openDialog">
    </q-btn>

    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Clientes"
      :rows="clientesRow"
      :columns="columns"
    />
    <CrearCliente
      :dialogVisible="dialogVisible"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Cliente } from '../models/cliente.model';
import { api } from '../boot/axios';
import CrearCliente from '../components/CrearCliente.vue';

const dialogVisible = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const columns = ref();

const getClientes = async () => {
  const clientes = await api.get<Cliente[]>('/clientes');
  return clientes.data;
};
const clientesRow = ref<Cliente[]>();

onMounted(async () => {
  getClientes()
    .then((response) => {
      clientesRow.value = response;
      console.log(clientesRow.value);
    })
    .catch((error) => console.log('error al obtener datos ', error));

  columns.value = Object.keys(clientesRow.value!).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
