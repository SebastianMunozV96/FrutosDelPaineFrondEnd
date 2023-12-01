<template>
  <div class="q-pa-md">
    <q-btn
      unelevated
      color="primary"
      label="Crear Colaborador"
      @click="openDialog"
    >
    </q-btn>
    <br />
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Colaboradores"
      :rows="colaboradoresRow"
      :columns="columns"
      no-data-label="No se encontro ningun Colaborador"
    />
    <CrearUsuario
      :dialogVisible="dialogVisible"
      @updateDialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../boot/axios';
import { Colaborador } from '../models/colaboradores.model';

const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const columns = ref();

const getColaboradores = async () => {
  const usuarios = await api.get<Colaborador[]>('/colaboradores');
  return usuarios.data;
};

const colaboradoresRow = ref<Colaborador[]>();

onMounted(async () => {
  getColaboradores()
    .then((response) => {
      colaboradoresRow.value = response;
      console.log(colaboradoresRow.value);
    })
    .catch((error) =>
      console.log('error al obtener los datos de ususarios', error)
    );

  columns.value = Object.keys(colaboradoresRow.value!).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
