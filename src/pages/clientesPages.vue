<template>
  <div class="q-pa-md">
    <q-btn
      unelevated
      color="primary"
      label="Crear Cliente"
      @click="openDialog"
    />

    <q-table
      style="height: 700px"
      flat
      bordered
      title="Tabla de Clientes"
      no-data-label="No se encontro ningun cliente"
      :rows="clientesRow"
      :columns="columns"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="rut" :props="props">
            {{ props.row.rut }}
          </q-td>
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="apellido" :props="props">
            {{ props.row.apellido }}
          </q-td>
          <q-td key="correo" :props="props">
            {{ props.row.correo }}
          </q-td>
          <q-td key="celular" :props="props">
            {{ props.row.celular }}
          </q-td>
          <q-td key="direccion_id" :props="props">
            {{ props.row.direccion_id }}
          </q-td>
          <q-td key="Direcciones" :props="props">
            {{ props.row.Direcciones.id }}
          </q-td>
          <q-td key="Direcciones" :props="props">
            {{ props.row.Direcciones.calle }}
          </q-td>
          <q-td key="update" :props="props">
            <q-btn round color="blue" label="Editar">
              <q-icon name="edit" />
            </q-btn>
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn round color="danger" label="Eliminar ">
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <CrearCliente
      :dialogVisible="dialogVisible"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Cliente, ClienteUpdate } from '../models/cliente.model';
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

const EditarCol = async (id: number, dato: ClienteUpdate) => {
  const clientes = await api.put<Cliente[]>(`clientes/${id}`, dato);
  return clientes.data;
};
const EliminarCol = async (id: number) => {
  const clientes = await api.delete<Cliente[]>(`usuarios/${id}`);
  return clientes.data;
};

//trae la lista de clientes del backend
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
  console.log('no Veo los botones');
  columns.value.push({
    field: 'update',
    name: 'Update',
    label: 'update',
  });
  columns.value.push({
    field: 'delete',
    name: 'Delete',
    label: 'delete',
  });

  console.log(columns);
});
</script>
