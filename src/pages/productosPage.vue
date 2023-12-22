<template>
  <div class="q-pa-md">
    <q-btn
      unelevated
      color="primary"
      label="Crear Producto"
      @click="openDialog"
    >
    </q-btn>

    <q-btn unelevated color="blue" label="Crear categoria" @click="openDialog2">
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
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.descripcion"
              title="Editar descripcion"
              buttons
              persistent
              @save="(val: string) => editarItemDescripcion(props.row.descripcion, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un descripcion']"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="peso_gramos" :props="props">
            {{ props.row.peso_gramos }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.peso_gramos"
              title="Editar el peso Gramo"
              buttons
              persistent
              @save="(val: number) => editarItemPesoGramos(props.row.peso_gramos, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="#####"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un peso gramo']"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="precio_neto" :props="props">
            {{ props.row.precio_neto }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.precio_neto"
              title="Editar el peso Gramo"
              buttons
              persistent
              @save="(val: number) => editarItemPrecioNeto(props.row.precio_neto, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="#####"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un peso precio neto']"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="stock" :props="props">
            {{ props.row.stock }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.stock"
              title="Editar el stock"
              buttons
              persistent
              @save="(val: number) => editarItemStock(props.row.stock , val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="#####"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un peso stock']"
              />
            </q-popup-edit>
          </q-td>
          <q-td key="cod_barras" :props="props">
            {{ props.row.cod_barras }}
            <q-popup-edit
              v-slot="scope"
              v-model="props.row.cod_barras"
              title="Editar el cod.Barra"
              buttons
              persistent
              @save="(val:string) => editarItemCodBarra(props.row.cod_barras, val)"
            >
              <q-input
                v-model="scope.value"
                autofocus
                counter
                mask="NNNNNNNNNNN"
                unmasked-value
                @keyup.enter.stop
                :rules="[(val) => !!val || 'Ingrese un peso codigo de barra']"
              />
            </q-popup-edit>
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
    <Suspense>
      <CrearCategoria
        :dialog-visible2="dialogVisible2"
        @update:dialogVisible2="updateDialogVisible2"
      />
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CrearProducto from '../components/crearProducto.vue';
import CrearCategoria from 'src/components/crearCategoria.vue';
import { Producto } from 'src/models/producto.model';
import { getProductos, EliminarCol } from '../composable/producto.service';
import { useProductosStore } from 'src/stores/productos';

const productosStore = useProductosStore();

const editarItemDescripcion = async (id: number, val: string) => {
  const decriptObj = {
    descripcion: val,
  };
  console.log('editarItemDescripcion', id, decriptObj);
  await productosStore.updateProducto(id, decriptObj);
};

const editarItemPesoGramos = async (id: number, val: number) => {
  const pesogramObj = {
    peso_gramos: val,
  };
  console.log('editarItemPesoGramos', id, pesogramObj);
  await productosStore.updateProducto(id, pesogramObj);
};

const editarItemPrecioNeto = async (id: number, val: number) => {
  const precioNetObj = {
    precio_neto: val,
  };
  console.log('editarItemPrecioNeto', id, precioNetObj);
  await productosStore.updateProducto(id, precioNetObj);
};

const editarItemStock = async (id: number, val: number) => {
  const stockObj = {
    stock: val,
  };
  console.log('editarItemStock', id, stockObj);
  await productosStore.updateProducto(id, stockObj);
};

const editarItemCodBarra = async (id: number, val: string) => {
  const codBarraObj = {
    cod_barras: val,
  };
  console.log('editarItemCodBarra', id, codBarraObj);
  await productosStore.updateProducto(id, codBarraObj);
};

const dialogVisible = ref<boolean>(false);
const dialogVisible2 = ref<boolean>(false);

const openDialog = () => {
  dialogVisible.value = true;
};
const openDialog2 = () => {
  dialogVisible2.value = true;
};
const updateDialogVisible = async (value: boolean) => {
  dialogVisible.value = value;
};
const updateDialogVisible2 = async (value: boolean) => {
  dialogVisible2.value = value;
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
