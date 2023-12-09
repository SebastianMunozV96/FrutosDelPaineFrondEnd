<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '../boot/axios';

interface Venta {
  id: number;
  neto: number;
  iva: number;
  total: number | null;
  fecha: string;
  Usuario_id: number | null;
  Cliente_id: number | null;
  Estado_PAgo_id: number | null;
}

const columns = ref();

const getVentas = async () => {
  const ventas = await api.get<Venta[]>('/pedidos');
  return ventas.data;
};

const ventasRow = ref<Venta[]>([]);
const celularrearPedido = ref(false);

//productos
const productos = ref<any[]>([]);
const productosSeleccionados = ref<any[]>([]);

const metodoPago = ref();

onMounted(async () => {
  ventasRow.value = await getVentas();
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
        row-key="name"
        selection="multiple"
        v-model:selected="productosSeleccionados"
      />
      <div class="col ">
        <q-card>
          <q-card-section>
            <div class="text-h6">Cliente</div>
          </q-card-section>
        </q-card>
        <q-table
          title="Productos de cliente"
          :rows="productosSeleccionados"
          :columns="columns"
        />
        <!-- metodos de pago -->
        <q-card>
        <q-card-section>
          <div class="text-h6">Metodos de pago</div>
        </q-card-section>
          <q-card-section>
            <div class="q-gutter-sm">
            <!-- v-for de metodos de pago -->
              <q-radio dense v-model="metodoPago" val="line" label="Line" />
            </div>
          </q-card-section>
        </q-card>
        <q-btn color="blue" label="Pagar"></q-btn>
      </div>
    </div>
  </div>
</template>
