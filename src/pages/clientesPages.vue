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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="rut" :props="props">
            {{ props.row.rut }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.rut"
              title="Editar rut"
              buttons
              persistent
              @save="(val: string) => editarItemRut(props.row.rut, val)"
            >
              <q-input
                v-model="scope!.value"
                autofocus
                counter
                mask="########-#"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un rut']"
              />
            </q-popup-edit>
          </q-td>

          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.nombre"
              title="Editar nombre"
              buttons
              persistent
              @save="(val: string) => editarItemNombre(props.row.id, val)"
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

          <q-td key="apellido" :props="props">
            {{ props.row.apellido }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.apellido"
              title="Editar apellido"
              buttons
              persistent
              @save="(val: string) => editarItemApellido(props.row.id, val)"
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
              @save="(val: string) => editarItemCorreo(props.row.id, val)"
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
              @save="(val: string) => editarItemCelular(props.row.id, val)"
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
import { useClientesStore } from 'src/stores/clientes';

const clientesStore = useClientesStore();

const editarItemRut = async (id: number, val: string) => {
  const rutObj = {
    rut: val,
  };
  console.log('editarItemRut', id, rutObj);
  await clientesStore.updateCliente(id, rutObj);
};

const editarItemNombre = async (id: number, val: string) => {
  const nameObj = {
    nombre: val,
  };
  console.log('editarItemNombre', id, nameObj);
  await clientesStore.updateCliente(id, nameObj);
};

const editarItemApellido = async (id: number, val: string) => {
  const apellidoObj = {
    apellido: val,
  };
  console.log('editarItemApellido', id, apellidoObj);
  await clientesStore.updateCliente(id, apellidoObj);
};

const editarItemCorreo = async (id: number, val: string) => {
  const correoObj = {
    correo: val,
  };
  console.log('editarItemCorreo', id, correoObj);
  await clientesStore.updateCliente(id, correoObj);
};
const editarItemCelular = async (id: number, val: string) => {
  const celularObj = {
    celular: val,
  };
  console.log('editarItemCelular', id, celularObj);
  await clientesStore.updateCliente(id, celularObj);
};

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
