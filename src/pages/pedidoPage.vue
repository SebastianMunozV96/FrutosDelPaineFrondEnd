<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../boot/axios';
import { getProductos } from '../composable/producto.service';
import { geVenta } from '../composable/venta.service';
import { Venta } from '../models/venta.model';

const columns = ref();

const ventasRow = ref<Venta[]>([]);
const celularrearPedido = ref(false);

//productos
const productos = ref<any[]>([]);
const productosSeleccionados = ref<any[]>([]);

const metodoPago = ref();

const productoGet = async () => {
  getProductos().then((Response) => {
    productos.value = Response;
    console.log('lista de productos', productos.value);
  })
  .catch((error)=> console.log('error al obtener productos',error) )
};

onMounted(async () => {
  productoGet();
  ventasRow.value = await geVenta();
  columns.value = Object.keys(ventasRow.value).map((key) => ({
    field: key,
    name: key.toUpperCase(),
    label: key,
  }));
});
</script>

<template>
  <div class="q-pa-md">
    <q-btn unelevated color="primary" label="Crear Pedido"> </q-btn>
    <div class="row">
      <q-table
        class="col"
        flat
        bordered
        title="Productos para venta"
        :rows="productos"
        :columns="columns"
        no-data-label="No se encuentran los productos"
        row-key="name"
        selection="multiple"
        v-model:selected="productosSeleccionados"
      />

      <div class="col">
        <q-card>
          <q-card-section>
            <div class="text-h6">Cliente</div>
          </q-card-section>
        </q-card>
        <q-table class=""
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
        <q-btn color="blue" label="Pagar"></q-btn>
      </div>
    </div>
  </div>
</template>
