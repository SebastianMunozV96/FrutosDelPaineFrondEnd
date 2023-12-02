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
import { api } from 'src/boot/axios';
import { Cliente, ClienteInsert } from '../models/cliente.model';
import { ref, toRefs, defineEmits } from 'vue';

const props = defineProps<{ dialogVisible: boolean }>();
const { dialogVisible } = toRefs(props);
const emits = defineEmits(['update:dialogVisible']);

const showDialog = ref<boolean>(false);

const rut = ref();
const nombre = ref();
const apellido = ref();
const correo = ref();
const celular = ref();
const Direccion_id = ref();

const procesarFormulario = () => {
  const clienteForm = {
    rut: rut.value,
    nombre: nombre.value,
    apellido: apellido.value,
    correo: correo.value,
    celular: celular.value,

    // direcciona
    // y lo demas
  };
  //insertCliente(clienteForm)
  insertCliente(clienteForm);
};

const insertCliente = (cliente: ClienteInsert) => {
  api
    .post('/clientes', cliente)
    .then((response) => console.log('respuesta de servidor post ', response))
    .catch((error) => console.log('error en respuesta de servidor ', error));
  closeDialog();
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
