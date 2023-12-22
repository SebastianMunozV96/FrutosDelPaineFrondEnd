<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { geVenta } from '../composable/venta.service';
import { Venta, Estadopago } from '../models/venta.model';

import { useProductosStore } from 'src/stores/productos';
import { storeToRefs } from 'pinia';
import { ProductoWIthCategoria } from '../models/producto.model';
import { useVentasStore } from 'src/stores/ventas';
import { useClientesStore } from '../stores/clientes';

const storeProductos = useProductosStore();
const ventasStore = useVentasStore();
const clientesStore = useClientesStore();
const { productos } = storeToRefs(storeProductos);

const ventasRow = ref<Venta[]>([]);
const metodosPago = ref<{ label: string; value: number }[]>([]);
// const celularPedido = ref(false);

//productos

const formatMoneyCLP = (valor: number) => {
  return new Intl.NumberFormat('es-CL', {
    currency: 'CLP',
    style: 'currency',
  }).format(valor);
};

const selected = ref<ProductoWIthCategoria[]>([]);
const selectedClient = ref<{value: number, label: string}>();
const filter = ref();
const groupMetodo = ref();

const clientes = ref();

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
    field: 'stock',
    name: 'stock',
    label: 'stock',
  },
  {
    field: (row: ProductoWIthCategoria) => row.Categorias.categoria,
    name: 'categoria',
    label: 'categoria',
  },
];

const metodoPago = ref();
const totalPagar = computed(() =>
  selected.value.reduce((total, producto) => {
    const subtotal = producto.precio_neto * producto.cantidad;
    return total + subtotal;
  }, 0)
);

const procesar = () => {
  const ivaCalc: number = totalPagar.value - (totalPagar.value * 0.19);
  const productosDetalleVenta = selected.value.map((p) => ({
    Producto_id: p.id,
    cantidad: p.cantidad,
    precio_neto: p.precio_neto,
    precio_total_neto: p.precio_neto * p.cantidad
  }));

  const venta = {
    neto: totalPagar.value,
    iva: ivaCalc,
    total: totalPagar.value + ivaCalc,
    Clientes_id: selectedClient.value?.value,
    Usuarios_id: 1,
    Estado_Pago_id: 1,
    Detalle_venta: [...productosDetalleVenta],
  };
  console.log(venta)
  ventasStore.createPedido(venta).then((result) => console.log(result))
};

onMounted(async () => {
  ventasStore.getAllMetodosDePage();
  storeProductos.getProductos();
  clientesStore
    .getClientes()
    .then(
      (response) =>
        (clientes.value = response.map((c) => ({
          value: c.id,
          label: `${c.nombre} ${c.apellido}`,
        })))
    );
  ventasRow.value = await geVenta();
  columns.value = Object.keys(ventasRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});

watch(selected, (newValue, oldValue) => {
  console.log('productos seleccionados anteriores: ', oldValue);
  console.log('productos seleccionados nuevos: ', newValue);
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
        row-key="id"
        :filter="filter"
        selection="multiple"
        v-model:selected="selected"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>

      <div class="col">
        <q-card>
          <!-- clientes -->
          <q-card-section class="row justify-center">
            <div class="text-h6 col-6">Cliente</div>
            <q-select
              square
              class="col"
              clearable
              v-model="selectedClient"
              :options="clientes"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-grey">
                    Sin clientes
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-card-section>
        </q-card>
        <!-- productos seleccionados -->
        <q-table
          class=""
          title="Productos de cliente"
          :rows="selected"
          no-data-label="sin productos para cliente"
        >
          <template v-slot:header="">
            <q-tr>
              <q-th> ID </q-th>
              <q-th> Descripcion </q-th>
              <q-th> peso en gramos </q-th>
              <q-th> precio neto </q-th>
              <q-th> cantidad </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr>
              <q-td>
                {{ props.row.id }}
              </q-td>
              <q-td>
                {{ props.row.descripcion }}
              </q-td>
              <q-td>
                {{ props.row.peso_gramos }}
              </q-td>
              <q-td>
                {{ props.row.precio_neto }}
              </q-td>
              <q-td class="row justify-between">
                <q-btn
                  color="red"
                  label="-"
                  @click="
                    () => {
                      if (props.row.cantidad <= 0) return;
                      props.row.cantidad--;
                    }
                  "
                ></q-btn>
                <div class="text-weight-bolder">{{ props.row.cantidad }}</div>

                <q-btn
                  color="blue"
                  label="+"
                  @click="props.row.cantidad++"
                ></q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <!-- metodos de pago -->
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Total a pagar {{ formatMoneyCLP(totalPagar) }}
            </div>
          </q-card-section>
        </q-card>
        <q-card class="">
          <q-card-section>
            <div class="text-h6">Metodos de pago</div>
          </q-card-section>

          <q-card-section class="row justify-between">
            <div class="q-gutter-sm row">
              <!-- v-for de metodos de pago -->
              <q-option-group
                class="col"
                type="radio"
                v-model="groupMetodo"
                :options="ventasStore.metodosDePage"
              />
            </div>
            <q-btn color="blue" @click="procesar" label="Pagar"> </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>
