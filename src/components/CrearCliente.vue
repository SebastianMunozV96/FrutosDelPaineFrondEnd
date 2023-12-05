<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md">Crear un nuevo Cliente</div>
        <q-form @submi="procesarFormulario">
          <q-input
            class="q-pb-md"
            v-model="rut"
            label="Ingrese rut"
            mask="########-#"
            unmasked-value
            :rules="[(val) => !!val || 'Ingrese un rut']"
          />
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
import {
  createDireccion,
  createDireccionCliente,
  getComunas,
} from '../composable/direcciones.service';
import { createCliente } from 'src/composable/clientes.service';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const rut = ref();
const nombre = ref();
const apellido = ref();
const correo = ref();
const celular = ref();

// TODO: variables reactivas , optionsComunas, comunaSelected, direccionesid
const optionComunas = ref();
const comunasSelected = ref();

//-----------Val de direccion--//

const calle = ref();
const numero_calle = ref();
const numero_departamento = ref();
const idComuna = comunasSelected.value;

onMounted(async () => {
  getComunas()
    .then((response) => {
      optionComunas.value = response;
      console.log(optionComunas);
    })
    .catch((error) => console.log('error al obtener Comunas', error));
});

const procesarFormulario = () => {
  //insertCliente(clienteForm)
  // TODO: obtener listado de comunas comunas en onMount y asignarlas al
  // TODO: primero crear la direccion
  //   {
  //     calle: string;
  //     numero_calle: number;
  //     numero_departamento: number | null;
  //     Comunas_id: number;
  // }
  // const idDireccion=  insertDireccion(direccionDato)

  const direccionForm = {
    calle: calle.value,
    numero_calle: numero_calle.value,
    numero_departamento: numero_departamento.value,
    comuna_id: idComuna,
  };

  createDireccion(direccionForm)
    .then((response) => (idDireccion.value = response.data.id))
    .catch((error) => console.log(error));
  const idDireccion = ref();

  const clienteForm = {
    rut: rut.value,
    nombre: nombre.value,
    apellido: apellido.value,
    correo: correo.value,
    celular: celular.value,
    direccion_id: idDireccion.value,
  };

  const idCliente = ref<number>();
  createCliente(clienteForm)
    .then((response) => {
      idCliente.value = response.id;
      console.log('cliente insertado : ', response);
    })
    .catch((error) => {
      console.log('Error al insertar cliente: ', error);
    });
  // TODO: insertar idDireccion en DIrecciones_de_clientes <- wear al leo
  createDireccionCliente({
    Clientes_id: idCliente.value!,
    Direcciones_id: idDireccion.value!,
  })
    .then((response) =>
      console.log('direccion de cliente insertada ', response.data)
    )
    .catch((error) =>
      console.log('error al insertar direcciones de clientes ', error)
    );
  closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
