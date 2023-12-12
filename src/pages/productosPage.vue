<template>
  <div class="q-pa-md">
    <q-btn
      unelevated
      color="primary"
      label="Crear Producto"
      @click="openDialog"
    >
    </q-btn>
    <q-table
      style="height: 400px"
      flat
      bordered
      title="Tabla de Productos"
      :rows="productosRow"
      :columns="columns"
      no-data-label="No se encontro ningun Producto"
    >
      <template #body="props">
        <q-tr :props="props">


          <q-td key="descripcion" :props="props">
            {{ props.row.descripcion }}
          </q-td>
          <q-td key="peso_gramos" :props="props">
            {{ props.row.peso_gramos }}
          </q-td>
          <q-td key="precio_neto" :props="props">
            {{ props.row.precio_neto }}
          </q-td>
          <q-td key="stock" :props="props">
            {{ props.row.stock }}
          </q-td>
          <q-td key="cod_barras" :props="props">
            {{ props.row.cod_barras }}
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
              @click="deleteProduc(props.row.id)"
            >
              <q-icon name="delete" />
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <Suspense>
      <CrearProducto
        :dialogVisible="dialogVisible"
        @update:dialogVisible="updateDialogVisible"
      />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CrearProducto from '../components/crearProducto.vue';
import { Producto } from 'src/models/producto.model';
import { getProductos, EliminarCol } from '../composable/producto.service';

const dialogVisible = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};

const deleteProduc = (id: number) => {
  EliminarCol(id)
    .then((response) => {
      console.log('Producto eliminado', response.id);
    })
    .catch((error) => {
      console.log('Producto eliminado', error);
    })
    .finally(() => {
      getProduc();
    });
};

const columns = [
  {
    field: 'descripcion',
    name: 'descripcion',
    label: 'descripcion',
  },
  {
    field: 'peso_gramos',
    name: 'peso_gramos',
    label: 'peso en gramos',
  },
  {
    field: 'precio_neto',
    name: 'precio_neto',
    label: 'precio neto',
  },
  {
    field: 'stock',
    name: 'stock',
    label: 'stock',
  },
  {
    field: 'cod_barras',
    name: 'cod_barras',
    label: 'codido de barras',
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

const productosRow = ref<Producto[]>();

const getProduc = () => {
  getProductos()
    .then((response) => {
      productosRow.value = response;
      console.log(productosRow.value);
    })
    .catch((error) => console.log('error al obtener datos', error));
};

onMounted(async () => {
  getProduc();

  console.log(columns);
});
</script>
