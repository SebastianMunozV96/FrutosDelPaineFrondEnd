<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">
          Crear un nuevo Colaborador
        </div>
        <q-form @submi="procesarFormulario">
          <q-input
            v-model="nombre"
            label="Ingrese Nombre"
            mask="SSSSSSSSSSSSSSSSSSSSSSSSSSS"
            unmasked-value
            :rules="[(val) => !!val || 'Ingrese un nombre']"
          />

          <q-input
            v-model="apellido"
            label="Ingrese apellido"
            mask="SSSSSSSSSSSSSSSSSSSSSSSSSSS"
            unmasked-value
            :rules="[(val) => !!val || 'Ingrese un apellido']"
          />

          <q-input
            type="email"
            v-model="correo"
            label="Ingrese Correo"
            mask="AAAAAAA@AAAAAAA.AAA"
            unmasked-value
            :rules="[
              (val) => !!val || 'Ingrese un correo',
              (val) => /.+@.+\..+/.test(val) || 'Correo no Valido',
            ]"
          />

          <q-input
            v-model="celular"
            label="Ingrese su Celular"
            mask="(+56) 9 ########"
            :rules="[(val) => !!val || 'Ingrese un numero de Celular']"
          />

          <div class="text-center text-h5 q-pb-md">Direccion del cliente</div>

          <q-input
            v-model="calle"
            label="Ingrese la calle"
            mask="SSSSSSSSSSSSSSSSSSSSSSSSSSS"
            unmasked-value
            :rules="[(val) => !!val || 'Ingrese un calle']"
          />

          <q-input
            v-model="numero_calle"
            label="Ingrese numero de calle"
            mask="NNNNNN"
            unmasked-value
            :rules="[(val) => !!val || 'Ingrese un numero calle']"
          />

          <q-input
            v-model="numero_departamento"
            label="Ingrese numero de departamento"
            mask="NNNNNN"
            unmasked-value
            :rules="[(val) => !!val || 'Ingrese un numero departamento']"
          />

          <q-select
            :options="optionComunas"
            v-model="comunasSelected"
            label="Comunas"
          ></q-select>
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
import { createDireccion, getComunas } from '../composable/direcciones.service';
import { createColaborador } from '../composable/colaborador.service';
import { DireccionesCreate } from '../models/Direcciones.model';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const nombre = ref();
const apellido = ref();
const correo = ref();
const celular = ref();

//-----option de comunas----//
const optionComunas = ref();
const comunasSelected = ref();

//------Direcciones ------//
const calle = ref();
const numero_calle = ref();
const numero_departamento = ref();
const idComunas = ref();

onMounted(async () => {
  getComunas()
    .then((response) => {
      optionComunas.value = response;
      console.log(optionComunas);
    })
    .catch((error) => console.log('error al obtener Comunas', error));
});

const procesarFormulario = () => {
  idComunas.value = comunasSelected.value!;
  const direccionForm: DireccionesCreate = {
    calle: calle.value,
    numero_calle: numero_calle.value,
    numero_departamento: numero_departamento.value,
    comuna_id: idComunas.value,
  };

  createDireccion(direccionForm)
    .then((response) => (idDireccion.value = response.data.id))
    .catch((error) => console.log(error));
  const idDireccion = ref();

  const colaboradorForm = {
    nombre: nombre.value,
    apellido: apellido.value,
    correo: correo.value,
    celular: celular.value,
    direccion_id: idDireccion.value,
  };

  const idColabor = ref<number>();
  createColaborador(colaboradorForm)
    .then((response) => {
      idColabor.value = response.id;
      console.log('colaborador insertado : ', response);
    })
    .catch((error) => {
      console.log('Error al insertar colaborador : ', error);
    });



    
};











const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
