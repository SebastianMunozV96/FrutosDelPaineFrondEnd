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
            v-model.string="descripcion"
            label="Ingrese descripcion"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
          <q-input
            type="number"
            v-model.number="peso_gramos"
            label="Ingrese peso en gramos"
            mask="#############"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            type="number"
            v-model.number="precio_neto"
            label="Ingrese precio"
            mask="#######"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            type="number"
            v-model.number="stock"
            label="Ingrese stock"
            mask="###"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
          <q-input
            v-model.string="cod_barra"
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
          @click="procesarFormulario"
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
import { CrearProducto } from '../models/producto.model';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

//--------Categoria-------/
const optionCategoria = ref();
const categoriaSelected = ref();
//--------------------------------//

const descripcion = ref<string>();
const peso_gramos = ref<number>();
const precio_neto = ref<number>();
const stock = ref<number>();
const cod_barra = ref<string>();
const idCategoria = ref<number>();

try {
  onMounted(async () => {
    getCategorias()
      .then((response) => {
        optionCategoria.value = response;
        console.log(optionCategoria);
      })
      .catch((error) => console.log('error al obtener categorias', error));
  });
} catch (error) {
  console.log('error al obtener Categoria', error);
}

const procesarFormulario = () => {
  idCategoria.value = categoriaSelected.value;
  const productoForm = {
    descripcion: descripcion.value,
    peso_gramos: peso_gramos.value,
    precio_neto: precio_neto.value,
    stock: stock.value,
    cod_barras: cod_barra.value,
    Categorias_id: idCategoria.value,
  };
  const InsertProducto = (producto: CrearProducto) => {
    api
      .post('/productos', producto)
      .then((response) => console.log('respuesta del servidor post', response))
      .catch((error) => console.log('error en resuesta del servidor', error));
  };

  closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
