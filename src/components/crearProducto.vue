<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">Crear un nuevo Producto</div>
        <q-form>
          <q-select
            :options="optionCategoria"
            v-model="categoriaSelected"
            label="Categorias"
          ></q-select>

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
import { ref, toRefs, defineEmits, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { getCategorias } from '../composable/producto.service';
import { CrearProducto, Producto } from '../models/producto.model';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

//--------Categoria-------/
const optionCategoria = ref();
const categoriaSelected = ref<number>();

const descripcion = ref<string>('');
const peso_gramos = ref<number>(0);
const precio_neto = ref<number>(0);
const stock = ref<number>(0);
const cod_barra = ref<string>('');
const idCategoria = ref<number>(0);

onMounted(async () => {
  getCategorias()
    .then((response) => {
      optionCategoria.value = response;
      console.log(optionCategoria);
    })
    .catch((error) => console.log('error al obtener categorias', error));
});

const procesarFormulario = () => {
  idCategoria.value = categoriaSelected.value!;
  const productoForm: CrearProducto = {
    descripcion: descripcion.value,
    peso_gramos: peso_gramos.value,
    precio_neto: precio_neto.value,
    stock: stock.value,
    cod_barras: cod_barra.value,
    Categorias_id: idCategoria.value,
  };
  insertProducto(productoForm);
};

const insertProducto = (producto: CrearProducto) => {
  api
    .post('/productos', producto)
    .then((response) => console.log('respuesta del servidor post', response))
    .catch((error) => console.log('error en la respuesta del servidor', error));
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
