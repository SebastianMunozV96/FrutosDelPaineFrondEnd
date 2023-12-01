<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">Crear un nuevo Proveedor</div>
        <q-form @submi="procesarFormulario">
          <q-input
            class="q-pb-md"
            v-model="rut"
            label="Ingrese rut"
            mask="########-#"
            unmasked-value
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />
          <q-input
            v-model="giro"
            label="Ingrese giro"
            mask="###.##"
            unmasked-value
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            v-model="nombre"
            label="Ingrese Nombre"
            mask="SSSSSSSSSSSSSSSSSSSSSSSSSSS"
            unmasked-value
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            v-model="telefono"
            label="Ingrese telefono"
            mask="(+56) # #### ####"
            unmasked-value
            :rules="[(val) => !!val || 'Este campo es obligatorio']"
          />

          <q-input
            type="email"
            v-model="correo"
            label="Ingrese su Correo"
            :rules="[
              (val) => !!val || 'Este campo es obligatorio',
              (val) => /.+@.+\..+/.test(val) || 'Correo no Valido',
            ]"
          />
          <q-input
            v-model="pagina_web"
            label="Ingrese la pagina web "
            mask="WWW.SSSSSSSSS.SSS"
            unmasked-value
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
import { response } from 'express';
import { api } from 'src/boot/axios';
import { Proveedor, ProveedorInsert } from '../models/proveedor.model';
import { ref, toRefs, defineEmits } from 'vue';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const showDialog = ref<boolean>(false);

const rut = ref();
const giro = ref();
const nombre = ref();
const telefono = ref();
const correo = ref();
const pagina_web = ref();
const Direccion_id = ref(1);

const procesarFormulario = () => {
  const proveedorForm = {
    rut: rut.value,
    giro: giro.value,
    nombre: nombre.value,
    telefono: telefono.value,
    correo: correo.value,
    pagina_web: pagina_web.value,
    Direccion_id: Direccion_id.value,
  };
  InsertProveedor(proveedorForm);

};

const InsertProveedor = (proveedor: ProveedorInsert) => {
  api
    .post('/proveedores', proveedor)
    .then((response) => console.log('respuesta del servidor post', response))
    .catch((error) => console.log('error en respuesta del servidor', error));
    closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
