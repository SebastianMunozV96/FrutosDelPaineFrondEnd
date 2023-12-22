<template>
  <q-dialog v-model="dialogVisible2" class="q-ma-xl">
    <q-card style="width: 80vw">
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">Crear una nueva Categoria</div>
        <q-form>

          <q-input
            class="q-pb-md col"
            v-model.string="descripcion"
            label="Ingrese descripcion"
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
import { ref, toRefs, defineEmits } from 'vue';
import { useProductosStore } from 'src/stores/productos';

const productosStore = useProductosStore();

const props = defineProps<{ dialogVisible2: boolean }>();
const { dialogVisible2 } = toRefs(props);
const emits = defineEmits(['update:dialogVisible2']);

const descripcion = ref<string>('');

const createNewCategory = (value: string, done: any) => {
  done(value, 'add-unique');
};

const procesarFormulario = async () => {
  const productoForm = {
    categoria: descripcion.value,
  };
  const result = await productosStore.createCategoria(productoForm.categoria);
  console.log('Result createProduct ', result);

  closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible2', false);
};
</script>
