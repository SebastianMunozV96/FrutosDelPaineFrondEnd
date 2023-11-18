<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Usuarios">

    </q-btn>
    <br>
    <q-table
      style="height: 400px"
      flat
      bordered

      title="Tabla de Usuarios"

      :rows="usuariosRow"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../boot/axios';


interface Usuario {
  id: number;
  pass_encrypt: string | null;
  ultimo_login: string | null;
  Tipo_Usuario_id: number;
  Colaboradores_id: number;
}

const columns = ref();

const getUsuarios = async () => {
  const usuarios = await api.get<Usuario[]>('/usuarios');
  return usuarios.data;
};

const usuariosRow = ref<Usuario[]>([]);

onMounted(async () => {
  usuariosRow.value = await getUsuarios();
  columns.value = Object.keys(usuariosRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
