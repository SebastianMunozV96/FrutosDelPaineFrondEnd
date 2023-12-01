<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">Crear un nuevo Producto</div>
        <q-form>
          <q-input
            class="q-pb-md"
            v-model="descripcion"
            label="Ingrese una descripcion"
            mask="SSSSSSSSSSSSSSSSSSSSSSSSSSSSSS"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
          <q-input
            v-model="peso_gramos"
            label="Ingrese peso en gramos"
            mask="###############"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            v-model="precio_neto"
            label="Ingrese precio"
            mask="#######"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            v-model="stock"
            label="Ingrese stock"
            mask="###"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
          <q-input
            v-model="cod_barra"
            label="Ingrese codigo de barra"
            mask="NNNNNNNNNNNNNN"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="secondary"
          type="submit"
          label="crear"
          @submi="procesarFormulario"
        />
        <q-btn color="negative" label="Cancel" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, defineEmits } from 'vue';
import { api } from 'src/boot/axios';
import { Producto, ProductoInsert } from '../models/producto.model';
import { response } from 'express';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const showDialog = ref<boolean>(false);

const descripcion = ref();
const peso_gramos = ref();
const precio_neto = ref();
const stock = ref();
const cod_barra = ref();
const Categoria_id = ref();

const procesarFormulario = () => {
  const productoForm = {
    descripcion: descripcion.value,
    peso_gramos: peso_gramos.value,
    precio_neto: precio_neto.value,
    stock: stock.value,
    cod_barra: cod_barra.value,
    Categoria_id: Categoria_id.value,
  };
  insertProducto(productoForm);
};

const insertProducto = (producto: ProductoInsert) => {
  api
    .post('/productos', producto)
    .then((response) => console.log('respuesta del servidor post', response))
    .catch((error) => console.log('error en la respuesta del servidor', error));
  closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
