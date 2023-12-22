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
            <a-popup-edit
              v-slot="scope"
              v-model="props.row.rut"
              title="Editar rut"
              buttons
              persistent
              @save="(val:number) => editarItemRut(props.row.rut, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="########-#"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un rut']"
              />
            </a-popup-edit>
          </q-td>
          <q-td key="giro" :props="props">
            {{ props.row.giro }}

            <a-popup-edit
              v-slot="scope"
              v-model="props.row.giro"
              title="Editar giro"
              buttons
              persistent
              @save="(val:number) => editarItemGiro(props.row.giro , val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="###.##"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un nombre']"
              />
            </a-popup-edit>
          </q-td>
          <q-td key="nombre" :props="props">
            {{ props.row.nombre }}
            <a-popup-edit
              v-slot="scope"
              v-model="props.row.nombre"
              title="Editar nombre"
              buttons
              persistent
              @save="(val: string) => editarItemNombre(props.row.nombre, val)"
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
            </a-popup-edit>
          </q-td>
          <q-td key="telefono" :props="props">
            {{ props.row.telefono }}

            <a-popup-edit
              v-slot="scope"
              v-model="props.row.telefono"
              title="Editar telefono"
              buttons
              persistent
              @save="(val: number) => editarItemTelefono(props.row.telefono, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="(+56) # #### ####"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un Telefono']"
              />
            </a-popup-edit>
          </q-td>
          <q-td key="correo" :props="props">
            {{ props.row.correo }}
            <a-popup-edit
              v-slot="scope"
              v-model="props.row.correo"
              title="Editar correo"
              buttons
              persistent
              @save="(val: string) => editarItemCorreo(props.row.correo , val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="AAAAAAA@AAAAAAA.AAA"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un correo']"
              />
            </a-popup-edit>
          </q-td>
          <q-td key="pagina_web" :props="props">
            {{ props.row.pagina_web }}
            <a-popup-edit
              v-slot="scope"
              v-model="props.row.pagina_web"
              title="Editar pagina Web"
              buttons
              persistent
              @save="(val: string) => editarItemPaginaWeb(props.row.pagina_web, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="SSSSSSSSSSSSSSSSSSSSSSSS"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un pagina web']"
              />
            </a-popup-edit>
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
import { useProveedorStore } from 'src/stores/proveedor';

const proveedorStore = useProveedorStore();

const editarItemRut = async (id: number, val: number) => {
  const rutObj = {
    rut: val,
  };
  console.log('editarItemRut', id, rutObj);
  await proveedorStore.updateProveedor(id, rutObj);
};

const editarItemGiro = async (id: number, val: number) => {
  const giroObj = {
    giro: val,
  };
  console.log('editarItemGiro ', id, giroObj);
  await proveedorStore.updateProveedor(id, giroObj);
};

const editarItemNombre = async (id: number, val: string) => {
  const nameObj = {
    nombre: val,
  };
  console.log('editarItemNombre ', id, nameObj);
  await proveedorStore.updateProveedor(id, nameObj);
};

const editarItemTelefono = async (id: number, val: number) => {
  const teleObj = {
    telefono: val,
  };
  console.log('editarItemTelefono', id, teleObj);
  await proveedorStore.updateProveedor(id, teleObj);
};

const editarItemCorreo = async (id: number, val: string) => {
  const correoObj = {
    correo: val,
  };
  console.log('editarItemCorreo ', id, correoObj);
  await proveedorStore.updateProveedor(id, correoObj);
};

const editarItemPaginaWeb = async (id: number, val: string) => {
  const pagObj = {
    pagina_web: val,
  };
  console.log('editarItemPaginaWeb ', id, pagObj);
  await proveedorStore.updateProveedor(id, pagObj);
};

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
    field: 'delete',
    name: 'delete',
    label: 'delete',
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
