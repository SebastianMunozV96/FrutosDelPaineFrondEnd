<template>
  <div class="q-pa-md">
    <q-btn
      unelevated
      color="primary"
      label="Crear Proveedor"
      @click="openDialog"
    />

    <q-table
      style="height: 500px"
      flat
      bordered
      title="Tabla de Proveedores"
      :rows="proveedoresRow"
      :columns="columns"
      no-data-label="No se encontro ningun Proveedor"
    >
      <template #body="props">
        <q-tr :props="props">
          <q-td key="rut" :props="props">
            {{ props.row.rut }}
          </q-td>
          <q-td key="giro" :props="props">
            {{ props.row.giro }}
          </q-td>
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
          </q-td>
          <q-td key="telefono" :props="props">
            {{ props.row.telefono }}
          </q-td>
          <q-td key="correo" :props="props">
            {{ props.row.correo }}
          </q-td>
          <q-td key="pagina_web" :props="props">
            {{ props.row.pagina_web }}
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
              @click="deleteProveedor(props.row.id)"
            >
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <Suspense>
      <CrearProveedor
        :dialogVisible="dialogVisible"
        @update:dialogVisible="updateDialogVisible"
      />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getProveedores, EliminarCol } from '../composable/proveedor.service';
import { Proveedor } from 'src/models/proveedor.model';
import CrearProveedor from '../components/crearProveedor.vue';

const dialogVisible = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const deleteProveedor = (id: number) => {
  EliminarCol(id)
    .then((response) => {
      console.log('proveedor eliminado', response.id);
    })
    .catch((error) => {
      console.log('proveedor eliminado', error);
    })
    .finally(() => {
      getProveed();
    });
};

const columns = [
  {
    field: 'rut',
    name: 'rut',
    label: 'rut',
  },
  {
    field: 'giro',
    name: 'giro',
    label: 'giro',
  },
  {
    field: 'nombre',
    name: 'nombre',
    label: 'nombre',
  },
  {
    field: 'telefono',
    name: 'telefono',
    label: 'telefono',
  },
  {
    field: 'correo',
    name: 'correo',
    label: 'correo',
  },
  {
    field: 'pagina_web',
    name: 'pagina_web',
    label: 'pagina web',
  },
  {
    field: 'update',
    name: 'update',
    label: '',
  },
  {
    field: 'delete',
    name: 'delete',
    label: '',
  },
];

const proveedoresRow = ref<Proveedor[]>();

const getProveed = () => {
  getProveedores()
    .then((response) => {
      proveedoresRow.value = response;
      console.log(proveedoresRow.value);
    })
    .catch((error) => console.log('error al obtener los datos ', error));
};

onMounted(async () => {
  getProveed();

  console.log(columns);
});
</script>
