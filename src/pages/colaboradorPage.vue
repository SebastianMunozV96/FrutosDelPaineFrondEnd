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
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="nombres" :props="props">
            {{ props.row.nombres }}
          </q-td>
          <q-td key="apellidos" :props="props">
            {{ props.row.apellidos }}
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
              @click="deleteColabor(props.row.id)"
            >
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <Suspense>
      <CrearUsuario
        :dialogVisible="dialogVisible"
        @updateDialogVisible="updateDialogVisible"
      />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Colaborador } from '../models/colaboradores.model';
import {
  getColaboradores,
  EliminarCol,
} from '../composable/colaborador.service';

const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const deleteColabor = (id: number) => {
  EliminarCol(id)
    .then((response) => {
      console.log('Colaborador eliminado', response);
    })
    .catch((error) => {
      console.log('Colaborador eliminado', error);
    })
    .finally(() => {
      getColabor();
    });
};

const colaboradoresRow = ref<Colaborador[]>();

const columns = [
  {
    field: 'nombres',
    name: 'nombres',
    label: 'nombres',
  },
  {
    field: 'apellidos',
    name: 'apellidos',
    label: 'apellidos',
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

const getColabor = () => {
  getColaboradores()
    .then((response) => {
      colaboradoresRow.value = response;
      console.log(colaboradoresRow.value);
    })
    .catch((error) =>
      console.log('error al obtener los datos de ususarios', error)
    );
};

onMounted(async () => {
  getColabor();

  console.log(columns);
});
</script>
