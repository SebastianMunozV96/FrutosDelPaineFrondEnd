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
      :rows="colaboradoresStore.colaboradores"
      :columns="columns"
      no-data-label="No se encontro ningun Colaborador"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="nombres" :props="props">
            {{ props.row.nombres }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.nombres"
              title="Editar nombres"
              buttons
              persistent
              @save="(val: string) => colaboradoresStore.updateColaborador(props.row.id, {nombres: val})"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="SSSSSSSSSSSSSSSSSSSSSSSS"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un nombre']"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="apellidos" :props="props">
            {{ props.row.apellidos }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.apellidos"
              title="Editar apellido"
              buttons
              persistent
              @save="(val: string) => colaboradoresStore.updateColaborador(props.row.id, {apellidos: val})"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="SSSSSSSSSSSSSSSSSSSSSSSS"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un apellido']"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="correo" :props="props">
            {{ props.row.correo }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.correo"
              title="Editar correo"
              buttons
              persistent
              @save="(val: string) => colaboradoresStore.updateColaborador(props.row.id, {correo: val})"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="AAAAAAA@AAAAAAA.AAA"
                unmasked-value
                @keyup.enter.stop
                :rules="[
                  (val) => !!val || 'Ingrese un correo',
                  (val) => /.+@.+\..+/.test(val) || 'Correo no Valido',
                ]"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="celular" :props="props">
            {{ props.row.celular }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.celular"
              title="Editar celular"
              buttons
              persistent
              @save="(val:string) => colaboradoresStore.updateColaborador(props.row.id, {celular: val})"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="(+56) 9 ########"
                :rules="[(val) => !!val || 'Ingrese un numero de Celular']"
                unmasked-value
                @keyup.enter.stop
              />
            </q-popup-edit>
          </q-td>

          <q-td key="delete" :props="props">
            <q-btn
              size="md"
              color="red"
              label="Eliminar "
              @click="colaboradoresStore.deleteColaborador(props.row.id)"
            >
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <Suspense>
      <CrearColaborador
        :dialogVisible="dialogVisible"
        @updateDialogVisible="updateDialogVisible"
      />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Colaborador } from '../models/colaboradores.model';
// import {
//   getColaboradores,
//   EliminarCol,
// } from '../composable/colaborador.service';
import CrearColaborador from '../components/CrearColaborador.vue';
import { useColaboradorStore } from 'src/stores/colaborador';

const colaboradoresStore = useColaboradorStore();

// const editarItemNombre = async (id: number, val: string) => {
//   const nameObj = {
//     nombre: val,
//   };
//   console.log('editarItemNombre ', id, nameObj);
//   await colaboradoresStore.updateColaborador(id, nameObj);
// };

// const editarItemApellido = async (id: number, val: string) => {
//   const apellidoObj = {
//     apellido: val,
//   };
//   console.log('editarItemApellido', id, apellidoObj);
//   await colaboradoresStore.updateColaborador(id, apellidoObj);
// };

// const editarItemCorreo = async (id: number, val: string) => {
//   const correoObj = {
//     correo: val,
//   };
//   console.log('editarItemCorreo', id, correoObj);
//   await colaboradoresStore.updateColaborador(id, correoObj);
// };

// const editarItemCelular = async (id: number, val: string) => {
//   const celularObj = {
//     celular: val,
//   };
//   console.log('editarItemCelular', id, celularObj);
//   await colaboradoresStore.updateColaborador(id, celularObj);
// };

const dialogVisible = ref<boolean>(false);
const openDialog = () => {
  dialogVisible.value = true;
};
const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

// const deleteColabor = (id: number) => {
//   EliminarCol(id)
//     .then((response) => {
//       console.log('Colaborador eliminado', response);
//     })
//     .catch((error) => {
//       console.log('Colaborador eliminado', error);
//     })
//     .finally(() => {
//       getColabor();
//     });
// };

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
    field: 'delete',
    name: 'delete',
    label: 'delete',
  },
];

// const getColabor = () => {
//   getColaboradores()
//     .then((response) => {
//       colaboradoresRow.value = response;
//       console.log(colaboradoresRow.value);
//     })
//     .catch((error) =>
//       console.log('error al obtener los datos de ususarios', error)
//     );
// };

onMounted(async () => {
  colaboradoresStore.getColaborador()
  // getColabor();

  // console.log(columns);
});
</script>
