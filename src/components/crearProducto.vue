<template>
  <q-dialog v-model="dialogVisible" class="q-ma-xl">
    <q-card style="width: 80vw">
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">Crear un nuevo Producto</div>
        <q-form>
          <q-select
            class="col"
            :options="optionCategoria"
            v-model="categoriaSelected"
            label="Categorias"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-italic text-grey">
                  Sin Categorias
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            class="q-pb-md col"
            v-model.string="descripcion"
            label="Ingrese descripcion"
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
          <q-input
            type="number"
            v-model.number="peso_gramos"
            label="Ingrese peso en gramos"
            mask="#############"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val >= 0 || 'debe ser un valor positivo',
            ]"
          />

          <q-input
            type="number"
            v-model.number="precio_neto"
            label="Ingrese precio"
            mask="#######"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val >= 0 || 'debe ser un valor positivo',
            ]"
          />

          <q-input
            type="number"
            v-model.number="stock"
            label="Ingrese stock"
            mask="###"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => val >= 1 || 'debe ser un valor positivo mayor o igual a 1',
            ]"
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
import { useProductosStore } from 'src/stores/productos';

const productosStore = useProductosStore();

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

//--------Categoria-------/
const optionCategoria = ref<{ value: number; label: string }[]>([]);
const categoriaSelected = ref<number>(0);
//--------------------------------//

const descripcion = ref<string>('');
const peso_gramos = ref<number>(0);
const precio_neto = ref<number>(0);
const stock = ref<number>(0);
const cod_barra = ref<string>('');
const idCategoria = ref<number>();

const createNewCategory = (value: string, done: any) => {
  done(value, 'add-unique');
};

const procesarFormulario = async () => {
  idCategoria.value = categoriaSelected.value;
  const productoForm = {
    descripcion: descripcion.value,
    peso_gramos: peso_gramos.value,
    precio_neto: precio_neto.value,
    stock: stock.value,
    cod_barras: cod_barra.value,
    Categorias_id: idCategoria.value,
  };
  const result = await productosStore.crearProducto(productoForm);
  console.log('Result createProduct ', result);

  closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};

onMounted(() => {
  productosStore
    .getCategoriasLabelValue()
    .then((response) => (optionCategoria.value = response));
});
</script>
