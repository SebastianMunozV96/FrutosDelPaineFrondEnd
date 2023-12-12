<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { geVenta } from '../composable/venta.service';
import { Venta } from '../models/venta.model';

import { useProductosStore } from 'src/stores/productos';
import { storeToRefs } from 'pinia';

const storeProductos = useProductosStore();
const { productos } = storeToRefs(storeProductos);

const ventasRow = ref<Venta[]>([]);
const celularPedido = ref(false);

//productos

const productosSeleccionados = ref<any[]>([]);

const columns = ref();

const columnsProd = [
  {
    field: 'descripcion',
    name: 'descripcion',
    label: 'descripcion',
  },
  {
    field: 'peso_gramos',
    name: 'peso_gramos',
    label: 'peso_gramos',
  },
  {
    field: 'precio_neto',
    name: 'precio_neto',
    label: 'precio_neto',
  },
  {
    field: 'stock ',
    name: 'stock ',
    label: 'stock ',
  },
  {
    field: 'categoria',
    name: 'categoria',
    label: 'categoria',
  },
];

const metodoPago = ref();

onMounted(async () => {
  storeProductos.getProductos();
  ventasRow.value = await geVenta();
  columns.value = Object.keys(ventasRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>

<template>
  <div class="q-pa-lg">
    <div class="row">
      <q-table
        class="col"
        flat
        bordered
        title="Productos para venta"
        :rows="productos"
        :columns="columnsProd"
        no-data-label="No se encuentran los productos"
        row-key="name"
        selection="multiple"
        v-model:selected="productosSeleccionados"
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
          </q-tr>
        </template>
      </q-table>

      <div class="col">
        <q-card>
          <q-card-section>
            <div class="text-h6">Cliente</div>
          </q-card-section>
        </q-card>
        <q-table
          class=""
          title="Productos de cliente"
          :rows="productosSeleccionados"
          :columns="columns"
          no-data-label="sin cliente"
        />
        <!-- metodos de pago -->
        <q-card>
          <q-card-section>
            <div class="text-h6">Metodos de pago</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-sm">
              <!-- v-for de metodos de pago -->
              <q-radio
                dense
                v-model="metodoPago"
                val="Efectivo"
                label="Efectivo"
              />
              <q-radio dense v-model="metodoPago" val="Debito" label="Debito" />
            </div>
          </q-card-section>
        </q-card>
        <q-btn color="blue" label="Pagar"> </q-btn>
      </div>
    </div>
  </div>
</template>
