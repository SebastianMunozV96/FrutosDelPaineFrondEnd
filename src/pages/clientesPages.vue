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

          <q-td key="update" :props="props">
            <q-btn size="md" color="blue" label="Editar">
              <q-icon name="edit" />
            </q-btn>
          </q-td>
          <q-td key="delete" :props="props">
            <q-btn
              size="md"
              color="red"
              label="Eliminar "
              @click="deleteClient(props.row.id)"
            >
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <Suspense>
      <CrearCliente
        :dialogVisible="dialogVisible"
        @update:dialogVisible="updateDialogVisible"
      />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUpdated } from 'vue';
import { Cliente, ClienteUpdate } from '../models/cliente.model';
import {
  EditarCol,
  eliminarCliente,
  getClientes,
} from '../composable/clientes.service';
import CrearCliente from '../components/CrearCliente.vue';

const dialogVisible = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const clientesRow = ref<Cliente[]>();

const getClis = () => {
  getClientes()
    .then((response) => {
      clientesRow.value = response;
      console.log(clientesRow.value);
    })
    .catch((error) => console.log('error al obtener datos ', error));
};

const deleteClient = (id: number) => {
  eliminarCliente(id)
    .then((response) => {
      console.log('cliente eliminado ', response.id);
    })
    .catch((error) => {
      console.log('cliente eliminado', error);
    })
    .finally(() => {
      getClis();
    });
};

const updateClient = (id: number, dato: ClienteUpdate) => {
  EditarCol(id, dato)
    .then((response) => {
      console.log('cliente editado', response);
    })
    .catch((error) => {
      console.log('cliente editado', error);
    })
    .finally(() => {
      getClis();
    });
};

onUpdated(async () => {
  updateClient;
});

// TODO: definir lo que quiero ver en la tabla con columns
const columns = [
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
  {
    field: 'nombre',
    name: 'nombre',
    label: 'nombre',
  },
  {
    field: 'apellido',
    name: 'apellido',
    label: 'apellido',
  },
  {
    field: 'correo',
    name: 'correo',
    label: 'correo',
  },
  {
    field: 'celular',
    name: 'celular',
    label: 'celular',
  },
  {
    field: 'update',
    name: 'update',
    label: 'update',
  },
  {
    field: 'delete',
    name: 'delete',
    label: 'delete',
  },
];

onMounted(async () => {
  getClis();

  console.log('no Veo los botones');
  // columns.value.push({
  //   field: 'update',
  //   name: 'Update',
  //   label: 'update',
  // });
  // columns.value.push({
  //   field: 'delete',
  //   name: 'Delete',
  //   label: 'delete',
  // });

  console.log(columns);
});
</script>
