<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <q-form>
          <div class="q-pa-xl">hola</div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" label="crear" />
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

const procesarFormulario = () => {
  const clienteForm = {
    nombre: '',
    apellido: '',
    // direccion:
    // y lo demas

  }
  //insertCliente(clienteForm)
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
