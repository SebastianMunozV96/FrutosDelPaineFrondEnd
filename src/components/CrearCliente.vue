<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <div class="text-center text-h5 q-pb-md" >
          Crear un nuevo Producto
        </div>
        <q-form @submi="procesarFormulario">

          <q-input
          class="q-pb-md"
          v-model="rut"
          label="Ingrese rut"
          rule="(val) => !!val || 'Este campo es obligatorio'"

          />
          <q-input
          v-model="nombre"
          label="Ingrese Nombre"
          
          />

          <q-input
          v-model="apellido"
          label="Ingrese apellido"
          
          />

          <q-input
          type="email"
          v-model="correo"
          label="Ingrese Correo"
          
          />

          <q-input
          v-model="celular"
          label="Ingrese su Celular"
          
          />
          <q-input
          type="number"
          v-model="direccion_id"
          label="Ingrese direccion"
          
          />
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" type="submit" label="crear" />
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

const rut =ref<string>();
const nombre = ref<string>();
const apellido = ref<string>();
const correo = ref<string>();
const celular = ref<string>();
const direccion_id = ref<number>();

const procesarFormulario = () => {
  const clienteForm = {
    rut:'',
    nombre: '',
    apellido: '',
    correo:'',
    celular:'',
    direccion_id:null,
    // direccion:
    // y lo demas

  }
  //insertCliente(clienteForm)
  insertCliente(clienteForm);

}

const insertCliente = (cliente: ClienteInsert) => {
  api
    .post('/clientes', cliente)
    .then((response) => console.log('respuesta de servidor post ', response))
    .catch((error) => console.log('error en respuesta de servidor ', error));
};

const closeDialog = () => {
  emits('update:dialogVisible', false);
};
</script>
