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
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
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
          <q-td key="Direccion_id" :props="props">
            {{ props.row.Direccion_id }}
          </q-td>
          <q-td key="calle" :props="props">
            {{ props.row.Direcciones.calle }}
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
      </template> </q-table
    >/>
    <CrearProveedor
      :dialogVisible="dialogVisible"
      @update:dialogVisible="updateDialogVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../boot/axios';
import { Proveedor } from 'src/models/proveedor.model';
import CrearProveedor from '../components/crearProveedor.vue';

const dialogVisible = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const columns = ref();

const getProveedores = async () => {
  const proveedores = await api.get<Proveedor[]>('/proveedores');
  return proveedores.data;
};

const proveedoresRow = ref<Proveedor[]>();

onMounted(async () => {
  getProveedores()
    .then((response) => {
      proveedoresRow.value = response;
      console.log(proveedoresRow.value);
    })
    .catch((error) => console.log('error al obtener los datos ', error));

  columns.value = Object.keys(proveedoresRow.value!).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>
